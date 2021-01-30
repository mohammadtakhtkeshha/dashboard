const baseUrl =process.env.REACT_APP_API_URL;

export const getTagsUrl=`${baseUrl}/vocabularies/tags?_format=json`;

export const domainSourceUrl=`${baseUrl}/dom_rec`;

export const getNewsCategoryUrl=`${baseUrl}/vocabularies/category?_format=json`;

export const uploadSingImgUrl=`${baseUrl}/file/upload/node/article/field_image?_format=json`;

export const uploadVideoUrl=`${baseUrl}/file/upload/node/videos/field_video?_format=json`;

export const uploadMultiImgUrl=`${baseUrl}/file/upload/node/article/field_field_galeries?_format=json`;

export const uploadVoiceUrl=`${baseUrl}/file/upload/node/sounds/field_sound?_format=json`;

export const uploadFileUrl=`${baseUrl}/file/upload/node/article/field_files?_format=json`;

export const getContentsUrl = `${baseUrl}/api/content/all?_format=json`;

export const registerContentUrl = `${baseUrl}/entity/node?_format=json`;

export const editContentUrl = (id) => {
    return `${baseUrl}/node/${id}?_format=json`;
}

export const deleteContentUrl = (id) => {
    return `${baseUrl}/node/${id}?_format=json`;
}

export const getContentUrl = (id) => {
    return `${baseUrl}/node/${id}?_format=json`;
}

export const getContentTypeListUrl = `${baseUrl}/api/rest/content_type`;

export const contentActionDeleteUrl =`${baseUrl}/api/rest/nodes/delete?_format=json`;

export const contentActionStatusUrl = `${baseUrl}/api/rest/nodes/status?_format=json`;

export const getStatesUrl = `${baseUrl}/vocabularies/state?_format=json`;

export const getImagesCategoryUrl = `${baseUrl}/vocabularies/images_category?_format=json`;

export default {getTagsUrl,domainSourceUrl,getNewsCategoryUrl,uploadSingImgUrl,editContentUrl,
    uploadVideoUrl,uploadVoiceUrl,uploadMultiImgUrl,uploadFileUrl,getContentsUrl,registerContentUrl,
    deleteContentUrl,getContentUrl,getContentTypeListUrl,contentActionDeleteUrl,contentActionStatusUrl,getStatesUrl,getImagesCategoryUrl
 };
