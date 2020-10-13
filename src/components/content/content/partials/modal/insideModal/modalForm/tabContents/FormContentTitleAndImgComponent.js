import contentService from "core/services/content.service";

export const handleChangeMethod = (e, field,contentContext,t) => {
    const currentName = e.currentTarget.value;
    if (field === "title") {
        if (currentName !== "") {
            contentContext.setErrors(prevState => {
                delete prevState.title;
                return{...prevState}
            });
        }else{
            contentContext.setErrors(prevState => {
                return {...prevState,title: t('translation:requiredValid')}
            });
        }
    }
    contentContext.setContent(prevState => {
        return {
            ...prevState, [field]: currentName
        }
    });
}

export const uploadSingImgMethod = (e,contentContext,setSingleImgToSendFid,appContext) => {debugger
    if (e.length > 0) {
        contentService.uploadSingImg(e).then((response) => {
            let item = response.data;
            setSingleImgToSendFid({id: item.fid, file: e[0]});
            // const lastPartOfImgUrl=item.uri.slice(9);
            // const currentImgUrl=`http://dash.webrbp.ir/sites/default/files/${lastPartOfImgUrl}`;
            // contentContext.setSingleImgs([{fid:item.fid,url:currentImgUrl}]);
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