import axios from "axios";
import {
    getTaxonomiesUrl,
    getTermsUrl,
    getTaxonomyStatesUrl,
    getTaxonomyImagesUrl,
    getTaxonomySoundsUrl,
    getTaxonomyVideosUrl, getTaxonomyTagsUrl
} from 'utils/urls/taxonomy.urls';
import {ahchauthHeader, authHeader} from "utils/headers";
import {Method} from "structure/layout.js";
import storage from "libraries/local-storage"

const auth = storage.get(process.env.REACT_APP_TOKEN_KEY)

export function getTaxonomies(handleError) {
    return Method({method:'get',url:getTaxonomiesUrl,headers: authHeader(auth),handleError:handleError});
}

export function getTerms(term) {
    return axios.get(getTermsUrl(term), ahchauthHeader);
}

export function getTaxonomyImages(handleError) {
    return Method({method:'get',url:getTaxonomyImagesUrl, headers:authHeader(auth),handleError:handleError});
}

export function getTaxonomySounds(handleError) {
    return Method({method:'get',url:getTaxonomySoundsUrl, headers:authHeader(auth),handleError:handleError});
}

export function getTaxonomyTags(handleError) {
    return Method({method:'get',url:getTaxonomyTagsUrl, headers:authHeader(auth),handleError:handleError});
}

export function getTaxonomyVideos(handleError) {
    return Method({method:'get',url:getTaxonomyVideosUrl, headers:authHeader(auth),handleError:handleError});
}
