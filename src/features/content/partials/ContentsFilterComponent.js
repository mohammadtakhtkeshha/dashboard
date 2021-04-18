export const changeTitleMethod = (e,setSearchedContent)=>{
    const currentValue = e.currentTarget.value;
    setSearchedContent(prevState => {
        return {
            ...prevState, title: currentValue
        }
    });
}

export const changeStatusMethod = (event,setStatus,setSearchedContent)=>{
    switch (event.currentTarget.value) {
        case 'published':
            setStatus('published');
            setSearchedContent(prevState => {
                return {
                    ...prevState, status: "true"
                }
            });
            break;
        case 'unpublished':
            setStatus('unpublished');
            setSearchedContent(prevState => {
                return {
                    ...prevState, status: "false"
                }
            });
            break;
        default:
            setStatus('');
            setSearchedContent(prevState => {
                return {
                    ...prevState, status: ""
                }
            });
    }
}

export const changeContentTypeMethod = (e,setContentType,setSearchedContent)=>{
    const currentValue = e.currentTarget.value;
    setContentType(currentValue);
    setSearchedContent(prevState => {
        return {
            ...prevState, contentType: currentValue
        }
    });
}

export const doFilterHandlerMethod = (contentsContext,searchedContent,contentType)=>{
    const currentContents = contentsContext.contents;
    const filteredContent = currentContents.filter((content) => {
            return content.title.includes(searchedContent.title)
                && content.status.includes(searchedContent.status)
                && content.en_type.includes(contentType)
        }
    );
    contentsContext.handlePagination(filteredContent, false);
}
