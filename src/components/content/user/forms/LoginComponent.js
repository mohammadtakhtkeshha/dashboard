import React, {useState, useContext} from 'react';
import {Link,} from "react-router-dom";
import {Box, CardMedia, Checkbox, Grid, Paper, Typography} from "@material-ui/core/index";
import iconImg from '../../../../assets/media/image/logo-login.png';
import InputComponent from '../../../partials/inputComponent'
import ButtonComponent from "../../../partials/ButtonComponent";
import AppContext from './../../../../contexts/AppContext';
import {useHistory} from "react-router-dom";
import * as useStyles from './../../../../assets/js/login';
import authService from './../../../../core/services/auth.service';
import {withNamespaces} from "react-i18next";
import {primary} from "../../../partials/Colors";

function LoginComponent({t}) {
    const classes = useStyles.styles();
    const [errors, setErrors] = useState({errorName: false, errorPass: false, loginError: false});
    const history = useHistory();
    const context = useContext(AppContext);
    const [user, setUser] = useState({name: '', pass: ''});

    let login = () => {
        if (user.name === "" || user.pass === "") {
            if (user.name === "") {
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
            if (user.pass === "") {
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
        authService.login(user).then((response) => {
            setErrors({errorName: false, errorPass: false, loginError: false});
            context.isLoginSuccess = true;
            history.push("/");
        }).catch((error) => {
            setErrors({errorName: false, errorPass: false, loginError: true});
        });
    };

    let changeInput = (e, keyName) => {
        let value = e.target.value;
        setUser(prevState => {
            return {
                ...prevState, [keyName]: value
            }
        });
    };

    document.onkeydown = function (event) {
        if (window.event.keyCode == '13') {
            login();
        }
    }

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
                            {t('translation:login')}
                        </Typography>
                        {errors.loginError ?
                            <Typography className="loginError"> {t('users:wrongUserNameOrPass')}</Typography>
                            : ''}
                        <Box className="inputBlock">
                            <InputComponent name="name" type="text" placeholder={t('users:username')}
                                            border={errors.errorName ? 'red' : ''}
                                            handleClick={e => changeInput(e, 'name')}/>
                            {errors.errorName ? <div className="error">{t('users:forceUsername')}</div> : ''}

                        </Box>
                        <Box className="inputBlock">
                            <InputComponent name="pass" type="password" placeholder={t('users:password')}
                                            handleClick={e => changeInput(e, 'pass')}
                                            border={errors.errorPass ? 'red' : ''}
                            />
                            {errors.errorPass ? <div className="error">{t('users:forcePassword')}</div> : ''}
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between" className="remember">
                        <Box className="right">
                            <Checkbox inputProps={{'aria-label': 'primary checkbox'}}/>
                            <Typography>{t('users:rememberMe')}</Typography>
                        </Box>
                        <Box className="left">
                            <Link to="/forget-password">{t('users:changePass')}</Link>
                        </Box>
                    </Box>
                    <Box className="loginButton">
                        <ButtonComponent color={'primary'} background={primary} text={t('translation:enter')} clicked={login}/>
                    </Box>
                    <Box className="hr">
                        <hr/>
                    </Box>
                    <Box className="register">
                        <Typography>{t('users:notAcount')}</Typography>
                        <Link to="#">{t('users:registerNow')}</Link>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </div>);
}

export default withNamespaces('translation')(LoginComponent);
