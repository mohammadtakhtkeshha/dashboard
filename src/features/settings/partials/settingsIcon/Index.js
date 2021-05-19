import {saveUserImage} from "core/services/user.service";
import {addSettingsIcons} from "core/services/settings.service";
import {success} from "methods/swal";
import i18next from "i18next";

export const uploadIcon = (e, setSettings, setLoading,field) => {
    setLoading(true);
    saveUserImage(e, setLoading).then(response => {
        setLoading(false);
        const item = response.data;
        let url = item.uri[0].url;
        setSettings(prevState => {
            return { ...prevState, [field]: url };
        });
    });
};

export const addSettingsMethod = (setLoading, settings) => {
    setLoading(true);
    addSettingsIcons(settings, setLoading).then(res => {
        setLoading(false);
        success(i18next.t('translation:successEdited'), i18next.t('translation:ok'));
    });
};
