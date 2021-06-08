import {addForm} from "core/services/webforms.service";
import {success} from "../../../../../methods/swal";
import i18next from "i18next";

export const changeDescription = (e, setWebform) => {debugger
    setWebform(prevState => {
        return {...prevState, description: e}
    })
};

export const handleChange = (e, field, setWebform) => {
    let target = e.currentTarget.value
    let currentValue = "" ;
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

export const register = (webForm, setLoading, history) => {
    setLoading(true)
    addForm(setLoading, webForm).then(response => {
        setLoading(false)
        const {machin_name} = response.data
        success(i18next.t('translation:successRegistered'), i18next.t('translation:ok'));
        history.push(`/elements/${machin_name}`);

    })
};

