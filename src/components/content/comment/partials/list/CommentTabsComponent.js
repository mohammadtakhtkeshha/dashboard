export const handleChangeMethod=(setValue,newValue,setCommentStatus)=>{
    setValue(newValue);
    if (newValue === 0) {
        setCommentStatus('published');
    } else {
        setCommentStatus('unconfirmed');
    }
}
