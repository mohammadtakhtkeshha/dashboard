import i18next from "i18next";
import {addSettingsName} from "core/services/settings.service";
import {success} from "methods/swal";

export const addSettingsMethod = (hasError,setLoading, settings) => {
    if(!hasError){
        setLoading(true);
        addSettingsName(settings, setLoading).then(res => {
            setLoading(false);
            success(i18next.t('translation:successEdited'), i18next.t('translation:ok'));
        });
    }
};

function checkMail(mail) {
    // let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    let regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    let valid = true;
    if (!regex.test(mail)) {
        valid = false;
    }
    return valid;
}

export const handleChangeMethod = ( e, field, setSettings, setErrors) => {
    const currentValue = e.currentTarget.value;
    if (field === 'site_mail') {
        if (!checkMail(currentValue)) {
            setErrors({site_mail: {valid: i18next.t('translation:mailValidation')}});
        } else {
            setErrors({});
        }
    }
    setSettings(prevState => {
        return {...prevState, [field]: currentValue};
    });
};
