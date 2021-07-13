import {addForm, editForm} from "core/services/webforms.service";
import {success} from "methods/swal";
import i18next from "i18next";

export const changeDescription = (e, setWebform) => {
    setWebform(prevState => {
        return {...prevState, description: e}
    })
};

const titleValidation = (setErrors, title) => {
    if (title === '') {
        setErrors(prevState => {
            return {...prevState, title: {required: i18next.t('translation:requiredValid')}}
        });
    } else {
        setErrors(prevState => {
            delete prevState.title
            return {...prevState}
        });
    }
}

const formIdValidation = (setErrors, form_id) => {
    if (form_id === '') {
        setErrors(prevState => {
            return {...prevState, form_id: {required: i18next.t('translation:requiredValid')}}
        });
    } else {
        const regex = /^([^0-9~!@#$%^&*()+=}{'"`\/|,. ]*)([a-z])$/g;
        setErrors(prevState => {
            prevState.form_id && (prevState.form_id.required && delete prevState.form_id.required)
            if (form_id.match(regex)) {
                prevState.form_id && delete prevState.form_id
                return {...prevState}
            } else {
                return {...prevState, form_id: {regex: i18next.t('webforms:formIdJustW')}}
            }
        });
    }

}

export const handleChange = (e, field, setWebform, setErrors) => {
    let target = e.currentTarget.value
    if (field === 'title') {
        titleValidation(setErrors, target)
    }
    if (field === 'form_id') {
        formIdValidation(setErrors, target)
    }
    let currentValue = "";
    switch (target) {
        case "true":
            currentValue = "open";
            break;
        case "false":
            currentValue = "closed";
            break;
        default:
            currentValue = target
    }
    setWebform(prevState => {
        return {...prevState, [field]: currentValue}
    })
};

export const register = (webForm, setLoading, history, isEditForm, setErrors, closeForm, setForms) => {
    setLoading(true);
    let requestEditOrRegister = isEditForm ? editForm(setLoading, webForm) : addForm(setLoading, webForm)
    requestEditOrRegister.then(response => {
        setLoading(false)
        success(i18next.t('translation:successRegistered'), i18next.t('translation:ok'));
        if (isEditForm) {
            closeForm()
            setForms(prevState => {
                for(let prev of prevState){
                    if (webForm.form_id === prev.id) {
                        prev.title = webForm.title;
                        prev.description = webForm.description;
                        prev.status = webForm.status;
                    }
                }
                return [...prevState]
            })
        } else {
            history.push(`/elements/${webForm.form_id}/list`);
        }
    }).catch(error => {
        if (error.status === 422) {
            setErrors(prevState => {
                return {
                    ...prevState,
                    form_id: {unique: i18next.t('translation:uniqueValidation')}
                }
            });
        }
    })
};

