import {deleteForm} from "core/services/webforms.service";
import {success} from "methods/swal";
import i18next from "i18next";

export const deleteFormMethod = (setLoading, body, setForms) => {
    setLoading(true)
    deleteForm(setLoading, body).then(res => {
        setLoading(false)
        const {form_id} = body;
        setForms(prevState => {
            const newForms=prevState.filter(form => form.id !== form_id);
            return [...newForms];
        })
        success(i18next.t('translation:deletedSuccessfully'), i18next.t('translation:ok'));
    })
}
