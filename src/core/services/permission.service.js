import {Method} from "structure/layout";
import {addRoleUrl, editDeketeRoleUrl, getPermissionListUrl} from "utils/urls/permission.urls";
import {cjauthHeader} from "utils/headers"
import {get} from "libraries/local-storage"

export const getPermissionList = (handleError) => {
    const auth = get(process.env.REACT_APP_TOKEN_KEY)
    return Method({method:'GET',url:getPermissionListUrl,headers: cjauthHeader(auth),handleError:handleError});
}

export const addRole = (handleError,body) => {
    const auth = get(process.env.REACT_APP_TOKEN_KEY)
    return Method({method:'POST',url:addRoleUrl,headers: cjauthHeader(auth),handleError:handleError,body:body});
}

export const deleteRole = (roleId,handleError) => {
    const auth = get(process.env.REACT_APP_TOKEN_KEY)
    return Method({method:'DELETE',url:editDeketeRoleUrl(roleId),headers: cjauthHeader(auth),handleError:handleError});
}

export const editRole = (roleId,body,handleError) => {
    const auth = get(process.env.REACT_APP_TOKEN_KEY)
    return Method({method:'PATCH',url:editDeketeRoleUrl(roleId),headers: cjauthHeader(auth),handleError:handleError,body:body});
}
