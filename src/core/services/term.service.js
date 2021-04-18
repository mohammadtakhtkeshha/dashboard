import {Method} from "infrastructure/layout";
import {aacaauthHeader, ahchauthHeader} from "../../utils/headers";
import {registerTermUrl,deleteTermUrl} from "../../utils/urls/term.urls";

export function registerTerm (term,handleError) {
    return Method({
        url:registerTermUrl,
        method:'post',
        headers:aacaauthHeader,
        body:term,
        handleError:handleError
    });
}

export function deleteTermService(id,handleError) {
    return Method({
        url:deleteTermUrl(id),
        method:'delete',
        headers:ahchauthHeader,
        handleError:handleError
    });
}

export default {registerTerm,deleteTermService}
