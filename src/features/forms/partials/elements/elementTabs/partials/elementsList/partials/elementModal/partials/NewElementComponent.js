import i18next from "i18next";
import {stringToBoolean} from "methods/commons";
import {addElement, editElement} from "core/services/webforms.service";
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
const titleValidation = (setErrors, title) => {
    if (title === '') {
        setErrors(prevState => {
            return {...prevState, field_title: {required: i18next.t('translation:requiredValid')}}
        });
    } else {
        setErrors(prevState => {
            delete prevState.field_title
            return {...prevState}
        });
    }
}

const optionsValidation = ( arr,setErrors) => {
    if (arr.length >0) {
        setErrors(prevState => {
            delete prevState.field_options
            return {...prevState}
        });
    } else {
        setErrors(prevState => {
            return {...prevState, field_options: {required: i18next.t('translation:requiredValid')}}
        });
    }
}

export const handleChangeMethod = (e, field, setElement, setErrors) => {
    let currentValue = e.currentTarget.value;
    if (field === 'field_required') {
        currentValue = stringToBoolean(currentValue)
    }
    if(field === 'field_title'){
        titleValidation(setErrors, currentValue)
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

export const addElementMethod = (setLoading, element, closeForm, setElements, isEditForm) => {
    setLoading(true)
    let requestIsEditOrAdd = isEditForm ? editElement(setLoading, element) : addElement(setLoading, element)
    requestIsEditOrAdd.then(response => {
        setLoading(false)
        success(i18next.t('translation:successRegistered'), i18next.t('translation:ok'));
        closeForm()
        setElements(prevState => {
            if (isEditForm) {
                const curElement = prevState.filter(el => el.field_id === element.field_id)
                const index = prevState.indexOf(curElement[0])
                prevState[index] = element
                return [...prevState]
            } else {
                return [element, ...prevState]
            }
        })
    })
}
/*Description:output
*@return :{
* {
*   key1:"لیست 1"
*   key2:"لیست 1"
*   key3:"لیست 1" , ...
* }
* */

export const changeMultiSelectMethod = (arr, setElement,setErrors) => {
    let elementObj={}
    optionsValidation(arr,setErrors)
    if (arr.length > 0) {
        for(let i in arr){
            elementObj[`key${i}`]=arr[i]
        }
        setElement(prevState => {
            prevState.field_options = {...elementObj}
            return {...prevState};
        })

    } else {
        setElement(prevState => {
            prevState.field_options = {}
            return {...prevState};
        })
    }
}
