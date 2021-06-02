import React, {useEffect, useState, useContext} from 'react';
import {withNamespaces} from 'react-i18next';
import i18next from 'i18next';
import {useHistory} from "react-router-dom";

import {StyledInput} from 'assets/js/App';
import {StyledModalFooter, StyledModalHeader, StyledModalBody} from 'assets/js/library/components/modal';
import {StyledLabel, StyledTypographyError} from 'assets/js/library/base/typography';
import {StyledRegisterButton, StyledStatusButtons} from 'assets/js/library/components/buttons';
import {changeDescription, handleChange, register} from './NewWebformComponent.js'
import {isObjectEmpty} from 'methods/commons';
import {Grid} from "@material-ui/core";
import {StyledTextArea} from "assets/js/comment/commentForm";
import EditorComponent from "infrastructure/authorized/partials/EditorComponent.jsx";
import AppContext from "contexts/AppContext";
import {handleShowInMainPageMethod} from "../../../../content/partials/modal/insideModal/modalForm/contentTabs/partials/FormContentPublishDateComponent";
import {styledGrid, StyledStatusButtonBox, StyledStatusButton} from "assets/js/library/pages/webform/newWebform";
import {stringToBoolean} from "methods/commons";
import {withStyles} from "@material-ui/styles";

const StypedGrid = withStyles(styledGrid)(Grid)

function NewWebformComponent({t, errors, closeForm, setErrors, setElement, webform, setWebform}) {
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);
    const history = useHistory()
    console.log(webform)
    return (<>
        <StyledModalHeader>{t('webforms:newForm')}</StyledModalHeader>
        <StyledModalBody>
            <Grid container>
                <Grid item xs={6} md={6}>
                    <StyledLabel>{t('translation:title')}</StyledLabel>
                    <StyledInput
                        className="first-name"
                        value={webform.title}
                        type="text"
                        placeholder={t('translation:title')}
                        onChange={e => handleChange(e, 'title', setWebform)}/>
                </Grid>
                <StypedGrid item xs={6} md={6}>
                    <StyledLabel>{t('translation:status')}</StyledLabel>
                    <StyledStatusButtonBox align='center'>
                        <StyledStatusButton value="true"
                                            status={webform.status === "open" ? true : false}
                                            onClick={e => handleChange(e, 'status', setWebform)}
                        >
                            {t('translation:active')}
                        </StyledStatusButton>
                        <StyledStatusButton value="false"
                                            status={webform.status === "open" ? true : false}
                                            onClick={e => handleChange(e, 'status', setWebform)}>
                            {t('translation:notActive')}
                        </StyledStatusButton>
                    </StyledStatusButtonBox>
                </StypedGrid>
                <Grid item xs={12} md={12}>
                    <StyledLabel>{t('webforms:machineName')}</StyledLabel>
                    <StyledInput
                        className="last-name"
                        value={webform.machin_name}
                        type="text"
                        placeholder={t('webforms:machineName')}
                        onChange={e => handleChange(e, 'machin_name', setWebform)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledLabel>{t('translation:description')}</StyledLabel>
                    <StyledTextArea className="textarea" cols="30" rows="10" placeholder={t('translation:description')}
                                    onChange={(e) => handleChange(e,'description',setWebform)}
                                    value={webform.description}
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
            <StyledRegisterButton status={isObjectEmpty(errors)}
                                  onClick={() => register(webform, setLoading, setElement, history)}>
                {t('translation:register')}
            </StyledRegisterButton>
        </StyledModalFooter>
    </>);
}

export default withNamespaces('webforms, translation')(NewWebformComponent);
