let today = new Date();
let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let isoTomorrow = tomorrow.toISOString();

function toEnglishDigits(str) {
    const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
    const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"]
    const englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

    if (str === null) {
        return null
    } else {
        return str.split("").map(c => englishNumbers[persianNumbers.indexOf(c)] ||
            englishNumbers[arabicNumbers.indexOf(c)] || c).join("")
    }
}

export const validateDate = (field, date, contentsContext, t) => {
    let englishDate = toEnglishDigits(date);
    if (englishDate === null) { //delete field publish and unpublish from content
        contentsContext.setContent(prevState => {
            return {
                ...prevState,[field]:[]
            }
        });
        contentsContext.setErrors(prevState => {
            delete prevState['publish_on'];
            delete prevState['unpublish_on'];
            return {...prevState}
        });
    } else {
        if (englishDate < isoTomorrow) {//check times be for future
            if (field === "publish_on") {
                contentsContext.setErrors(prevState => {
                    return {...prevState, publish_on: t('contents:furtherDate')}
                });
            } else {
                contentsContext.setErrors(prevState => {
                    return {...prevState, unpublish_on: t('contents:furtherDate')}
                });
            }
        } else {
            contentsContext.setErrors(prevState => {
                delete prevState[field];
                return {...prevState}
            });
            if (field === 'unpublish_on' && contentsContext.content.publish_on.length > 0) {
                if (englishDate < contentsContext.content.publish_on[0].value) {
                    contentsContext.setErrors(prevState => {
                        return {...prevState, unpublish_on: t('contents:unPublishAfterPublishError')}
                    });
                } else {
                    contentsContext.setErrors(prevState => {
                        delete prevState['unpublish_on']
                        return {...prevState}
                    });
                }
            } else if (field === 'publish_on' && contentsContext.content.unpublish_on > 0) {
                if (englishDate > contentsContext.content.unpublish_on[0].value) {
                    contentsContext.setErrors(prevState => {
                        return {...prevState, unpublish_on: t('contents:unPublishAfterPublishError')}
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
