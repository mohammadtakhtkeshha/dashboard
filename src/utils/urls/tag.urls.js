const baseUrl = process.env.REACT_APP_API_URL;

export const getTagsUrl = (page)=>{
    return `${baseUrl}/vocabularies/tags?page=${page}`;
}

export const getTagUrl = (id) => {
    return `${baseUrl}/taxonomy/term/${id}?_format=json`;
}

export const addTagUrl = `${baseUrl}/taxonomy/term?_format=json`;

export function deleteTagUrl(id) {
    return `${baseUrl}/taxonomy/term/${id}?_format=json`;
}

export default {getTagsUrl, addTagUrl, deleteTagUrl, getTagUrl};