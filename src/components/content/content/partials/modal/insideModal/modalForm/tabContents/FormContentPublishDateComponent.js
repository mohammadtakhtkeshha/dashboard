let today = new Date();
let currentDate = today.toISOString();
let tomorrow =new Date(today.getFullYear(),today.getMonth(),today.getDate()+1);
let isoTomorrow= tomorrow.toISOString();

export const validateDate = (field,date,newContentContext,t) => {
    if (date === null) { //delete field publish and unpublish from content
        newContentContext.setContent(prevState => {
            delete prevState[field];
            return {
                ...prevState
            }
        });
        newContentContext.setErrors(prevState => {
            delete prevState['publish_on'];
            delete prevState['unpublish_on'];
            return {...prevState}
        });
    } else {
        if (date < isoTomorrow) {//check times be for future
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
                        delete prevState['unpublish_on']
                        return {...prevState}
                    });
                }
            } else if (field === 'publish_on' && newContentContext.content.unpublish_on !== undefined) {
                if (date > newContentContext.content.unpublish_on) {
                    newContentContext.setErrors(prevState => {
                        return {...prevState, unpublish_on: t('contents:unPublishAfterPublishError')}
                    });
                } else {
                    newContentContext.setErrors(prevState => {
                        delete prevState['unpublish_on']
                        return {...prevState}
                    });
                }
            } else {
                newContentContext.setErrors(prevState => {
                    delete prevState['unpublish_on']
                    return {...prevState}
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

export const handleStatusChangeMethod = (e,newContentContext) => {
    const status = e.currentTarget.value;
    newContentContext.setContent(prevState => {
        return {
            ...prevState, status: (status === "true" ? true : false),
        }
    });
}

export default {validateDate,handleStatusChangeMethod}
