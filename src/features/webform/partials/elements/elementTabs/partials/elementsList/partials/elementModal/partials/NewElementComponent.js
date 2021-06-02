import i18next from "i18next";

const requiredValidation = (field, currentValue, setErrors) => {
    if (currentValue === '') {
        setErrors(prevState => {
            prevState[field].required = i18next.t('translation:requiredValid')
            return {...prevState}
        })
    }

}

export const handleChangeMethod = (e, field, setElement, setErrors) => {
    const currentValue = e.currentTarget.value
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
