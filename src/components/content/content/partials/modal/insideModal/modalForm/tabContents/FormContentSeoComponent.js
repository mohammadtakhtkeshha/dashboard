export const clickEditorMetaTagMethod = (e, keyName,setTitle,setDescription,setAbstract,setKeywords) => {
    let currentValue = e.currentTarget.value;
    switch (keyName) {
        case "title":
            setTitle(currentValue);
            break;
        case "description":
            setDescription(currentValue);
            break;
        case "abstract":
            setAbstract(currentValue)
            break;
        default:
            setKeywords(currentValue);
    }
};

export const seoChangedMethod = (newContentContext,title,description,abstract,keywords) => {
    newContentContext.setContent(prevState => {
        return {
            ...prevState, field_seo_list: {
                title: title,
                description: description,
                abstract: abstract,
                keywords: keywords
            }
        }
    });
}

export default {clickEditorMetaTagMethod,seoChangedMethod};