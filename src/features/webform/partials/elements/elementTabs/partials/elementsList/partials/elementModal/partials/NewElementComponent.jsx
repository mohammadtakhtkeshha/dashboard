import React, {useContext, useState} from "react";
import {withNamespaces} from "react-i18next";

import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

import {StyledModalBody, StyledModalFooter, StyledModalHeader} from "assets/js/library/components/modal";
import {StyledRegisterButton} from "assets/js/library/components/buttons";
import {isObjectEmpty} from "methods/commons";
import {StyledInput} from "assets/js/library/components/input";
import {StyledLabel, StyledTypographyError} from 'assets/js/library/base/typography';
import {handleChangeMethod, addElementMethod} from "./NewElementComponent.js";
import {
    styledGrid,
    stylesGridOptions,
    StyledStatusButtonBox,
    StyledStatusButton
} from "assets/js/library/pages/webform/newWebform";
import AppContext from "contexts/AppContext";
import MultiSelectComponent from "infrastructure/authorized/partials/MultiSelectComponent.jsx";

const StypedGrid = withStyles(styledGrid)(Grid);
const StylesGridOptions = withStyles(stylesGridOptions)(Grid);

function NewElementComponent({t, element, setElement, closeForm, id, setElements}) {
    const {setLoading} = useContext(AppContext);
    const [errors, setErrors] = useState({});

    const register = () => {
        addElementMethod(setLoading, element, closeForm, setElements)
    }

    const handleChange = (e, field) => {
        handleChangeMethod(e, field, setElement, setErrors)
    }

    return (<>
        <StyledModalHeader>{t('webforms:addElement')}</StyledModalHeader>
        <StyledModalBody>
            <Grid container>
                <Grid item md={6} sm={6} xs={12} className='element-title'>
                    <StyledLabel>{t('translation:title')}</StyledLabel>
                    <StyledInput
                        className="first-name"
                        value={element.field_title}
                        type="text"
                        placeholder={t('translation:title')}
                        onChange={e => handleChange(e, 'field_title')}
                    />
                </Grid>
                <StypedGrid item md={6} sm={6} xs={12} className='element-status'>
                    <StyledLabel>{t('translation:status')}</StyledLabel>
                    <StyledStatusButtonBox align='center'>
                        <StyledStatusButton
                            value="true"
                            status={element.field_required}
                            onClick={e => handleChange(e, 'field_required')}>
                            {t('translation:active')}
                        </StyledStatusButton>
                        <StyledStatusButton
                            value="false"
                            status={element.field_required}
                            onClick={e => handleChange(e, 'field_required')}>
                            {t('translation:notActive')}
                        </StyledStatusButton>
                    </StyledStatusButtonBox>
                </StypedGrid>
                <Grid item xs={12} className='element-id'>
                    <StyledLabel>{t('webforms:fieldId')}</StyledLabel>
                    <StyledInput
                        className="first-name"
                        value={element.field_id}
                        type="text"
                        placeholder={t('webforms:fieldId')}
                        onChange={e => handleChange(e, 'field_id')}
                    />
                    {errors.field_id ? (<div>
                        {errors.field_id.required ?
                            <StyledTypographyError>{errors.field_id.required}</StyledTypographyError> : ''}
                        {errors.name.unique ?
                            <StyledTypographyError>{errors.field_id.unique}</StyledTypographyError> : ''}
                    </div>) : (
                        ''
                    )}
                </Grid>
                <StylesGridOptions item xs={12} display={element.field_options} className='element-option'>
                    <StyledLabel>{t('translation:options')}</StyledLabel>
                    <MultiSelectComponent
                        field="field_options"
                        stringField={element.field_options}
                        placeholder={t('translation:options')}
                        setStringField={setElement}/>
                </StylesGridOptions>
            </Grid>
        </StyledModalBody>
        <StyledModalFooter>
            <StyledRegisterButton status={isObjectEmpty(errors)} onClick={register}>
                {t('translation:register')}
            </StyledRegisterButton>
        </StyledModalFooter>
    </>)
}

export default withNamespaces('translation')(NewElementComponent)
