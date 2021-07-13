import React, {useContext, useState, useEffect} from "react";
import {withNamespaces} from "react-i18next";

import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

import {StyledModalBody, StyledModalFooter, StyledModalHeader} from "assets/js/library/components/modal";
import {StyledRegisterButton} from "assets/js/library/components/buttons";
import {isObjectEmpty} from "methods/commons";
import {StyledInput} from "assets/js/library/components/input";
import {StyledLabel, StyledTypographyError} from 'assets/js/library/base/typography';
import {handleChangeMethod, addElementMethod, changeMultiSelectMethod,handleFirstLoadError} from "./NewElementComponent.js";
import {
    styledGrid,
    stylesGridOptions,
    StyledStatusButtonBox,
    styledGridFieldId,
    StyledStatusButton
} from "assets/js/library/pages/webform/newWebform";
import AppContext from "contexts/AppContext";
import MultiSelectComponent from "features/partials/MultiSelectComponent.jsx";

const StypedGrid = withStyles(styledGrid)(Grid);
const StylesGridOptions = withStyles(stylesGridOptions)(Grid);
const StyledGridFieldId = withStyles(styledGridFieldId)(Grid);

function NewElementComponent({t, element, setElement, closeForm, setElements, isEditForm}) {
    const {setLoading} = useContext(AppContext);
    const [fieldOptionArr, setFieldOptionArr] = useState([]);
    const [errors, setErrors] = useState({})

    const register = () => {
        addElementMethod(setLoading, element, closeForm, setElements, isEditForm)
    };

    const handleChange = (e, field) => {
        handleChangeMethod(e, field, setElement, setErrors)
    };

    const changeMultiSelect = (arr) => {
        changeMultiSelectMethod(arr, setElement, setErrors)
    };

    useEffect(() => {
        let arr = [];
        for (let key in element.field_options) {
            arr.push(element.field_options[key])
        }
        setFieldOptionArr([...arr])
    }, [setFieldOptionArr, element.field_options]);

    useEffect(() => {
        handleFirstLoadError(element,setErrors,fieldOptionArr)
    }, [element, fieldOptionArr,setErrors]);

    return (<>
        <StyledModalHeader>{t('webforms:addElement')}</StyledModalHeader>
        <StyledModalBody>
            <Grid container>
                {/*<Grid item md={6} sm={6} xs={12} className='element-title'>*/}
                {/*    <StyledLabel>{t('translation:title')}</StyledLabel>*/}
                {/*    <StyledInput*/}
                {/*        className="first-name"*/}
                {/*        value={element.field_title}*/}
                {/*        type="text"*/}
                {/*        placeholder={t('translation:title')}*/}
                {/*        onChange={e => handleChange(e, 'field_title')}*/}
                {/*    />*/}
                {/*    {errors.field_title ? (<div>*/}
                {/*        {errors.field_title.required ?*/}
                {/*            <StyledTypographyError>{errors.field_title.required}</StyledTypographyError> : ''}*/}
                {/*    </div>) : (*/}
                {/*        ''*/}
                {/*    )}*/}
                {/*</Grid>*/}
                {/*<StypedGrid item md={6} sm={6} xs={12} className='element-status'>*/}
                {/*    <StyledLabel>{t('translation:status')}</StyledLabel>*/}
                {/*    <StyledStatusButtonBox align='center'>*/}
                {/*        <StyledStatusButton*/}
                {/*            value="true"*/}
                {/*            status={element.field_required}*/}
                {/*            onClick={e => handleChange(e, 'field_required')}>*/}
                {/*            {t('translation:active')}*/}
                {/*        </StyledStatusButton>*/}
                {/*        <StyledStatusButton*/}
                {/*            value="false"*/}
                {/*            status={element.field_required}*/}
                {/*            onClick={e => handleChange(e, 'field_required')}>*/}
                {/*            {t('translation:notActive')}*/}
                {/*        </StyledStatusButton>*/}
                {/*    </StyledStatusButtonBox>*/}
                {/*</StypedGrid>*/}
                {/*<StyledGridFieldId display={`${!isEditForm}`} item xs={12} className='element-id'>*/}
                {/*    <StyledLabel>{t('webforms:fieldId')}</StyledLabel>*/}
                {/*    <StyledInput*/}
                {/*        className="first-name"*/}
                {/*        value={element.field_id}*/}
                {/*        type="text"*/}
                {/*        placeholder={t('webforms:fieldId')}*/}
                {/*        onChange={e => handleChange(e, 'field_id')}*/}
                {/*    />*/}
                {/*</StyledGridFieldId>*/}
                {/*<StylesGridOptions item xs={12} display={element.field_options} className='element-option'>*/}
                {/*    <StyledLabel>{t('translation:options')}</StyledLabel>*/}
                {/*    <MultiSelectComponent*/}
                {/*        array={fieldOptionArr}*/}
                {/*        setArray={setFieldOptionArr}*/}
                {/*        placeholder={t('translation:options')}*/}
                {/*        changeMultiSelect={changeMultiSelect}/>*/}
                {/*    {errors.field_options ? (<div style={{marginTop: '25px'}}>*/}
                {/*        {errors.field_options.required ?*/}
                {/*            <StyledTypographyError>{errors.field_options.required}</StyledTypographyError> : ''}*/}
                {/*    </div>) : (*/}
                {/*        ''*/}
                {/*    )}*/}
                {/*</StylesGridOptions>*/}
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
