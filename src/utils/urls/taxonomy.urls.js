const url = process.env.REACT_APP_API_URL

export const getTaxonomiesUrl = `${url}/api/rest/tax_list?_format=json`

export const getTaxonomyStatesUrl =`${url}/api/rest/taxonomy/state`

export const getTaxonomyImagesUrl =`${url}/api/rest/taxonomy/images_category`

export const getTaxonomySoundsUrl =`${url}/api/rest/taxonomy/sounds_category`

export const getTaxonomyVideosUrl = `${url}/api/rest/taxonomy/videos_category`

export const getTaxonomyTagsUrl = `${url}/api/rest/taxonomy/tags`

export const getTaxonomyCategoriesUrl = `${url}/api/rest/taxonomy/category`

export const getTaxonomyTermUrl = (type) => {
    return `${url}/api/rest/taxonomy/${type.type}`
}

export const editStateUrl =(id)=>{
    return `${url}/taxonomy/term/${id}?_format=json`
}

export const getTermsUrl = (term)=>{
    return `${url}/listvocabularies/${term}`
}

export const deleteTerm =(id)=>{
    return `${url}/taxonomy/term/${id}?_format=json`

}

export const getDeleteEditTermUrl =(id)=>{
    return `${url}/taxonomy/term/${id}?_format=json`

}

export const saveDragDropChangesStatesURL = (type) => {
    return `${url}/api/rest/taxonomyordered/${type}`
}

export const registerStateUrl =`${url}/taxonomy/term?_format=json`

// const url = process.env.REACT_APP_API_URL;
//
// export const getTaxonomiesUrl = `${url}/vocablist?_format=json`;
//
// export const getTermsUrl = (term)=>{
//     return `${url}/listvocabularies/${term}`;
// };

// export const getTaxonomyImagesUrl =`${url}/api/rest/taxonomy/images-category`
//
//
// export const editStateUrl =(id)=>{
//     return `${url}/taxonomy/term/${id}?_format=json`
// }
//
// export const deleteTerm =(id)=>{
//     return `${url}/taxonomy/term/${id}?_format=json`
// }
//
// export const getDeleteEditTermUrl =(id)=>{
//     return `${url}/taxonomy/term/${id}?_format=json`
// }
//
// export const getTaxonomyCategoriesUrl = `${url}/api/rest/taxonomy/category`
//



