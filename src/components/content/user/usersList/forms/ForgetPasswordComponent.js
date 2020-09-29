import React, {useState, useContext} from 'react';
import {Link,} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {withNamespaces} from "react-i18next";

import {Box, CardMedia, Grid, Paper, Typography} from "@material-ui/core/index";

import iconImg from 'assets/media/image/logo-login.png';
import AppContext from 'contexts/AppContext';
import authService from 'core/services/auth.service';
import {green} from "components/partials/Colors";
import {StyledButton, StyledInput} from "assets/js/App";
import {InputBlock, LoginBlock, StyledGridLogin,LoginButton,RegisterBlock} from "assets/js/login";

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

    return (<LoginBlock>
        <Grid container>
            <StyledGridLogin item sm>
                <Box>
                    <Box>
                        <CardMedia>
                            <img src={iconImg} alt="recipe thumbnail"/>
                        </CardMedia>
                    </Box>
                    <Box>
                        <Typography variant="h5">
                            {t('users:changePass')}
                        </Typography>
                        {errors.loginError ?
                            <Typography> {t('users:wrongUserNameOrPass')}</Typography>
                            : ''}
                        <InputBlock>
                            <StyledInput name="name" type="text" placeholder={t('users:username')}
                                            border={errors.errorName ? 'red' : ''}
                                            onChange={e => changeInput(e, 'name')}/>
                            {errors.errorName ? <div>{t('users:forceUsername')}</div> : ''}
                        </InputBlock>
                    </Box>
                    <LoginButton>
                        <StyledButton bg={green[1]}  onClick={login}>
                            {t('translation:register')}
                        </StyledButton>

                    </LoginButton>
                     <hr/>
                    <RegisterBlock>
                        <Typography>{t('translation:anotherAction')}</Typography>
                        <Link to="#">{t('users:registerNow')}</Link>
                        <Typography style={{padding: '0 5px'}} variant="span">{t('translation:or')}</Typography>
                        <Link to="/login">{t('translation:doEnter')}</Link>
                    </RegisterBlock>
                </Box>
            </StyledGridLogin>
        </Grid>
    </LoginBlock>);
}

export default withNamespaces('translation')(LoginComponent);
