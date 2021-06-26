import React, {useState, useEffect, useContext, useCallback} from 'react';
import {withNamespaces} from 'react-i18next';

import {Grid} from '@material-ui/core/index';
import {withStyles} from '@material-ui/core/styles';

import AppContext from 'contexts/AppContext';
import {StyledInput, StyledTypographyError, StyledModalFooter, StyledModalHeader, StyledModalBody} from 'assets/js/App';
import MultiSelect from 'features/partials/AutocompleteComponent.jsx';
import {StyledLabel} from 'assets/js/App';
import {StyledRegisterButton} from 'assets/js/library/components/buttons';

import {
    registerMethod,
    changeStatusMethod,
    changeParentMethod,
    handleDefaultParentMethod,
    changeLinkOfMenuMethod,
    handleChangeMethod,
    handleErrorsMethod,
    getParentAndItsIdsMethod,
} from './MenuFormComponent.js';
import StyledCheckboxComponent from 'features/partials/StyledCheckboxComponent';
import {styledGridParent, styledGridActive} from 'assets/js/taxonomy/stateForm';
import {isObjectEmpty} from 'methods/commons';

const StyledGridParent = withStyles(styledGridParent)(Grid);
const StyledGridActive = withStyles(styledGridActive)(Grid);

function MenuFormComponent({t, openForm, closeForm, menus, setErrors, menu, setMenu, getMenus, errors, link, setLink}) {
    const [parentMenu, setparentMenu] = useState([]);
    const [selectedParents, setSelectedParents] = useState([]);
    const {setLoading} = useContext(AppContext);

    const handleChange = useCallback(
        (e, field) => {
            handleChangeMethod(e, field, setMenu, setErrors);
        },
        [setErrors, setMenu]
    );

    const register = () => {
        registerMethod(setLoading, menu, openForm, getMenus, closeForm);
    };

    const changeParent = e => {
        changeParentMethod(e, setMenu);
    };

    const changeStatus = (e, field) => {
        changeStatusMethod(e, setMenu, field);
    };

    const changeLinkOfMenu = e => {
        changeLinkOfMenuMethod(e, openForm, setLink);
    };

    useEffect(() => {
        getParentAndItsIdsMethod(openForm.id, menu, menus, setparentMenu);
    }, [menu, menus, openForm.id]); //Once

    useEffect(() => {
        handleErrorsMethod(setErrors, openForm);
    }, [setErrors, openForm]); //Once

    useEffect(() => {
        handleDefaultParentMethod(menu, setSelectedParents, menus);
    }, [menu.id, setSelectedParents, menus, menu]);//menu.id

    useEffect(() => {
        handleChange(link, 'link');
    }, [link, handleChange]);

    return (
        <>
            <StyledModalHeader>{t('menu:newMenu')}</StyledModalHeader>
            <StyledModalBody>
                <Grid container>
                    <Grid item xs={12} className="tour-title">
                        <StyledLabel>{t('menu:menuTitle')}</StyledLabel>
                        <StyledInput
                            value={menu.title[0].value !== null ? menu.title[0].value : ''}
                            type="text"
                            placeholder={t('menu:menuTitle')}
                            onChange={e => handleChange(e, 'title')}
                        />
                        {errors.title ? <div>{errors.title.required ?
                            <StyledTypographyError>{errors.title.required}</StyledTypographyError> : ''}</div> : ''}
                    </Grid>
                    <Grid item xs={12}>
                        <StyledLabel>{t('menu:link')}</StyledLabel>
                        <StyledInput
                            type="text"
                            value={link}
                            className="tour-link"
                            placeholder={t('menu:link')}
                            // onChange={e => handleChange(e, "link")}/>
                            onChange={changeLinkOfMenu}
                        />
                        {errors.link ? (
                            <div>
                                {errors.link.required ?
                                    <StyledTypographyError>{errors.link.required}</StyledTypographyError> : ''}
                                {errors.link.valid ?
                                    <StyledTypographyError>{errors.link.valid}</StyledTypographyError> : ''}
                            </div>
                        ) : (
                            ''
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <StyledLabel>{t('translation:description')}</StyledLabel>
                        <StyledInput
                            value={menu.description[0] !== undefined ? menu.description[0].value : ''}
                            type="text"
                            className="tour-description"
                            placeholder={t('translation:description')}
                            onChange={e => handleChange(e, 'description')}
                        />
                    </Grid>
                    <Grid item xs={6} className="tour-external">
                        <StyledCheckboxComponent
                            checked={menu.external[0].value}
                            change={(e, isChecked) => changeStatus(e, 'external')}
                            label={t('menu:showOpen')}
                            value={menu.external[0].value}
                        />
                    </Grid>
                    <StyledGridActive item xs={6}>
                        <div className="tour-test">
                            <StyledCheckboxComponent
                                checked={menu.enabled[0].value}
                                // change={changeStatus}
                                change={(e, isChecked) => changeStatus(e, 'enabled')}
                                label={t('translation:active')}
                                value={menu.enabled[0].value}
                            />
                        </div>
                    </StyledGridActive>
                    <StyledGridParent item xs={12} length={parentMenu.length} className="tour-parent">
                        <StyledLabel>{t('taxonomy:termParent')}</StyledLabel>
                        <MultiSelect
                            array={parentMenu}
                            changedTags={changeParent}
                            label={t('taxonomy:menus')}
                            setSelectedTags={setSelectedParents}
                            selectedTags={selectedParents}
                        />
                    </StyledGridParent>
                    {/*<StyledGridActive item xs={12} className="tour-enabled">*/}
                    {/*    <StyledCheckboxComponent checked={menu.enabled[0].value}*/}
                    {/*                             // change={changeStatus}*/}
                    {/*                             change={(e,isChecked)=>changeStatus(e,isChecked,'enabled')}*/}
                    {/*                             label={t('translation:active')}*/}
                    {/*                             value={menu.enabled[0].value}/>*/}
                    {/*</StyledGridActive>*/}
                </Grid>
            </StyledModalBody>
            <StyledModalFooter>
                <StyledRegisterButton onClick={register} status={isObjectEmpty(errors)}>
                    {t('translation:register')}
                </StyledRegisterButton>
            </StyledModalFooter>
        </>
    );
}

export default withNamespaces('contents,taxonomy,translation')(MenuFormComponent);
