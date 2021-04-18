import {deleteEditRoleUrl} from "utils/urls/roles.urls";
import {Method} from "infrastructure/layout.js";
import {cjauthHeader} from "utils/headers";
import {get} from "libraries/local-storage"
import {addRoleUrl, editDeketeRoleUrl, getPermissionListUrl} from "../../utils/urls/permission.urls";

let auth =get(process.env.REACT_APP_TOKEN_KEY)

export const getRole = (role,handleError) => {
    let url = deleteEditRoleUrl(role);
    return Method({method:'GET',url:url,headers: cjauthHeader(auth),handleError:handleError});
}

export const deleteRole = (handleError,role) => {
    let url = deleteEditRoleUrl(role);
    return Method({method:'DELETE',url:url,headers: cjauthHeader(auth),handleError:handleError});
}

export const editRole = (roleId,body,handleError) => {
    const auth = get(process.env.REACT_APP_TOKEN_KEY)
    return Method({method:'PATCH',url:editDeketeRoleUrl(roleId),headers: cjauthHeader(auth),handleError:handleError,body:body});
}

export const addRole = (handleError,body) => {
    const auth = get(process.env.REACT_APP_TOKEN_KEY)
    return Method({method:'POST',url:addRoleUrl,headers: cjauthHeader(auth),handleError:handleError,body:body});
}

export const getPermissionList = (handleError) => {
    const auth = get(process.env.REACT_APP_TOKEN_KEY)
    return Method({method:'GET',url:getPermissionListUrl,headers: cjauthHeader(auth),handleError:handleError});
}

