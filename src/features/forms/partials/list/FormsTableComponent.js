import {getFormsList} from "core/services/webforms.service";

export const getFormsMethod = (setLoading,setForms,setBasicForms) => {
    getFormsList(setLoading).then(res=>{
        setForms(res.data)
        setBasicForms(res.data)
    })
}
