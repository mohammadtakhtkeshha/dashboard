export const filterByMethod = (e, key, setSearchedComment) => {
    let keyValue = e.currentTarget.value;
    setSearchedComment(prevState => {
        return {
            ...prevState, [key]: keyValue
        }
    });
}

export const doFilterHandlerMethod = (commentStatus, searchedComment, unconfirmedComments, publishedComments, handlePagination) => {
    let subject = searchedComment.subject;
    let author = searchedComment.author;
    let filteredComment;
    switch (commentStatus) {
        case 'published':
            filteredComment = publishedComments.filter((comment) => {
                let newComment = comment.subject.includes(subject) &&
                    comment.name.includes(author)
                return newComment;
            });
            break;
        default:
            filteredComment = unconfirmedComments.filter((comment) => {
                let newComment = comment.subject.includes(subject) &&
                    comment.name.includes(author)
                return newComment;
            });
    }
    handlePagination(filteredComment, false, false);
}
