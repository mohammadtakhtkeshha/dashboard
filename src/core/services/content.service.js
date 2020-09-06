import axios from "axios";
import contentUrl from 'utils/urls/content.urls';
import {aacaAuthauHeader, ahchauthHeader, authHeader, avcoAuthcdHeader} from "utils/headers";

export function getDomainSource() {
    let url = contentUrl.domainSourceUrl;
    return axios.get(url);
}

export function getCategories() {
    let url = contentUrl.getCategoriesUrl;
    return axios.get(url, ahchauthHeader);
}

export function uploadSingImg(e) {
    let url = contentUrl.uploadSingImgUrl;
    return axios.post(url, e[0], avcoAuthcdHeader(e[0]));
}

export function uploadMultiImg(e) {
    let url = contentUrl.uploadMultiImgUrl;
    return axios.post(url, e, avcoAuthcdHeader(e));
}

export function uploadVideo(e) {
    let url = contentUrl.uploadVideoUrl;
    return axios.post(url, e, avcoAuthcdHeader(e));
}

export function uploadVoice(e) {
    let url = contentUrl.uploadVoiceUrl;
    return axios.post(url, e, avcoAuthcdHeader(e));
}

export function uploadMultiFile(e) {
    let url = contentUrl.uploadFileUrl;
    return axios.post(url, e, avcoAuthcdHeader(e));
}

export function getContents() {
    let url = contentUrl.getContentsUrl
    return axios.get(url, authHeader);
}
export function deleteContent(id) {
    let url = contentUrl.deleteContentUrl(id);
    return axios.delete(url, authHeader);
}


export function registerContent(content) {
    let url = contentUrl.registerContentUrl;
    let data = {
        type: {
            target_id: "article"
        },
        title: "six",
        body: "dxfcgvhjkلرالالراذlmس",
        field_domain_access: {
            target_id: "dash_webrbp_ir",
            target_type: "domain",
            target_uuid: "67f5f76f-7730-4aa5-8504-8d00e44bc720"
        },
        field_domain_all_affiliates: true,
        field_domain_source: {
            target_id: "dash_webrbp_ir",
            target_type: "domain",
            target_uuid: "67f5f76f-7730-4aa5-8504-8d00e44bc720"
        },
        field_field_galeries: {
            target_id: "162,344,345",
            target_type: "file"
        },
        field_videos: {},
        field_files: {
            target_id: "161",
            target_type: "file"
        },
        field_image: {
            target_id: "158",
            target_type: "file"
        },
        field_rotitr: "این روتیتر برای تست مقاله از پست من میباشد",
        field_sotitr: " سوتيتر مقاله ىر اين قسمت نوشته شده است",
        field_sounds: {
            target_id: "346",
            target_type: "file"
        },
        field_tags: {
            target_id: "25"
        }
    }
    return axios.post(url, data, aacaAuthauHeader);
}

export default {
    getDomainSource,
    getCategories,
    uploadSingImg,
    uploadVideo,
    uploadVoice,
    uploadMultiImg,
    uploadMultiFile,
    registerContent,
    getContents,
    deleteContent
};
