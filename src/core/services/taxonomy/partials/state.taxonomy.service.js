import {Method} from "infrastructure/layout";
import {getTaxonomyImagesUrl,registerStateUrl,editStateUrl,deleteTerm,saveDragDropChangesStatesURL,getDeleteEditTermUrl} from "utils/urls/taxonomy.urls";
import {authHeader, cjauthHeader, cjcsrfauthHeader} from "utils/headers";

export function getStates(handleError) {
    return Method({method:'get',url:getTaxonomyImagesUrl, headers:authHeader,handleError:handleError});
}

export const getState = (id,handleError) =>  {
    return Method({method:'get',url:getDeleteEditTermUrl(id), headers:authHeader,handleError:handleError});
}

export const saveDragDropChanges = (type,handleError,body) => {
    return Method({method:'PATCH',url:saveDragDropChangesStatesURL(type),headers: cjauthHeader,body:body,handleError:handleError});
}

export const registerState = (handleError,body,openForm) => {
    const url = openForm.id === "" ? registerStateUrl : editStateUrl(openForm.id)
    const method = openForm.id === "" ? "post":"patch"
    return Method({method:method,url:url,body:body, headers:cjcsrfauthHeader,handleError:handleError});
}

export const deleteState = (id,handleError) => {
    return Method({method:"DELETE",url:deleteTerm(id), headers:cjcsrfauthHeader,handleError:handleError});
}
