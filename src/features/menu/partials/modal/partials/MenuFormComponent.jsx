import React, { useState, useEffect, useContext } from "react"
import { withNamespaces } from 'react-i18next'

import { Box, Grid } from '@material-ui/core/index'
import { withStyles } from '@material-ui/core/styles'

import AppContext from 'contexts/AppContext'
import { StyledInput, StyledTypographyError, StyledModalFooter, StyledModalHeader, StyledModalBody } from "assets/js/App"
import MultiSelect from "infrastructure/authorized/partials/AutocompleteComponent.jsx"
import { StyledLabel } from "assets/js/App"
import { StyledRegisterButton } from "assets/js/library/components/buttons";

import {
    registerMethod,
    changeStatusMethod,
    changeParentMethod,
    handleDefaultParentMethod,
    changeLinkOfMenuMethod,
    handleChangeMethod
} from "./MenuFormComponent.js"
import StyledCheckboxComponent from "infrastructure/authorized/partials/StyledCheckboxComponent"
import { styledGridParent, styledGridActive, StyledHeight } from "assets/js/taxonomy/stateForm"
import { isObjectEmpty } from "methods/commons"
import { StyledMargintb } from "assets/js/library/pages/menu/menuForm"
import { MarginTop1 } from "assets/js/library/base/all";

const StyledGridParent = withStyles(styledGridParent)(Grid)
const StyledGridActive = withStyles(styledGridActive)(Grid)

function MenuFormComponent({ t, openForm, closeForm, menus, setErrors, menu, setMenu, getMenus, errors, link, setLink }) {
    const [parentMenu, setparentMenu] = useState([])
    const [selectedParents, setSelectedParents] = useState([])
    const appContext = useContext(AppContext)

    const handleChange = (e, field) => {
        handleChangeMethod(e, field, setMenu, setErrors, t)
    }

    const register = () => {
        registerMethod(appContext, menu, openForm, getMenus, t, closeForm)
    }


    const changeParent = (e) => {
        changeParentMethod(e, setMenu)
    }

    const changeStatus = (e, isChecked, field) => {
        changeStatusMethod(isChecked, setMenu, field)
    }

    const handleDefaultParent = () => {
        handleDefaultParentMethod(menu, setSelectedParents, menus)
    }

    const changeLinkOfMenu = (e) => {
        changeLinkOfMenuMethod(e, openForm, setLink)
    }

    useEffect(() => {
        const getParentAndItsIdsMethod = (id, menu, menus, setParentMenus) => {
            let parents = []
            let list = [...menus]
            for (let menu of list) {
                if (menu.id === id) {
                    const index = list.indexOf(menu)
                    list.splice(index, 1)
                }
            }
            for (let menu of list) {
                let idMenu = `menu_link_content:${menu.uuid}`
                let idAndName = { id: idMenu, name: menu.title }
                parents.push(idAndName)
                if (menu.children && menu.children.length > 0) {
                    for (let item of menu.children) {
                        let idValue = `menu_link_content:${item.uuid}`
                        let idAndName = { id: idValue, name: item.title }
                        parents.push(idAndName)
                        if (item.children && item.children.length > 0) {
                            for (let part of item.children) {
                                let partId = `menu_link_content:${item.uuid}`
                                let idAndName = { id: partId, name: part.title }
                                parents.push(idAndName)
                            }
                        }
                    }
                }
            }
            setParentMenus(parents)
        }
        getParentAndItsIdsMethod(openForm.id, menu, menus, setparentMenu)
        const handleErrorsMethod = (setErrors, t, openForm) => {
            if (openForm.id === "") {//register
                setErrors({
                    title: { required: t('translation:requiredValid') },
                    link: { required: t('translation:requiredValid') }
                });
            }
        }
        handleErrorsMethod(setErrors, t, openForm)
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
            <StyledMargintb>
                <Grid container>
                    <Grid item xs={12} className="tour-title">
                        <StyledLabel>{t('menu:menuTitle')}</StyledLabel>
                        <StyledHeight>
                            <StyledInput value={menu.title[0].value !== null ? menu.title[0].value : ""}
                                type="text"

                                placeholder={t('menu:menuTitle')}
                                onChange={e => handleChange(e, "title")} />
                        </StyledHeight>
                        {errors.title ? <div>
                            {errors.title.required ?
                                <StyledTypographyError>{errors.title.required}</StyledTypographyError> : ''}
                        </div> : ""}
                    </Grid>
                    <Grid item xs={12}>
                        <StyledLabel>{t('menu:link')}</StyledLabel>
                        <StyledInput type="text"
                            value={link}
                            className="tour-link"
                            placeholder={t('menu:link')}
                            // onChange={e => handleChange(e, "link")}/>
                            onChange={changeLinkOfMenu} />
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
                            className="tour-description"
                            placeholder={t('translation:description')}
                            onChange={e => handleChange(e, "description")} />
                    </Grid>
                    <Grid item xs={6} className="tour-external">
                        <MarginTop1>
                            <StyledCheckboxComponent checked={menu.external[0].value}
                                change={(e, isChecked) => changeStatus(e, isChecked, 'external')}
                                label={t('menu:showOpen')}
                                value={menu.external[0].value} />

                        </MarginTop1>
                    </Grid>
                    <StyledGridActive item xs={6}>
                        <StyledHeight>
                            <div className="tour-test">
                                <StyledCheckboxComponent checked={menu.enabled[0].value}
                                    // change={changeStatus}

                                    change={(e, isChecked) => changeStatus(e, isChecked, 'enabled')}
                                    label={t('translation:active')}
                                    value={menu.enabled[0].value} />
                            </div>
                        </StyledHeight>
                    </StyledGridActive>
                    <StyledGridParent item xs={12} length={parentMenu.length}>
                        <Box m={1} className="tour-parent">
                            <StyledLabel>{t('taxonomy:termParent')}</StyledLabel>
                            <MultiSelect array={parentMenu}
                                changedTags={changeParent}
                                label={t('taxonomy:menus')}
                                setSelectedTags={setSelectedParents}
                                selectedTags={selectedParents} />
                        </Box>
                    </StyledGridParent>
                    {/*<StyledGridActive item xs={12} className="tour-enabled">*/}
                    {/*    <StyledCheckboxComponent checked={menu.enabled[0].value}*/}
                    {/*                             // change={changeStatus}*/}
                    {/*                             change={(e,isChecked)=>changeStatus(e,isChecked,'enabled')}*/}
                    {/*                             label={t('translation:active')}*/}
                    {/*                             value={menu.enabled[0].value}/>*/}
                    {/*</StyledGridActive>*/}

                </Grid>
            </StyledMargintb>
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
