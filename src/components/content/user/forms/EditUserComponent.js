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


export default function BaseFormComponent() {
    const {id} = useParams();//params
    const appContext = useContext(AppContext);
    const classes = useStyles();
    const [user, setUser] = useState({
        name: {value: ''},
        field_name: {value: ''},
        field_last_name: {value: ''},
        mail: {value: ''},
        pass: {value: ''},
        confirm_pass: {value: ''},
        user_picture: {value: ''},
        roles: [],
        status: {value: ''},
    });
    const [keyRoles, setKeyRoles] = useState([]);
    const [valueRoles, setValueRoles] = useState([]);
    const [defaultRoles , setDefaultRoles]=useState([]);
    const [roles , setRoles]=useState([]);
    const [errors, setErrors] = useState({});
    const [checkedRoles, setCheckRoles] = useState([]);
    useEffect(() => {
        getUser();
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
            let rolesWithData=user.roles;
            let roles=[];
            rolesWithData.map(item=>{
                roles.push(item.target_id);
            });
            setDefaultRoles([...roles]);
            debugger
            setUser({
                name: {value: (user.name.length > 0 ? user.name[0].value : '')},
                field_name: {value: (user.field_name.length > 0 ? user.field_name[0].value : '')},
                field_last_name: {value: (user.field_last_name.length > 0 ? user.field_last_name[0].value : '')},
                mail: {value: (user.mail.length > 0 ? user.mail[0].value : '')},
                user_picture: {value: (user.user_picture.length > 0 ? user.user_picture[0].value : '')},
                roles: (user.roles ? user.roles : []),
                status: {value: (user.status.length > 0 ? user.status[0].value : '')},
            });

        }).catch((error) => {
            console.log(error);
        });
    };
    // ---------------------------------- upload -------------------------------------------------------
    const [files, setFiles] = useState([]);
    const uploadFiles = (files) => {
        return files.map(uploadFile);
    };
    // ----------------------------------- get roles ----------------------------------------------------
    useEffect(() => {
        getRoles();
    }, []);

    let getRoles = () => {
        const url = "http://sitesaz99.rbp/web/api/rest/role?_format=json";
        const config = {
            headers: {
                'Authorization': appContext.token,
            }
        };
        axios.get(url, config).then((response) => {
            let keyRoles=Object.keys(response.data);
            let valueRoles=Object.values(response.data);
            let roles=Object.entries(response.data);
            setKeyRoles([...keyRoles]);
            setValueRoles([...valueRoles]);
            debugger
            setRoles([...roles]);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        setUser(prevState => {
            return {
                ...prevState, roles: checkedRoles
            }
        });
    }, [checkedRoles]);

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

    const removeUploadedImg = () => {
        setFiles([]);
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

    const saveUser = (getUser) => {
        const headers = {
            headers: {
                "Content-Type": "application/json",
                'Authorization':
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjAxMWI3YzY0NTNiMTgzNWRlMDk1YmYwNjFmM2U1NWNmZWVkM2MzNzhmNmFhNmI2NjJjNGRjNjIzNDRlYzNjYjE0ZmFmODUyMmJjNDQ4MjIwIn0.eyJhdWQiOiI4YmY5M2Y0Yi00YmRjLTQ3Y2QtYTdkNS0xZmQ4MTE0Y2JjOWMiLCJqdGkiOiIwMTFiN2M2NDUzYjE4MzVkZTA5NWJmMDYxZjNlNTVjZmVlZDNjMzc4ZjZhYTZiNjYyYzRkYzYyMzQ0ZWMzY2IxNGZhZjg1MjJiYzQ0ODIyMCIsImlhdCI6MTU5MjIyMzA4MywibmJmIjoxNTkyMjIzMDgzLCJleHAiOjE2MDA5MjMwODMsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCJdfQ.qof5zlJbRKFMFeDSKW0uzFKt3QdSp8P59VTRPT9O1OZDU72yQ1g1JMEM36iJqx7TDcIz0DGY-aYr891w2Lf6GURqcfyY2v_fDq63gsiqIAcNG5VCS_2DNogdXIsnO0xWjfilL3X8hvUMm6gS25foJf7vNlkxlOw0M0EqgnCrwZAMGSz_8r3AY9ZAKEcSwYPp4vqYUZJHknSFFMdAizCdCsuUiy9YB2mACHFtr7lNtHC23ysqD_givl6oxcfwALdvF0aWHT7u_wJ_CZzDhra3b2gZAEzho3s72sv3UNOtKIqYDgg1r5rs-Np0XSiw3w7XnFtuDkYV6Ue4xNhhMdQn6Q',
                'Accept': 'application/json'
            }
        };
        // console.log(JSON.stringify(registeredUser));
        // axios.patch('http://sitesaz99.rbp/web/file/upload/user/user/user_picture?_format=json', JSON.stringify(registeredUser), headers)
        //     .then((response) => {
        //     }).catch((error) => {
        // })
    };

    const saveFile = () => {
        const config = {
            headers: {
                "Content-Type": "application/octet-stream",
                "Accept": "application/vnd.api+json",
                "Content-Disposition": 'file; filename="' + files[0].name + '"',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI1NWI0ZTlmN2U3YjhlY2Q2NDdkNDljMjY3ZDJhNWIwNmZmNGZiMjFkZmIyNTk2MzM1OGRhNTdhZjUyODJlNjZiNWY1MTE3NTc5ZWZhODAxIn0.eyJhdWQiOiI4YmY5M2Y0Yi00YmRjLTQ3Y2QtYTdkNS0xZmQ4MTE0Y2JjOWMiLCJqdGkiOiJiNTViNGU5ZjdlN2I4ZWNkNjQ3ZDQ5YzI2N2QyYTViMDZmZjRmYjIxZGZiMjU5NjMzNThkYTU3YWY1MjgyZTY2YjVmNTExNzU3OWVmYTgwMSIsImlhdCI6MTU5MjE5NDI3OCwibmJmIjoxNTkyMTk0Mjc4LCJleHAiOjE2MDA4OTQyNzgsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCJdfQ.BIbSg0tz2j4qghu8Qm_S2vEIDnPf8gggOnSypg_DD3Q4JBcXGmT0FgFbqYTMocFpmCjWHofhcaE2eGx_X5kkKE2FiZhLiM8Mg0vuO2KdqlTBHqV1SH288s9E6GPHCATLh3pvH_7H8k9iPV4cNJqeTN8ngDaFhkQWXPGOEWJEZLYNDyo2Zj78hFpQ6ihsSP_Jan7xOM0PhNQaQ5If1IQsu0cW6lWDV98FcETBOdYJCD58ecLZdDe9Gk7NII_mrWsR9FBsiBgG5Sje2xSIg1y5ogxx0ulXazZSt3uDMhGpmwAvW0CviGFAPLC8016OILfZqKuSuPEFyx4w6qGVQeDRlQ'
            }
        };
        axios.post('http://sitesaz99.rbp/web/file/upload/user/user/user_picture?_format=json', files[0], config).then(
            (response) => {
                // setUser(prevState => {
                //     return {
                //         ...prevState,
                //         user_picture: [{
                //             target_type: "file",
                //             target_uuid: response.data.uuid[0],
                //             url: response.data.uri[0].url
                //         }],
                //     }
                // });

                user.user_picture = [{
                    target_type: "file",
                    target_uuid: response.data.uuid[0],
                    url: response.data.uri[0].url
                }];
                saveUser(user);
            }
        ).catch((error) => {
            console.log(error);
        });
    };

    const register = () => {
        if (checkedRoles.length === 0) {
            // setUser(prevState => {
            //     return {
            //         ...prevState, roles: []
            //     }
            // });
        }
        if (files.length === 0) {
            // setUser(prevState => {
            //     return {
            //         ...prevState, user_picture: ''
            //     }
            // });
            saveUser();
        } else {
            saveFile();
        }

    };

    let handleChange = (e, field) => {
        let currentName;
        currentName = e.currentTarget.value;
        if (currentName === "") {
            delete user[field];
        }
        // setUser(prevState => {
        //     return {
        //         ...prevState, [field]: {value: currentName}
        //     }
        // });
    };

    let handleCheckRoles = (e) => {
        let checked = e.target.checked;
        let currentValue = e.target.value;
        if (checked) {
            setCheckRoles(prevState => {
                return [
                    ...prevState, currentValue
                ]
            });
        } else {
            let newCheckedRoles = checkedRoles.filter(role => role !== currentValue);
            setCheckRoles([...newCheckedRoles]);
        }
    };

    let handleStatusChange = (e) => {
        let currentStatus = e.target.value;
        let status;
        if (currentStatus === "false") {
             status = false;
        } else {
            status = true;
        }
        setUser((prevState)=>{
            return {
                ...prevState,status:{value:status}
            }
        });
    };

    return (<>
        <Box>
            <Paper className={classes.paper}>
                <form method="post" encType="multipart/form-data">
                    <Input type="text" placeholder='نام' label='نام خود را وارد کنید'
                           error={errors.name ? errors.name : ''}
                           value={user.field_name.value}
                           small='' handleClick={e => handleChange(e, "field_name")}/>

                    <Input type="text" placeholder='نام خانوادگی' label='نام خانوادگی خود را وارد کنید'
                           error={errors.family}
                           value={user.field_last_name.value}
                           small='' handleClick={e => handleChange(e, "field_last_name")}/>

                    <Input type="text" placeholder='نام کاربری' label='نام کاربری خود را وارد کنید'
                           small='' handleClick={e => handleChange(e, "name")}
                           value={user.name.value}
                    />

                    <Input type="email" placeholder='ایمیل' label='ایمیل خود را وارد کنید'
                           small='' handleClick={e => handleChange(e, "mail")}
                           value={user.mail.value}
                    />

                    <Input type="password" placeholder='رمز عبور' label='رمز عبور'
                           small='' handleClick={e => handleChange(e, "pass")} error={errors.pass}/>

                    <Input type="password" placeholder='تکرار رمز عبور' label='تکرار رمز عبور'
                           small='' handleClick={e => handleChange(e, "confirm_pass")} error={errors.confirm_pass}/>
                    {/*----------------------------------------------------------- show status ------------------------------------------*/}
                    <FormControl component="fieldset">
                        <label>وضعیت</label>
                        {/*<Box>status:{user.status}</Box>*/}
                        <RadioGroup aria-label="gender" name="gender1" value={user.status.value} onChange={handleStatusChange}>
                            <FormControlLabel value="false" control={<Radio checked={!user.status.value ? true : false}/>}
                                              label="بلاک"/>
                            <FormControlLabel value="true" control={<Radio checked={user.status.value ? true : false}/>}
                                              label="تایید"/>
                        </RadioGroup>
                    </FormControl>
                    {/*-------------------------------------------------- show role -----------------------------------------------------*/}
                    <Box className="role">
                        <label>رول مورد نظر را انتخاب کنید:</label>
                        <br/>
                        {valueRoles ?
                            Object.keys(valueRoles).map((keyName, index) => (
                                <FormControlLabel key={index}
                                                  control={<Checkbox onChange={(e) => handleCheckRoles(e)}
                                                                     name="roles"/>}
                                                  label={valueRoles[keyName]}
                                                  value={valueRoles[keyName]}
                                                  checked={!defaultRoles.includes(valueRoles[keyName])}
                                />
                            ))
                            : ''}
                        {/*{roles ?*/}
                        {/*  roles.map((key,index)=>(*/}
                        {/*      <div>*/}
                        {/*          <span>{key}</span>*/}
                        {/*          /!*<span>{index}</span>*!/*/}
                        {/*      <FormControlLabel*/}
                        {/*                            control={<Checkbox onChange={(e) => handleCheckRoles(e)}*/}
                        {/*                                               name="roles"/>}*/}
                        {/*                            // label={key}*/}
                        {/*                            value={key}*/}
                        {/*                            checked={defaultRoles.includes(key)}*/}
                        {/*          />*/}
                        {/*          </div>*/}
                        {/*  ))*/}
                        {/*    : ''}*/}
                    </Box>
                    {/*------------------------------------------------------ upload image -----------------------------------------*/}

                    <Box className="upload">
                        {files.length == 0 ?
                            <label id="label" htmlFor="file"> عکس مد نظر خود را انتخاب کنید</label> : ''}
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
                        <ButtonComponent color="primary" clicked={register} text="ثبت"/>
                    </Box>
                </form>
            </Paper>
        </Box>
    </>);
}
