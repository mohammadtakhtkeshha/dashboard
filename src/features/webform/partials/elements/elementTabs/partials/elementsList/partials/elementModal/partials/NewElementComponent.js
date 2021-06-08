import i18next from "i18next";
import {stringToBoolean} from "methods/commons";
import {addElement} from "core/services/webforms.service";
import {success} from 'methods/swal';

// const requiredValidation = (field, currentValue, setErrors) => {
//     if (currentValue === '') {
//         setErrors(prevState => {
//             prevState[field].required = i18next.t('translation:requiredValid')
//             return {...prevState}
//         })
//     }
//
// }

export const handleChangeMethod = (e, field, setElement, setErrors) => {
    let currentValue = e.currentTarget.value
    if (field === 'field_required') {
        currentValue = stringToBoolean(currentValue)
    }
    setElement(prevState => {
        if (field === 'field_title') {
            return {...prevState, admin_title: currentValue, [field]: currentValue}
        }
            // if (field === 'field_id') {
            //     requiredValidation(field, currentValue, setErrors)
        // }
        else {
            return {...prevState, [field]: currentValue}
        }
    })
}

export const addElementMethod = (setLoading, element,closeForm,setElements) => {
    setLoading(true)
    addElement(setLoading, element).then(response => {
        setLoading(false)
        success(i18next.t('translation:successRegistered'), i18next.t('translation:ok'));
        closeForm()
        const addedElement = {
            field_id: element.field_id,
            required: element.field_required,
            title: element.field_title,
            type: element.field_type,
            webform_id: element.form_id
        }
        setElements(prevState => {
            return [addedElement,...prevState]
        })
    })
}
