import {Method} from "infrastructure/layout";
import {getTaxonomyImagesUrl,registerStateUrl,editStateUrl,deleteTerm,saveDragDropChangesStatesURL,getDeleteEditTermUrl} from "utils/urls/taxonomy.urls";
import {authHeader, cjajauthHeader, cjauthHeader, cjcsrfauthHeader} from "utils/headers";
import {saveDragDropChangesMenuURL} from "../../../../utils/urls/menu.urls";
import storage from "libraries/local-storage";

const auth = storage.get(process.env.REACT_APP_TOKEN_KEY)

export function getStates(handleError) {
    return Method({method:'get',url:getTaxonomyImagesUrl, headers:authHeader(auth),handleError:handleError});
}

export const getState = (id,handleError) =>  {
    return Method({method:'get',url:getDeleteEditTermUrl(id), headers:authHeader(auth),handleError:handleError});
}

export const saveDragDropChanges = (type,handleError,body) => {
    return Method({method:'PATCH',url:saveDragDropChangesStatesURL(type),headers: cjauthHeader(auth),body:body,handleError:handleError});
}

export const registerState = (handleError,body,openForm) => {
    const url = openForm.id === "" ? registerStateUrl : editStateUrl(openForm.id)
    const method = openForm.id === "" ? "post":"patch"
    return Method({method:method,url:url,body:body, headers:cjcsrfauthHeader(auth),handleError:handleError});
}

export const deleteState = (id,handleError) => {
    return Method({method:"DELETE",url:deleteTerm(id), headers:cjcsrfauthHeader(auth),handleError:handleError});
}
