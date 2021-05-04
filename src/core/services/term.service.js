import {Method} from "infrastructure/layout";
import {aacaauthHeader, chahauthHeader} from "utils/headers";
import {registerTermUrl,deleteTermUrl} from "utils/urls/term.urls";

export function registerTerm (term,handleError) {
    return Method({
        url:registerTermUrl,
        method:'post',
        headers:aacaauthHeader(),
        body:term,
        handleError:handleError
    });
}

export function deleteTermService(id,handleError) {
    return Method({
        url:deleteTermUrl(id),
        method:'delete',
        headers:chahauthHeader(),
        handleError:handleError
    });
}

export default {registerTerm,deleteTermService}
