import React, {useState, useEffect, useContext} from "react";
import {withNamespaces} from 'react-i18next';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import {Box, Checkbox, Typography} from '@material-ui/core/index';
import {makeStyles} from "@material-ui/styles";

import userService from 'core/services/user.service';
import {success} from "methods/swal";
import {useStyles} from 'assets/js/user/NewUser';
import UploadImg from "components/partials/UploadImg";
import AppContext from 'contexts/AppContext';
import UserContext from "contexts/UserContext";
import {StyledButton, StyledInput} from "assets/js/App";

const currentStyles = makeStyles(useStyles);

function NewUserComponent({t, userNameList, userMailList}) {
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
        roles: '',
        status: false,
    });
    const [sendIdAfterUpload, setSendIdAfterUpload] = useState('');

    let getRoles = () => {
        userService.getRoles().then((response) => {
            let valueRoles = Object.values(response.data);
            let keyRoles = Object.keys(response.data);
            setKeyRoles(keyRoles);
            setValueRoles(valueRoles);
        }).catch((error) => {
            console.log(error);
        });
    };

    const saveUser = () => {
       userContext.allValidation(user,confirmPass);
       debugger
        if(true){
            return
        }
        appContext.toggleLoading(true);
        userService.registerUser(user).then((response) => {
            let item = response.data;
            appContext.toggleLoading(false);
            userContext.getRegisteredUser({
                uid: item.uid,
                name: item.name !== undefined ? item.name : '',
                field_name: item.field_name !== undefined ? item.field_name : '',
                field_last_name: item.field_last_name !== undefined ? item.field_last_name : '',
                role: (item.roles === undefined ? 'بدون نقش' : item.roles.target_id),
                status: `${item.status}`,
                mail: item.mail,
                user_picture: item.user_picture !== undefined ? item.user_picture.url : ''
            });
            success(t('translation:successRegistered'), t('translation:ok'));
        }).catch((error) => {
            appContext.handleError(error);
        });
    };

    let removedFileId = (id) => {
        setUser(prevState => {
            return {...prevState, user_picture: ""}
        });
    };

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
            userContext.nameValidation(currentName, 'null');
        }
        if (field === 'mail') {
            userContext.mailValidation(currentName, "null");
        }
        if (field === 'pass') {
            userContext.passValidation(currentName, "add");
        }

    };

    let handleConfirmPass = (e) => {
        let currentCofrimPass = e.target.value;
        setConfirmPass(currentCofrimPass);
        userContext.confirmPassValidation(user.pass, currentCofrimPass);
    };

    let handleCheckRoles = (e) => {
        let checked = e.target.checked;
        let currentValue = e.target.value;
        let checkedRolesArr = [];
        if (checked) {
            checkedRolesArr = [currentValue, ...checkedRoles];
        } else {
            let newCheckedRoles = checkedRoles.filter(role => role !== currentValue);
            checkedRolesArr = [...newCheckedRoles];
        }
        setCheckRoles([...checkedRolesArr]);
        let formatedRoles = [];
        formatedRoles = checkedRolesArr.toString();
        setUser((prevState) => {
            return {
                ...prevState, roles: {target_id: formatedRoles}
            }
        });
    };

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
    };

    let uploadedFile = (file) => {
        saveFile(file);
    }

    useEffect(() => {
        getRoles();
    }, []);

    return (
        <>
            <Box className={classes.paper}>
                <Box className='block'>
                    <StyledInput type="text" placeholder={t('translation:name')} label={t('users:enter your name')}
                           small='' handleClick={e => handleChange(e, "field_name")}/>

                    <StyledInput type="text" placeholder={t('users:family')} label={t('users:enter your family')}
                           small='' handleClick={e => handleChange(e, "field_last_name")}/>
                    <Box className="inputBlock">
                        <StyledInput type="text" placeholder={t('users:username')} label={t('users:enter your username')}
                               small='' handleClick={e => handleChange(e, "name")}/>
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
                                />
                            ))
                            : ''}
                    </Box>
                </Box>
                <Box className='block'>
                    <Box className="inputBlock">
                        <StyledInput type="email" placeholder={t('users:email')} label={t('users:enter your email')}
                               small='' handleClick={e => handleChange(e, "mail")}/>
                        {userContext.errors.errorMail.mail ?
                            <Typography className="error">{userContext.errors.errorMail.mail}</Typography> : ''}
                        {userContext.errors.errorMail.unique ?
                            <Typography className="error">{userContext.errors.errorMail.unique}</Typography> : ''}
                    </Box>
                    <Box className="inputBlock">
                        <StyledInput type="password" placeholder={t('users:password')} label={t('users:password')}
                               small='' handleClick={e => handleChange(e, "pass")} error={userContext.errors.pass}/>
                        {userContext.errors.errorPass.length ?
                            <Typography className="error">{userContext.errors.errorPass.length}</Typography> : ''}
                        {userContext.errors.errorPass.specialChar ?
                            <Typography className="error">{userContext.errors.errorPass.specialChar}</Typography> : ''}
                    </Box>
                    <Box className="inputBlock">
                        <StyledInput type="password" placeholder={t('users:confirm password')}
                               label={t('users:confirm password')}
                               small='' handleClick={e => handleConfirmPass(e)}
                               error={userContext.errors.confirm_pass}/>
                        {userContext.errors.confirmPass.harmony ?
                            <Typography className="error">{userContext.errors.confirmPass.harmony}</Typography> : ''}
                    </Box>
                    {/*------------------------------------------------------ upload image -----------------------------------------*/}
                    <Box>
                        <UploadImg multiple={false} title={t('translation:choosePic')}
                                   sendIdAfterUpload={sendIdAfterUpload}
                                   getFile={uploadedFile} removedFileId={removedFileId}
                        />
                    </Box>
                    <Box mt={2}>
                        <StyledButton onClick={saveUser}>
                            {t('translation:register')}
                        </StyledButton>
                    </Box>
                </Box>
            </Box>
        </>);
}

export default withNamespaces(['users', 'translation'])(NewUserComponent);
