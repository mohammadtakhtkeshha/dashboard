import React, {useState, useContext} from 'react';
import {Link,} from "react-router-dom";
import {useHistory} from "react-router-dom";

import {Box, CardMedia, Checkbox, Grid, Typography} from "@material-ui/core/index";

import iconImg from 'assets/media/image/logo-login.png';
import AppContext from 'contexts/AppContext';
import authService from 'core/services/auth.service';
import {withNamespaces} from "react-i18next";
import {green} from "components/partials/Colors";
import {StyledButton, StyledInput} from "assets/js/App";
import {RegisterBlock,LoginBlock,StyledGridLogin,LoginError,InputBlock, RememberBlock, LoginButton} from "assets/js/login";

function LoginComponent({t}) {
    const [errors, setErrors] = useState({errorName: false, errorPass: false, loginError: false});
    const history = useHistory();
    const appContext = useContext(AppContext);
    const [user, setUser] = useState({name: '', pass: ''});

    let login = () => {
        setErrors({errorName: false, errorPass: false, loginError: false});
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
        appContext.setLoading(true);

        authService.login(user).then((response) => {
            appContext.setLoading(false);
            setErrors({errorName: false, errorPass: false, loginError: false});
            appContext.isLoginSuccess = true;
            history.push("/");
        }).catch((error) => {
            setErrors({errorName: false, errorPass: false, loginError: true});
            appContext.setLoading(false);
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
        if (window.event.keyCode == '13') { //hit enter
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
                            {t('translation:login')}
                        </Typography>
                        {errors.loginError ?
                            <LoginError> {t('users:wrongUserNameOrPass')}</LoginError>
                            : ''}
                        <InputBlock>
                            <StyledInput name="name" type="text" placeholder={t('users:username')}
                                         border={errors.errorName ? 'red' : ''}
                                         onChange={e => changeInput(e, 'name')}/>
                            {errors.errorName ? <div>{t('users:forceUsername')}</div> : ''}

                        </InputBlock>
                        <InputBlock>
                            <StyledInput name="pass" type="password" placeholder={t('users:password')}
                                         onChange={e => changeInput(e, 'pass')}
                                         border={errors.errorPass ? 'red' : ''}
                            />
                            {errors.errorPass ? <div>{t('users:forcePassword')}</div> : ''}
                        </InputBlock>
                    </Box>
                    <RememberBlock>
                        <Box>
                            <Checkbox inputProps={{'aria-label': 'primary checkbox'}}/>
                            <Typography>{t('users:rememberMe')}</Typography>
                        </Box>
                        <Box>
                            <Link to="/forget-password">{t('users:changePass')}</Link>
                        </Box>
                    </RememberBlock>
                    <LoginButton>
                        <StyledButton bg={green[1]} onClick={login}>{t('translation:enter')}</StyledButton>
                    </LoginButton>
                    <hr/>
                    <RegisterBlock>
                        <Typography>{t('users:notAcount')}</Typography>
                        <Link to="#">{t('users:registerNow')}</Link>
                    </RegisterBlock>
                </Box>
            </StyledGridLogin>
        </Grid>
    </LoginBlock>);
}

export default withNamespaces('users,translation')(LoginComponent);
