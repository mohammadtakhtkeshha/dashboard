export const previewImgMethod = (e,t,appContext,setValidation,setFiles,setImagePreviewUrl,multiple,getFile) => {
    appContext.setLoading(true);
    if (e.currentTarget.files[0] !== undefined) {
        let extension = (e.currentTarget.files[0].name).split('.').pop();
        setValidation('');
        setFiles((prevState => {
            return [...prevState]
        }));
        setImagePreviewUrl((prevState => {
            return [...prevState]
        }));
        if (!['jpg', 'png', 'jpeg'].includes(extension)) {
            appContext.setLoading(false);
            setValidation(t('translation:imgValidation'));
            return
        }
        let arrayOfFiles = [];
        if (multiple) {//check multiple img or not
            arrayOfFiles = e.currentTarget.files;
        } else {
            setFiles([]);
            setImagePreviewUrl([]);
            arrayOfFiles.push(e.currentTarget.files[0]);
        }
        getFile([...arrayOfFiles]);
    }
}

export const removeImgMethod = (e,src,imagePreviewUrl,files,setImagePreviewUrl,setFiles,removedFileId) =>{
    let index = imagePreviewUrl.indexOf(src);
    let newImgPreview = imagePreviewUrl.filter(item => item !== src);
    let deletedFile = files.splice(index, 1);
    let newFiles = files.filter(item => item !== deletedFile);
    setImagePreviewUrl(newImgPreview);
    setFiles(newFiles);
    removedFileId(e.currentTarget.id);
}