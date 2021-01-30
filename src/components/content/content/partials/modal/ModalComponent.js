import {getImagesCategory, getNewsCategory, getStates} from "core/services/content.service"

export const getNewsCategoryMethod = (contentType,handleError,setNewsCategory) => {
            if(contentType === "news"){
                getNewsCategory(handleError).then((response)=>{
                    setNewsCategory(response.data);
                });
            }
}

export const getStatesMethod = (contentType,handleError,setStates) => {
            if(contentType === "news"){
                getStates(handleError).then((response)=>{
                    setStates(response.data);
                });
            }
}

export const getImagesCategoryMethod = (contentType,handleError,setImagesCategory) => {
            if(contentType === "images"){
                getImagesCategory(handleError).then((response)=>{
                    setImagesCategory(response.data);
                });
            }
}

export const changeContentWhenChangingContentType= (id,contentType,setContent,newPage,newNews,newArticle,newSounds,newVideos,newImages,content) => {
    if(id === ""){
        switch (contentType) {
            case 'page':
                setContent(newPage);
                break;
            case 'news':
                setContent(newNews);
                break;
            case 'article':
                setContent(newArticle);
                break;
            case 'sounds':
                setContent(newSounds);
                break;
            case 'videos':
                setContent(newVideos);
                break;
            case 'images':
                setContent(newImages);
                break;
            default:
                setContent(content);
        }
    }
}

