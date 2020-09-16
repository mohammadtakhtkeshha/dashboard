import axios from "axios";
import {getVocabsUrl,getTermsUrl} from 'utils/urls/vocabs.urls';
import { ahchauthHeader} from "utils/headers";

export function getVocabs() {
    return axios.get(getVocabsUrl, ahchauthHeader);
}

export function getTerms(term) {
    return axios.get(getTermsUrl(term), ahchauthHeader);
}

export default { getVocabs,getTerms};
