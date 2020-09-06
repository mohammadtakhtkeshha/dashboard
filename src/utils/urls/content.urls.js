const baseUrl =process.env.REACT_APP_API_URL;

export const getTagsUrl=`${baseUrl}/vocabularies/tags`;

export const domainSourceUrl=`${baseUrl}/dom_rec`;

export const getCategoriesUrl=`${baseUrl}/vocabularies/category`;

export const uploadSingImgUrl=`${baseUrl}/file/upload/node/article/field_image?_format=json`;

export const uploadVideoUrl=`${baseUrl}/file/upload/media/video/field_media_video_file?_format=json`;

export const uploadMultiImgUrl=`${baseUrl}/file/upload/node/article/field_field_galeries?_format=json`;

export const uploadVoiceUrl=`${baseUrl}/file/upload/media/audio/field_media_audio_file?_format=json`;

export const uploadFileUrl=`${baseUrl}/file/upload/node/article/field_files?_format=json`;

export const getContentsUrl = 'http://dash.webrbp.ir/api/all_content?_format=json';

export const registerContentUrl = 'http://dash.webrbp.ir/entity/node?_format=json';

export const deleteContentUrl = (id) => {
    return `http://dash.webrbp.ir/node/${id}?_format=json`;
}
export const getContentUrl = (id) => {
    return `http://dash.webrbp.ir/node/${id}?_format=json`;
}


export default {getTagsUrl,domainSourceUrl,getCategoriesUrl,uploadSingImgUrl,
    uploadVideoUrl,uploadVoiceUrl,uploadMultiImgUrl,uploadFileUrl,getContentsUrl,registerContentUrl,
    deleteContentUrl,getContentUrl};
