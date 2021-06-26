import {addSettingsTags} from "core/services/settings.service"
import {success} from "methods/swal";
import i18next from "i18next";

export const addSettingsMethod = (setLoading, settingsTags) => {
    setLoading(true);
    addSettingsTags(settingsTags,setLoading).then(response => {
        setLoading(false);
        success(i18next.t('translation:successEdited'), i18next.t('translation:ok'));
    })
}

export const handleChangeMethod = (e, field, setSettingsTags) => {
    const value = e.currentTarget.value;
    setSettingsTags(prevState =>{
        return {...prevState,[field]:value}
    })
}

export const changeMultiSelectMethod = (arr, setSettingsTags) => {
    setSettingsTags(prevState => {
        return {...prevState, site_front_keys: arr.toString()}
    })
}
