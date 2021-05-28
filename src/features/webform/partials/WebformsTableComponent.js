import {getFormsList} from "core/services/webforms.service";

export const getFormsMethod = (setLoading,setForms) => {
    getFormsList(setLoading).then(res=>{
        setForms(res.data)
    })
}
