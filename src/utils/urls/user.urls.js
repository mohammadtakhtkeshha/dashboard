const baseUrl =process.env.REACT_APP_API_URL;

export const getRolesUrl =`${baseUrl}/api/rest/role?_format=json`;

export const getUsersUrl =(page)=>{
    return `${baseUrl}/api/user/v2?page=${page}`;
};

export const getUserUrl =(id)=>{
    return `${baseUrl}/user/${id}?_format=json`;
};

export const deleteUserAndGetUserForEditUrl =(id)=>{
    return `${baseUrl}/user/${id}?_format=json`;
};

export const multiActionUrl =`${baseUrl}/api/rest/user/delete?_format=json`;

export const registerUserUrl =`${baseUrl}/entity/user?_format=json`;

export const saveUserImageUrl =`${process.env.REACT_APP_API_URL}/file/upload/user/user/user_picture?_format=json`;

export const  getNotPaginateUserUrl = `${baseUrl}/api/users/all`;

export const imgUrlForRegisterUser = `${baseUrl}`;

export const changePassUrl = `${baseUrl}/api/rest/userpass`;

