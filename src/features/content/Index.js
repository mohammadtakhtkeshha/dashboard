import {getContent, getContents, getTags} from 'core/services/content.service';
import {chunkItem, handleTotalPage} from 'infrastructure/layout';
import {success} from 'methods/swal';
import i18next from 'i18next';
import {get} from "libraries/local-storage";


export function multiAction(selectedCheckBoxes, currentContents, status) {
    for (let selected of selectedCheckBoxes) {
        let currentContent = currentContents.filter(item => item.nid === selected);
        let index = currentContents.indexOf(currentContent[0]);
        switch (status) {
            case 'true':
                currentContents[index].status = status;
                break;
            case 'false':
                currentContents[index].status = status;
                break;
            default:
                currentContents.splice(index, 1);
        }
    }
    return currentContents;
}

/* description : fill content elementTabs for edit elementTabs
 *   @param(number) : id for the selected content
 */

export const setContentWhenEditButtonClicked = (
    id,
    setId,
    setOpenRegisterForm,
    setContent,
    setImgAndUrl,
    setImgsAndUrls,
    setVideosAndUrl,
    setVoicesAndUrl,
    setLoading,
    setContentType,
    setErrors,
    setSelectedTags,
) => {
    getContent(id, setLoading)
        .then(response => {
            setLoading(false);
            const item = response.data;
            setContentType(item.type[0].target_id);
            // ------------- set img for the edit time -------------
            if (item.field_image && item.field_image.length > 0) {
                const imgAndUrl = [{url: item.field_image[0].url, id: item.field_image[0].target_id}];
                setImgAndUrl(imgAndUrl);
            }
            // ------------- set multiimgs for the edit time -------------
            if (item.field_images_gallery && item.field_images_gallery.length > 0) {
                for (let image of item.field_images_gallery) {
                    setImgsAndUrls(prevState => {
                        return [
                            ...prevState,
                            {
                                id: image.target_id,
                                url: image.url,
                            },
                        ];
                    });
                }
            }
            // ------------- set videos for the edit time -------------
            if (item.field_video && item.field_video.length > 0) {
                for (let video of item.field_video) {
                    setVideosAndUrl(prevState => {
                        return [
                            ...prevState,
                            {
                                id: video.target_id,
                                url: video.url,
                            },
                        ];
                    });
                }
            }
            // ------------- set voices for the edit time -------------
            if (item.field_sound && item.field_sound.length > 0) {
                for (let sound of item.field_sound) {
                    setVoicesAndUrl(prevState => {
                        return [
                            ...prevState,
                            {
                                id: sound.target_id,
                                url: sound.url,
                            },
                        ];
                    });
                }
            }

            //set selected default tags
            let defaultTagsArr = [];
            if (item.field_tags) {
                item.field_tags.forEach(item => {
                    defaultTagsArr.push({
                        // name: `${item.url}`,
                        name: decodeURI(item.url.split('/').pop()),
                        tid: `${item.target_id}`,
                    });
                });
                // {name: "تایرخ", tid: "6", parent_target_id: "", parent_target_id_1: "", weight: "3"}
                setSelectedTags([...defaultTagsArr]);
            }
            // ------------- check default tags -------------
            let newFieldTags = [];
            if (item.field_tags && item.field_tags.length > 0) {
                for (let tag of item.field_tags) {
                    newFieldTags.push({
                        target_id: `${tag.target_id}`,
                        target_type: 'taxonomy_term',
                    });
                }
                item.field_tags = newFieldTags;
            }
            // ------------- if field_seo_list_empty -------------
            if (item.field_seo_list.length === 0) {
                item.field_seo_list = [{value: {title: "", description: "", keywords: ""}}]
            }
            setContent(item);
            setOpenRegisterForm(true);
        })
        .catch(error => {
            setId('');
        });
};

export const handleOpenContentFormMethod = (e, setOpenRegisterForm, setId, setLoading, passedAuthor, setAuthor) => {
    setAuthor(passedAuthor)
    const value = e.currentTarget.value;
    if (value === '') {
        setOpenRegisterForm(true);
    } else {
        setLoading(true);
        setId(value);
    }
};

export const getTagsMethod = (setLoading, setTags) => {
    setLoading(true);
    getTags(setLoading).then(response => {
        setLoading(false);
        setTags(response.data);
    });
};

export const getRegisteredContentMethod = (t, content, contents, id, handlePagination, handleCloseContentForm, author) => {
    const formatedDate = content.created[0].value.substr(0, 10);
    const currentAuthor = JSON.parse(get(process.env.REACT_APP_USER_LOGIN))
    const dateArr = formatedDate.split('-');
    const date = dateArr.join('/');
    const newContent = {
        type: content.type[0].target_id,
        status: `${content.status[0].value}`,
        title: content.title[0].value,
        created: date,
        nid: `${content.nid[0].value}`,
        uid: `${currentAuthor.name}`,
        field_image: content.field_image?.length > 0 ? content.field_image[0].url : '',
    };
    if (id !== '') {
        const filteredContent = contents.filter(item => item.nid === id);
        const index = contents.indexOf(filteredContent[0]);
        contents[index] = newContent;
    } else {
        contents.unshift(newContent);
    }
    handlePagination(contents, true, id !== '' ? t('translation:successEdited') : t('translation:successRegistered'));
    handleCloseContentForm();
};

export const handleCloseContentFormMethod = (
    setOpenRegisterForm,
    setId,
    setContent,
    setImgsAndUrls,
    setImgAndUrl,
    setVideosAndUrl,
    setVoicesAndUrl,
    setFilesPreviewUrl,
    setErrors,
    setContentType,
    setSelectedTags
) => {
    setOpenRegisterForm(false);
    setId(''); // id is filled when pushing edit button
    setContent({
        type: [
            {
                target_id: '',
            },
        ],
        title: [{value: ''}],
        body: [{value: ''}],
        field_alias_status: [
            {
                value: true,
            },
        ],
        field_domain_access: {},
        field_domain_all_affiliates: true,
        field_domain_source: {},
        field_field_galeries: {},
        field_files: [],
        field_image: [],
        field_sound: [],
        field_article_cat: [],
        field_tags: [],
        field_seo_list: [
            {
                value: {
                    title: '',
                    description: '',
                    keywords: '',
                },
            },
        ],
        field_video: [],
        status: [{value: false}],
        path: [
            {
                pathauto: true,
                alias: '',
            },
        ],
        field_home_slider: [
            {
                value: false,
            },
        ],
        field_sidebar_news_slider: [
            {
                value: true,
            },
        ],
        field_vote: [
            {
                value: 0,
            },
        ],
        comment: [
            {
                status: 2,
            },
        ],
        field_urgent_news: [
            {
                value: true,
            },
        ],
        field_chosen: [
            {
                value: true,
            },
        ],
        field_highlight: [
            {
                value: true,
            },
        ],
        field_special_mm: [
            {
                value: true,
            },
        ],
    });
    // ------------ for emtying files input when close modal -----------
    setImgsAndUrls([]);
    setImgAndUrl([]);
    setVideosAndUrl([]);
    setVoicesAndUrl([]);
    setFilesPreviewUrl([]);
    setErrors({});
    setContentType('');
    setSelectedTags([]);
};

export const getContentsMethod = (setLoading, handlePagination) => {
    setLoading(true);
    getContents(setLoading).then(response => {
        let contents = response.data;
        contents.reverse();
        setLoading(false);
        handlePagination(contents, true);
    });
};

export const handlePaginationMethod = (setSelectedCheckBoxes, action, setContentsState, setContents, contents, setTotalPage, setChunkContents) => {
    setContentsState && setContents(contents);
    let currentTotalPage = handleTotalPage(contents);
    setTotalPage(currentTotalPage);
    const chunked = chunkItem(contents);
    setChunkContents(chunked);
    setSelectedCheckBoxes([]);
    action && success(i18next.t(`translation:${action}`), i18next.t('translation:ok'));
};

export const defaultNewPage = {
    type: [
        {
            target_id: 'page',
        },
    ],
    field_con_type: [
        {
            value: 'page',
        },
    ],
    status: [
        {
            value: false,
        },
    ],
    field_seo_list: [
        {
            value: {
                title: '',
                description: '',
                keywords: '',
            },
        },
    ],

    // "comment": [
    //     {
    //         "status": 2
    //     }
    // ],
    title: [
        {
            value: '',
        },
    ],
    body: [
        {
            value: '',
            summary: '',
        },
    ],
    path: [
        {
            alias: '',
            pathauto: true,
        },
    ],
    field_alias_status: [
        {
            value: true,
        },
    ],
};

export const defaultNewArticle = {
    type: [
        {
            target_id: 'article',
        },
    ],
    field_con_type: [
        {
            value: 'article',
        },
    ],
    field_alias_status: [
        {
            value: true,
        },
    ],
    title: [
        {
            value: '',
        },
    ],
    body: [
        {
            value: '',
            summary: '',
        },
    ],
    status: [
        {
            value: false,
        },
    ],
    field_seo_list: [
        {
            value: {
                title: '',
                description: '',
                keywords: '',
            },
        },
    ],
    field_image: [],
    field_tags: [],
    publish_on: [],
    unpublish_on: [],
    comment: [
        {
            status: 2,
        },
    ],
    path: [
        {
            alias: '',
            pathauto: true,
        },
    ],
};

export const defaultNewNews = {
    type: [
        {
            target_id: 'news',
        },
    ],
    field_con_type: [
        {
            value: 'news',
        },
    ],
    title: [
        {
            value: '',
        },
    ],
    body: [
        {
            value: '',
            summary: '',
        },
    ],
    status: [
        {
            value: true,
        },
    ],
    field_seo_list: [
        {
            value: {
                title: '',
                description: '',
                keywords: '',
            },
        },
    ],
    path: [
        {
            alias: '',
            pathauto: true,
        },
    ],
    field_alias_status: [
        {
            value: true,
        },
    ],
    field_home_slider: [
        {
            value: false,
        },
    ],
    field_image: [],
    field_images_gallery: [],
    field_news_category: [],
    field_sidebar_news_slider: [
        {
            value: true,
        },
    ],
    field_states: [],
    field_subtitle: [
        {
            value: '',
        },
    ],
    field_tags: [],
    field_urgent_news: [
        {
            value: true,
        },
    ],
    comment: [
        {
            status: 2,
        },
    ],
    publish_on: [],
    unpublish_on: [],
};

export const defaultNewSounds = {
    type: [
        {
            target_id: 'sounds',
        },
    ],
    field_con_type: [
        {
            value: 'sounds',
        },
    ],
    title: [
        {
            value: '',
        },
    ],
    body: [
        {
            value: '',
            summary: '',
        },
    ],
    status: [
        {
            value: false,
        },
    ],
    field_seo_list: [
        {
            value: {
                title: '',
                description: '',
                keywords: '',
            },
        },
    ],
    field_image: [],
    field_tags: [],
    comment: [
        {
            status: 2,
        },
    ],
    field_chosen: [
        {
            value: true,
        },
    ],
    field_highlight: [
        {
            value: true,
        },
    ],
    field_sidebar_news_slider: [
        {
            value: true,
        },
    ],
    field_sound: [],
    field_sounds_category: [],
    field_special_mm: [
        {
            value: true,
        },
    ],
    path: [
        {
            alias: '',
            pathauto: true,
        },
    ],
    field_alias_status: [
        {
            value: true,
        },
    ],
};

export const defaultNewImages = {
    type: [
        {
            target_id: 'images',
        },
    ],
    field_con_type: [
        {
            value: 'images',
        },
    ],
    title: [
        {
            value: '',
        },
    ],
    body: [
        {
            value: '',
            summary: '',
        },
    ],
    status: [
        {
            value: false,
        },
    ],
    field_seo_list: [
        {
            value: {
                title: '',
                description: '',
                keywords: '',
            },
        },
    ],
    field_image: [],
    field_tags: [],
    comment: [
        {
            status: 2,
        },
    ],
    field_chosen: [
        {
            value: true,
        },
    ],
    field_highlight: [
        {
            value: true,
        },
    ],
    field_sidebar_news_slider: [
        {
            value: true,
        },
    ],
    field_images_category: [],
    field_special_mm: [
        {
            value: true,
        },
    ],
    field_images_gallery: [],
    path: [
        {
            alias: '',
            pathauto: true,
        },
    ],
    field_alias_status: [
        {
            value: true,
        },
    ],
};

export const defaultNewVideos = {
    type: [
        {
            target_id: 'videos',
        },
    ],
    field_con_type: [
        {
            value: 'videos',
        },
    ],
    title: [
        {
            value: '',
        },
    ],
    body: [
        {
            value: '',
            summary: '',
        },
    ],
    status: [
        {
            value: false,
        },
    ],
    field_seo_list: [
        {
            value: {
                title: '',
                description: '',
                keywords: '',
            },
        },
    ],
    field_image: [],
    field_tags: [],
    comment: [
        {
            status: 2,
        },
    ],
    field_chosen: [
        {
            value: true,
        },
    ],
    field_highlight: [
        {
            value: true,
        },
    ],
    field_sidebar_news_slider: [
        {
            value: true,
        },
    ],
    field_video: [],
    field_videos_category: [],
    field_special_mm: [
        {
            value: true,
        },
    ],
    field_images_gallery: [],
    path: [
        {
            alias: '',
            pathauto: true,
        },
    ],
    field_alias_status: [
        {
            value: true,
        },
    ],
};

export const defaultContent = {
    type: [
        {
            target_id: '',
        },
    ],
    field_alias_status: [
        {
            value: true,
        },
    ],
    title: [{value: ''}],
    body: [{value: ''}],
    field_domain_access: {},
    field_domain_all_affiliates: true,
    field_domain_source: [],
    field_field_galeries: [],
    field_files: [],
    field_image: [],
    field_rotitr: '',
    field_sotitr: '',
    field_sound: [],
    field_article_cat: {},
    field_tags: [],
    field_seo_list: [
        {
            value: {
                title: '',
                description: '',
                keywords: '',
            },
        },
    ],
    field_video: [],
    status: [{value: false}],
    path: [
        {
            pathauto: true,
            alias: '',
        },
    ],
    field_home_slider: [
        {
            value: false,
        },
    ],
    field_states: [],
    field_sidebar_news_slider: [
        {
            value: true,
        },
    ],
    field_vote: [
        {
            value: 0,
        },
    ],
    comment: [
        {
            status: 2,
        },
    ],
    field_urgent_news: [
        {
            value: true,
        },
    ],
    publish_on: [],
    unpublish_on: [],
    field_subtitle: [
        {
            value: '',
        },
    ],
    field_chosen: [
        {
            value: true,
        },
    ],
    field_highlight: [
        {
            value: true,
        },
    ],
    field_special_mm: [
        {
            value: true,
        },
    ],
    field_images_gallery: [],
};
