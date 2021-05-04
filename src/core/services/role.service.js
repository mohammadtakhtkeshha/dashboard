import {deleteEditRoleUrl} from "utils/urls/roles.urls";
import {Method} from "infrastructure/layout.js";
import {cjauthHeader} from "utils/headers";
import {addRoleUrl, editDeketeRoleUrl, getPermissionListUrl} from "../../utils/urls/permission.urls";

export const getRole = (role,handleError) => {
    let url = deleteEditRoleUrl(role);
    return Method({method:'GET',url:url,headers: cjauthHeader(),handleError:handleError});
}

export const deleteRole = (handleError,role) => {
    let url = deleteEditRoleUrl(role);
    return Method({method:'DELETE',url:url,headers: cjauthHeader(),handleError:handleError});
}

export const editRole = (roleId,body,handleError) => {
    return Method({method:'PATCH',url:editDeketeRoleUrl(roleId),headers: cjauthHeader(),handleError:handleError,body:body});
}

export const addRole = (handleError,body) => {
    return Method({method:'POST',url:addRoleUrl,headers: cjauthHeader(),handleError:handleError,body:body});
}

export const getPermissionList = (handleError) => {
    return Method({method:'GET',url:getPermissionListUrl,headers: cjauthHeader(),handleError:handleError});
}

