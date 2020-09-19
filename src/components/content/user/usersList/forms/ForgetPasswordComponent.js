import React, {useState, useContext} from 'react';
import {Link,} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {withNamespaces} from "react-i18next";

import {Box, CardMedia, Grid, Paper, Typography} from "@material-ui/core/index";

import iconImg from 'assets/media/image/logo-login.png';
import AppContext from 'contexts/AppContext';
import authService from 'core/services/auth.service';
import {primary} from "components/partials/Colors";
import {StyledButton, StyledInput} from "assets/js/App";
import {LoginStyles} from "assets/js/login";

function LoginComponent({t}) {
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

    return (<LoginStyles>
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
                            {t('users:changePass')}
                        </Typography>
                        {errors.loginError ?
                            <Typography className="loginError"> {t('users:wrongUserNameOrPass')}</Typography>
                            : ''}
                        <Box className="inputBlock">
                            <StyledInput name="name" type="text" placeholder={t('users:username')}
                                            border={errors.errorName ? 'red' : ''}
                                            handleClick={e => changeInput(e, 'name')}/>
                            {errors.errorName ? <div className="error">{t('users:forceUsername')}</div> : ''}

                        </Box>
                    </Box>
                    <Box className="loginButton">
                        <StyledButton bg={primary}  onClick={login}>
                            {t('translation:register')}
                        </StyledButton>

                    </Box>
                    <Box className="hr">
                        <hr/>
                    </Box>
                    <Box className="register">
                        <Typography>{t('translation:anotherAction')}</Typography>
                        <Link to="#">{t('users:registerNow')}</Link>
                        <Typography style={{padding: '0 5px'}} variant="span">{t('translation:or')}</Typography>
                        <Link to="/login">{t('translation:doEnter')}</Link>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </LoginStyles>);
}

export default withNamespaces('translation')(LoginComponent);
