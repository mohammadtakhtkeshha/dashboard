const url = process.env.REACT_APP_API_URL;

export const getVocabsUrl = `${url}/vocabularies`;

export const getTermsUrl = (term)=>{
    return `${url}/listvocabularies/${term}`;
};

export default {
    getVocabsUrl,getTermsUrl
}
