import {stripHtml} from "methods/commons";

export const changeOrderMethod = (e, setTicket) => {
    const id = e.currentTarget.value
    setTicket(prevState => {
        return {...prevState, serviceid: parseInt(id)}
    })
}

export const uploadImgMethod = (e, setTicket) => {
    setTicket(prevState => {
        return {...prevState, files:e}
    })
}

export const changeDepartmentMethod = (e, setTicket,setChosenDepartment) => {
    const value = e.currentTarget.value
    setChosenDepartment(value)
    setTicket(prevState => {
        return {...prevState, deptid: parseInt(value)}
    })
}

export const changePriorityMethod = (e, setTicket) => {
    const value = e.currentTarget.value
    setTicket(prevState => {
        return {
            ...prevState, priority: value
        }
    })
}

export const clickEditorMessageMethod = (e, t, setErrors, setTicket) => {
    const value = stripHtml(e)
    setTicket(prevState => {
        return {...prevState, message: e}
    })
    if (value.length > 0) {
        setErrors(prevState => {
            prevState.message && delete prevState.message
            return {
                ...prevState
            }
        })
    } else {
        setErrors(prevState => {
            return {...prevState, message: {required: t('translation:requiredValid')}}
        })
    }
}

export const handleChangeMethod = (e, t, field, setTicket, setErrors) => {
    let currentName = e.currentTarget.value
    setTicket(prevState => {
        return {...prevState, [field]: currentName}
    })
    if (field === "subject") {
        if (currentName.length > 0) {
            setErrors(prevState => {
                prevState.subject && delete prevState.subject
                return {
                    ...prevState
                }
            })
        } else {
            setErrors(prevState => {
                return {...prevState, subject: {required: t('translation:requiredValid')}}
            })
        }
    }
}
