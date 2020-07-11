import React, {useState, useEffect, useContext} from "react";
import {Box, Checkbox, Paper, Typography} from '@material-ui/core/index';
import * as colors from './../../../../components/partials/Colors';
import ButtonComponent from './../../../../components/partials/ButtonComponent'
import {makeStyles} from "@material-ui/core/styles/index";
import Input from "../../../partials/inputComponent";
import axios from "axios/index";
import {FileManager, FileUploader} from 'reactjs-file-uploader';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import AppContext from './../../../../contexts/AppContext';
import Grid from '@material-ui/core/Grid/index';
import TextField from '@material-ui/core/TextField';
//styles
import * as newUser from './../../../../assets/js/user/NewUser';

//configs
import {tokenKey} from '../../../../adf';
import storage from './../../../../libraries/local-storage';
import {withNamespaces} from "react-i18next";
import contents from "../../../../assets/js/content/contents";


 function NewContentComponent({t}) {
    const classes = newUser.useStyles();
    const appContext = useContext(AppContext);
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
    const [status, setStatus] = useState(false);
    const [files, setFiles] = useState([]);
    const [confirmPass, setConfirmPass] = useState('');
    const [user, setUser] = useState({
        _links: {
            "type": {
                "href": "http://sitesaz99.rbp/web/rest/type/user/user"
            }
        },
        name: {value: ''},
        field_name: {value: ''},
        field_last_name: {value: ''},
        mail: {value: ''},
        pass: {value: ''},
        user_picture: {value: []},
        roles: keyRoles,
        status: {value: status},
    });
// --------------------------------------------------- use effects ------------------------------------------------------
    useEffect(() => {
        getRoles();
    }, []);
// ------------------------------------------- get roles -----------------------------------------
    let getRoles = () => {
        const url = "http://sitesaz99.rbp/web/api/rest/role?_format=json";
        const config = {
            headers: {
                'Content-Type': 'application/hal+json',
                'Authorization': storage.get(tokenKey),
                'Accept': 'application/hal+json'
            }
        };
        axios.get(url, config).then((response) => {
            let valueRoles = Object.values(response.data);
            let keyRoles = Object.keys(response.data);
            setKeyRoles(keyRoles);
            setValueRoles(valueRoles);
            debugger
        }).catch((error) => {
            debugger
            console.log(error);
        });
    };
// ------------------------------------------------ register -----------------------------------------------------------
    const register = () => {
        // if (checkedRoles.length === 0) {
        //     setUser(prevState => {
        //         return {
        //             ...prevState, roles: []
        //         }
        //     });
        // }
        if (files.length === 0) {
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
// ---------------------------------- upload -------------------------------------------------------
    const uploadFiles = (files) => {
        return files.map(uploadFile);
    };
// --------------------------------------- upload file --------------------------------------------------
    const uploadFile = (file) => {
        return (
            <FileUploader
                key={file.key}
                file={file}
                url='https://api.cloudinary.com/v1_1/dpdenton/upload'
                formData={{
                    file,
                    upload_preset: 'public',
                    tags: 'vanilla',
                }}
                readFile
            >
                {fileProgress}
            </FileUploader>
        )
    };
// --------------------------------------- remove upload img --------------------------------------------------
    const removeUploadedImg = () => {
        setFiles([]);
    };
// --------------------------------------- fileProgress --------------------------------------------------
    const fileProgress = ({fileData}) => {
        return (
            <div>
                <Box className={classes.uploadedImgBlock}>
                    {fileData && <img src={fileData} width={200} alt="Preview"/>}
                    <div onClick={removeUploadedImg} className="removeImgIcon">
                        <CancelIcon/>
                    </div>
                </Box>
            </div>

        )
    };
// --------------------------------------- save user--------------------------------------------------
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

        // const headers = {
        //     headers: {
        //         'Content-Type': "application/hal+json",
        //         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI3ZmI2MThjZTIzYTdlOWUzOWRmMzcyZWUxYTNhMTNmZmE2NzJkZjEzZWQyM2E5NzI1NTQwYzU5YTJlNzgyYzIwMWJiZWJhM2QyOTAzNmQxIn0.eyJhdWQiOiI4YmY5M2Y0Yi00YmRjLTQ3Y2QtYTdkNS0xZmQ4MTE0Y2JjOWMiLCJqdGkiOiJiN2ZiNjE4Y2UyM2E3ZTllMzlkZjM3MmVlMWEzYTEzZmZhNjcyZGYxM2VkMjNhOTcyNTU0MGM1OWEyZTc4MmMyMDFiYmViYTNkMjkwMzZkMSIsImlhdCI6MTU5MjgwMTE1MywibmJmIjoxNTkyODAxMTUzLCJleHAiOjE2MDE1MDExNTMsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCJdfQ.XWLBEzC8fX2hr9hNXiez8v5bS1gcZvIWm95j3PdHiAoiEBdhLivJLXI-oCnQgkGT5kzW1ZcPVPg4tSicYM64x-ebQWDi54jBEOaGAV6we_hSpU_cV-7IdGtUCOQFuQ6iZJV2UEG9662rIXIcarf-_KyqnJ6liA9Ps4MSpyRqzaOQG9Jm1duqpfP5IOrGAvJ-tL5iWlePIIBS_mSFG8McO2HCTfn13B9FGajpNR6daACxsIsx6l0HojMZRv1cou45HWnL_hqCc6y9QCpKTb35yOXKmNF434TnzreT0w4o4b1cRu3HOyp_08BtK1GSBHahCzQ3vIbWe5_CeENZSRT0zw',
        //         'Accept': 'application/hal+json'
        //     }
        // };
        // axios.post('http://sitesaz99.rbp/web/entity/user?_format=hal_json', JSON.stringify(registeredUser), headers)
        //     .then((response) => {
        //
        //     }).catch((error) => {
        //     console.log(error)
        // });
    };
    let nameValidation = (name) => {
        let valid;
        let length;
        if (name.value.length < 2) {
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
        if (password.value.length < 8) {
            lengthValid = 'حداقل تعداد کاراکترهای انتخابی 8 میباشد!';
            message.length = lengthValid;
            lengthValid = true;
        }
        let regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;؟|,\.?~_+-=\|])/;
        if (!regex.test(password.value)) {
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
        if (!regex.test(mail.value)) {
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
    }
    let confirmPassValidation = () => {
        let valid;
        let message = {};
        if (confirmPass !== user.pass.value) {
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
// ----------------------------------------------- save File ---------------------------------------------------------------
    const saveFile = () => {

        const config = {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': appContext.token,
                'Accept': 'application/vnd.api+json',
                "Content-Disposition": `file;filename="${files[0].name}"`,
            }
        };
        axios.post('http://sitesaz99.rbp/web/file/upload/user/user/user_picture?_format=json', files[0], config)
            .then(
                (response) => {
                    setUser(prevState => {
                        return {
                            ...prevState,
                            user_picture: [{
                                target_type: "file",
                                target_uuid: response.data.uuid[0],
                                target_id: response.data.fid[0].value,
                                url: response.data.uri[0].url
                            }]
                        }
                    });

                    user.user_picture = [{
                        target_type: "file",
                        target_uuid: response.data.uuid[0],
                        target_id: response.data.fid[0].value,
                        url: response.data.uri[0].url
                    }];


                    saveUser(user);
                }
            ).catch((error) => {
            console.log(error);
        });
    };
// ---------------------------------- handlerFileChange ------------------------------------------------------------
    let handleFileChange = (e) => {
        setFiles([e[0]]);
        // setUser((prevState) => {
        //     return {
        //         ...prevState, user_picture: [{value: e[0]}]
        //     }
        // });
    };
// ------------------------------------------------ handle inputs changes -----------------------------------------------------------
    let handleChange = (e, field) => {
        let currentName;
        currentName = e.currentTarget.value;
        if (currentName === "") {
            delete user[field];
        }
        setUser(prevState => {
            return {
                ...prevState, [field]: {value: currentName}
            }
        });
    };


    let handleConfirmPass = (e) => {
        let confirmPass = e.target.value;
        setConfirmPass(confirmPass);
    }
// ------------------------------------------------ handle checkbox changes -----------------------------------------------------------
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
        for (let item of checkedRolesArr) {
            formatedRoles.push({
                "target_id": item,
                "target_type": "user_role",
            })
        }
        setUser((prevState) => {
            return {
                ...prevState, roles: formatedRoles
            }
        });
    };
// ------------------------------------------------ handle status changes -----------------------------------------------------------
    let handleStatusChange = (e) => {
        let currentStatus = e.target.value;
        let status;
        if (currentStatus === "true") {
            status = true;
        } else {
            status = false;
        }
        setStatus(status);
        setUser((prevState) => {
            return {
                ...prevState, status: [{value: status}]
            }
        });
    };
    return (<>
        <Box>
            <Paper className={classes.paper}>
                <Grid container>
                    {/*<form method="post" encType="multipart/form-data">*/}
                    {/*----------------------------------------------------------- status ------------------------------------------*/}
                    <Grid xs={6}>
                        <Box className={classes.block}>
                            <Input type="text" placeholder={t('contents:name')}
                                   error={errors.name ? errors.name : ''}
                                   small='' handleClick={e => handleChange(e, "field_name")}/>

                            <Input type="text" placeholder={t('translation:description')} label='نام خانوادگی خود را وارد کنید'
                                   error={errors.family}
                                   small='' handleClick={e => handleChange(e, "field_last_name")}/>
                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Box className="inputBlock">
                                <Input type="text" placeholder='نام کاربری' label='نام کاربری خود را وارد کنید'
                                       small='' handleClick={e => handleChange(e, "name")}/>
                                {errors.errorName.length ?
                                    <Typography className="error">{errors.errorName.length}</Typography> : ''}
                                {errors.errorName.unique ?
                                    <Typography className="error">{errors.errorName.length}</Typography> : ''}
                            </Box>
                            <FormControl component="fieldset">
                                <label><Typography>وضعیت</Typography></label>
                                <RadioGroup aria-label="status" name="status" value={status}
                                            onChange={handleStatusChange}>
                                    <FormControlLabel value={false} control={<Radio/>} label="بلاک"/>
                                    <FormControlLabel value={true} control={<Radio/>} label="تایید"/>
                                </RadioGroup>
                            </FormControl>
                            {/*-------------------------------------------------- role -----------------------------------------------------*/}
                            <Box className="role">
                                <label><Typography>رول مورد نظر را انتخاب کنید:</Typography></label>
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

                    </Grid>

                    <Grid xs={6}>
                        <Box className={classes.block}>
                            <Box className="inputBlock">
                                <Input type="email" placeholder='ایمیل' label='ایمیل خود را وارد کنید'
                                       small='' handleClick={e => handleChange(e, "mail")}/>
                                {errors.errorMail.mail ?
                                    <Typography className="error">{errors.errorMail.mail}</Typography> : ''}
                            </Box>
                            <Box className="inputBlock">
                                <Input type="password" placeholder='رمز عبور' label='رمز عبور'
                                       small='' handleClick={e => handleChange(e, "pass")} error={errors.pass}/>
                                {errors.errorPass.length ?
                                    <Typography className="error">{errors.errorPass.length}</Typography> : ''}
                                {errors.errorPass.specialChar ?
                                    <Typography className="error">{errors.errorPass.specialChar}</Typography> : ''}
                            </Box>
                            <Box className="inputBlock">
                                <Input type="password" placeholder='تکرار رمز عبور' label='تکرار رمز عبور'
                                       small='' handleClick={e => handleConfirmPass(e)} error={errors.confirm_pass}/>
                                {errors.confirmPass.harmony ?
                                    <Typography className="error">{errors.confirmPass.harmony}</Typography> : ''}
                            </Box>
                            {/*------------------------------------------------------ upload image -----------------------------------------*/}
                            <Box className="upload">
                                {files.length == 0 ?
                                    <label id="label" htmlFor="file"> <Typography>عکس مد نظر خود را انتخاب
                                        کنید</Typography></label> : ''}
                                <input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    name="avatar"
                                    onChange={event => handleFileChange(files.concat(Array.from(event.target.files)))}
                                />
                                <FileManager
                                    files={files}
                                >
                                    {uploadFiles}
                                </FileManager>
                            </Box>
                            <Box mt={2}>
                                <ButtonComponent color="primary" clicked={register} text="ثبت"/>
                            </Box>
                        </Box>
                    </Grid>
                    {/*</form>*/}
                </Grid>
            </Paper>
        </Box>
    </>);
}
export default withNamespaces('translation,contents')(NewContentComponent);