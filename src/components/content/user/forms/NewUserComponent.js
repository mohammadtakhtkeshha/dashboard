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
import FormLabel from '@material-ui/core/FormLabel';
import AppContext from './../../../../contexts/AppContext';


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
    const classes = useStyles();
    const appContext = useContext(AppContext);
    const [user, setUser] = useState({
        _links : {
            "type": {
                "href":"http://sitesaz99.rbp/web/rest/type/user/user"
            }
        },
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
    const [roles, setRoles] = useState();
    const [errors, setErrors] = useState({});
    const [checkedRoles, setCheckRoles] = useState([]);
    const [status, setStatus] = useState('false');
    // ---------------------------------- upload -------------------------------------------------------
    const [files, setFiles] = useState([]);
    const uploadFiles = (files) => {
        return files.map(uploadFile);
    };

    useEffect(() => {
        const url = "http://sitesaz99.rbp/web/api/rest/role?_format=json";
        const config = {
            headers: {
                'Content-Type': 'application/hal+json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg1OWZmZGU1YzMwOGYzNDQyMGEwN2VmMDU0MjA4ZGIzYjU5YjBmYTNlNmIzN2RmZTA3NTg4MjJiY2QyYzQ2NTNmMWEzM2ExNDRjN2VmNWU3In0.eyJhdWQiOiI4YmY5M2Y0Yi00YmRjLTQ3Y2QtYTdkNS0xZmQ4MTE0Y2JjOWMiLCJqdGkiOiI4NTlmZmRlNWMzMDhmMzQ0MjBhMDdlZjA1NDIwOGRiM2I1OWIwZmEzZTZiMzdkZmUwNzU4ODIyYmNkMmM0NjUzZjFhMzNhMTQ0YzdlZjVlNyIsImlhdCI6MTU5MjgwMDUwMiwibmJmIjoxNTkyODAwNTAyLCJleHAiOjE2MDE1MDA1MDIsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCJdfQ.n8kvBBBiV_AP3zmEFIiS25SoGMlnX3p2KFhs45rGnz5OwlnVms2MB1c2R1oqQlrgEWDs4ENCQQ9ZuEPnMmoaCm45HmNzqkN2um3ckrhUx56tw2Tvv8XQ8i4fRwe-S-D5HUmki2yXIH7Z1f_G2MWNR6IB5Xg8KPsteKsVxoSDULWn9ynC9bTfsPj7J0mq3jADq7TUqzveLf27brXYZ3-yPnVpANCCxH0jmUUg2C_5RrB-5hDfGoPktl3dZp1leoFk5DzVV-aBJdxoF4APnxItFIu75Jb0AhwgVJu0QNn8G2KlZvk9seS8Y0ogpne5ingFVT0CZ6BqOcciLBxqjAyRpg',
                'Accept': 'application/hal+json'
            }
        };
        axios.get(url, config).then((response) => {
            setRoles(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        setUser(prevState => {
            return {
                ...prevState, roles: checkedRoles
            }
        });
    }, [checkedRoles]);

    useEffect(() => {
        setUser(prevState => {
            return {
                ...prevState, status: status
            }
        });
    }, [status]);

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


    // -----------------------------------------------------------------------------------------
    const saveUser = (param) => {
        let registeredUser;
        if (param === undefined) {
            registeredUser = user;
        } else {
            registeredUser = param;
        }
        const headers = {
            headers: {
                'Content-Type': "application/hal+json",
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI3ZmI2MThjZTIzYTdlOWUzOWRmMzcyZWUxYTNhMTNmZmE2NzJkZjEzZWQyM2E5NzI1NTQwYzU5YTJlNzgyYzIwMWJiZWJhM2QyOTAzNmQxIn0.eyJhdWQiOiI4YmY5M2Y0Yi00YmRjLTQ3Y2QtYTdkNS0xZmQ4MTE0Y2JjOWMiLCJqdGkiOiJiN2ZiNjE4Y2UyM2E3ZTllMzlkZjM3MmVlMWEzYTEzZmZhNjcyZGYxM2VkMjNhOTcyNTU0MGM1OWEyZTc4MmMyMDFiYmViYTNkMjkwMzZkMSIsImlhdCI6MTU5MjgwMTE1MywibmJmIjoxNTkyODAxMTUzLCJleHAiOjE2MDE1MDExNTMsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCJdfQ.XWLBEzC8fX2hr9hNXiez8v5bS1gcZvIWm95j3PdHiAoiEBdhLivJLXI-oCnQgkGT5kzW1ZcPVPg4tSicYM64x-ebQWDi54jBEOaGAV6we_hSpU_cV-7IdGtUCOQFuQ6iZJV2UEG9662rIXIcarf-_KyqnJ6liA9Ps4MSpyRqzaOQG9Jm1duqpfP5IOrGAvJ-tL5iWlePIIBS_mSFG8McO2HCTfn13B9FGajpNR6daACxsIsx6l0HojMZRv1cou45HWnL_hqCc6y9QCpKTb35yOXKmNF434TnzreT0w4o4b1cRu3HOyp_08BtK1GSBHahCzQ3vIbWe5_CeENZSRT0zw',
                'Accept': 'application/hal+json'
            }
        };
        axios.post('http://sitesaz99.rbp/web/entity/user?_format=hal_json', JSON.stringify(registeredUser), headers)
            .then((response) => {

            }).catch((error) => {

        })
    };

    const saveFile = () => {

        const config = {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI3ZmI2MThjZTIzYTdlOWUzOWRmMzcyZWUxYTNhMTNmZmE2NzJkZjEzZWQyM2E5NzI1NTQwYzU5YTJlNzgyYzIwMWJiZWJhM2QyOTAzNmQxIn0.eyJhdWQiOiI4YmY5M2Y0Yi00YmRjLTQ3Y2QtYTdkNS0xZmQ4MTE0Y2JjOWMiLCJqdGkiOiJiN2ZiNjE4Y2UyM2E3ZTllMzlkZjM3MmVlMWEzYTEzZmZhNjcyZGYxM2VkMjNhOTcyNTU0MGM1OWEyZTc4MmMyMDFiYmViYTNkMjkwMzZkMSIsImlhdCI6MTU5MjgwMTE1MywibmJmIjoxNTkyODAxMTUzLCJleHAiOjE2MDE1MDExNTMsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCJdfQ.XWLBEzC8fX2hr9hNXiez8v5bS1gcZvIWm95j3PdHiAoiEBdhLivJLXI-oCnQgkGT5kzW1ZcPVPg4tSicYM64x-ebQWDi54jBEOaGAV6we_hSpU_cV-7IdGtUCOQFuQ6iZJV2UEG9662rIXIcarf-_KyqnJ6liA9Ps4MSpyRqzaOQG9Jm1duqpfP5IOrGAvJ-tL5iWlePIIBS_mSFG8McO2HCTfn13B9FGajpNR6daACxsIsx6l0HojMZRv1cou45HWnL_hqCc6y9QCpKTb35yOXKmNF434TnzreT0w4o4b1cRu3HOyp_08BtK1GSBHahCzQ3vIbWe5_CeENZSRT0zw',
                'Accept': 'application/vnd.api+json',
                "Content-Disposition": `file;filename="${files[0].name}"`,
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
                            url: response.data.uri[0].url
                        }],
                    }
                });

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
            setUser(prevState => {
                return {
                    ...prevState, roles: []
                }
            });
        }
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
        setStatus(currentStatus);
    };

console.log(user);
    return (<>
        <Box>
            <Paper className={classes.paper}>
                <form method="post" encType="multipart/form-data">
                    <Input type="text" placeholder='نام' label='نام خود را وارد کنید'
                           error={errors.name ? errors.name : ''}
                           small='' handleClick={e => handleChange(e, "field_name")}/>

                    <Input type="text" placeholder='نام خانوادگی' label='نام خانوادگی خود را وارد کنید'
                           error={errors.family}
                           small='' handleClick={e => handleChange(e, "field_last_name")}/>

                    <Input type="text" placeholder='نام کاربری' label='نام کاربری خود را وارد کنید'
                           small='' handleClick={e => handleChange(e, "name")}/>

                    <Input type="email" placeholder='ایمیل' label='ایمیل خود را وارد کنید'
                           small='' handleClick={e => handleChange(e, "mail")}/>

                    <Input type="password" placeholder='رمز عبور' label='رمز عبور'
                           small='' handleClick={e => handleChange(e, "pass")} error={errors.pass}/>

                    <Input type="password" placeholder='تکرار رمز عبور' label='تکرار رمز عبور'
                           small='' handleClick={e => handleChange(e, "confirm_pass")} error={errors.confirm_pass}/>
                    {/*----------------------------------------------------------- status ------------------------------------------*/}
                    <FormControl component="fieldset">
                        <label>وضعیت</label>
                        <RadioGroup aria-label="status" name="status" value={status} onChange={handleStatusChange}>
                            <FormControlLabel value="false" control={<Radio/>} label="بلاک"/>
                            <FormControlLabel value="true" control={<Radio/>} label="تایید"/>
                        </RadioGroup>
                    </FormControl>
                    {/*-------------------------------------------------- role -----------------------------------------------------*/}
                    <Box className="role">
                        <label>رول مورد نظر را انتخاب کنید:</label>
                        <br/>
                        {roles ?
                            Object.keys(roles).map((keyName, index) => (
                                <FormControlLabel key={index}
                                                  control={<Checkbox onChange={(e) => handleCheckRoles(e)}
                                                                     name="roles"/>}
                                                  label={roles[keyName]}
                                                  value={roles[keyName]}
                                />
                            ))
                            : ''}
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
