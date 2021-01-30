const baseUrl = process.env.REACT_APP_API_URL;

export const getPublishedCommentsUrl = `${baseUrl}/last_comment/approved?_format=json`;

export const getUnConfirmedCommentsUrl = `${baseUrl}/last_comment/napproved?_format=json`;

export const addCommentUrl = `${baseUrl}/user/logout`;

export const deleteCommentUrl = (id)=>{
    return `${baseUrl}/comment/${id}?_format=json`
};

export const getCommentUrl = `${baseUrl}/comment/5?_format=json`;

export const editCommentUrl = (id)=>{
    return `${baseUrl}/comment/${id}?_format=json`;
}

export const multiActionCommentUrl = `${baseUrl}/api/rest/comments/delete?_format=json`;

export const changeStatusCommentUrl = `${baseUrl}/api/rest/comments/status?_format=json`;

export const multiActionStatusUrl = `${baseUrl}/api/rest/comments/status?_format=json`;

export const multiActionDeleteUrl = `${baseUrl}/api/rest/comments/delete?_format=json`;

