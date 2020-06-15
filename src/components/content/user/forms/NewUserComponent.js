import React, {useState, useEffect} from "react";
import {Box, Button, Paper} from '@material-ui/core/index';
import * as colors from './../../../../components/partials/Colors';
import ButtonComponent from './../../../../components/partials/ButtonComponent'
import {makeStyles} from "@material-ui/core/styles/index";
import Input from "../../../partials/inputComponent";
import axios from "axios/index";
import {FileManager, FileUploader} from 'reactjs-file-uploader';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    paper: {
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
        }


    },
    uploadedImgBlock: {
        position: 'relative',
        // border: '9px solid green',
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
            border: '1px solid red',
        }

    }
}));


export default function BaseFormComponent() {
    const classes = useStyles();
    const [user, setUser] = useState();
    const [file, setFile] = useState();
    const [roles, setRoles] = useState();
    const [errors, setErrors] = useState({});
    // ---------------------------------- upload -------------------------------------------------------
    const [files, setFiles] = useState([]);
    const uploadFiles = (files) => {
        return files.map(uploadFile);
    };

    useEffect(() => {
        const url = "http://sitesaz99.rbp/web/api/rest/role?_format=json";
        const config = {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI1NWI0ZTlmN2U3YjhlY2Q2NDdkNDljMjY3ZDJhNWIwNmZmNGZiMjFkZmIyNTk2MzM1OGRhNTdhZjUyODJlNjZiNWY1MTE3NTc5ZWZhODAxIn0.eyJhdWQiOiI4YmY5M2Y0Yi00YmRjLTQ3Y2QtYTdkNS0xZmQ4MTE0Y2JjOWMiLCJqdGkiOiJiNTViNGU5ZjdlN2I4ZWNkNjQ3ZDQ5YzI2N2QyYTViMDZmZjRmYjIxZGZiMjU5NjMzNThkYTU3YWY1MjgyZTY2YjVmNTExNzU3OWVmYTgwMSIsImlhdCI6MTU5MjE5NDI3OCwibmJmIjoxNTkyMTk0Mjc4LCJleHAiOjE2MDA4OTQyNzgsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCJdfQ.BIbSg0tz2j4qghu8Qm_S2vEIDnPf8gggOnSypg_DD3Q4JBcXGmT0FgFbqYTMocFpmCjWHofhcaE2eGx_X5kkKE2FiZhLiM8Mg0vuO2KdqlTBHqV1SH288s9E6GPHCATLh3pvH_7H8k9iPV4cNJqeTN8ngDaFhkQWXPGOEWJEZLYNDyo2Zj78hFpQ6ihsSP_Jan7xOM0PhNQaQ5If1IQsu0cW6lWDV98FcETBOdYJCD58ecLZdDe9Gk7NII_mrWsR9FBsiBgG5Sje2xSIg1y5ogxx0ulXazZSt3uDMhGpmwAvW0CviGFAPLC8016OILfZqKuSuPEFyx4w6qGVQeDRlQ'
            }
        };
        axios.get(url, config).then((response) => {
            setRoles(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    // React.useEffect(function effectFunction() {
    //         setUser(prevState=>{
    //             return {...prevState}
    //         });
    // }, [user]);


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
    const fileProgress = ({
                              uploadReady,
                              uploadStart,
                              uploadProgress,
                              uploadComplete,
                              downloadStart,
                              downloadProgress,
                              downloadComplete,
                              error,
                              abort,
                              timeout,
                              requestState,
                              startUpload,
                              abortRequest,
                              request,
                              response,
                              fileData,

                          }) => {
        return (
            <div>
                <Box className={classes.uploadedImgBlock}>
                    {fileData && <img src={fileData} width={200} alt="Preview"/>}
                    <div onClick={removeUploadedImg} className="removeImgIcon"><CancelIcon/></div>
                </Box>
            </div>

        )
    };


    // -----------------------------------------------------------------------------------------
    const saveUser = () => {
        console.log(user);
        // const headers = {
        //     headers: {
        //         "Content-Type": "application/json",
        //         'Authorization':
        //             'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjAxMWI3YzY0NTNiMTgzNWRlMDk1YmYwNjFmM2U1NWNmZWVkM2MzNzhmNmFhNmI2NjJjNGRjNjIzNDRlYzNjYjE0ZmFmODUyMmJjNDQ4MjIwIn0.eyJhdWQiOiI4YmY5M2Y0Yi00YmRjLTQ3Y2QtYTdkNS0xZmQ4MTE0Y2JjOWMiLCJqdGkiOiIwMTFiN2M2NDUzYjE4MzVkZTA5NWJmMDYxZjNlNTVjZmVlZDNjMzc4ZjZhYTZiNjYyYzRkYzYyMzQ0ZWMzY2IxNGZhZjg1MjJiYzQ0ODIyMCIsImlhdCI6MTU5MjIyMzA4MywibmJmIjoxNTkyMjIzMDgzLCJleHAiOjE2MDA5MjMwODMsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCJdfQ.qof5zlJbRKFMFeDSKW0uzFKt3QdSp8P59VTRPT9O1OZDU72yQ1g1JMEM36iJqx7TDcIz0DGY-aYr891w2Lf6GURqcfyY2v_fDq63gsiqIAcNG5VCS_2DNogdXIsnO0xWjfilL3X8hvUMm6gS25foJf7vNlkxlOw0M0EqgnCrwZAMGSz_8r3AY9ZAKEcSwYPp4vqYUZJHknSFFMdAizCdCsuUiy9YB2mACHFtr7lNtHC23ysqD_givl6oxcfwALdvF0aWHT7u_wJ_CZzDhra3b2gZAEzho3s72sv3UNOtKIqYDgg1r5rs-Np0XSiw3w7XnFtuDkYV6Ue4xNhhMdQn6Q',
        //         'Accept': 'application/json'
        //     }
        // };
        // axios.post('http://sitesaz99.rbp/web/file/upload/user/user/user_picture?_format=json', JSON.stringify(user), headers)
        //     .then((response) => {
        //         debugger
        //     }).catch((error) => {
        //     debugger
        // })
    };

    const register = () => {
        const config = {
            headers: {
                "Content-Type": "application/octet-stream",
                "Accept": "application/vnd.api+json",
                "Content-Disposition": 'file; filename="' + files[0].name + '"',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI1NWI0ZTlmN2U3YjhlY2Q2NDdkNDljMjY3ZDJhNWIwNmZmNGZiMjFkZmIyNTk2MzM1OGRhNTdhZjUyODJlNjZiNWY1MTE3NTc5ZWZhODAxIn0.eyJhdWQiOiI4YmY5M2Y0Yi00YmRjLTQ3Y2QtYTdkNS0xZmQ4MTE0Y2JjOWMiLCJqdGkiOiJiNTViNGU5ZjdlN2I4ZWNkNjQ3ZDQ5YzI2N2QyYTViMDZmZjRmYjIxZGZiMjU5NjMzNThkYTU3YWY1MjgyZTY2YjVmNTExNzU3OWVmYTgwMSIsImlhdCI6MTU5MjE5NDI3OCwibmJmIjoxNTkyMTk0Mjc4LCJleHAiOjE2MDA4OTQyNzgsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCJdfQ.BIbSg0tz2j4qghu8Qm_S2vEIDnPf8gggOnSypg_DD3Q4JBcXGmT0FgFbqYTMocFpmCjWHofhcaE2eGx_X5kkKE2FiZhLiM8Mg0vuO2KdqlTBHqV1SH288s9E6GPHCATLh3pvH_7H8k9iPV4cNJqeTN8ngDaFhkQWXPGOEWJEZLYNDyo2Zj78hFpQ6ihsSP_Jan7xOM0PhNQaQ5If1IQsu0cW6lWDV98FcETBOdYJCD58ecLZdDe9Gk7NII_mrWsR9FBsiBgG5Sje2xSIg1y5ogxx0ulXazZSt3uDMhGpmwAvW0CviGFAPLC8016OILfZqKuSuPEFyx4w6qGVQeDRlQ'
            }
        };
        // {
        //     "name":
        //     {
        //         "value": "wwww"
        //     }
        // ,
        //     "pass":
        //     {
        //         "value": "dfdfdfs"
        //     }
        // ,
        //     "mail":
        //     {
        //         "value": "tyjtgyjtj@dgd.com"
        //     }
        // ,
        //     "field_name":
        //     {
        //         "value": "mnmn"
        //     }
        // ,
        //     "field_last_name":
        //     {
        //         "value": "fgh"
        //     },
        //     "user_picture": [
        //     {
        //
        //         "target_type": "file",
        //         "target_uuid": "a4a0df42-76ca-412b-8811-967f4d58deaf",
        //         "url": "http://sitesaz99.rbp/web/sites/default/files/pictures/2020-06/flat-faces-icons-circle-man-6_0.png"
        //     }
        // ]
        //
        // }


        axios.post('http://sitesaz99.rbp/web/file/upload/user/user/user_picture?_format=json', files[0], config).then(
            (response) => {

                let promise = new Promise( (resolve, reject) => {

                    resolve(
                        setUser(prevState => {
                            return {
                                ...prevState,
                                // user_picture: [{
                                //     target_type: "file",
                                //     target_uuid: response.data.uuid[0],
                                //     url: response.data.uri[0].url
                                // }],
                                test: 'test'
                            }
                        })
                    );
                });






                debugger
                promise.then(()=>{
                    saveUser();
                    show();
                });
                // const promiseA = new Promise(
                //     setUser(prevState => {
                //         return {
                //             ...prevState,
                //             user_picture: [{
                //                 target_type: "file",
                //                 target_uuid: response.data.uuid[0],
                //                 url: response.data.uri[0].url
                //             }],test :'test'
                //         }
                //     })
                // );
            }
        ).catch((error) => {
            console.log(error);
            debugger
        });
    };
    let handleName = (e, field) => {
        let currentName;
        currentName = e.currentTarget.value;
        setUser(prevState => {
            return {
                ...prevState, [field]: {value: currentName}
            }
        });
        show();
    };
    let show=()=>{
        console.log(user);
    };
    // console.log(user);
    return (<>
        <Box>
            <Paper className={classes.paper}>
                <form method="post" encType="multipart/form-data">
                    <Input type="text" placeholder='نام' label='نام خود را وارد کنید'
                           error={errors.name ? errors.name : ''}
                           small='' handleClick={e => handleName(e, "field_name")}/>

                    <Input type="text" placeholder='نام خانوادگی' label='نام خانوادگی خود را وارد کنید'
                           error={errors.family}
                           small='' handleClick={e => handleName(e, "field_last_name")}/>

                    <Input type="text" placeholder='نام کاربری' label='نام کاربری خود را وارد کنید'
                           small='' handleClick={e => handleName(e, "name")}/>

                    <Input type="email" placeholder='ایمیل' label='ایمیل خود را وارد کنید'
                           small='' handleClick={e => handleName(e, "mail")}/>

                    <Input type="password" placeholder='رمز عبور' label='رمز عبور'
                           small='' handleClick={e => handleName(e, "pass")} error={errors.pass}/>

                    <Input type="password" placeholder='تکرار رمز عبور' label='تکرار رمز عبور'
                           small='' handleClick={e => handleName(e, "confirm_pass")} error={errors.confirm_pass}/>
                    <Box className="upload">
                        {files.length == 0 ?
                            <label id="label" htmlFor="file"> عکس مد نظر خود را انتخاب کنید</label> : ''}

                        {/*<input type="file" id="file" name="avatar" onChange={e => handleName(e, "file")}/>*/}
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
                        {/*<input type="radio"/>negar*/}
                    </Box>

                    {/*<Box className="role">*/}
                    {/*    che*/}
                    {/*</Box>*/}
                    <Box mt={2}>
                        <ButtonComponent color="primary" clicked={register} text="ثبت"/>
                    </Box>
                </form>
            </Paper>
        </Box>
    </>);
}
