import React, {useState, useContext} from 'react'
import {Link,} from "react-router-dom"
import {useHistory} from "react-router-dom"
import i18next from "i18next"

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
    StyledPasswordEye,
    LoginButton,
    RememberBlockTest,
    StyledRegisterLoginButton
} from "assets/js/login"
import {StyledRelative} from "assets/js/library/base/all";
import {loginMethod, changeInputMethod, keyUpMethod} from './LoginComponent.js'
import StyledCheckboxComponent from "components/partials/StyledCheckboxComponent"
import {grey} from "components/partials/Colors"
import passEye from "assets/svg/passwordeye.png"
import {get} from "libraries/local-storage"

function LoginComponent({t, isTicketLogin, setIsTicketLogIn}) {
    const [errors, setErrors] = useState({errorName: false, errorPass: false, loginError: false})
    const history = useHistory()
    const appContext = useContext(AppContext)
    const [user, setUser] = useState(get(process.env.REACT_APP_USER_LOGIN) ? JSON.parse(get(process.env.REACT_APP_USER_LOGIN)) : {
        name: '',
        pass: ''
    })
    const [passwordType, setPasswordType] = useState('password')
    const [rememberMe, setRememberMe] = useState(false)
    const lang = i18next.language
    const login = () => {
        loginMethod(user, setErrors, appContext, history, rememberMe, setRememberMe, isTicketLogin, setIsTicketLogIn)
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
                            <StyledInput name="name"
                                         type="text"
                                         value={user.name}
                                         placeholder={isTicketLogin ? t('users:email') : t('users:username')}
                                         border={errors.errorName ? 'red' : grey[0]}
                                         onKeyUp={key_up}
                                         onChange={e => changeInput(e, 'name')}/>
                            {errors.errorName ? <StyledTypographyError
                                lang={lang}>{t('users:forceUsername')}</StyledTypographyError> : ''}
                        </InputBlock>
                        <InputBlock>
                            <StyledRelative>
                                <StyledInput name="pass"
                                                 value={user.pass}
                                                 type={passwordType} placeholder={t('users:password')}
                                                 onChange={e => changeInput(e, 'pass')}
                                                 border={errors.errorPass ? 'red' : grey[0]}
                                                 onKeyUp={key_up}/>
                                <StyledPasswordEye src={passEye} alt={passEye} onClick={clickEypePassword}/>
                            </StyledRelative>
                            {errors.errorPass ? <StyledTypographyError
                                lang={lang}>{t('users:forcePassword')}</StyledTypographyError> : ''}
                        </InputBlock>
                    </Box>
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
