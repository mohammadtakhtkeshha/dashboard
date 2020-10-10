let today = new Date();
let currentDate = today.toISOString();

export const validateDate = (field,date,newContentContext,t) => {
    if (date === null) { //delete field publish and unpublish from content
        newContentContext.setContent(prevState => {
            delete prevState[field];
            return {
                ...prevState
            }
        });
        newContentContext.setErrors(prevState => {
            return {...prevState, [field]: ''}
        });
    } else {
        if (date < currentDate) {//check times be for future
            if (field === "publish_on") {
                newContentContext.setErrors(prevState => {
                    return {...prevState, publish_on: t('contents:furtherDate')}
                });
            } else {
                newContentContext.setErrors(prevState => {
                    return {...prevState, unpublish_on: t('contents:furtherDate')}
                });
            }
        } else {
            newContentContext.setErrors(prevState => {
                delete prevState[field];
                return {...prevState}
            });
            if (field === 'unpublish_on' && newContentContext.content.publish_on !== undefined) {
                if (date < newContentContext.content.publish_on) {
                    newContentContext.setErrors(prevState => {
                        return {...prevState, unpublish_on: t('contents:unPublishAfterPublishError')}
                    });
                } else {
                    newContentContext.setErrors(prevState => {
                        return {...prevState, unpublish_on: ''}
                    });
                }
            } else if (field === 'publish_on' && newContentContext.content.unpublish_on !== undefined) {
                if (date > newContentContext.content.unpublish_on) {
                    newContentContext.setErrors(prevState => {
                        return {...prevState, unpublish_on: t('contents:unPublishAfterPublishError')}
                    });
                } else {
                    newContentContext.setErrors(prevState => {
                        return {...prevState, unpublish_on: ''}
                    });
                }
            } else {
                newContentContext.setErrors(prevState => {
                    return {...prevState, unpublish_on: ''}
                });
            }
        }
        newContentContext.setContent(prevState => {
            return {
                ...prevState, [field]: date
            }
        });
    }
}

export const handleAffiliateChangeMethod = (e,newContentContext) => {
    const checked = e.currentTarget.checked;
    newContentContext.setContent(prevState => {
        return {
            ...prevState, field_domain_all_affiliates: checked
        }
    });
}

export const handleStatusChangeMethod = (e,newContentContext) => {
    const status = e.currentTarget.value;
    newContentContext.setContent(prevState => {
        return {
            ...prevState, status: (status === "true" ? true : false),
        }
    });
}

export default {validateDate,handleAffiliateChangeMethod,handleStatusChangeMethod}