import {addForm} from "core/services/webforms.service";
import {success} from "../../../../../methods/swal";
import i18next from "i18next";

export const changeDescription = (e, setWebform) => {
    setWebform(prevState => {
        return {...prevState, description: e}
    })
};

export const handleChange = (e, field, setWebform) => {
    const currentValue = e.currentTarget.value
    setWebform(prevState => {
        return {...prevState, [field]: currentValue}
    })
};

export const register = (webForm, setLoading, setElement, history) => {
    setLoading(true)
    addForm(setLoading, webForm).then(response => {
        setLoading(false)
        const {machin_name} = response.data
        setElement(prevState => {
            return {
                ...prevState, form_id: machin_name
            }
        })
        success(i18next.t('translation:successRegistered'), i18next.t('translation:ok'));
        history.push('/elements');

    })
};

