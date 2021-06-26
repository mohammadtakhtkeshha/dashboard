import {editComment} from 'core/services/comment.service';
import {addRole, editRole} from 'core/services/role.service';
import {success} from 'methods/swal';
import i18next from 'i18next';

export const handleChangeCommentMethod = (e, setComment, field) => {
    let currentValue;
    if (field === 'comment_body') {
        currentValue = e;
    } else {
        currentValue = e.currentTarget.value;
    }
    setComment(prevState => {
        return {...prevState, [field]: [{value: currentValue}]};
    });
};

export const handleChangeStatusMethod = (e, setComment) => {
    const status = e.currentTarget.value === 'true' ? true : false;
    setComment(prevState => {
        return {...prevState, status: [{value: status}]};
    });
};

export const editCommentMethod = (
    id,
    comment,
    setLoading,
    handlePagination,
    open,
    unconfirmedComments,
    publishedComments,
    commentStatus,
    setOpen
) => {
    const getCurrentCommentInList =
        commentStatus === 'published' ? publishedComments.filter(item => item.cid === id) : unconfirmedComments.filter(item => item.cid === id);
    const currentStatus = comment.status[0].value;
    editComment(id, comment, setLoading, handlePagination).then(response => {
        const curComment = response.data;
        const changedComment = {
            subject: curComment.subject[0].value,
            last_updated: curComment.created[0].value,
            field_image: getCurrentCommentInList[0].field_image,
            link: `${process.env.REACT_APP_API_URL}/comment/${curComment.cid[0].value}`,
            status: curComment.status[0].value,
            cid: `${curComment.cid[0].value}`,
            name: getCurrentCommentInList[0].name,
            view_node: `${process.env.REACT_APP_PICTURE_URL}/${curComment.entity_id[0].url}`,
        };
        if ((commentStatus === 'published' && currentStatus === false) || (commentStatus === 'unconfirmed' && currentStatus === true)) {
            //if status has changed
            if (commentStatus === 'published') {
                const filteredComment = publishedComments.filter(item => item.cid === id);
                const currentIndex = publishedComments.indexOf(filteredComment[0]);
                publishedComments.splice(currentIndex, 1);
                unconfirmedComments.push(changedComment);
                handlePagination(publishedComments, i18next.t('translation:successEdited'), true, 'published');
                handlePagination(unconfirmedComments, false, true, 'unconfirmed');
            } else {
                const filteredComment = unconfirmedComments.filter(item => item.cid === id);
                const currentIndex = unconfirmedComments.indexOf(filteredComment[0]);
                unconfirmedComments.splice(currentIndex, 1);
                publishedComments.push(changedComment);
                handlePagination(unconfirmedComments, i18next.t('translation:successEdited'), true, 'unconfirmed');
                handlePagination(publishedComments, false, true, 'published');
            }
        } else {
            if (comment.status[0].value) {
                const filteredComment = publishedComments.filter(item => item.cid === id);
                const currentIndex = publishedComments.indexOf(filteredComment[0]);
                publishedComments[currentIndex] = changedComment;
                handlePagination(publishedComments, i18next.t('translation:successEdited'), true, 'published');
            } else {
                const filteredComment = unconfirmedComments.filter(item => item.cid === id);
                const currentIndex = unconfirmedComments.indexOf(filteredComment[0]);
                unconfirmedComments[currentIndex] = changedComment;
                handlePagination(unconfirmedComments, i18next.t('translation:successEdited'), true, 'unconfirmed');
            }
        }
    });
    setOpen({show: false, id: ''});
};

export const editAndAddRoleMethod = (e, setLoading, role, faRoles, id, error, handleClose, setFaRoles, setEnRoles) => {
    setLoading(true);
    if (id === '') {
        //for adding
        if (error.unique !== '' && error.unique !== '') {
            addRole(setLoading, role).then(resposne => {
                setFaRoles(prevState => {
                    return [...prevState, role.role];
                });
                const enRole = JSON.parse(resposne.data).id;
                setEnRoles(prevState => {
                    return [...prevState, enRole];
                });
                setLoading(false);
                success(i18next.t('translation:successRegistered'), i18next.t('translation:ok'));
                handleClose();
            });
        }
    } else {
        editRole(id, role, setLoading).then(resposne => {
            setFaRoles(prevState => {
                const currentIndex = prevState.indexOf(id);
                prevState.splice(currentIndex, 1);
                return [...prevState, role.role];
            });
            setLoading(false);
            success(i18next.t('translation:successEdited'), i18next.t('translation:ok'));
            handleClose();
        });
    }
};

const nameUniqueValidation = (value, setError) => {
    if (value.length > 0) {
        setError(prevState => {
            prevState.required = false;
            return {...prevState};
        });
    } else {
        setError(prevState => {
            prevState.required = true;
            return {...prevState};
        });
    }
};

const nameRequireValidation = (faRoles, value, setError) => {
    let curStatus = false;
    if (faRoles.includes(value)) {
        curStatus = true;
    } else {
        curStatus = false;
    }
    setError(prevState => {
        prevState.unique = curStatus;
        return {...prevState};
    });
};

export const handleChangeNameMethod = (e, setRole, setError, faRoles) => {
    const value = e.currentTarget.value;
    nameUniqueValidation(value, setError);
    nameRequireValidation(faRoles, value, setError);
    setRole(prevState => {
        return {...prevState, role: value};
    });
};

export const clickPermissionButtonMethod = (e, setShowPermission, permissions, setRole) => {
    const arr = e.currentTarget.value.split('-');
    const currentStatus = arr[0];
    const currentIndex = arr[1];
    const permGroup = arr[2];
    const subGroup = permissions.find(item => item.groupName === permGroup);
    let currentArrPermissions = [];
    for (let item of subGroup.subGroups) {
        for (let per of item.permissions) {
            currentArrPermissions.push(per.permission);
        }
    }
    setRole(prevState => {
        for (let prev of prevState.permissions) {
            for (let checkedPerm of currentArrPermissions) {
                if (prev.permisssion === checkedPerm) {
                    currentStatus === 'complete' ? (prev.status = 1) : (prev.status = 0);
                }
            }
        }
        return {...prevState};
    });
    setShowPermission(prevState => {
        for (let index in prevState) {
            if (index === currentIndex) {
                prevState[index].status = currentStatus;
            }
        }
        return [...prevState];

    });
};

const findIndexOfParent = (permissions, value) => {
    for (let permission in permissions) {
        let index = permission;
        for (let item of permissions[permission].subGroups) {
            for (let part of item.permissions) {
                if (part.permission === value) {
                    return index;
                }
            }
        }
    }
};

export const changePermissionCheckBoxMethod = (e, setRole, permissions, setShowPermission) => {
    const checked = e.currentTarget.checked ? 1 : 0;
    const value = e.currentTarget.value;
    let currIndex = findIndexOfParent(permissions, value);
    if (checked === 1) {
        // ----------------------- if all checkboxes checked -------------------------
        setShowPermission(prevState => {
            prevState[currIndex].checked++;
            if (prevState[currIndex].num === prevState[currIndex].checked) {
                return [...prevState, (prevState[currIndex].status = 'complete')];
            } else {
                return [...prevState];
            }
        });
    } else {
        setShowPermission(prevState => {
            prevState[currIndex].checked--;
            return [...prevState];
        });
    }

    setRole(prevState => {
        for (let item of prevState.permissions) {
            if (item.permisssion === value) {
                item.status = checked;
            }
        }
        return {...prevState};
    });
};

const countOfPermissions = permission => {
    let count = 0;
    for (let item of permission.subGroups) {
        count += item.permissions.length;
    }
    return count;
};

export const selectedButtonMethod = (permissions, setShowPermission) => {
    let arr = [];
    if (permissions.length > 0) {
        for (let item in permissions) {
            let count = countOfPermissions(permissions[item]);
            arr.push({index: parseInt(item), status: 'disactive', num: count, checked: 0});
        }
    }
    setShowPermission(arr);
};

export const handleErrorMethod = (lengthOfRole,setError) => {
    if (lengthOfRole > 0) {
        setError(prevState => {
            return {...prevState,required:false}
        })
    } else {
        setError(prevState => {
            return {...prevState,required:true}
        })
    }
}

export const checkIncludes = (arr, value) => {
    for (let item of arr) {
        if (item.permisssion === value) {
            return item.status
        }
    }
}


