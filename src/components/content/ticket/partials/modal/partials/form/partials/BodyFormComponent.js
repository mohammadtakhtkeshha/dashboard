import {stripHtml} from "../../../../../../../../methods/commons";

export const changeOrderMethod = (e, setTicket) => {
    const id = e.currentTarget.value
    setTicket(prevState => {
        return {...prevState, serviceid: id}
    })
}

const toBase64 = (e, setTicket) => {
    var file = e[0],
        reader = new FileReader();

    reader.onloadend = function () {
        // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
        let base64 = reader.result.replace(/^data:.+;base64,/, '');
        setTicket(prevState => {
            return {...prevState, attachments: base64}
        })
        console.log(base64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
    };
    reader.readAsDataURL(file);
}

export const uploadImgMethod = (e, setTicket) => {
    // toBase64(e, setTicket)
    setTicket(prevState => {
        return {...prevState,file1:e[0]}
    })
}

export const changeDepartmentMethod = (e, setDeparteman, setTicket) => {
    const value = e.currentTarget.value
    setDeparteman(value)
    setTicket(prevState => {
        return {...prevState, deptid: value}
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
