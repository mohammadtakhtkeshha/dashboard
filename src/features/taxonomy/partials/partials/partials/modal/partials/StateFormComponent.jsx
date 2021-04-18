import React, {useState, useEffect, useContext} from "react";
import {withNamespaces} from 'react-i18next';
import i18next from "i18next";

import {Box, Grid} from '@material-ui/core/index';
import {withStyles} from '@material-ui/core/styles';

import AppContext from 'contexts/AppContext';
import {
    StyledLabel,
    StyledInput,
    StyledTypographyError,
    StyledModalFooter,
    StyledModalHeader,
    StyledModalBody,
    StyledBottomMargin
} from "assets/js/App";
import MultiSelect from "infrastructure/authorized/partials/AutocompleteComponent.jsx"
import {
    registerMethod,
    changePublishStatusMethod,
    handleErrorsMethod,
    changeParentMethod,
    handleChangePathMethod,
    clickEditorMethod,
    handleDefaultParentMethod,
    handleChangeMethod
} from "./StateFormComponent.js";
import EditorComponent from "infrastructure/authorized/partials/EditorComponent.jsx";
import {getParentAndItsIdsMethod} from "./StateFormComponent.js"
import StyledCheckboxComponent from "infrastructure/authorized/partials/StyledCheckboxComponent";
import {StyledMarginTop, styledGridParent} from "assets/js/taxonomy/stateForm"
import {isObjectEmpty} from "methods/commons";
import {StyledRegisterButton} from "assets/js/taxonomy/stateForm";

const StyledGridParent = withStyles(styledGridParent)(Grid)

function StateFormComponent({t, openForm, closeForm, setOpenForm, states, setErrors, errors, category, setCategory, setStates, getStates, type}) {
    const [parentStates, setParentStates] = useState([])
    const [selectedParents, setSelectedParents] = useState([])
    const appContext = useContext(AppContext)
    const lang = i18next.language

    const handleChange = (e, field) => {
        handleChangeMethod(e, field, setCategory, setErrors, t)
    }

    const handleChangePath = (e) => {
        handleChangePathMethod(e, setCategory, setErrors, t)
    }

    const clickEditor = (text) => {
        clickEditorMethod(text, setCategory)
    }

    const register = () => {
        registerMethod(appContext, category, openForm, setStates, t, closeForm, errors, getStates)
    }

    const getParentAndItsIds = () => {
        getParentAndItsIdsMethod(openForm.id, category, states, setParentStates)
    }

    const changeParent = (e) => {
        changeParentMethod(e, setCategory)
    }

    const changePublishStatus = (e, isChecked) => {
        changePublishStatusMethod(isChecked, setCategory)
    }

    const handleErrors = () => {
        if (openForm.id === "") {
            handleErrorsMethod(category, setErrors, t)
        }
    }

    const handleDefaultParent = () => {
        handleDefaultParentMethod(category, setSelectedParents, states)
    }

    useEffect(() => {
        getParentAndItsIds();
        handleErrors()
    }, [])

    useEffect(() => {
        handleDefaultParent();
    }, [category.tid])


    return (<>
            <StyledModalHeader>{t(`taxonomy:new${type.type}`)}</StyledModalHeader>
            <StyledModalBody>
                <StyledBottomMargin>
                    <Grid container>
                        <Grid item xs={12}>
                            <StyledLabel>{t('translation:name')}</StyledLabel>
                            <StyledInput className="tour-name"
                                         value={category.name[0].value !== null ? category.name[0].value : ""}
                                         type="text"
                                         placeholder={t('translation:name')}
                                         onChange={e => handleChange(e, "name")}/>
                            {errors.name && <StyledTypographyError align={lang === 'en' ? 'left' : 'right'}>
                                {errors.name.required}
                            </StyledTypographyError>}
                        </Grid>
                        <Grid item xs={12} className="tour-description">
                            <EditorComponent

                                value={category.description[0].value !== null ? category.description[0].value : ""}
                                title={t('translation:description')}
                                onClick={e => clickEditor(e, "description")}/>
                        </Grid>
                        <StyledGridParent item xs={12} length={parentStates.length}>
                            <Box m={1} className="tour-parent">
                                <StyledLabel>{t('taxonomy:termParent')}</StyledLabel>
                                <MultiSelect array={parentStates}
                                             changedTags={changeParent}
                                             label={t('taxonomy:categoryList')}
                                             setSelectedTags={setSelectedParents}
                                             selectedTags={selectedParents}/>
                            </Box>
                        </StyledGridParent>
                        <Grid item xs={12}>
                            <StyledMarginTop>
                                <StyledLabel>{t('contents:path')}</StyledLabel>
                                <StyledInput className="tour-path"
                                             value={category.path[0].alias !== null ? category.path[0].alias : ""}
                                             type="text"
                                             placeholder={t('contents:path')}
                                             onChange={handleChangePath}/>
                                {errors.path && <StyledTypographyError align={lang === 'en' ? 'left' : 'right'}>
                                    {errors.path.regex}
                                </StyledTypographyError>}
                            </StyledMarginTop>
                        </Grid>
                        <Grid item xs={12} className="tour-status">
                            <StyledCheckboxComponent checked={category.status[0].value}
                                                     change={changePublishStatus}
                                                     label={t('translation:published')}
                                                     value={category.status[0].value}/>
                        </Grid>
                    </Grid>
                </StyledBottomMargin>
            </StyledModalBody>
            <StyledModalFooter>
                <StyledRegisterButton status={isObjectEmpty(errors)} onClick={register}>
                    {t('translation:register')}
                </StyledRegisterButton>
            </StyledModalFooter>
        </>
    );
}

export default withNamespaces('contents,taxonomy,translation')(StateFormComponent);
