import React, {useState, useEffect, useContext} from "react";
import {withNamespaces} from 'react-i18next';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import {Box, Checkbox, Typography} from '@material-ui/core/index';
import {makeStyles} from "@material-ui/styles";

import userService from 'core/services/user.service';
import {danger, success} from "methods/swal";
import {useStyles} from 'assets/js/user/NewUser';
import UploadImg from "components/partials/UploadImg";
import AppContext from 'contexts/AppContext';
import UserContext from "contexts/UserContext";
import {StyledButton, StyledInput} from "assets/js/App";
import {primary} from "components/partials/Colors";
import {StyledLabel} from "assets/js/App";

const currentStyles = makeStyles(useStyles);

function NewUserComponent({t, id, userNameList, userMailList}) {
    const classes = currentStyles();
    const [keyRoles, setKeyRoles] = useState([]);
    const [valueRoles, setValueRoles] = useState();
    const appContext = useContext(AppContext);
    const userContext = useContext(UserContext);
    const [checkedRoles, setCheckRoles] = useState([]);
    const [confirmPass, setConfirmPass] = useState('');
    const [user, setUser] = useState({
        name: '',
        field_name: '',
        field_last_name: '',
        mail: '',
        pass: '',
        user_picture: '',
        roles: [],
        status: false,
    });
    const [sendIdAfterUpload, setSendIdAfterUpload] = useState('');
    const [defaultRoles, setDefaultRoles] = useState([]);
    const [gottenName, setGottenName] = useState('');
    const [gottenMail, setGottenMail] = useState('');
    const [currentImg, setCurrentImg] = useState([]);

    let getRoles = () => {
        userService.getRoles().then((response) => {
            let valueRoles = Object.values(response.data);
            let keyRoles = Object.keys(response.data);
            setKeyRoles(keyRoles);
            setValueRoles(valueRoles);
        }).catch((error) => {
            console.log(error);
        });
    }

    const saveUser = () => {debugger
        let valid = userContext.allValidation(user, confirmPass);
        if (valid) {
            debugger
            danger(t('translation:inputValidation'),t('translation:ok'));
            return;
        }
        debugger
        appContext.setLoading(true);
        userService.registerUser(user).then((response) => {debugger
            let item = response.data;
            appContext.setLoading(false);
            userContext.getRegisteredUser({
                uid: item.uid,
                name: item.name !== undefined ? item.name : '',
                field_name: item.field_name !== undefined ? item.field_name : '',
                field_last_name: item.field_last_name !== undefined ? item.field_last_name : '',
                roles_target_id: (item.roles === undefined ? 'بدون نقش' : item.roles.target_id),
                status: `${item.status}`,
                mail: item.mail,
                user_picture: item.user_picture !== undefined ? item.user_picture.url : ''
            });
            success(t('translation:successRegistered'), t('translation:ok'));
        }).catch((error) => {
            appContext.handleError(error);
        });
    }

    const editUser = () => {
        debugger
        userService.editUser(id, JSON.stringify(user)).then((response) => {
            appContext.setLoading(false);
            let item = response.data;
            let currentEditedUser = {
                uid: `${item.uid}`,
                user_picture: item.user_picture !== undefined ? item.user_picture.url : "",
                status: `${item.status}`,
                roles_target_id: item.roles !== undefined ? item.roles.target_id : "بدون نقش",
                name: item.name,
                field_name: item.field_name,
                field_last_name: item.field_last_name,
                mail: item.mail,
            };
            userContext.getEditedUser(currentEditedUser);
            success(t('translation:successRegistered'), t('translation:ok'));
        }).catch((error) => {
            appContext.handleError(error)
        });
    }

    const register = () => {
        if (id) {
            editUser();
        } else {
            saveUser();
        }
    }

    let removedFileId = () => {
        setUser(prevState => {
            return {...prevState, user_picture: ""}
        });
    }

    let saveFile = (file) => {
        let currentFile = file[0];
        userService.saveUserImage(currentFile)
            .then((response) => {
                    let url = `http://dash.webrbp.ir/sites/default/files/userpic/${response.data.filename}`;
                    setUser(prevState => {
                        return {
                            ...prevState,
                            user_picture: {
                                target_id: response.data.fid,
                                alt: '',
                                title: "",
                                width: 795,
                                height: 848,
                                target_type: "file",
                                target_uuid: response.data.uuid,
                                url: url
                            }
                        }
                    });
                    setSendIdAfterUpload({id: response.data.uuid, file: currentFile});
                    appContext.loading(false);
                }
            ).catch((error) => {
            userContext.setErrors(prevState => {
                return {...prevState, errorName: error}
            });
        });
    }

    let handleChange = (e, field) => {
        let currentName;
        currentName = e.currentTarget.value;
        if (currentName === "") {
            delete user[field];
        }
        setUser(prevState => {
            return {
                ...prevState, [field]: currentName
            }
        });
        if (field === 'name') {
            userContext.nameValidation(currentName, gottenName);
        }
        if (field === 'mail') {
            userContext.mailValidation(currentName, gottenMail);
        }
        if (field === 'pass') {
            userContext.passValidation(currentName, "edit");
        }
    }

    let handleConfirmPass = (e) => {
        let currentCofrimPass = e.target.value;
        setConfirmPass(currentCofrimPass);
        userContext.confirmPassValidation(user.pass, currentCofrimPass);
    }

    let handleCheckRoles = (e) => {
        // let checked = e.target.checked;
        // let currentValue = e.target.value;
        // let checkedRolesArr = [];
        // if (checked) {
        //     checkedRolesArr = [currentValue, ...checkedRoles];
        // } else {
        //     let newCheckedRoles = checkedRoles.filter(role => role !== currentValue);
        //     checkedRolesArr = [...newCheckedRoles];
        // }
        // setCheckRoles([...checkedRolesArr]);
        // let formatedRoles = [];
        // formatedRoles = checkedRolesArr.toString();
        // setUser((prevState) => {
        //     return {
        //         ...prevState, roles: {target_id: formatedRoles}
        //     }
        // });
        let checked = e.target.checked;
        let currentValue = e.target.value;
        let checkedRolesArr = [];
        if (checked) {
            checkedRolesArr = [currentValue, ...defaultRoles];
        } else {
            let newCheckedRoles = defaultRoles.filter(role => role !== currentValue);
            checkedRolesArr = [...newCheckedRoles];
        }
        setDefaultRoles([...checkedRolesArr]);

        // -----
        let formatedRoles = [];
        formatedRoles = checkedRolesArr.toString();
        setUser((prevState) => {
            return {
                ...prevState, roles: {target_id: formatedRoles}
            }
        });
    }

    let handleStatusChange = (e) => {
        let currentStatus = e.target.value;
        let status;
        if (currentStatus === "true") {
            status = true;
        } else {
            status = false;
        }
        setUser((prevState) => {
            return {
                ...prevState, status: status
            }
        });
    }

    let uploadedFile = (file) => {
        saveFile(file);
    }

    let getUser = () => {
        if (id) {
            appContext.setLoading(true);
            userService.getUser(id).then((response) => {
                appContext.setLoading(false);
                let user = response.data;
                let roles = user.roles !== undefined ? user.roles.target_id.split(',') : [];
                setDefaultRoles([...roles]);
                setUser({
                    uid: user.uid,
                    name: user.name === undefined ? '' : user.name,
                    field_name: user.field_name === undefined ? '' : user.field_name,
                    field_last_name: user.field_last_name === undefined ? '' : user.field_last_name,
                    mail: user.mail === undefined ? '' : user.mail,
                    user_picture: user.user_picture === undefined ? '' : user.user_picture,
                    roles: user.roles,
                    status: user.status === undefined ? '' : (user.status === true ? true : false)
                });
                setGottenName(response.data.name);
                setGottenMail(response.data.mail);
                setCurrentImg(user.user_picture === undefined ? [] : [user.user_picture.url]);
            }).catch((error) => {
                appContext.handleError(error);
            });
        }
    };


    useEffect(() => {
        getUser();
        getRoles();
    }, []);

    return (
        <>
            <Box className={classes.paper}>
                <Box className='block'>
                    <StyledLabel>{t('users:enter your name')}</StyledLabel>
                    <StyledInput value={user.field_name} type="text" placeholder={t('translation:name')}
                                 onChange={e => handleChange(e, "field_name")}/>
                    <StyledLabel>{t('users:enter your family')}</StyledLabel>
                    <StyledInput value={user.field_last_name} type="text" placeholder={t('users:family')}
                                 onChange={e => handleChange(e, "field_last_name")}/>
                    <Box className="inputBlock">
                        <StyledLabel>{t('users:enter your username')}</StyledLabel>
                        <StyledInput value={user.name} type="text" placeholder={t('users:username')}
                                     onChange={e => handleChange(e, "name")}/>
                        {userContext.errors.errorName.length ?
                            <Typography className="error">{userContext.errors.errorName.length}</Typography> : ''}
                        {userContext.errors.errorName.unique ?
                            <Typography className="error">{userContext.errors.errorName.unique}</Typography> : ''}
                    </Box>
                    <FormControl component="fieldset">
                        <label><Typography>{t('translation:status')}</Typography></label>
                        <RadioGroup aria-label="status" name="status" value={user.status}
                                    onChange={handleStatusChange}>
                            <FormControlLabel value={false} control={<Radio/>} label={t('translation:block')}/>
                            <FormControlLabel value={true} control={<Radio/>} label={t('translation:confirm')}/>
                        </RadioGroup>
                    </FormControl>
                    {/*-------------------------------------------------- role -----------------------------------------------------*/}
                    <Box className="role">
                        <label><Typography>{t('users:choose role')}</Typography></label>
                        <br/>
                        {valueRoles ?
                            Object.keys(valueRoles).map((keyName, index) => (
                                <FormControlLabel key={index}
                                                  control={<Checkbox onChange={(e) => handleCheckRoles(e)}
                                                                     name="roles"/>}
                                                  label={valueRoles[keyName]}
                                                  value={keyRoles[keyName]}
                                                  checked={defaultRoles.includes(keyRoles[index])}
                                />
                            ))
                            : ''}
                    </Box>
                </Box>
                <Box className='block'>
                    <Box className="inputBlock">
                        <StyledLabel>{t('users:enter your email')}</StyledLabel>
                        <StyledInput value={user.mail} type="email" placeholder={t('users:email')}
                                     onChange={e => handleChange(e, "mail")}/>
                        {userContext.errors.errorMail.mail ?
                            <Typography className="error">{userContext.errors.errorMail.mail}</Typography> : ''}
                        {userContext.errors.errorMail.unique ?
                            <Typography className="error">{userContext.errors.errorMail.unique}</Typography> : ''}
                    </Box>
                    <Box className="inputBlock">
                        <StyledLabel>{t('users:password')}</StyledLabel>
                        <StyledInput type="password" placeholder={t('users:password')}
                                     onChange={e => handleChange(e, "pass")} error={userContext.errors.pass}/>
                        {userContext.errors.errorPass.length ?
                            <Typography className="error">{userContext.errors.errorPass.length}</Typography> : ''}
                        {userContext.errors.errorPass.specialChar ?
                            <Typography className="error">{userContext.errors.errorPass.specialChar}</Typography> : ''}
                    </Box>
                    <Box className="inputBlock">
                        <StyledLabel>{t('users:confirm password')}</StyledLabel>
                        <StyledInput type="password" placeholder={t('users:confirm password')}
                                     onChange={e => handleConfirmPass(e)}
                                     error={userContext.errors.confirm_pass}/>
                        {userContext.errors.confirmPass.harmony ?
                            <Typography className="error">{userContext.errors.confirmPass.harmony}</Typography> : ''}
                    </Box>
                    {/*------------------------------------------------------ upload image -----------------------------------------*/}
                    <Box mt={4}>
                        <UploadImg multiple={false}
                                   title={t('translation:choosePic')}
                                   getFile={saveFile}
                                   imgs={currentImg}
                                   removedFileId={removedFileId}
                                   sendIdAfterUpload={sendIdAfterUpload}
                        />
                    </Box>
                    <Box mt={2}>
                        <StyledButton bg={primary} onClick={register}>
                            {t('translation:register')}
                        </StyledButton>
                    </Box>
                </Box>
            </Box>
        </>);
}

export default withNamespaces('users', 'translation')(NewUserComponent);
