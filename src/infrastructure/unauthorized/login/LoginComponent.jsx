import React, { useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import i18next from 'i18next';
import CaptchaComponent from './partials/CaptchaComponent.jsx';

import { Box, CardMedia, Grid, Typography } from '@material-ui/core/index';

import iconImg from 'assets/media/image/logo-login.png';
import AppContext from 'contexts/AppContext';
import { withNamespaces } from 'react-i18next';
import { StyledTypographyError } from 'assets/js/library/base/typography';
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
  StyledRegisterLoginButton,
} from 'assets/js/login';
import { loginMethod, changeInputMethod, keyUpMethod } from './LoginComponent.js';
import StyledCheckboxComponent from 'features/partials/StyledCheckboxComponent';
import { grey } from 'assets/js/library/abstracts/colors';
import { get } from 'libraries/local-storage';

function LoginComponent({ t, isTicketLogin, setIsTicketLogIn }) {
  const [errors, setErrors] = useState({ errorName: false, errorPass: false, loginError: false, captchaError: false });
  const [src, setSrc] = useState(`${process.env.REACT_APP_API_URL}/soc/captcha`);
  const history = useHistory();
  const { setLoading, isLoginSuccess } = useContext(AppContext);
  const [user, setUser] = useState(
    !isTicketLogin
      ? JSON.parse(get(process.env.REACT_APP_USER_LOGIN)) === null
        ? {
            name: '',
            pass: '',
          }
        : JSON.parse(get(process.env.REACT_APP_USER_LOGIN))
      : {
          name: '',
          pass: '',
        }
  );
  const [passwordType, setPasswordType] = useState('password');
  const [rememberMe, setRememberMe] = useState(get(process.env.REACT_APP_USER_LOGIN) !== null);
  const lang = i18next.language;

  const login = () => {
    loginMethod(
      user,
      lang,
      setErrors,
      setLoading,
      isLoginSuccess,
      history,
      rememberMe,
      setRememberMe,
      isTicketLogin,
      setIsTicketLogIn,
      refreshCaptcha
    );
  };

  const changeRememberMe = e => {
    setRememberMe(e.currentTarget.checked);
  };

  const changeInput = (e, keyName) => {
    changeInputMethod(e, setUser, keyName, setErrors);
  };

  const clickEypePassword = () => {
    const type = passwordType === 'password' ? 'type' : 'password';
    setPasswordType(type);
  };

  const key_up = e => {
    keyUpMethod(e, login);
  };

  const refreshCaptcha = useCallback(() => {
    const date = new Date();
    setSrc(`${process.env.REACT_APP_API_URL}/soc/captcha?` + date.getTime());
  }, [setSrc]);

  return (
    <LoginBlock>
      <Grid container>

        <StyledGridLogin item sm>
          <Box>
            <Box>

              <CardMedia>
                <img src={iconImg} alt="recipe thumbnail" />
              </CardMedia>
            </Box>
            <Box>
              <Typography variant="h5">{t('translation:login')}</Typography>
              {errors.loginError ? <LoginError> {t('users:wrongUserNameOrPass')}</LoginError> : ''}
              <InputBlock>
                <StyledRelativeBlock>
                  <StyledInputLogin
                    name="name"
                    type="text"
                    value={user.name}
                    placeholder={isTicketLogin ? t('users:email') : t('users:username')}
                    border={errors.errorName ? 'red' : grey[0]}
                    onKeyUp={key_up}
                    onChange={e => changeInput(e, 'name')}
                  />
                  <StyledSvgInput className="icon-user1"></StyledSvgInput>
                </StyledRelativeBlock>
                {errors.errorName ? <StyledTypographyError lang={lang}>{t('users:forceUsername')}</StyledTypographyError> : ''}
              </InputBlock>
              <InputBlock>
                <StyledRelativeBlock>
                  <StyledInputLogin
                    name="pass"
                    value={user.pass}
                    type={passwordType}
                    placeholder={t('users:password')}
                    onChange={e => changeInput(e, 'pass')}
                    border={errors.errorPass ? 'red' : grey[0]}
                    onKeyUp={key_up}
                  />
                  <StyledSvgInput
                    className={passwordType === 'type' ? 'icon-password' : 'icon-password-blocked'}
                    // className={passwordType === 'type' ? 'icon-eye1' : 'icon-eye-hide1'}
                    onClick={clickEypePassword}/>
                </StyledRelativeBlock>
                {errors.errorPass ? <StyledTypographyError lang={lang}>{t('users:forcePassword')}</StyledTypographyError> : ''}
              </InputBlock>
            </Box>
            <CaptchaComponent
              refreshCaptcha={refreshCaptcha}
              setUser={setUser}
              errors={errors}
              src={src}
              keyUp={key_up}
            />
            <RememberBlock>
              <Box>
                <StyledCheckboxComponent label={t('users:rememberMe')} checked={rememberMe} change={changeRememberMe} />
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
    </LoginBlock>
  );
}

export default withNamespaces('users,translation')(LoginComponent);
