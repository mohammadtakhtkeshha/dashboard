import {deleteElement} from "core/services/webforms.service";
import {success} from "methods/swal";
import i18next from "i18next";

export const deleteElementMethod = (setLoading,form_id,field_id,setElements) => {
    setLoading(true)
    const body={
        form_id:form_id,
        field_id:field_id,
    }
    deleteElement(setLoading,body).then(res=>{
        setLoading(false)
        setElements(prevState => {
            const newElements = prevState.filter(el => el.field_id !== field_id)
            return [...newElements]
        })
        success(i18next.t('translation:deletedSuccessfully'), i18next.t('translation:ok'));
    })
}
