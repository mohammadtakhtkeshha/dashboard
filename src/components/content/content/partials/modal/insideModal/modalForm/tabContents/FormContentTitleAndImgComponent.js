import contentService from "core/services/content.service";

export const handleChangeMethod = (e, field,contentContext) => {
    const currentName = e.currentTarget.value;
    if (field === "title") {
        if (currentName !== "") {
            contentContext.setErrors({title: ''});
        }
    }
    contentContext.setContent(prevState => {
        return {
            ...prevState, [field]: currentName
        }
    });
}

export const uploadSingImgMethod = (e,contentContext,setSingleImgToSendFid,appContext) => {
    if (e.length > 0) {
        contentService.uploadSingImg(e).then((response) => {
            let item = response.data;
            setSingleImgToSendFid({id: item.fid, file: e[0]});
            contentContext.setContent(prevState => {
                return {
                    ...prevState, field_image: {
                        target_id: `${response.data.fid}`,
                        target_type: 'file'
                    }
                }
            });
        }).catch((error) => {
            appContext.handleError(error)
        });
    } else {
        contentContext.setContent(prevState => {
            return {
                ...prevState, field_image: ''
            }
        });
    }
}

export const removedSingleImgMethod = (id,contentContext) => {
    contentContext.setContent(prevState => {
        return {
            ...prevState, field_image: {}
        }
    });
}


export default {handleChangeMethod,uploadSingImgMethod,removedSingleImgMethod}