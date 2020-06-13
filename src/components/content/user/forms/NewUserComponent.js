import React, {useEffect} from "react";
import {Box, Button, Paper} from '@material-ui/core/index';
import * as colors from './../../../../components/partials/Colors';
import ButtonComponent from './../../../../components/partials/ButtonComponent'

import {makeStyles} from "@material-ui/core/styles/index";
import Input from "../../../partials/inputComponent";
import {Link} from "react-router-dom";


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

export default function BaseFormComponent() {
    const classes = useStyles();

    function register() {
        debugger;
    };
    return (<>
        <Box>
            <Paper className={classes.paper}>
                <Input type="text" placeholder='نام' label='نام خود را وارد کنید'
                       small=''/>
                <Input type="text" placeholder='نام خانوادگی' label='نام خانوادگی خود را وارد کنید'
                       small=''/>
                <Input type="text" placeholder='نام کاربری' label='نام کاربری خود را وارد کنید'
                       small=''/>
                <Input type="email" placeholder='ایمیل' label='ایمیل خود را وارد کنید'
                       small=''/>
                <Input type="password" placeholder='رمز عبور' label='رمز عبور'
                       small=''/>
                <Input type="password" placeholder='تکرار رمز عبور' label='تکرار رمز عبور'
                       small=''/>
                <Box className="upload">
                    <label id="label" htmlFor="file"> عکس مد نظر خود را انتخاب کنید</label>
                    <input type="file" id="file"/>
                </Box>
                <Box mt={2}>
                    <ButtonComponent color="primary" text="ثبت" clicked={register}/>
                </Box>
            </Paper>
        </Box>
    </>);
}
