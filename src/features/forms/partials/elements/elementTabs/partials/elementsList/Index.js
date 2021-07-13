import {makeRequired} from "core/services/webforms.service";
import {success} from "methods/swal";
import i18next from "i18next";

export const requiredMethod = (setLoading,body) => {
    setLoading(true);
    makeRequired(setLoading,body).then(res=>{
        setLoading(false);
        success(i18next.t('translation:successRegistered'), i18next.t('translation:ok'));
    })
}
