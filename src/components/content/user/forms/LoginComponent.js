import React, {useState, useContext} from 'react';
import {Link,} from "react-router-dom";
import {Box, CardMedia, Checkbox, Grid, Paper, Typography} from "@material-ui/core/index";
import iconImg from '../../../../assets/media/image/logo-sm.png';
import InputComponent from '../../../partials/inputComponent'
import ButtonComponent from "../../../partials/ButtonComponent";
import AppContext from './../../../../contexts/AppContext';
//JSS file
import * as useStyles from './../../../../assets/js/login';
//requests
import authService from './../../../../core/services/auth.service';


export default function LoginComponent() {
    const classes = useStyles.styles();

    const [errors, setErrors] = useState({errorName: '', errorPass: '', loginError: ''});

    const context = useContext(AppContext);

    let login = () => {
        if (context.user.name === "" || context.user.pass === "") {
            if (context.user.name === "") {
                setErrors(prevState => {
                    return {
                        ...prevState, errorName: true
                    }
                });
            } else {
                setErrors(prevState => {
                    return {
                        ...prevState, errorName: false
                    }
                });
            }
            if (context.user.pass === "") {
                setErrors(prevState => {
                    return {
                        ...prevState, errorPass: true
                    }
                });
            } else {
                setErrors(prevState => {
                    return {
                        ...prevState, errorPass: false
                    }
                });
            }
            return;
        }
        authService.login(context.user).then((response) => {
            debugger
            setErrors({errorName: false, errorPass: false, loginError: false});
            window.location = "/";
        }).catch((error) => {
            debugger
            setErrors({errorName: false, errorPass: false, loginError: true});
        });
    };

    let changeInput = (e, keyName) => {
        let value = e.target.value;
        context.changeUser(keyName, value);
    };

    return (<div className={classes.login}>
        <Grid container style={{justifyContent: 'center'}}>
            <Grid item sm className="grid">
                <Paper className="paper">
                    <Box className="head-img">
                        <CardMedia>
                            <img src={iconImg} alt="recipe thumbnail"/>
                        </CardMedia>
                    </Box>
                    <Box className="loginBlock">
                        <Typography variant="h5" className="title">
                            ورود
                        </Typography>
                        {errors.loginError ?
                            <Typography className="loginError"> نام کاربری یا رمز عبور اشتباه میباشد!</Typography>
                            : ''}
                        <Box className="inputBlock">
                            <InputComponent name="name" type="text" placeholder="نام کاربری"
                                            border={errors.errorName ? 'red' : ''}
                                            handleClick={e => changeInput(e, 'name')}/>
                            {errors.errorName ? <div className="error">واردکرن نام کاربری الزامی میباشد</div> : ''}

                        </Box>
                        <Box className="inputBlock">
                            <InputComponent name="pass" type="password" placeholder="رمز عبور"
                                            handleClick={e => changeInput(e, 'pass')}
                                            border={errors.errorPass ? 'red' : ''}
                            />
                            {errors.errorPass ? <div className="error">واردکرن رمز عبور الزامی میباشد</div> : ''}


                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between" className="remember">
                        <Box className="right">
                            <Checkbox inputProps={{'aria-label': 'primary checkbox'}}/>
                            <Typography>به خاطر سپاری</Typography>
                        </Box>
                        <Box className="left">
                            <Link to="/change">بازنشانی رمز عبور</Link>
                        </Box>
                    </Box>
                    <Box className="loginButton">
                        <ButtonComponent text="ورود" clicked={login}/>
                    </Box>
                    <Box className="hr">
                        <hr/>
                    </Box>
                    <Box className="register">
                        <Typography>حسابی ندارید ؟</Typography>
                        <Link to="#">هم اکنون ثبت نام کنید!</Link>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </div>);
}
