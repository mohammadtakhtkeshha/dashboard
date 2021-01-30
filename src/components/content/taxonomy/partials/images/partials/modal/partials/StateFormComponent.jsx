import React, {useState, useEffect, useContext} from "react";
import {withNamespaces} from 'react-i18next';

import {Box, Grid} from '@material-ui/core/index';
import {withStyles} from '@material-ui/core/styles';

import AppContext from 'contexts/AppContext';
import {StyledInput, StyledTypographyError} from "assets/js/App";
import MultiSelect from "components/partials/AutocompleteComponent.jsx"
import {StyledLabel} from "assets/js/App";
import {StyledModalFooter, StyledModalHeader, StyledModalBody, StyledBottomMargin} from "assets/js/library/layout/modal"
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
import EditorComponent from "components/partials/EditorComponent.jsx";
import {getParentAndItsIdsMethod} from "./StateFormComponent.js"
import StyledCheckboxComponent from "components/partials/StyledCheckboxComponent";
import {StyledMarginTop,styledGridParent} from "assets/js/taxonomy/stateForm"
import i18next from "i18next";
import {isObjectEmpty} from "methods/commons";
import {StyledRegisterButton} from "assets/js/taxonomy/stateForm";

const StyledGridParent = withStyles(styledGridParent)(Grid)

function StateFormComponent({t, openForm, closeForm,setOpenForm, states, setErrors,errors, state, setState, setStates,setIds,handlePagination}) {
    const [parentStates, setParentStates] = useState([])
    const [selectedParents, setSelectedParents] = useState([])
    const appContext = useContext(AppContext)
    const lang = i18next.language

    const handleChange = (e, field) => {
        handleChangeMethod(e, field, setState,setErrors,t)
    }

    const handleChangePath = (e) => {
        handleChangePathMethod(e, setState, setErrors, t)
    }

    const clickEditor = (text) => {
        clickEditorMethod(text, setState)
    }

    const register = () => {
        registerMethod(appContext, state, openForm, setOpenForm, setStates, t,setIds,handlePagination,closeForm,errors)
    }

    const getParentAndItsIds = () => {
        getParentAndItsIdsMethod(openForm.id,state,states, setParentStates)
    }

    const changeParent = (e) => {
        changeParentMethod(e, setState)
    }

    const changePublishStatus = (e, isChecked) => {
        changePublishStatusMethod(isChecked, setState)
    }

    const handleErrors = () => {
        if(openForm.id === ""){
            handleErrorsMethod(state, setErrors, t)
        }
    }

    const handleDefaultParent = () => {
        handleDefaultParentMethod(state, setSelectedParents,states)
    }

    useEffect(() => {
        getParentAndItsIds();
        handleErrors()
    }, [])

    useEffect(() => {
        handleDefaultParent();
    }, [state.tid])

    return (<>
            <StyledModalHeader>{t('taxonomy:newImage')}</StyledModalHeader>
            <StyledModalBody>
                <StyledBottomMargin>
                    <Grid container>
                        <Grid item xs={12}>
                            <StyledLabel>{t('translation:name')}</StyledLabel>
                            <StyledInput value={state.name[0].value !== null ? state.name[0].value : ""} type="text"
                                         placeholder={t('translation:name')}
                                         onChange={e => handleChange(e, "name")}/>
                            {errors.name && <StyledTypographyError align={lang === 'en' ? 'left' : 'right'}>
                                {errors.name.required}
                            </StyledTypographyError>}
                        </Grid>
                        <Grid item xs={12}>
                                <EditorComponent
                                    value={state.description[0].value !== null ? state.description[0].value : ""}
                                    title={t('translation:description')}
                                    onClick={e => clickEditor(e, "description")}/>
                        </Grid>
                        <StyledGridParent item xs={12} length={parentStates.length}>
                            <Box m={1}>
                                <StyledLabel>{t('taxonomy:termParent')}</StyledLabel>
                                <MultiSelect array={parentStates}
                                             changedTags={changeParent}
                                             label={t('translation:images')}
                                             setSelectedTags={setSelectedParents}
                                             selectedTags={selectedParents}/>
                            </Box>
                        </StyledGridParent>
                        <Grid item xs={12}>
                            <StyledMarginTop>
                                <StyledLabel>{t('contents:path')}</StyledLabel>
                                <StyledInput value={state.path[0].alias !== null ? state.path[0].alias : ""} type="text"
                                             placeholder={t('contents:path')}
                                             onChange={ handleChangePath}/>
                                {errors.path && <StyledTypographyError align={lang === 'en' ? 'left' : 'right'}>
                                    {errors.path.regex}
                                </StyledTypographyError>}
                            </StyledMarginTop>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledCheckboxComponent checked={state.status[0].value}
                                                     change={changePublishStatus}
                                                     label={t('translation:published')}
                                                     value={state.status[0].value}/>
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
