import React, {useState, useEffect} from "react";
import {Box, Checkbox, Paper} from '@material-ui/core/index';
import * as colors from './../../../../components/partials/Colors';
import ButtonComponent from './../../../../components/partials/ButtonComponent'
import {makeStyles} from "@material-ui/core/styles/index";
import Input from "../../../partials/inputComponent";
import axios from "axios/index";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import storage from './../../../../libraries/local-storage'
import {withNamespaces} from "react-i18next";
import UploadImg from "../../../partials/UploadImg";
import swal from 'sweetalert';
import {globalCss} from "../../../../assets/js/globalCss";
import userService from "../../../../core/services/user.service";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        '& .flexBox': {
            width: '48%',
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

const gClass=makeStyles(globalCss);
function EditUserComponent({t, id, keyRoles, valueRoles, editedUser}) {
    const classes = useStyles();
    const gClasses=gClass();
    const [defaultRoles, setDefaultRoles] = useState([]);
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        name: [{value: ''}],
        mail: [{value: ''}],
        roles: [],
        field_last_name: [{value: ''}],
        field_name: [{value: ''}],
        pass: [{value: ''}],
        confirm_pass: [{value: ''}],
        user_picture: [{value: ''}],
        status: [{value: ''}],
        uid: [{value: ''}],
    });

    useEffect(() => {
        getUser();
    }, []);

    let getUser = () => {
        userService.getUser(id).then((response) => {
            let user = response.data;
            debugger
            let rolesWithData = user.roles;
            let roles = [];
            rolesWithData.map(item => {
                roles.push(item.target_id);
            });
            setDefaultRoles([...roles]);
            setUser({
                uid: user.uid,
                name: user.name,
                field_name: user.field_name,
                field_last_name: user.field_last_name,
                mail: user.mail,
                user_picture: user.user_picture,
                roles:user.roles==="" ? user.roles : [],
                status: user.status
            });
        }).catch((error) => {
            console.log(error);
        });
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
                ...prevState, [field]: [{value: currentName}]
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
                ...prevState, status: [{value: status}]
            }
        });
    };


    let saveUser = (getUser) => {
        let registeredUser;
        if (getUser === undefined) {//if no img
            registeredUser = user;
        } else {
            registeredUser = getUser;
        }

        let id = user.uid[0].value;
        userService.editUser(id, JSON.stringify(registeredUser)).then((response) => {
            let item = response.data;
            sendEditedUser({
                uid: `${item.uid[0].value}`,
                user_picture: item.user_picture.length > 0 ? item.user_picture[0].value : "",
                status: item.status[0].value,
                role: item.roles.length > 0 ? toString(item.role[0].value) : "بدون نقش",
                name: item.name[0].value,
                field_name: item.field_name[0].value,
                field_last_name: item.field_last_name[0].value,
                mail: item.mail[0].value,
            });
            // setUser(response.data);
            swal({
                text: t('translation:successRegistered'),
                button: {
                    text: t('translation:ok')
                    , className: gClasses.confirmSwalButton
                },
                className: gClasses.makeSwalButtonCenter,
                icon: "success"
            });
        }).catch((error) => {
            console.log(error);
        });

    };

    let saveFile = (url) => {
        // ***************************************************************************
        let blobObject;
        let file;
        if (url !== undefined) {
            blobObject = new Blob(
                [url],
                {type: "image/jpg"}
            );
            function blobToFile(theBlob, fileName){
                theBlob.lastModifiedDate = new Date();
                theBlob.name = fileName;
                return theBlob;
            }
             file=[blobToFile(blobObject,'negar.jpg')];
        } else {
            file = user.user_picture;
        }
        debugger

        // ***************************************************************************
        const config = {
            headers: {
                "Content-Type": "application/octet-stream",
                "Accept": "application/vnd.api+json",
                "Content-Disposition": 'file; filename="' + file[0].name + '"',
                'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
            }
        };
        axios.post('http://dash.webrbp.ir/file/upload/user/user/user_picture?_format=json', file[0], config).then(
            (response) => {
                debugger
                setUser(prevState => {
                    return {
                        ...prevState,
                        user_picture: [{
                            target_type: "file",
                            target_uuid: response.data.uuid,
                            target_id: response.data.fid,
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

    let register = () => {
        if (user.user_picture.length > 0 && user.user_picture[0].value === '') {//no img file
            saveUser();
        } else {
            if (user.user_picture[0].value !== undefined) {//not new img and having ex img
                saveFile(user.user_picture[0].value.url)
            } else {
                saveFile();
            }
        }
    };

    let uploadedFile = (file) => {
        setUser(prevState => {
            return {...prevState, user_picture: [...file]}
        });
    }

    let sendEditedUser = (user) => {
        editedUser(user);
    }

    return (<>
        <Box>
            <Paper className={classes.paper}>
                <Box className="flexBox">
                      <span style={{display: 'none'}}>
                    <Input type="text" value={user.uid[0].value}/>
                    </span>
                    <Input type="text" placeholder={t('translation:name')} label={t('users:enter your name')}
                           error={errors.name ? errors.name : ''}
                           value={user.field_name[0].value}
                           small='' handleClick={e => handleChange(e, "field_name")}/>

                    <Input type="text" placeholder={t('users:family')} label={t('users:enter your family')}
                           error={errors.family}
                           value={user.field_last_name[0].value}
                           small='' handleClick={e => handleChange(e, "field_last_name")}/>

                    <Input type="text" placeholder={t('users:username')} label={t('users:enter your username')}
                           small='' handleClick={e => handleChange(e, "name")}
                           value={user.name[0].value}
                    />
                    {/*----------------------------------------------------------- show status ------------------------------------------*/}
                    <FormControl component="fieldset">
                        <label>{t('translation:status')}</label>
                        <RadioGroup aria-label="gender" name="gender1" value={user.status[0].value}
                                    onChange={handleStatusChange}>
                            <FormControlLabel value="false"
                                              control={<Radio checked={!user.status[0].value ? true : false}/>}
                                              label={t('translation:block')}/>
                            <FormControlLabel value="true"
                                              control={<Radio checked={user.status[0].value ? true : false}/>}
                                              label={t('translation:confirm')}/>
                        </RadioGroup>
                    </FormControl>
                    {/*-------------------------------------------------- show role -----------------------------------------------------*/}
                    <Box className="role">
                        <label>{t('users:choose role')}</label>
                        <br/>
                        {/*{keyRoles ?*/}
                        {/*    keyRoles.map((key) => (*/}
                        {/*        <div key={key}>*/}
                        {/*            <FormControlLabel*/}
                        {/*                control={<Checkbox onChange={(e) => handleCheckRoles(e)}*/}
                        {/*                                   name="roles"/>}*/}
                        {/*                label={valueRoles[key]}*/}
                        {/*                value={keyRoles[key]}*/}
                        {/*                checked={defaultRoles.includes(keyRoles[key])}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    ))*/}
                        {/*    : ''}*/}
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
                    <Input type="email" placeholder={t('users:email')} label={t('users:enter your email')}
                           small='' handleClick={e => handleChange(e, "mail")}
                           value={user.mail[0].value}
                    />

                    <Input type="password" placeholder={t('users:password')} label={t('users:enter your password')}
                           small='' handleClick={e => handleChange(e, "pass")} error={errors.pass}/>

                    <Input type="password" placeholder={t('users:confirm password')} label={t('users:confirm password')}
                           small='' handleClick={e => handleChange(e, "confirm_pass")} error={errors.confirm_pass}/>
                    {/*------------------------------------------------------ upload image -----------------------------------------*/}
                    <Box>
                        <UploadImg multiple={false} title={t('translation:choosePic')} getFile={uploadedFile}
                                   imgs={user.user_picture[0] && user.user_picture[0].value !== "" ? [user.user_picture[0].value] : []}/>
                    </Box>
                    <Box mt={2}>
                        <ButtonComponent color="primary" clicked={register} text={t('translation:register')}/>
                    </Box>
                </Box>
            </Paper>
        </Box>
    </>);
}

export default withNamespaces(['users', 'translation'])(EditUserComponent);
