import React, {useContext, useEffect} from 'react';
import {withNamespaces} from 'react-i18next';
import {useHistory} from "react-router-dom";

import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

import {StyledInput} from 'assets/js/library/components/input';
import {StyledModalFooter, StyledModalHeader, StyledModalBody} from 'assets/js/library/components/modal';
import {StyledLabel, StyledTypographyError} from 'assets/js/library/base/typography';
import {StyledRegisterButton} from 'assets/js/library/components/buttons';
import {handleChange, register} from './NewWebformComponent.js'
import {isObjectEmpty, stripHtml} from 'methods/commons';
import {StyledTextArea} from "assets/js/comment/commentForm";
import AppContext from "contexts/AppContext";
import {
    styledGrid,
    StyledStatusButtonBox,
    StyledStatusButton,
    styledGridFormId
} from "assets/js/library/pages/webform/newWebform";

const StypedGrid = withStyles(styledGrid)(Grid)
const StyledGridFormId = withStyles(styledGridFormId)(Grid)

function NewWebformComponent({t, errors, closeForm, setErrors, webform, setWebform, isEditForm, setForms}) {
    const {setLoading} = useContext(AppContext);
    const history = useHistory();

    useEffect(() => {
        if (webform.title === '') {
            setErrors(prevState => {
                return {
                    ...prevState,
                    title: {
                        required: t('translation:requiredValid')
                    },
                    form_id: {
                        required: t('translation:requiredValid')
                    }
                }
            })
        }
        if (webform.form_id === '') {
            setErrors(prevState => {
                return {
                    ...prevState,
                    form_id: {
                        required: t('translation:requiredValid')
                    }
                }
            })
        }
    }, [t,setErrors,webform.title,webform.form_id]);//once

    return (<>
        <StyledModalHeader>{t('webforms:newForm')}</StyledModalHeader>
        <StyledModalBody height='fit-content'>
            <Grid container>
                <Grid item xs={6} md={6} className='form-title'>
                    <StyledLabel>{t('translation:title')}</StyledLabel>
                    <StyledInput
                        value={webform.title}
                        type="text"
                        placeholder={t('translation:title')}
                        onChange={e => handleChange(e, 'title', setWebform, setErrors)}/>
                    {errors.title ? (<div>
                        {errors.title.required ?
                            <StyledTypographyError>{errors.title.required}</StyledTypographyError> : ''}
                    </div>) : ('')}
                </Grid>
                <StypedGrid item xs={6} md={6} className='form-status'>
                    <StyledLabel>{t('translation:status')}</StyledLabel>
                    <StyledStatusButtonBox align='center'>
                        <StyledStatusButton
                            value="true"
                            status={webform.status === "open" ? true : false}
                            onClick={e => handleChange(e, 'status', setWebform)}>
                            {t('translation:active')}
                        </StyledStatusButton>
                        <StyledStatusButton
                            value="false"
                            status={webform.status === "open" ? true : false}
                            onClick={e => handleChange(e, 'status', setWebform)}>
                            {t('translation:notActive')}
                        </StyledStatusButton>
                    </StyledStatusButtonBox>
                </StypedGrid>
                <StyledGridFormId item xs={12} md={12} className='form-machine-name' display={`${!isEditForm}`}>
                    <StyledLabel>{t('webforms:machineName')}</StyledLabel>
                    <StyledInput
                        value={webform.form_id}
                        type="text"
                        placeholder={t('webforms:machineName')}
                        onChange={e => handleChange(e, 'form_id', setWebform, setErrors)}
                    />
                    {errors.form_id ? (<div>
                        {errors.form_id.required ?
                            <StyledTypographyError>{errors.form_id.required}</StyledTypographyError> : ''}
                        {errors.form_id.regex ?
                            <StyledTypographyError>{errors.form_id.regex}</StyledTypographyError> : ''}
                    </div>) : (
                        ''
                    )}
                </StyledGridFormId>
                <Grid item xs={12} className='form-description'>
                    <StyledLabel>{t('translation:description')}</StyledLabel>
                    <StyledTextArea
                        cols="30"
                        rows="10"
                        placeholder={t('translation:description')}
                        onChange={(e) => handleChange(e, 'description', setWebform)}
                        value={stripHtml(webform.description)}
                    />
                </Grid>
                {errors.name ? (<div>
                    {errors.name.required ?
                        <StyledTypographyError>{errors.name.required}</StyledTypographyError> : ''}
                    {errors.name.unique ?
                        <StyledTypographyError>{errors.name.unique}</StyledTypographyError> : ''}
                </div>) : (
                    ''
                )}
            </Grid>
        </StyledModalBody>
        <StyledModalFooter>
            <StyledRegisterButton
                status={isObjectEmpty(errors)}
                onClick={() => register(webform, setLoading, history, isEditForm, setErrors, closeForm, setForms)}>
                {t('translation:register')}
            </StyledRegisterButton>
        </StyledModalFooter>
    </>);
}

export default withNamespaces('webforms, translation')(NewWebformComponent);
