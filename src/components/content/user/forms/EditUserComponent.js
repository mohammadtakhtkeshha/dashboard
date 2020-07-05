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

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import {withNamespaces} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        '& .MuiBox-root': {
            '& input[type=file]': {
                position: 'relative',
                '&::before': {
                    content: 'negar',
                    width: '100px',
                },
            }
        },
        '& .upload': {
            position: 'relative',
            border: `1px solid ${colors.primary}`,
            '& #label': {
                minHeight: '150px',
                background: '#fff',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',

            },
            '& input': {
                border: '1px solid green',
                opacity: 0,
                position: 'absolute!important',
                top: 0,
            }
        },
        '& .role': {
            '& label': {
                display: 'block'
            }
        }

    },
    uploadedImgBlock: {
        position: 'relative',
        borderRadius: '20px',
        width: '120px',
        height: '120px',
        '& img': {
            border: '1px solid green',
            width: '100%',
            height: '100%',
            borderRadius: '20px',

        },
        '& .removeImgIcon': {
            position: 'absolute',
            top: '0',
            left: '0',
            color: 'rgba(255,255,255,.4)',
            // backgroundColor: 'red',
            cursor: 'pointer',
            width: '120px',
            height: '120px',
            // '&:hover':{
            //     backgroundColor:'rgba(255,255,255,.8)'
            // },
            // '& svg':{
            //     width:'100%!important',
            //     height:'100%!important',
            // }
        }

    }
}));


function BaseFormComponent({t}) {
    const {id} = useParams();//params
    const appContext = useContext(AppContext);
    const classes = useStyles();
    const [defaultRoles, setDefaultRoles] = useState([]);
    const [wholeRoles, setWholeRoles] = useState([]);
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState([]);
    const [user, setUser] = useState({
        uid: {value: ''},
        name: {value: ''},
        field_name: {value: ''},
        field_last_name: {value: ''},
        mail: {value: ''},
        pass: {value: ''},
        confirm_pass: {value: ''},
        user_picture: {value: []},
        roles: [],
        status: {value: ''},
    });


// --------------------------------------- useEffect ---------------------------------------------------
    useEffect(() => {
        getUser();
    }, []);
    useEffect(() => {
        getWholeRoles();
    }, []);

// ----------------------------------------------------- get User ---------------------------------------------------------
    let getUser = () => {
        let url = `http://sitesaz99.rbp/web/user/${id}?_format=json`;
        let config = {
            headers: {
                Authorization: appContext.token
            }
        };
        axios.get(url, config).then((response) => {
            let user = response.data;
            let rolesWithData = user.roles;
            let roles = [];
            rolesWithData.map(item => {
                roles.push(item.target_id);
            });
            setDefaultRoles([...roles]);
            setUser({
                uid: {value: (user.uid.length > 0 ? user.uid[0].value : '')},
                name: {value: (user.name.length > 0 ? user.name[0].value : '')},
                field_name: {value: (user.field_name.length > 0 ? user.field_name[0].value : '')},
                field_last_name: {value: (user.field_last_name.length > 0 ? user.field_last_name[0].value : '')},
                mail: {value: (user.mail.length > 0 ? user.mail[0].value : '')},
                user_picture: {value: (user.user_picture.length > 0 ? user.user_picture[0].value : [])},
                roles: (user.roles ? user.roles : []),
                status: {value: (user.status.length > 0 ? user.status[0].value : '')},
            });

        }).catch((error) => {
            console.log(error);
        });
    };
// -------------------------------------------- get whole roles --------------------------------------------------------------
    let getWholeRoles = () => {
        const url = "http://sitesaz99.rbp/web/api/rest/role?_format=json";
        const config = {
            headers: {
                'Authorization': appContext.token,
            }
        };
        axios.get(url, config).then((response) => {
            let roles = Object.entries(response.data);
            setWholeRoles(roles);
        }).catch((error) => {
            console.log(error);
        });
    };
// ---------------------------------- upload -------------------------------------------------------
    const uploadFiles = (files) => {
        return files.map(uploadFile);
    };
// --------------------------------------- handle changes ----------------------------------------------------------
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
                ...prevState, status: {value: status}
            }
        });
    };
// ---------------------------------------------- upload file --------------------------------------------------
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
    const fileProgress = ({fileData}) => {
        return (
            <div>
                <Box className={classes.uploadedImgBlock}>
                    {fileData && <img src={fileData} width={200} alt="Preview"/>}
                    <div onClick={removeUploadedImg} className="removeImgIcon"><CancelIcon/></div>
                </Box>
            </div>

        )
    };
// ---------------------------------------------- remove uploadedimg file --------------------------------------------------
    const removeUploadedImg = () => {
        setFiles([]);
    };

    const saveUser = (getUser) => {debugger
        let registeredUser;
        if (getUser === undefined) {//if no img
            registeredUser = user;
        } else {
            registeredUser = getUser;
        }
        const headers = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': appContext.token,
            }
        };
        let id = user.uid.value;
        let url = `http://sitesaz99.rbp/web/user/${id}?_format=json`;
        axios.patch(url, JSON.stringify(registeredUser), headers)
            .then((response) => {
                setUser(response.data);
            }).catch((error) => {
                console.log(error);
        });

    };

    const saveFile = () => {
        const config = {
            headers: {
                "Content-Type": "application/octet-stream",
                "Accept": "application/vnd.api+json",
                "Content-Disposition": 'file; filename="' + files[0].name + '"',
                'Authorization':appContext.token,
            }
        };
        axios.post('http://sitesaz99.rbp/web/file/upload/user/user/user_picture?_format=json', files[0], config).then(
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

    const register = () => {
        if (files.length === 0) {
            saveUser();
        } else {
            saveFile();
        }
    };
    console.log(user);
    return (<>
        <Box>
            <Paper className={classes.paper}>
                <form method="post" encType="multipart/form-data">
                    <span style={{display: 'none'}}>
                    <Input type="text" value={user.uid.value}/>
                    </span>

                    <Input type="text" placeholder={t('users:name')} label={t('users:enter your name')}
                           error={errors.name ? errors.name : ''}
                           value={user.field_name.value}
                           small='' handleClick={e => handleChange(e, "field_name")}/>

                    <Input type="text" placeholder={t('users:family')} label={t('users:enter your family')}
                           error={errors.family}
                           value={user.field_last_name.value}
                           small='' handleClick={e => handleChange(e, "field_last_name")}/>

                    <Input type="text" placeholder={t('users:username')} label={t('users:enter your username')}
                           small='' handleClick={e => handleChange(e, "name")}
                           value={user.name.value}
                    />

                    <Input type="email" placeholder={t('users:email')} label={t('users:enter your email')}
                           small='' handleClick={e => handleChange(e, "mail")}
                           value={user.mail.value}
                    />

                    <Input type="password" placeholder={t('users:password')} label={t('users:enter your password')}
                           small='' handleClick={e => handleChange(e, "pass")} error={errors.pass}/>

                    <Input type="password" placeholder={t('users:confirm password')} label={t('users:confirm password')}
                           small='' handleClick={e => handleChange(e, "confirm_pass")} error={errors.confirm_pass}/>
                    {/*----------------------------------------------------------- show status ------------------------------------------*/}
                    <FormControl component="fieldset">
                        <label>{t('users:status')}</label>
                        <RadioGroup aria-label="gender" name="gender1" value={user.status.value}
                                    onChange={handleStatusChange}>
                            <FormControlLabel value="false"
                                              control={<Radio checked={!user.status.value ? true : false}/>}
                                              label={t('translation:block')} />
                            <FormControlLabel value="true" control={<Radio checked={user.status.value ? true : false}/>}
                                              label={t('translation:confirm')} />
                        </RadioGroup>
                    </FormControl>
                    {/*-------------------------------------------------- show role -----------------------------------------------------*/}
                    <Box className="role">
                        <label>{t('users:choose role')}</label>
                        <br/>
                        {wholeRoles ?
                            wholeRoles.map((key, index) => (
                                <div key={index}>
                                    <FormControlLabel
                                        control={<Checkbox onChange={(e) => handleCheckRoles(e)}
                                                           name="roles"/>}
                                        label={key[1]}
                                        value={key[0]}
                                        checked={defaultRoles.includes(key[0])}
                                    />
                                </div>
                            ))
                            : ''}
                    </Box>
                    {/*------------------------------------------------------ upload image -----------------------------------------*/}

                    <Box className="upload">
                        {files.length == 0 ?
                            <label id="label" htmlFor="file">{t('users:choose your picture')}</label> : ''}
                        <input
                            id="file"
                            type="file"
                            accept="image/*"
                            name="avatar"
                            onChange={event => setFiles(files.concat(Array.from(event.target.files)))}
                        />
                        <FileManager
                            files={files}
                        >
                            {uploadFiles}
                        </FileManager>
                    </Box>
                    <Box mt={2}>
                        <ButtonComponent color="primary" clicked={register} text={t('translation:register')}/>
                    </Box>
                </form>
            </Paper>
        </Box>
    </>);
}

export default withNamespaces(['users','translation'])(BaseFormComponent);
