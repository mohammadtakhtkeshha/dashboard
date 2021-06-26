import { login } from 'core/services/auth.service';
import { ticketLogin } from 'core/services/ticket.service';
import storage from 'libraries/local-storage';

const userLogin = (setLoading, isLoginSuccess, setErrors, user, history, refreshCaptcha) => {
  login(user, setLoading)
    .then(response => {
      setLoading(false);
      setErrors({ errorName: false, errorPass: false, loginError: false });
      isLoginSuccess = true;
      history.push('/');
    })
    .catch(error => {
      const status = error.response.status;
      setLoading(false);
      switch (status) {
        case 403:
          setErrors({ errorName: false, errorPass: false, loginError: false, captchaError: true });
          refreshCaptcha();
          break;
        default:
          setErrors({ errorName: false, errorPass: false, loginError: true, captchaError: false });
      }
    });
};

const loginTicket = (user, lang, setLoading, setIsTicketLogIn) => {
  setLoading(false);
  ticketLogin(user, setLoading, lang).then(response => {
    setLoading(false);
    storage.store(process.env.REACT_APP_ISTICKET_LOGIN, 'true');
    storage.store(process.env.REACT_APP_TICKET_PERIOD, Date.now());
    storage.store(process.env.REACT_APP_USER_CLIENT_ID, response.data.userid);
    setIsTicketLogIn('true');
  });
};

export const loginMethod = (
  user,
  lang,
  setErrors,
  setLoading,
  isLoginSuccess,
  history,
  rememberMe,
  setReemberMe,
  isTicketLogin,
  setIsTicketLogIn,
  refreshCaptcha
) => {
  setErrors({ errorName: false, errorPass: false, loginError: false });
  if (user.name === '' || user.pass === '') {
    if (user.name === '') {
      setErrors(prevState => {
        return {
          ...prevState,
          errorName: true,
        };
      });
    } else {
      setErrors(prevState => {
        return {
          ...prevState,
          errorName: false,
        };
      });
    }
    if (user.pass === '') {
      setErrors(prevState => {
        return {
          ...prevState,
          errorPass: true,
        };
      });
    } else {
      setErrors(prevState => {
        return {
          ...prevState,
          errorPass: false,
        };
      });
    }
    return;
  }
  setLoading(true);
  if (isTicketLogin) {
    if (rememberMe) {
      storage.store(process.env.REACT_APP_USER_LOGIN_TICKET, user);
    } else {
      storage.remove(process.env.REACT_APP_USER_LOGIN_TICKET);
    }
    setLoading(true);
    loginTicket(user, lang, setLoading, setIsTicketLogIn);
  } else {
    if (rememberMe) {
      storage.store(process.env.REACT_APP_USER_LOGIN, JSON.stringify(user));
    } else {
      storage.remove(process.env.REACT_APP_USER_LOGIN);
    }
    userLogin(setLoading, isLoginSuccess, setErrors, user, history, refreshCaptcha);
  }
};

export const changeInputMethod = (e, setUser, keyName, setErrors) => {
  let value = e.target.value;
  setUser(prevState => {
    return {
      ...prevState,
      [keyName]: value,
    };
  });
  if (value.length > 0) {
    let currentKey = keyName === 'pass' ? 'errorPass' : 'errorName';
    setErrors(prevState => {
      return { ...prevState, [currentKey]: false };
    });
  }
};

export const keyUpMethod = (e, login) => {
  let enterKey = 13; //Key Code for Enter Key
  if (e.which === enterKey) {
    login();
  }
};
