import {saveUserImage, registerUser, editUser, getUser} from 'core/services/user.service';
import {success} from 'methods/swal';
import {isObjectEmpty} from 'methods/commons';
import i18next from 'i18next';

function checkPassWithConfirm(pass, confirmPass) {
    let harmony = '';
    if (confirmPass !== pass) {
        harmony = 'عدم همخوانی پسورد ها!';
    }
    return {harmony};
}

/*Description:check if mail has correct format
 *@return :object
 * */
function checkMail(mail, exMail, userMailList) {
    // let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    let valid = '';
    let unique = '';
    let required = '';
    if (mail.length === 0) {
        required = i18next.t('translation:requiredValid');
    } else {
        if (!regex.test(mail)) {
            valid = i18next.t('translation:mailValidation');
        }
        let currentMailList = [];
        if (exMail !== '') {
            //for edit
            for (let item of userMailList) {
                currentMailList.push(item);
            }
            let currentIndex = currentMailList.indexOf(exMail);
            currentMailList.splice(currentIndex, 1);
        } else {
            currentMailList = userMailList;
        }
        if (currentMailList.includes(mail)) {
            unique = 'ایمیل وارد شده تکراری میباشد!';
        }
    }
    return {valid, unique, required};
}

/*Description:check if password length is more than 8 charachter and is valid
 *@return :object
 * */
function checkPass(pass, type, id) {
    let required = '';
    let valid = '';
    if (id === '') {
        //not to be edit
        if (pass.length < 8) {
            required = 'حداقل تعداد کاراکترها 8 میباشد!';
        }
    }
    // let regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:؟|,\.?~_+-=\|])/
    let regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:؟|,.?~_+-=|])/;
    if (!regex.test(pass)) {
        valid = 'شامل اعداد حروف بزرگ و کوچک و علامت ها خاص نمیباشد!';
    }
    return {required, valid};
}

/*Description:check if name is unique more than 3 charachter
 *@return :object
 * */
function checkName(name, exName, userNameList) {
    let required = '';
    let unique = '';
    let currentNameList = [];
    if (exName !== '') {
        //for edit
        for (let item of userNameList) {
            currentNameList.push(item);
        }
        let currentIndex = currentNameList.indexOf(exName);
        currentNameList.splice(currentIndex, 1);
    } else {
        currentNameList = userNameList;
    }
    if (name.length < 3) {
        required = i18next.t('translation:3LeastNumber');
    } else if (currentNameList.includes(name)) {
        unique = i18next.t('translation:uniqueValidation');
    }
    debugger
    return {unique, required};
}

/*Description:upload img in server and change user like below:
 *@return : [
 *        {
 *            "target_id": 82,
 *            "alt": "",
 *            "title": "",
 *            "width": 100,
 *            "height": 100,
 *            "target_type": "file",
 *            "target_uuid": "a6302347-d024-404f-b435-1a14e165bbae",
 *            "url": "http://yas2.webrbp.ir/sites/default/files/pictures/1399-07/ProfilePhoto.jpg"
 *        }
 *    ]
 * and set imgIdAndUrl
 * */

export const uploadImgMethod = (e, setUser, setImgAndUrl, setLoading) => {
    setLoading(true);
    saveUserImage(e, setLoading).then(response => {
        setLoading(false);
        const item = response.data;
        const baseUrl = process.env.REACT_APP_PICTURE_URL;
        let url = baseUrl + item.uri[0].url;
        setUser(prevState => {
            return {
                ...prevState,
                user_picture: [
                    {
                        target_id: response.data.fid[0].value,
                        target_type: 'file',
                        target_uuid: response.data.uuid[0].value,
                        url: url,
                    },
                ],
            };
        });
        setImgAndUrl([{id: item.fid, url: url}]);
    });
};

export const saveUserMethod = (user, setLoading, getRegisteredUser, errors, closeForm) => {
    if (isObjectEmpty(errors)) {
        setLoading(true);
        registerUser(user, setLoading).then(response => {
            let item = response.data;
            setLoading(false);
            let rolesArray = [];
            for (let role of item.roles) {
                rolesArray.push(role.target_id);
            }
            let stringRoles = rolesArray.toString();
            getRegisteredUser({
                user_id: item.uid[0].value,
                user_name: item.name[0] !== undefined ? item.name[0].value : '',
                firs_name: item.field_name[0] !== undefined && item.field_name.length > 0 ? item.field_name[0].value : '',
                last_name: item.field_last_name.length > 0 && item.field_last_name[0] !== undefined ? item.field_last_name[0].value : '',
                roles: stringRoles,
                status: `${item.status[0].value}`,
                mail: item.mail.length > 0 && item.mail[0] !== undefined ? item.mail[0].value : '',
                picture: item.user_picture[0] !== undefined ? item.user_picture[0].url : '',
            });
            success(i18next.t('translation:successRegistered'), i18next.t('translation:ok'));
            closeForm();
        });
    }
};

export const editUserMethod = (id, user, setLoading, getEditedUser, errors) => {
    if (isObjectEmpty(errors)) {
        setLoading(true);
        editUser(id, JSON.stringify(user), setLoading).then(response => {
            setLoading(false);
            let item = response.data;
            let rolesArray = [];
            for (let role of item.roles) {
                rolesArray.push(role.target_id);
            }
            let stringRoles = rolesArray.toString();
            let currentEditedUser = {
                user_id: `${item.uid[0].value}`,
                picture: item.user_picture.length > 0 ? item.user_picture[0].url : '',
                status: `${item.status[0].value}`,
                roles: stringRoles,
                user_name: item.name[0].value,
                firs_name: item.field_name.length > 0 ? item.field_name[0].value : '',
                last_name: item.field_last_name.length > 0 ? item.field_last_name[0].value : '',
                mail: item.mail[0].value,
            };
            getEditedUser(currentEditedUser);
            success(i18next.t('translation:successEdited'), i18next.t('translation:ok'));
        });
    }
};

export const removedFileIdMethod = (setUser, setImgAndUrl) => {
    setUser(prevState => {
        return {...prevState, user_picture: []};
    });
    setImgAndUrl([]);
};

export const nameValidation = (name, exName, userNameList, setErrors) => {
    const {unique, required} = checkName(name, exName, userNameList);
    setErrors(prevState => {
        if (required !== '') {
            return {...prevState, name: {required: required}};
        } else if (unique !== '') {
            prevState.name && delete prevState.name.required;
            return {...prevState, name: {unique: unique}};
        } else {
            prevState.name && delete prevState.name;
            return {...prevState};
        }
    });
};

export const mailValidation = (mail, exMail, userMailList, setErrors) => {
    const {valid, unique, required} = checkMail(mail, exMail, userMailList);
    setErrors(prevState => {
        debugger
        if (required !== '') {
            return {
                ...prevState,
                mail: {required: required},
            };
        } else if (valid !== '') {
            prevState.mail && delete prevState.mail.required;
            return {
                ...prevState,
                mail: {valid: valid},
            };
        } else if (unique !== '') {
            prevState.mail && delete prevState.mail;
            return {
                ...prevState,
                mail: {unique: unique},
            };
        } else {
            delete prevState.mail;
            return {...prevState};
        }
    });
};

const confirmPassValidation = (pass, confirmPass, setErrors) => {
    let {harmony} = checkPassWithConfirm(pass, confirmPass);
    if (harmony !== '') {
        setErrors(prevState => {
            return {
                ...prevState,
                confirmPass: {harmony: harmony},
            };
        });
    } else {
        setErrors(prevState => {
            delete prevState.confirmPass;
            return {...prevState};
        });
    }
};

const passValidation = (password, type, setErrors, id) => {
    const {required, valid} = checkPass(password, type, id);
    setErrors(prevState => {
        if (required !== '') {
            return {...prevState, pass: {required: required}};
        } else if (valid !== '') {
            // delete prevState.pass.required
            return {...prevState, pass: {valid: valid}};
        } else {
            delete prevState.pass;
            return {...prevState};
        }
    });
    return valid;
};

export const handleChangeMethod = (e, user, id, field, setUser, gottenMail, gottenName, userNameList, setErrors, userMailList, confirmPass) => {
    let currentName;
    currentName = e.currentTarget.value;
    if (currentName === '') {
        delete user[field];
    }
    setUser(prevState => {
        return {
            ...prevState,
            [field]: [{value: currentName}],
        };
    });
    if (field === 'name') {
        nameValidation(currentName, gottenName, userNameList, setErrors);
    }
    if (field === 'mail') {
        mailValidation(currentName, gottenMail, userMailList, setErrors);
    }
    if (field === 'pass') {
        passValidation(currentName, 'edit', setErrors, id);
        confirmPassValidation(currentName, confirmPass, setErrors);
    }
};

export const handleConfirmPassMethod = (e, setConfirmPass, user, setErrors) => {
    let currentCofrimPass = e.target.value;
    setConfirmPass(currentCofrimPass);
    const currentPass = user.pass !== undefined ? user.pass[0].value : '';
    confirmPassValidation(currentPass, currentCofrimPass, setErrors);
};

export const handleCheckRolesMethod = (e, user, defaultRoles, enRoles, faRoles, setDefaultRoles, setUser) => {
    let checked = e.target.checked;
    let currentValue = e.target.value;
    let checkedRolesArr = [];
    let userEnRoles = user.roles;
    // let userFaRolesArr = user.field_fa_role[0].value === "" ? [] : user.field_fa_role[0].value.split(',')
    if (checked) {
        checkedRolesArr = [enRoles[currentValue], ...defaultRoles];
        userEnRoles.push({
            target_id: enRoles[currentValue],
            target_type: 'user_role',
        });
        // userFaRolesArr.push(faRoles[currentValue])
    } else {
        let newCheckedRoles = defaultRoles.filter(role => role !== enRoles[currentValue]);
        const newRoles = userEnRoles.filter(role => role.target_id !== enRoles[currentValue]);
        userEnRoles = newRoles;

        // let newFaCheckedRoles = faRoles.filter(role => role !== faRoles[currentValue])
        // userFaRolesArr = newFaCheckedRoles
        checkedRolesArr = [...newCheckedRoles];
    }
    setDefaultRoles([...checkedRolesArr]);

    setUser(prevState => {
        return {
            ...prevState,
            roles: userEnRoles,
            // ,field_fa_role: [{value: userFaRolesArr.toString()}]
        };
    });
};

export const handleStatusChangeMethod = (e, setUser) => {
    let currentStatus = e.target.value;
    let status;
    if (currentStatus === 'true') {
        status = true;
    } else {
        status = false;
    }
    setUser(prevState => {
        return {
            ...prevState,
            status: [{value: status}],
        };
    });
};

export const getUserMethod = (setLoading, id, setDefaultRoles, setUser, setGottenMail, setImgAndUrl, setGottenName) => {
    if (id) {
        setLoading(true);
        getUser(id, setLoading).then(response => {
            setLoading(false);
            let user = response.data;
            let roles = user.roles;
            let enRolesArr = [];
            for (let role of roles) {
                enRolesArr.push(role.target_id);
            }
            setDefaultRoles([...enRolesArr]);
            setUser({
                uid: [{value: user.uid[0].value}],
                name: user.name[0].value === undefined ? '' : [{value: user.name[0].value}],
                field_name: user.field_name.length > 0 ? (user.field_name[0].value === undefined ? '' : [{value: user.field_name[0].value}]) : '',
                field_last_name:
                    user.field_last_name.length > 0 ? (user.field_last_name[0].value === undefined ? '' : [{value: user.field_last_name[0].value}]) : '',
                mail: user.mail.length > 0 ? (user.mail[0].value === undefined ? '' : [{value: user.mail[0].value}]) : '',
                user_picture: user.user_picture.length === 0 ? [] : user.user_picture,
                // {target_id: 775, target_type: "file", target_uuid: "71cd6999-47b5-4334-9a5a-13b80b19bf50", url: "http://sitesazyas.rbp/web/sites/default/files/pictures/1399-10/images_0.jpg"}
                roles: user.roles,
                status: user.status[0].value === undefined ? '' : user.status[0].value === true ? [{value: true}] : [{value: false}],
            });
            if (user.mail.length > 0) {
                setGottenMail(user.mail[0].value);
            }
            setGottenName(user.name[0].value);
            let currentImgAndUrl;
            if (user.user_picture.length !== 0) {
                currentImgAndUrl = [{id: user.user_picture[0].target_id, url: user.user_picture[0].url}];
            } else {
                currentImgAndUrl = [];
            }
            setImgAndUrl(currentImgAndUrl);
        });
    }
};
