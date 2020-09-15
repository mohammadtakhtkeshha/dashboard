import React, {useState, useEffect, useContext} from "react";
import {withNamespaces} from "react-i18next";

import {Box, Checkbox, Paper} from '@material-ui/core/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from "@material-ui/core/styles/index";
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {Typography} from "@material-ui/core";

import ButtonComponent from 'components/partials/ButtonComponent'
import Input from "components/partials/inputComponent";
import UploadImg from "components/partials/UploadImg";
import {primary, white} from 'components/partials/Colors';
import userService from "core/services/user.service";
import { success} from "methods/swal";
import editUserStyle from 'assets/js/user/editUser'
import AppContext from 'contexts/AppContext';
import UserContext from "contexts/UserContext";

const useStyles = makeStyles(editUserStyle);

function EditUserComponent({t, id, keyRoles, valueRoles, editedUser}) {
    const classes = useStyles();
    const appContext = useContext(AppContext);
    const userContext = useContext(UserContext);
    const [defaultRoles, setDefaultRoles] = useState([]);
    const [currentImg, setCurrentImg] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [user, setUser] = useState({
        name: '',
        mail: '',
        roles: [],
        field_last_name: '',
        field_name: '',
        pass: '',
        confirm_pass: '',
        user_picture: '',
        status: '',
        uid: '',
    });
    const [sendIdAfterUpload, setSendIdAfterUpload] = useState('');
    const [gottenName,setGottenName]=useState('');
    const [gottenMail,setGottenMail]=useState('');

    useEffect(() => {
        getUser();
    }, []);

    let removedFileId = () => {
        setUser(prevState => {
            return {
                ...prevState, user_picture: ""
            }
        });
        setCurrentImg('');
    }

    let getUser = () => {
        appContext.toggleLoading(true);
        userService.getUser(id).then((response) => {
            appContext.toggleLoading(false);
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
                roles: user.roles === "" ? user.roles : [],
                status: user.status === undefined ? '' : (user.status === true ? true : false)
            });
            setGottenName(response.data.name);
            setGottenMail(response.data.mail);
            setCurrentImg(user.user_picture === undefined ? '' : user.user_picture.url);
        }).catch((error) => {
            appContext.handleError(error);
        });
    };

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
            userContext.nameValidation(currentName,gottenName);
        }
        if (field === 'mail') {
            userContext.mailValidation(currentName,gottenMail);
        }
        if (field === 'pass') {
            userContext.passValidation(currentName,"edit");
        }
    };

    let handleCheckRoles = (e) => {
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
        // -----
    };

    let handleConfirmPass = (e) => {
        let currentCofrimPass = e.target.value;
        setConfirmPass(currentCofrimPass);
        userContext.confirmPassValidation(user.pass,currentCofrimPass);
    };

    let handleStatusChange = (e) => {
        let currentStatus = e.target.value;
        let status;
        if (currentStatus === "false") {
            status = false;
        } else {
            status = true;
        }
        setUser((prevState) => {
            return {
                ...prevState, status: status
            }
        });
    };

    let saveUser = () => {
        appContext.toggleLoading(true);
        let id = user.uid;
        let nameValid = userContext.nameValidation(user.name,gottenName);
        let passValid = userContext.passValidation(user.pass?user.pass:'',"edit");
        let mail = userContext.mailValidation(user.mail,gottenMail);
        let confirmPas = userContext.confirmPassValidation(user.pass?user.pass:'',confirmPass);
        if (nameValid || passValid || mail || confirmPas) {
            appContext.toggleLoading(false);
            return
        }
        userService.editUser(id, JSON.stringify(user)).then((response) => {
            appContext.toggleLoading(false);
            let item = response.data;
            let currentEditedUser = {
                uid: `${item.uid}`,
                user_picture: item.user_picture !== undefined ? item.user_picture.url : "",
                status: `${item.status}`,
                role: item.roles !== undefined ? item.roles.target_id : "",
                name: item.name,
                field_name: item.field_name,
                field_last_name: item.field_last_name,
                mail: item.mail,
            };
            editedUser(currentEditedUser);
            setUser(currentEditedUser);
            success(t('translation:successRegistered'), t('translation:ok'));
        }).catch((error) => {
            appContext.handleError(error)
        });

    };

    let saveFile = (file) => {
        let currentFile = file[0];
        userService.saveUserImage(currentFile).then(
            (response) => {
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
            }
        ).catch((error) => {
            appContext.handleError(error);
        });
    };

    return (<>
        <Box>
            <Paper className={classes.paper}>
                <Box className="flexBox">
                      <span style={{display: 'none'}}>
                    <Input type="text" value={user.uid}/>
                    </span>
                    <Input type="text" placeholder={t('translation:name')} label={t('users:enter your name')}
                           value={user.field_name}
                           small='' handleClick={e => handleChange(e, "field_name")}/>

                    <Input type="text" placeholder={t('users:family')} label={t('users:enter your family')}
                           value={user.field_last_name}
                           small='' handleClick={e => handleChange(e, "field_last_name")}/>

                           <Box className="inputBlock">
                    <Input type="text" placeholder={t('users:username')} label={t('users:enter your username')}
                           small='' handleClick={e => handleChange(e, "name")}
                           value={user.name}
                    />
                    {userContext.errors.errorName.length ?
                        <Typography className="error">{userContext.errors.errorName.length}</Typography> : ''}
                    {userContext.errors.errorName.unique ?
                        <Typography className="error">{userContext.errors.errorName.unique}</Typography> : ''}
                           </Box>
                    {/*----------------------------------------------------------- show status ------------------------------------------*/}
                    <FormControl component="fieldset">
                        <label>{t('translation:status')}</label>
                        <RadioGroup aria-label="gender" name="gender1" value={user.status}
                                    onChange={handleStatusChange}>
                            <FormControlLabel value="false"
                                              control={<Radio checked={!user.status ? true : false}/>}
                                              label={t('translation:block')}/>
                            <FormControlLabel value="true"
                                              control={<Radio checked={user.status ? true : false}/>}
                                              label={t('translation:confirm')}/>
                        </RadioGroup>
                    </FormControl>
                    {/*-------------------------------------------------- show role -----------------------------------------------------*/}
                    <Box className="role">
                        <label>{t('users:choose role')}</label>
                        <br/>
                        {valueRoles ?
                            Object.keys(valueRoles).map((keyName, index) => (
                                <FormControlLabel key={index}
                                                  control={<Checkbox onChange={(e) => handleCheckRoles(e)}
                                                                     name="roles"/>}
                                                  label={valueRoles[keyName]}
                                                  value={keyRoles[keyName]}
                                                  checked={defaultRoles.includes(keyRoles[keyName])}
                                />
                            ))
                            : ''}
                    </Box>
                </Box>
                <Box className="flexBox">
                    <Box className="inputBlock">
                    <Input type="email" placeholder={t('users:email')} label={t('users:enter your email')}
                           small='' handleClick={e => handleChange(e, "mail")}
                           value={user.mail}
                    />
                    {userContext.errors.errorMail.mail ?
                        <Typography className="error">{userContext.errors.errorMail.mail}</Typography> : ''}
                    {userContext.errors.errorMail.unique ?
                        <Typography className="error">{userContext.errors.errorMail.unique}</Typography> : ''}
                    </Box>
                    <Box className="inputBlock">
                    <Input type="password" placeholder={t('users:password')} label={t('users:enter your password')}
                           small='' handleClick={e => handleChange(e, "pass")} error={userContext.errors.pass}/>
                    {userContext.errors.errorPass.length ?
                        <Typography className="error">{userContext.errors.errorPass.length}</Typography> : ''}
                    {userContext.errors.errorPass.specialChar ?
                        <Typography className="error">{userContext.errors.errorPass.specialChar}</Typography> : ''}
                    </Box>
                    <Box className="inputBlock">

                    <Input type="password" placeholder={t('users:confirm password')} label={t('users:confirm password')}
                           small='' handleClick={e => handleConfirmPass(e)} error={userContext.errors.confirm_pass}/>
                    {userContext.errors.confirmPass.harmony ?
                        <Typography className="error">{userContext.errors.confirmPass.harmony}</Typography> : ''}
                    </Box>
                    {/*------------------------------------------------------ upload image -----------------------------------------*/}
                    <Box>
                        <UploadImg multiple={false} title={t('translation:choosePic')} getFile={saveFile}
                                   imgs={currentImg !== "" ? [currentImg] : []}
                                   removedFileId={removedFileId}
                                   sendIdAfterUpload={sendIdAfterUpload}
                        />
                    </Box>
                    <Box mt={2}>
                        <ButtonComponent background={primary} color={white} clicked={saveUser}
                                         text={t('translation:register')}/>
                    </Box>
                </Box>
            </Paper>
        </Box>
    </>);
}

export default withNamespaces(['users', 'translation'])(EditUserComponent);
