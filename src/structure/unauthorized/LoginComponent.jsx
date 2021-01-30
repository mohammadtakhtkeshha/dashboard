import React, {useState, useContext} from 'react';
import {Link,} from "react-router-dom";
import {useHistory} from "react-router-dom";

import {Box, CardMedia, Checkbox, Grid, Typography} from "@material-ui/core/index";

import iconImg from 'assets/media/image/logo-login.png';
import AppContext from 'contexts/AppContext';
import {withNamespaces} from "react-i18next";
import {StyledRegisterButton, StyledInput} from "assets/js/App";
import {LoginBlock, StyledGridLogin, LoginError, InputBlock, RememberBlock, LoginButton} from "assets/js/login";
import {loginMethod,changeInputMethod,keyUpMethod} from './LoginComponent.js'

function LoginComponent({t}) {
    const [errors, setErrors] = useState({errorName: false, errorPass: false, loginError: false});
    const history = useHistory();
    const appContext = useContext(AppContext);
    const [user, setUser] = useState({name: '', pass: ''});

    const login = () => {
        loginMethod(user,setErrors,appContext,history);
    }

    const changeInput = (e, keyName) => {
        changeInputMethod(e,setUser,keyName);
    }

    const key_up = (e) => {
        keyUpMethod(e,login)
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
                                         onKeyUp={key_up}
                                         onChange={e => changeInput(e, 'name')}/>
                            {errors.errorName ? <div>{t('users:forceUsername')}</div> : ''}

                        </InputBlock>
                        <InputBlock>
                            <StyledInput name="pass" type="password" placeholder={t('users:password')}
                                         onChange={e => changeInput(e, 'pass')}
                                         border={errors.errorPass ? 'red' : ''}
                                         onKeyUp={key_up}/>
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
                        <StyledRegisterButton onClick={login}>{t('translation:enter')}</StyledRegisterButton>
                    </LoginButton>
                </Box>
            </StyledGridLogin>
        </Grid>
    </LoginBlock>);
}

export default withNamespaces('users,translation')(LoginComponent);
