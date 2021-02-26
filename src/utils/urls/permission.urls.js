const baseUrl =process.env.REACT_APP_API_URL;

export const getPermissionListUrl =`${baseUrl}/api/rest/permissions/list`

export const addRoleUrl =`${baseUrl}/api/rest/role`

export const editDeketeRoleUrl =(roleId)=>{
    return `${baseUrl}/api/rest/role/${roleId}`
}


