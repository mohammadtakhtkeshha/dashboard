import React, {useState} from "react"
import {withNamespaces} from "react-i18next";

import {Grid} from "@material-ui/core"

import {StyledModalBody, StyledModalFooter, StyledModalHeader} from "assets/js/library/components/modal";
import {StyledRegisterButton} from "assets/js/library/components/buttons";
import {isObjectEmpty} from "methods/commons";
import {StyledInput} from "assets/js/library/components/input";
import {StyledLabel, StyledTypographyError} from 'assets/js/library/base/typography';
import {handleChangeMethod} from "./NewElementComponent.js";


function NewElementComponent({t, element, setElement, closeForm, id}) {
    const [errors, setErrors] = useState({});


    const register = () => {

    }

    const handleChange = (e,field) => {
        handleChangeMethod(e,field,setElement,setErrors)
    }

    // {
    //     "form_id": "df1",
    //     "field_required": false,
    //     "field_title": "???? ????",
    //     "field_type": "textfield",
    //     "field_id": "textfield41",
    //     "admin_title": "???? ????"
    // }

    // console.log(errors)

    return (<>
        <StyledModalHeader>{t('users:newUser')}</StyledModalHeader>
        <StyledModalBody>
            <Grid container>
                <Grid item xs={12}>
                    <StyledLabel>{t('translation:title')}</StyledLabel>
                    <StyledInput
                        className="first-name"
                        value={element.field_title}
                        type="text"
                        placeholder={t('translation:title')}
                        onChange={e => handleChange(e, 'field_title')}
                    />
                </Grid>
                <Grid item xs={12}>
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
