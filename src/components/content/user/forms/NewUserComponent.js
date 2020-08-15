import React, {useState, useEffect} from "react";
import {Box, Checkbox, Typography} from '@material-ui/core/index';
import ButtonComponent from './../../../../components/partials/ButtonComponent'
import Input from "../../../partials/inputComponent";
import {makeStyles} from "@material-ui/core/styles/index";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import userService from './../../../../core/services/user.service';
import {primary, white} from "../../../partials/Colors";
import swal from "sweetalert";
import {globalCss} from "../../../../assets/js/globalCss";
import * as newUser from './../../../../assets/js/user/NewUser';
import storage from './../../../../libraries/local-storage';
import {withNamespaces} from 'react-i18next';
import UploadImg from "../../../partials/UploadImg";

const gClass = makeStyles(globalCss);

function BaseFormComponent({t, getRegisteredUser}) {
    const classes = newUser.useStyles();
    const gClasses = gClass();
    const [keyRoles, setKeyRoles] = useState([]);
    const [valueRoles, setValueRoles] = useState();
    const [errors, setErrors] = useState({
        errorName: {},
        errorPass: {},
        specialChar: {},
        errorMail: {},
        confirmPass: {},
    });
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

    useEffect(() => {
        getRoles();
    }, []);

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

    const register = () => {
        if (user.user_picture.length === 0) {//if no file
            setUser(prevState => {
                return {
                    ...prevState, user_picture: ''
                }
            });
            saveUser();
        } else {
            saveFile();
        }
    };

    const saveUser = (getUser) => {
        let registeredUser;
        if (getUser === undefined) {//if no img
            registeredUser = user;
        } else {
            registeredUser = getUser;
        }
        let nameValid = nameValidation(registeredUser.name);
        let passValid = passValidation(registeredUser.pass);
        let mail = mailValidation(registeredUser.mail);
        let confirmPass = confirmPassValidation(registeredUser.pass, registeredUser);
        if (nameValid || passValid || mail || confirmPass) {
            return
        }
        userService.registerUser(registeredUser).then((response) => {debugger
            let currentUser;
            let item = response.data;


            currentUser = {
                uid: `${item.uid}`,
                name: item.name,
                field_name: item.field_name.target_id !== "" ? item.field_name : '',
                field_last_name: item.field_last_name.target_id !== '' ? item.field_last_name : '',
                role: (item.roles.target_id === ""  ? 'بدون نقش' : item.roles.target_id),
                status: item.status,
                // user_picture: item._links['http://dash.webrbp.ir/rest/relation/user/user/user_picture'] !== undefined ? item._links['http://dash.webrbp.ir/rest/relation/user/user/user_picture'][0].href : '',
                mail: item.mail,
            };
debugger
            getRegisteredUser(currentUser);

            swal({
                text: t('translation:successRegistered'),
                button: {
                    text: t('translation:ok')
                    , className: gClasses.confirmSwalButton
                },
                className: gClasses.makeSwalButtonCenter,
                icon: "success"
            });

        }).catch((response) => {
            // do later
        });
    };

    let nameValidation = (name) => {
        let valid;
        let length;
        if (name.length < 3) {
            length = 'حداقل کاراکتر انتخابی 3 میباشد!'
            valid = true;
        }
        setErrors(prevState => {
            return {
                ...prevState,
                errorName: {
                    length: length
                }
            }
        });
        return valid;
    };

    let passValidation = (password) => {
        let lengthValid;
        let regexValid;
        let valid;
        let message = {};

        if (password.length < 8) {
            lengthValid = 'حداقل تعداد کاراکترهای انتخابی 8 میباشد!';
            message.length = lengthValid;
            lengthValid = true;
        }
        let regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;؟|,\.?~_+-=\|])/;
        if (!regex.test(password)) {
            let specialChar = 'پسورد مورد نظر باید شامل اعداد حروف بزرگ و کوچک و علامت ها خاص باشد!';
            message.specialChar = specialChar;
            regexValid = true;
        }
        setErrors(prevState => {
            return {
                ...prevState,
                errorPass: message
            }
        });


        if (lengthValid || regexValid) {
            valid = true;
        }
        return valid;
    };

    let mailValidation = (mail) => {
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let message = {};
        let valid;
        if (!regex.test(mail)) {
            let mail = 'ایمیل وارد شده معتبر نمیباشد!';
            message.mail = mail;
            valid = true;
        }
        setErrors(prevState => {
            return {
                ...prevState,
                errorMail: message
            }
        });
        return valid;
    };

    let confirmPassValidation = (confirm) => {
        let valid;
        let message = {};
        let confirmPassword = confirm || confirmPass;
        if (confirmPassword !== user.pass) {
            message.harmony = 'پسوردهای وارد شده باهم همخوانی ندارند!'
            valid = true;
        }
        setErrors(prevState => {
            return {
                ...prevState, confirmPass: message
            }
        });
        return valid;
    }

    let saveFile = () => {
        userService.saveUserImage(user.user_picture)
            .then((response) => {
                    let url = `http://dash.webrbp.ir/sites/default/files/userpic/${response.data.filename}`;
                    setUser(prevState => {
                        return {
                            ...prevState,
                            user_picture: [{
                                target_type: "file",
                                target_uuid: response.data.uuid,
                                target_id: response.data.fid,
                                url: url
                            }]
                        }
                    });

                    user.user_picture = [{
                        target_type: "file",
                        target_uuid: response.data.uuid,
                        target_id: response.data.fid,
                        url: url
                    }];
                    saveUser(user);
                }
            ).catch((error) => {
            setErrors(prevState => {
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
            nameValidation(currentName);
        }
        if (field === 'mail') {
            mailValidation(currentName);
        }
        if (field === 'pass') {
            passValidation(currentName);
        }

    };

    let handleConfirmPass = (e) => {
        let confirmPass = e.target.value;
        setConfirmPass(confirmPass);
        confirmPassValidation(confirmPass);
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
        formatedRoles=checkedRolesArr.toString();
        setUser((prevState) => {
            return {
                ...prevState, roles: {target_id:formatedRoles}
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
        setUser(prevState => {
            return {...prevState, user_picture: file[0]}
        });
    }

    console.log(user);
    return (<>
        <Box className={classes.paper}>
            <Box className='block'>
                <Input type="text" placeholder={t('translation:name')} label={t('users:enter your name')}
                       error={errors.name ? errors.name : ''}
                       small='' handleClick={e => handleChange(e, "field_name")}/>

                <Input type="text" placeholder={t('users:family')} label={t('users:enter your family')}
                       error={errors.family}
                       small='' handleClick={e => handleChange(e, "field_last_name")}/>
                <Box className="inputBlock">
                    <Input type="text" placeholder={t('users:username')} label={t('users:enter your username')}
                           small='' handleClick={e => handleChange(e, "name")}/>
                    {errors.errorName.length ?
                        <Typography className="error">{errors.errorName.length}</Typography> : ''}
                    {errors.errorName.unique ?
                        <Typography className="error">{errors.errorName.length}</Typography> : ''}
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
                    <Input type="email" placeholder={t('users:email')} label={t('users:enter your email')}
                           small='' handleClick={e => handleChange(e, "mail")}/>
                    {errors.errorMail.mail ?
                        <Typography className="error">{errors.errorMail.mail}</Typography> : ''}
                </Box>
                <Box className="inputBlock">
                    <Input type="password" placeholder={t('users:password')} label={t('users:password')}
                           small='' handleClick={e => handleChange(e, "pass")} error={errors.pass}/>
                    {errors.errorPass.length ?
                        <Typography className="error">{errors.errorPass.length}</Typography> : ''}
                    {errors.errorPass.specialChar ?
                        <Typography className="error">{errors.errorPass.specialChar}</Typography> : ''}
                </Box>
                <Box className="inputBlock">
                    <Input type="password" placeholder={t('users:confirm password')}
                           label={t('users:confirm password')}
                           small='' handleClick={e => handleConfirmPass(e)} error={errors.confirm_pass}/>
                    {errors.confirmPass.harmony ?
                        <Typography className="error">{errors.confirmPass.harmony}</Typography> : ''}
                </Box>
                {/*------------------------------------------------------ upload image -----------------------------------------*/}
                <Box>
                    <UploadImg multiple={false} title={t('translation:choosePic')} getFile={uploadedFile}/>
                </Box>
                <Box mt={2}>
                    <ButtonComponent color={white} background={primary} clicked={register}
                                     text={t('translation:register')}/>
                </Box>
            </Box>
        </Box>
    </>);
}

export default withNamespaces(['users', 'translation'])(BaseFormComponent);
