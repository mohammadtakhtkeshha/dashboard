import React, {useState, useEffect} from "react";
import {Box, Button, Paper} from '@material-ui/core/index';
import * as colors from './../../../../components/partials/Colors';
import ButtonComponent from './../../../../components/partials/ButtonComponent'
import {makeStyles} from "@material-ui/core/styles/index";
import Input from "../../../partials/inputComponent";
import axios from "axios/index";


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


    }
}));

//uploads





// ----

export default function BaseFormComponent() {
    const classes = useStyles();
    const [user, setUser] = useState({});


    useEffect(() => {
        // console.log(user);
    }, [user]);

    function register() {
        const headers={
            token:'Beaer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkzZmEwZDRkZTA4MTNjNzJiMTgzZTAzZmU4MjEwZWQyMzc3Y2M0NjMxYjIyZGM2OWMwMDVlYWE0MWNkZmMyYzFkOGM2OWU5MGVjOTAyOWJlIn0.eyJhdWQiOiI4YmY5M2Y0Yi00YmRjLTQ3Y2QtYTdkNS0xZmQ4MTE0Y2JjOWMiLCJqdGkiOiI5M2ZhMGQ0ZGUwODEzYzcyYjE4M2UwM2ZlODIxMGVkMjM3N2NjNDYzMWIyMmRjNjljMDA1ZWFhNDFjZGZjMmMxZDhjNjllOTBlYzkwMjliZSIsImlhdCI6MTU5MjAyMjc4OSwibmJmIjoxNTkyMDIyNzg5LCJleHAiOjE2MDA3MjI3ODksInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCJdfQ.WxY2qG90b13SqYe2OoQMqVaISCUHJS02waag10E-IJJyv4SZ9gvkseT8ck7IpkSgO93yc-z2x4Pjc2v6XfVa-gSTkA6h1GSr0QkIIn2M3JFIgPjWE74yhKwg4njlcrkeWjhBVMfxzkmOiMFBBRYRILBFeq0NT1fvcxbRyCT1De1pQmFUSCc4W8LqTh0Muw03D6mbHL3awSqpRFIgSzplHEcSKTOdE3VyrWbvnZuVVbLCa8mYzXPLqekHe2HBpC4HU7lMLo3vbhBerVsEtEQ46Lz3W1LN8n7Ei9TlQoz2KYKehpyzX2Ia3a3uorQSWhLO9Y56PSEARmDIVkvuDvOMiw',
            'Content-Type': 'application/json',
        };
        axios.post('http://sitesaz99.rbp/web/user/register', {
            "name": [
                {
                    "value": "negar"
                }
            ],
            "pass": [
                {
                    "value": "testpassword"
                }
            ],
            "mail": [
                {
                    "value": "emaiFFll6@ghhdfg.com"
                }
            ],
            "field_name": [
                {
                    "value": "5محمد"
                }
            ],
            "field_last_name": [
                {
                    "value": "5سیفی"
                }
            ]
        },{
            headers: headers
        }).then(
            (response) => {
                console.log(response);
                debugger
            }
        ).catch((error) => {
            // console.log(error)
            debugger
        });
    };
    let handleName = (e, field) => {
        let currentName;
        if (field == 'file') {
            let file = e.target.files[0];
            let currentName = new FormData();
            currentName.append('image',file);
        } else {
             currentName = e.currentTarget.value;
        }
        setUser(prevState => {
            return {
                ...prevState, [field]: {'"value"':currentName},token:'Beaer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkzZmEwZDRkZTA4MTNjNzJiMTgzZTAzZmU4MjEwZWQyMzc3Y2M0NjMxYjIyZGM2OWMwMDVlYWE0MWNkZmMyYzFkOGM2OWU5MGVjOTAyOWJlIn0.eyJhdWQiOiI4YmY5M2Y0Yi00YmRjLTQ3Y2QtYTdkNS0xZmQ4MTE0Y2JjOWMiLCJqdGkiOiI5M2ZhMGQ0ZGUwODEzYzcyYjE4M2UwM2ZlODIxMGVkMjM3N2NjNDYzMWIyMmRjNjljMDA1ZWFhNDFjZGZjMmMxZDhjNjllOTBlYzkwMjliZSIsImlhdCI6MTU5MjAyMjc4OSwibmJmIjoxNTkyMDIyNzg5LCJleHAiOjE2MDA3MjI3ODksInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCJdfQ.WxY2qG90b13SqYe2OoQMqVaISCUHJS02waag10E-IJJyv4SZ9gvkseT8ck7IpkSgO93yc-z2x4Pjc2v6XfVa-gSTkA6h1GSr0QkIIn2M3JFIgPjWE74yhKwg4njlcrkeWjhBVMfxzkmOiMFBBRYRILBFeq0NT1fvcxbRyCT1De1pQmFUSCc4W8LqTh0Muw03D6mbHL3awSqpRFIgSzplHEcSKTOdE3VyrWbvnZuVVbLCa8mYzXPLqekHe2HBpC4HU7lMLo3vbhBerVsEtEQ46Lz3W1LN8n7Ei9TlQoz2KYKehpyzX2Ia3a3uorQSWhLO9Y56PSEARmDIVkvuDvOMiw'
            }
        });


    };
    console.log(user);

    return (<>
        <Box>
            <Paper className={classes.paper}>
                <form action="/profile" method="post" encType="multipart/form-data">
                    <Input type="text" placeholder='نام' label='نام خود را وارد کنید'
                           small='' handleClick={e => handleName(e, "field_name")}/>
                    <Input type="text" placeholder='نام خانوادگی' label='نام خانوادگی خود را وارد کنید'
                           small='' handleClick={e => handleName(e, "field_last_name")}/>
                    <Input type="text" placeholder='نام کاربری' label='نام کاربری خود را وارد کنید'
                           small='' handleClick={e => handleName(e, "name")}/>
                    <Input type="email" placeholder='ایمیل' label='ایمیل خود را وارد کنید'
                           small='' handleClick={e => handleName(e, "mail")}/>
                    <Input type="password" placeholder='رمز عبور' label='رمز عبور'
                           small='' handleClick={e => handleName(e, "pass")}/>
                    <Input type="password" placeholder='تکرار رمز عبور' label='تکرار رمز عبور'
                           small='' handleClick={e => handleName(e, "re_password")}/>
                    <Box className="upload">
                        <label id="label" htmlFor="file"> عکس مد نظر خود را انتخاب کنید</label>
                        <input type="file" id="file" name="avatar" onChange={e => handleName(e, "file")}/>
                    </Box>
                    <Box mt={2}>
                        <ButtonComponent color="primary" text="ثبت" clicked={register}/>
                    </Box>
                </form>
            </Paper>
        </Box>
    </>);
}
