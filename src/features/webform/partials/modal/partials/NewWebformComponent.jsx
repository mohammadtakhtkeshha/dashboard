import React, {useEffect, useState,useContext} from 'react';
import {withNamespaces} from 'react-i18next';
import i18next from 'i18next';

import {StyledInput} from 'assets/js/App';
import {StyledModalFooter, StyledModalHeader, StyledModalBody} from 'assets/js/library/components/modal';
import {StyledLabel, StyledTypographyError} from 'assets/js/library/base/typography';
import {StyledRegisterButton} from 'assets/js/library/components/buttons';
import {changeDescription,handleChange,register} from './NewWebformComponent.js'
import {isObjectEmpty} from 'methods/commons';
import {Grid} from "@material-ui/core";
import {StyledTextArea} from "assets/js/comment/commentForm";
import EditorComponent from "infrastructure/authorized/partials/EditorComponent.jsx";
import AppContext from "contexts/AppContext";

function NewWebformComponent({t,errors,closeForm,setErrors,setElement,webform, setWebform}) {
    const lang = i18next.language;
    const {setLoading}=useContext(AppContext);


    useEffect(() => {

    }, []); //Once

    return (<>
        <StyledModalHeader>{t('webforms:newForm')}</StyledModalHeader>
        <StyledModalBody>
            <Grid container>
                <Grid item xs={12} md={12} >
                        <StyledLabel>{t('translation:title')}</StyledLabel>
                        <StyledInput
                            className="first-name"
                            value={webform.title}
                            type="text"
                            placeholder={t('translation:title')}
                            onChange={e => handleChange(e, 'title',setWebform)}/>
                </Grid>
                <Grid item xs={12} md={12}>
                        <StyledLabel>{t('webforms:machineName')}</StyledLabel>
                        <StyledInput
                            className="last-name"
                            value={webform.machin_name}
                            type="text"
                            placeholder={t('webforms:machineName')}
                            onChange={e => handleChange(e, 'machin_name',setWebform)}
                        />
                </Grid>
                <Grid item item xs={12}>
                    <StyledTextArea className="textarea">
                        <EditorComponent
                            value={webform.description}
                            title={t('translation:description')}
                            onClick={(e)=>changeDescription(e,setWebform)}
                        />
                    </StyledTextArea>
                </Grid>
                {errors.name ? (
                    <div>
                        {errors.name.required ?
                            <StyledTypographyError>{errors.name.required}</StyledTypographyError> : ''}
                        {errors.name.unique ?
                            <StyledTypographyError>{errors.name.unique}</StyledTypographyError> : ''}
                    </div>
                ) : (
                    ''
                )}
            </Grid>
        </StyledModalBody>
        <StyledModalFooter>
            <StyledRegisterButton status={isObjectEmpty(errors)} onClick={()=>register(webform,setLoading,setElement)}>
                {t('translation:register')}
            </StyledRegisterButton>
        </StyledModalFooter>
    </>);
}

export default withNamespaces('webforms, translation')(NewWebformComponent);
