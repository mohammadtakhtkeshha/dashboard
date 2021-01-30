import React, {useState, useEffect, useContext} from "react"
import {withNamespaces} from 'react-i18next'

import {Box, Grid} from '@material-ui/core/index'
import {withStyles} from '@material-ui/core/styles'

import AppContext from 'contexts/AppContext'
import {StyledInput, StyledTypographyError} from "assets/js/App"
import MultiSelect from "components/partials/AutocompleteComponent.jsx"
import {StyledLabel} from "assets/js/App"
import {StyledRegisterButton} from "assets/js/user/newUser"
import {StyledModalFooter, StyledModalHeader, StyledModalBody, StyledBottomMargin} from "assets/js/library/layout/modal"
import {
    registerMethod,
    changeStatusMethod,
    handleErrorsMethod,
    changeParentMethod,
    handleDefaultParentMethod,
    changeLinkOfMenuMethod,
    handleChangeMethod
} from "./MenuFormComponent.js"
import {getParentAndItsIdsMethod} from "./MenuFormComponent.js"
import StyledCheckboxComponent from "components/partials/StyledCheckboxComponent"
import {styledGridParent, styledGridActive} from "assets/js/taxonomy/stateForm"
import {isObjectEmpty} from "methods/commons"

// ------------------ consts --------------------
const StyledGridParent = withStyles(styledGridParent)(Grid)
const StyledGridActive = withStyles(styledGridActive)(Grid)

function MenuFormComponent({t, openForm, closeForm, menus, setErrors, menu, setMenu, getMenus, handlePagination, errors, link, setLink}) {
    const [parentMenu, setparentMenu] = useState([])
    const [selectedParents, setSelectedParents] = useState([])
    const appContext = useContext(AppContext)

    const handleChange = (e, field) => {
        handleChangeMethod(e, field, setMenu, setErrors, t)
    }

    const register = () => {
        registerMethod(appContext, menu, openForm, getMenus, t, handlePagination, closeForm)
    }

    const getParentAndItsIds = () => {
        getParentAndItsIdsMethod(openForm.id, menu, menus, setparentMenu)
    }

    const changeParent = (e) => {
        changeParentMethod(e, setMenu)
    }

    const changeStatus = (e, isChecked,field) => {
        changeStatusMethod(isChecked, setMenu,field)
    }

    const handleErrors = () => {
        handleErrorsMethod(setErrors, t, openForm)
    }

    const handleDefaultParent = () => {
        handleDefaultParentMethod(menu, setSelectedParents, menus)
    }

    const changeLinkOfMenu = (e) => {
        changeLinkOfMenuMethod(e, openForm, setLink)
    }

    useEffect(() => {
        getParentAndItsIds()
        handleErrors()
    }, [])

    useEffect(() => {
        handleDefaultParent()
    }, [menu.id])

    useEffect(() => {
        handleChange(link, "link")
    }, [link])

    return (<>
            <StyledModalHeader>{t('menu:newMenu')}</StyledModalHeader>
            <StyledModalBody>
                <StyledBottomMargin>
                    <Grid container>
                        <Grid item xs={12}>
                            <StyledLabel>{t('menu:menuTitle')}</StyledLabel>
                            <StyledInput value={menu.title[0].value !== null ? menu.title[0].value : ""}
                                         type="text"
                                         placeholder={t('menu:menuTitle')}
                                         onChange={e => handleChange(e, "title")}/>
                            {errors.title ? <div>
                                {errors.title.required ?
                                    <StyledTypographyError>{errors.title.required}</StyledTypographyError> : ''}
                            </div> : ""}
                        </Grid>
                        <Grid item xs={12}>
                            <StyledLabel>{t('menu:link')}</StyledLabel>
                            <StyledInput type="text"
                                         value={link}
                                         placeholder={t('menu:link')}
                                // onChange={e => handleChange(e, "link")}/>
                                         onChange={changeLinkOfMenu}/>
                            {errors.link ? <div>
                                {errors.link.required ?
                                    <StyledTypographyError>{errors.link.required}</StyledTypographyError> : ''}
                                {errors.link.valid ?
                                    <StyledTypographyError>{errors.link.valid}</StyledTypographyError> : ''}
                            </div> : ""}
                        </Grid>
                        <Grid item xs={12}>
                            <StyledLabel>{t('translation:description')}</StyledLabel>
                            <StyledInput value={menu.description[0] !== undefined ? menu.description[0].value : ""}
                                         type="text"
                                         placeholder={t('translation:description')}
                                         onChange={e => handleChange(e, "description")}/>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledCheckboxComponent checked={menu.external[0].value}
                                                     change={(e,isChecked)=>changeStatus(e,isChecked,'external')}
                                                     label={t('menu:showOpen')}
                                                     value={menu.external[0].value}/>
                        </Grid>
                        <StyledGridParent item xs={12} length={parentMenu.length}>
                            <Box m={1}>
                                <StyledLabel>{t('taxonomy:termParent')}</StyledLabel>
                                <MultiSelect array={parentMenu}
                                             changedTags={changeParent}
                                             label={t('taxonomy:menus')}
                                             setSelectedTags={setSelectedParents}
                                             selectedTags={selectedParents}/>
                            </Box>
                        </StyledGridParent>
                        <StyledGridActive item xs={12}>
                            <StyledCheckboxComponent checked={menu.enabled[0].value}
                                                     // change={changeStatus}
                                                     change={(e,isChecked)=>changeStatus(e,isChecked,'enabled')}
                                                     label={t('translation:active')}
                                                     value={menu.enabled[0].value}/>
                        </StyledGridActive>
                    </Grid>
                </StyledBottomMargin>
            </StyledModalBody>
            <StyledModalFooter>
                <StyledRegisterButton onClick={register} status={isObjectEmpty(errors)}>
                    {t('translation:register')}
                </StyledRegisterButton>
            </StyledModalFooter>
        </>
    )
}

export default withNamespaces('contents,taxonomy,translation')(MenuFormComponent)
