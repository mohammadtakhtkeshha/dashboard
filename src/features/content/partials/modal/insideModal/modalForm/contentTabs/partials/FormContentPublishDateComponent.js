import {toEnglishDigits} from "methods/commons";
import i18next from "i18next";

let today = new Date();
let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let isoTomorrow = tomorrow.toISOString();

export const validateDate = (field, date, contentsContext) => {
    let englishDate = toEnglishDigits(date);
    if (englishDate === null) { //delete field publish and unpublish from content
        contentsContext.setContent(prevState => {
            return {
                ...prevState, [field]: []
            }
        });
        contentsContext.setErrors(prevState => {
            delete prevState[field];
            return {...prevState}
        });
        if (contentsContext.content.unpublish_on.length > 0 && field === 'publish_on') {
            contentsContext.setErrors(prevState => {
                return {...prevState, unpublish_on: i18next.t('contents:firstPulishDateThenUnpublish')}
            });
        }
    } else {
        if (englishDate < isoTomorrow) {//check times be for future
            contentsContext.setErrors(prevState => {
                return {...prevState, [field]: i18next.t('contents:furtherDate')}
            });
        } else {
            contentsContext.setErrors(prevState => {
                delete prevState[field];
                return {...prevState}
            });
            if (field === 'unpublish_on' && contentsContext.content.publish_on.length === 0) {
                contentsContext.setErrors(prevState => {
                    return {...prevState, unpublish_on: i18next.t('contents:firstPulishDateThenUnpublish')}
                });
            } else if (field === 'unpublish_on' && contentsContext.content.publish_on.length > 0) {
                if (englishDate < contentsContext.content.publish_on[0].value) {
                    contentsContext.setErrors(prevState => {
                        return {...prevState, unpublish_on: i18next.t('contents:unPublishAfterPublishError')}
                    });
                } else {
                    contentsContext.setErrors(prevState => {
                        delete prevState['unpublish_on']
                        return {...prevState}
                    });
                }
            } else if (field === 'publish_on' && contentsContext.content.unpublish_on.length > 0) {
                if (englishDate > contentsContext.content.unpublish_on[0].value) {
                    contentsContext.setErrors(prevState => {
                        return {...prevState, unpublish_on: i18next.t('contents:unPublishAfterPublishError')}
                    });
                } else {
                    contentsContext.setErrors(prevState => {
                        delete prevState['unpublish_on']
                        return {...prevState}
                    });
                }
            } else {
                contentsContext.setErrors(prevState => {
                    delete prevState['unpublish_on']
                    return {...prevState}
                });
            }
        }
        contentsContext.setContent(prevState => {
            return {
                ...prevState, [field]: [{value: englishDate}]
            }
        });
    }
}

export const handleStatusChangeMethod = (e, contentsContext) => {
    const status = e.currentTarget.value;
    contentsContext.setContent(prevState => {
        return {
            ...prevState, status: [{value: (status === "true" ? true : false)}],
        }
    });
}

export const handleShowInMainPageMethod = (e, contentsContext) => {
    const status = e.currentTarget.value;
    contentsContext.setContent(prevState => {
        return {
            ...prevState, "field_home_slider": [
                {
                    "value": (status === "true" ? true : false)
                }

            ],
        }
    });
}

export const handleShowInSidebarMethod = (e, contentsContext) => {
    const status = e.currentTarget.value;
    contentsContext.setContent(prevState => {
        return {
            ...prevState, "field_sidebar_news_slider": [
                {
                    "value": (status === "true" ? true : false)
                }

            ],
        }
    });
}
