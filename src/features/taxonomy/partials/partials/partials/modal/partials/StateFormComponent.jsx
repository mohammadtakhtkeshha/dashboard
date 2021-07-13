import React, {useState, useEffect, useContext} from 'react';
import {withNamespaces} from 'react-i18next';
import i18next from 'i18next';

import {Box, Grid} from '@material-ui/core/index';
import {withStyles} from '@material-ui/core/styles';

import AppContext from 'contexts/AppContext';
import {
    StyledModalFooter,
    StyledModalHeader,
    StyledModalBody,
} from 'assets/js/library/components/modal';
import {StyledLabel, StyledTypographyError} from 'assets/js/library/base/typography';
import {StyledInput} from 'assets/js/library/components/input';
import MultiAutoComplete from 'features/partials/MultiAutoComplete.jsx';
import {
    registerMethod,
    changePublishStatusMethod,
    changeParentMethod,
    handleChangePathMethod,
    clickEditorMethod,
    handleDefaultParentMethod,
    handleChangeMethod,
} from './StateFormComponent.js';
import EditorComponent from 'features/partials/EditorComponent.jsx';
import {getParentAndItsIdsMethod} from './StateFormComponent.js';
import StyledCheckboxComponent from 'features/partials/StyledCheckboxComponent';
import {styledGridParent} from 'assets/js/taxonomy/stateForm';
import {isObjectEmpty} from 'methods/commons';
import {StyledRegisterButton} from 'assets/js/taxonomy/stateForm';

const StyledGridParent = withStyles(styledGridParent)(Grid);

function StateFormComponent({t, openForm, closeForm, setOpenForm, states, setErrors, errors, category, setCategory, setStates, getStates, type}) {
    const [parentStates, setParentStates] = useState([]);
    const [selectedParents, setSelectedParents] = useState([]);
    const {setLoading} = useContext(AppContext);
    const lang = i18next.language;
    const [selectedIndexes, setSelectedIndexes] = useState([]);//for autoComplete

    const getIndexesOfArray = () => {
        for (let i = 0; i < parentStates.length; i++) {
            for (let selected of selectedParents) {
                if (parentStates[i].id === selected.id) {debugger
                    setSelectedIndexes(prevState => {
                        return [...prevState, i]
                    })
                }
            }
        }
    }

    const handleChange = (e, field) => {
        handleChangeMethod(e, field, setCategory, setErrors);
    };

    const handleChangePath = e => {
        handleChangePathMethod(e, setCategory, setErrors);
    };

    const clickEditor = text => {
        clickEditorMethod(text, setCategory);
    };

    const register = () => {
        registerMethod(setLoading, category, openForm, setStates, closeForm, errors, getStates);
    };

    const changeParent = e => {
        changeParentMethod(e, setCategory);
    };

    const changePublishStatus = (e) => {
        const isChecked=e.currentTarget.checked;
        changePublishStatusMethod(isChecked, setCategory);
    };

    const handleDefaultParent = () => {
        handleDefaultParentMethod(category, setSelectedParents, states);
    };

    useEffect(() => {
        getParentAndItsIdsMethod(openForm.id, states, setParentStates);
        // const handleErrors = () => {
        //   if (openForm.id === '') {
        //     handleErrorsMethod(category, setErrors);
        //   }
        // };
        // handleErrors();
    }, [openForm.id, states]); //once

    useEffect(handleDefaultParent, [category.tid]);

    useEffect(() => {
        getIndexesOfArray();
    }, [parentStates,getIndexesOfArray]);

    return (
        <>
            <StyledModalHeader>{t(`taxonomy:new${type.type}`)}</StyledModalHeader>
            <StyledModalBody>
                <Grid container>
                    <Grid item xs={12}>
                        <StyledLabel>{t('translation:name')}</StyledLabel>
                        <StyledInput
                            className="tour-name"
                            value={category.name[0].value !== null ? category.name[0].value : ''}
                            type="text"
                            placeholder={t('translation:name')}
                            onChange={e => handleChange(e, 'name')}
                        />
                        {errors.name && <StyledTypographyError align={lang === 'en' ? 'left' : 'right'}>
                            {errors.name.required}
                        </StyledTypographyError>}
                    </Grid>
                    <Grid item xs={12} className="tour-description">
                        <EditorComponent
                            value={category.description[0].value !== null ? category.description[0].value : ''}
                            title={t('translation:description')}
                            onClick={e => clickEditor(e, 'description')}
                        />
                    </Grid>
                    <StyledGridParent item xs={12} length={parentStates.length}>
                        <Box className="tour-parent" mb={4}>
                            <StyledLabel>{t('taxonomy:termParent')}</StyledLabel>
                            <MultiAutoComplete
                                array={parentStates}
                                changedTags={changeParent}
                                setSelectedTags={setSelectedParents}
                                selectedTags={selectedParents}
                                selectedIndexes={selectedIndexes}

                                // array={contentContext.tags}
                                // selectedIndexes={selectedIndexes}
                                // changedTags={e => changeTagsMethod(e, contentContext)}
                                // label={t('translation:tags')}
                                // setSelectedTags={contentContext.setSelectedTags}
                                // selectedTags={contentContext.selectedTags}
                            />
                        </Box>
                    </StyledGridParent>
                    <Grid item xs={12}>
                        <StyledLabel>{t('contents:path')}</StyledLabel>
                        <StyledInput
                            className="tour-path"
                            value={category.path[0].alias !== null ? category.path[0].alias : ''}
                            type="text"
                            placeholder={t('contents:path')}
                            onChange={handleChangePath}
                        />
                        {errors.path && <StyledTypographyError
                            align={lang === 'en' ? 'left' : 'right'}>{errors.path.regex}</StyledTypographyError>}
                    </Grid>
                    <Grid item xs={12} className="tour-status">
                        <Box mt={3}>
                            <StyledCheckboxComponent
                                checked={category.status[0].value}
                                change={changePublishStatus}
                                label={t('translation:published')}
                                value={category.status[0].value}
                            />
                        </Box>
                    </Grid>
                </Grid>
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
