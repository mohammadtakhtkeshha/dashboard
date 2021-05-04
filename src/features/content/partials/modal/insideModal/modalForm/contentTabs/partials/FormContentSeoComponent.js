export const clickEditorMetaTagMethod = (e, keyName, setTitle, setDescription,setKeywords) => {
    let currentValue = e.currentTarget.value;
    switch (keyName) {
        case "title":
            setTitle(currentValue);
            break;
        case "description":
            setDescription(currentValue);
            break;
        default:
            setKeywords(currentValue);
    }
};
export const seoChangedMethod = (contentsContext, title, description, keywords) => {
    contentsContext.setContent(prevState => {
        return {
            ...prevState, field_seo_list:[{value:{
                    title: title,
                    description: description,
                    keywords: keywords
                }}]
        }
    });
}
export default {clickEditorMetaTagMethod};
