import {uploadSingImg} from 'core/services/content.service';
import i18next from 'i18next';

export const handleChangeMethodTitle = (e, contentContext) => {
    const currentName = e.currentTarget.value;
    contentContext.setContent(prevState => {
        return {...prevState, title: [{value: currentName}]};
    });
};

const pathValidation = value => {
    // let patt = new RegExp("^\/[a-zA-Z0-9-]+$");
    let patt = new RegExp('^/[a-zA-Z0-9-]+$');
    const status = patt.test(value);
    return status;
};

export const handleChangePathMethod = (e, contentContext) => {
    const currentValue = e.currentTarget.value;
    if (!pathValidation(currentValue)) {
        contentContext.setErrors(prevState => {
            return {
                ...prevState,
                path: i18next.t('translation:validPath'),
            };
        });
    } else {
        contentContext.setErrors(prevState => {
            delete prevState.path;
            return {
                ...prevState,
            };
        });
    }
    contentContext.setContent(prevState => {
        return {
            ...prevState,
            path: [
                {
                    alias: currentValue,
                    pathauto: prevState.path[0].pathauto,
                },
            ],
        };
    });
};

export const setTitleValidationMethod = (setErrors, title) => {
    if (title[0].value === "") {
        setErrors(prevState => {
            return {...prevState, title: i18next.t('translation:requiredValid')};
        });
    } else {
        setErrors(prevState => {
            delete prevState.title
            return {...prevState};
        });
    }
};

export const setFieldImageContentTypeGallaryErrorMethod = (contentType,field_image,setErrors) => {
    if (contentType === 'images') {
        if (field_image.length === 0) {
            setErrors(prevState => {
                return {...prevState, field_image: i18next.t('translation:requiredValid')};
            });
        }
    }
};

export const changeErrorsWhenFillFieldImageMethod = (contentType,field_image,setErrors) => {
    if (contentType === 'images') {
        if (field_image.length > 0) {
            setErrors(prevState => {
                delete prevState.field_image;
                return {...prevState};
            });
        } else {
            setErrors(prevState => {
                return {...prevState, field_image: i18next.t('translation:requiredValid')};
            });
        }
    }
};

/*Description:upload img and change content like below with response
*@return :"field_image": [
        {
            "target_id": 87,
            "alt": "خلاصه ",
            "title": "عنوان عکس",
            "target_type": "file",
            "target_uuid": "6c4acfb8-b13a-49b6-bac9-74f407dab50a",
            "url": "http://yas2.webrbp.ir/sites/default/files/news/index_img/1053500x500_1465587311953813.jpg"
        }
    ],
* */

export const uploadImgMethod = (e, multiple, contentContext, setLoading) => {
    setLoading(true);
    if (e.length > 0) {
        for (let file of e) {
            uploadSingImg(file, setLoading).then(response => {
                setLoading(false);
                let item = response.data;
                let url = 'http://sitesazyas.rbp' + item.uri[0].url;
                if (multiple !== 'multiple') {
                    contentContext.setImgAndUrl([{id: item.fid[0].value, url: url}]);
                    contentContext.setContent(prevState => {
                        return {
                            ...prevState,
                            field_image: [
                                {
                                    target_id: `${item.fid[0].value}`,
                                    target_type: 'file',
                                    target_uuid: item.uuid[0].value,
                                    url: url,
                                },
                            ],
                        };
                    });
                } else {
                    contentContext.setImgsAndUrls(prevState => {
                        return [...prevState, {id: item.fid[0].value, url: url}];
                    });
                    contentContext.setContent(prevState => {
                        return {
                            ...prevState,
                            field_images_gallery: [
                                ...prevState.field_images_gallery,
                                {
                                    target_id: item.fid[0].value,
                                    target_type: 'file',
                                    target_uuid: item.uuid[0].value,
                                    url: url,
                                },
                            ],
                        };
                    });
                }
            });
        }
    } else {
        contentContext.setContent(prevState => {
            return {
                ...prevState,
                field_image: '',
            };
        });
    }
};

export const handleChangeSubtitleMethod = (e, contentContext) => {
    const currentSubtitle = e.currentTarget.value;
    contentContext.setContent(prevState => {
        return {
            ...prevState,
            field_subtitle: [{value: currentSubtitle}],
        };
    });
};

export const handleChangeUrgentNewsMethod = (e, contentContext) => {
    const currentUrgentNews = e.currentTarget.value === 'true' ? true : false;
    contentContext.setContent(prevState => {
        return {
            ...prevState,
            field_urgent_news: [{value: currentUrgentNews}],
        };
    });
};

export const handleChangeChosenMethod = (e, contentContext) => {
    const isChecked = e.currentTarget.checked;
    contentContext.setContent(prevState => {
        return {
            ...prevState,
            field_chosen: [{value: isChecked}],
        };
    });
};

export const handleChangeHightlightMethod = (e, contentContext) => {
    const isChecked = e.currentTarget.checked;
    contentContext.setContent(prevState => {
        return {
            ...prevState,
            field_highlight: [{value: isChecked}],
        };
    });
};

export const handleChangeSpecialMethod = (e, contentContext) => {
    const isChecked = e.currentTarget.checked;
    contentContext.setContent(prevState => {
        return {
            ...prevState,
            field_special_mm: [{value: isChecked}],
        };
    });
};

/*Description:change content for news type
 *@return :object
 *
 *   "field_states": [
 *        {
 *            "target_id": 22,
 *            "target_type": "taxonomy_term",
 *        }
 *    ],
 *
 * */

export const clickImageTitleAndAltMethod = (e, field, contentContext) => {
    const id = e.currentTarget.value;
    contentContext.setContent(prevState => {
        prevState.field_image[0][field] = id;
        return {
            ...prevState,
        };
    });
};

/*Description:change content for news type
 *@return :  "field_news_category": [
 *        {
 *            "target_id": 2,
 *            "target_type": "taxonomy_term",
 *        },
 *        {
 *            "target_id": 3,
 *            "target_type": "taxonomy_term",
 *        }
 *    ],
 * */

export const handleChangeNewsCategoryMethod = (e, contentContext, setSelectedNewsCategory) => {
    const id = e.currentTarget.value;
    const isChecked = e.currentTarget.checked;
    if (isChecked) {
        contentContext.setContent(prevState => {
            return {
                ...prevState,
                field_news_category: [
                    ...prevState.field_news_category,
                    {
                        target_id: id,
                        target_type: 'taxonomy_term',
                    },
                ],
            };
        });
        setSelectedNewsCategory(prevState => {
            return [...prevState, id];
        });
    } else {
        contentContext.setContent(prevState => {
            const filteredPrev = prevState.field_news_category.filter(item => item.target_id !== id);
            return {
                ...prevState,
                field_news_category: [...filteredPrev],
            };
        });
        setSelectedNewsCategory(prevState => {
            const filteredPrev = prevState.filter(item => item !== id);
            return [...filteredPrev];
        });
    }
};

/*Description:by changing it change comment
 *@return : "field_tags": [
 *        {
 *            "target_id": 7,
 *            "target_type": "taxonomy_term",
 *            "target_uuid": "1c34ee8b-b221-4dfc-a3f7-ced5af39d36a",
 *            "url": "/tags/%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%DB%8C"
 *        },
 *        {
 *            "target_id": 26,
 *            "target_type": "taxonomy_term",
 *            "target_uuid": "9aed5b89-9d83-408e-ae63-738fa19057fb",
 *           "url": "/tags/%D8%B3%DB%8C%D8%A7%D8%B3%DB%8C"
 *        }
 *   ],
 * */

export const changeTagsMethod = (e, contentContext) => {
    let field_tags = [];
    for (let tag of e) {
        field_tags.push({
            target_id: tag.tid,
            target_type: 'taxonomy_term',
        });
    }
    contentContext.setContent(prevState => {
        return {
            ...prevState,
            field_tags: [...field_tags],
        };
    });
};

export const handleCommentChangeMethod = (e, contentContext) => {
    const status = e.currentTarget.value;
    contentContext.setContent(prevState => {
        return {
            ...prevState,
            comment: [{status: parseInt(status)}],
        };
    });
};

export const removeImgMethod = (contentContext, field) => {
    contentContext.setContent(prevState => {
        return {
            ...prevState,
            [field]: [],
        };
    });
    contentContext.setImgAndUrl([]);
};

export const handleChangeAutoPathMethod = (e, contentContext) => {
    let check = e.currentTarget.checked;
    if (check === false) {
        contentContext.setContent(prevState => {
            return {
                ...prevState,
                field_alias_status: [
                    {
                        value: check,
                    },
                ],
                path: [
                    {
                        alias: prevState.path[0].alias,
                        pathauto: check,
                    },
                ],
            };
        });
    } else {
        contentContext.setContent(prevState => {
            return {
                ...prevState,
                field_alias_status: [
                    {
                        value: check,
                    },
                ],
                path: [
                    {
                        alias: '',
                        pathauto: check,
                    },
                ],
            };
        });
    }
};



export const changeNewsCategoryByGettingContentMethod = (field_news_category, setSelectedNewsCategory) => {
    if (field_news_category !== undefined && field_news_category.length > 0) {
        const currentNewsCategoryArr = [];
        field_news_category.forEach(item => {
            currentNewsCategoryArr.push(`${item.target_id}`);
        });
        setSelectedNewsCategory([...currentNewsCategoryArr]);
    }
};
