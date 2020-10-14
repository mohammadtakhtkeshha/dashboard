import contentService from "core/services/content.service";

export const registerMethod = (t,contentsContext,appContext) => {
    if (contentsContext.content.title === "") {
        contentsContext.setErrors({title: t('translation:requiredValid')});
    }
    contentService.registerContent(contentsContext.content).then((response) => {
        appContext.setLoading(false);
        contentsContext.getRegisteredContent(response.data);
    }).catch((error) => {
        // if (error === "وب سایت با یک خطای غیر منتظره مواجه شد. لطفا بعدا دوباره تلاش کنید.") {
        //     appContext.handleError(t('translation:networkError'));
        // } else {
        //     let objError = {};
        //     const errorString = error.response.data.FailureReason.message.replace(/\n/g, 'a');
        //     const errorArray = errorString.split('.');
        //     for (let i in errorArray) {
        //         let newErrorMessage = errorArray[i].split(':');
        //         objError[newErrorMessage[0]] = newErrorMessage[1];
        //     }
        //     let titleError;
        //     const arrayError = [];
        //     if (objError.atitle === " This value should not be null") {
        //         titleError = t('contents:nullTitle')
        //     }
        //     arrayError.push(titleError)
        //     appContext.handleError(arrayError);
        // }
        debugger
        if(error.response?.status === 500){
            appContext.handleError(t('translation:netError'));
        }
        if(error?.response?.data?.FailureReason?.error_code === 422){
            appContext.handleError(t('translation:incorrectData'));
        }
    });
}
