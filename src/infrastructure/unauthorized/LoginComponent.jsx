import React, {useState, useContext} from 'react'
import {Link,} from "react-router-dom"
import {useHistory} from "react-router-dom"
import i18next from "i18next"
import ReCAPTCHA from "react-google-recaptcha";

import {Box, CardMedia, Grid, Typography} from "@material-ui/core/index"

import iconImg from 'assets/media/image/logo-login.png'
import AppContext from 'contexts/AppContext'
import {withNamespaces} from "react-i18next"
import {StyledInput, StyledTypographyError} from "assets/js/App"
import {
    LoginBlock,
    StyledGridLogin,
    LoginError,
    InputBlock,
    RememberBlock,
    LoginButton,
    StyledInputLogin,
    StyledRelativeBlock,
    StyledSvgInput,
    StyledRegisterLoginButton
} from "assets/js/login"
import {loginMethod, changeInputMethod, keyUpMethod} from './LoginComponent.js'
import StyledCheckboxComponent from "infrastructure/authorized/partials/StyledCheckboxComponent"
import {grey} from "assets/js/library/abstracts/colors"
import {get} from "libraries/local-storage"
import "assets/new-svg/fonts/icomoon.svg"
import "assets/new-svg/style.css"


function LoginComponent({t, isTicketLogin, setIsTicketLogIn}) {
    const [errors, setErrors] = useState({errorName: false, errorPass: false, loginError: false})
    const history = useHistory()
    const appContext = useContext(AppContext)
    const [user, setUser] = useState(!isTicketLogin ? (JSON.parse(get(process.env.REACT_APP_USER_LOGIN))===null ? {
        name: '',
        pass: ''
    }:JSON.parse(get(process.env.REACT_APP_USER_LOGIN) )) : {
        name: '',
        pass: ''
    })
    const [passwordType, setPasswordType] = useState('password')
    const [rememberMe, setRememberMe] = useState(get(process.env.REACT_APP_USER_LOGIN) !== null)
    const lang = i18next.language

    const login = () => {
        loginMethod(user,lang,t, setErrors, appContext, history, rememberMe, setRememberMe, isTicketLogin, setIsTicketLogIn)
    }

    const changeRememberMe = (e) => {
        setRememberMe(e.currentTarget.checked)
    }

    const changeInput = (e, keyName) => {
        changeInputMethod(e, setUser, keyName, setErrors)
    }

    const clickEypePassword = () => {
        const type = passwordType === "password" ? "type" : "password"
        setPasswordType(type)
    }

    const key_up = (e) => {
        keyUpMethod(e, login)
    }

    const onChangekaptcha = () => {
        debugger
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
                            <StyledRelativeBlock>
                                <StyledInputLogin name="name"
                                                  type="text"
                                                  value={user.name}
                                                  placeholder={isTicketLogin ? t('users:email') : t('users:username')}
                                                  border={errors.errorName ? 'red' : grey[0]}
                                                  onKeyUp={key_up}
                                                  onChange={e => changeInput(e, 'name')}/>
                                <StyledSvgInput className="icon-user"></StyledSvgInput>
                            </StyledRelativeBlock>
                            {errors.errorName ? <StyledTypographyError
                                lang={lang}>{t('users:forceUsername')}</StyledTypographyError> : ''}
                        </InputBlock>
                        <InputBlock>
                            <StyledRelativeBlock>
                                <StyledInputLogin name="pass"
                                                  value={user.pass}
                                                  type={passwordType}
                                                  placeholder={t('users:password')}
                                                  onChange={e => changeInput(e, 'pass')}
                                                  border={errors.errorPass ? 'red' : grey[0]}
                                                  onKeyUp={key_up}/>
                                <StyledSvgInput className={passwordType==="type"?"icon-eye":"icon-eye-blocked"} onClick={clickEypePassword}></StyledSvgInput>
                            </StyledRelativeBlock>
                            {errors.errorPass ? <StyledTypographyError
                                lang={lang}>{t('users:forcePassword')}</StyledTypographyError> : ''}
                        </InputBlock>
                    </Box>
                    <ReCAPTCHA
                        sitekey="Your client site key"
                        onChange={onChangekaptcha}
                    />
                    <RememberBlock>
                        <Box>
                            <StyledCheckboxComponent label={t('users:rememberMe')} checked={rememberMe}
                                                     change={changeRememberMe}/>
                        </Box>
                        <Box>
                            <Link to="/forget-password">{t('users:changePass')}</Link>
                        </Box>
                    </RememberBlock>

                    <LoginButton>
                        <StyledRegisterLoginButton onClick={login}>{t('translation:enter')}</StyledRegisterLoginButton>
                    </LoginButton>
                </Box>
            </StyledGridLogin>
        </Grid>
    </LoginBlock>)
}

export default withNamespaces('users,translation')(LoginComponent)
