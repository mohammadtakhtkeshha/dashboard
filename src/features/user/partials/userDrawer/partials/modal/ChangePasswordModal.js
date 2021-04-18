import {registerChangePass} from "core/services/user.service";
import {success} from "methods/swal";
import {remove} from "libraries/local-storage";

export const registerChangePassMethod = (t,body, appContext,setOpenObserveProfile,setErrors) => {
    appContext.setLoading(true)
    registerChangePass(body,appContext.handleError).then((res)=>{
        appContext.setLoading(false)
        setOpenObserveProfile(false)
        success(t('translation:successRegistered'), t('translation:ok'))
        remove(process.env.REACT_APP_TOKEN_KEY);
    }).catch(error=>{
        if(error.response.status === 422){
            setErrors(prevState => {
                return{...prevState,expassword:t('users:wrongExpassword')}
            })
        }
    })
}
