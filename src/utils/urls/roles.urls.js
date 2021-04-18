const baseUrl =process.env.REACT_APP_API_URL;


export const getRole = `${baseUrl}`

export const deleteEditRoleUrl = (role) => {
    return `${baseUrl}/api/rest/role/${role}`
}

export const addRoleUrl = () => {

}

