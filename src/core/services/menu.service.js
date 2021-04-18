import {Method} from "infrastructure/layout";
import {authHeader, cjcsrfauthHeader,cjauthHeader} from "utils/headers";
import {getMenusWebUrl,addMenuUrl,getMenusMobileUrl,getDeleteEditMenuUrl,saveDragDropChangesMenuURL} from "utils/urls/menu.urls"
import storage from "libraries/local-storage"

const auth = storage.get(process.env.REACT_APP_TOKEN_KEY)

export const getMenus = (type,handleError) => {
    let url = type === "web" ? getMenusWebUrl : getMenusMobileUrl
    return Method({method:'GET',url:url,headers: authHeader(auth),handleError:handleError});
}

export const deleteMenu = (id,handleError) => {
    return Method({method:'DELETE',url:getDeleteEditMenuUrl(id),headers: cjcsrfauthHeader,handleError:handleError});
}

export const saveDragDropChanges = (type,handleError,body) => {
    return Method({method:'PATCH',url:saveDragDropChangesMenuURL(type),headers: cjauthHeader(auth),body:body,handleError:handleError});
}

export const editMenu = (handleError,body) => {
    return Method({method:'PATCH',url:getDeleteEditMenuUrl,headers: cjcsrfauthHeader,handleError:handleError,body:body});
}

export const addMenu = (handleError,body,id) => {
    let method = id === "" ? "POST" : "PATCH"
    let url = id === "" ? addMenuUrl : getDeleteEditMenuUrl(id)
    return Method({method:method,url:url,headers: cjcsrfauthHeader,handleError:handleError,body:body});
}

export const getMenu = (handleError,id) => {
    return Method({method:'GET',url:getDeleteEditMenuUrl(id),headers: cjcsrfauthHeader,handleError:handleError});
}

