import authService from "core/services/auth.service";
import {ticketLogin} from "core/services/ticket.service";
import storage from "libraries/local-storage"

const userLogin = (appContext, setErrors, user, history) => {
    authService.login(user, appContext.handleError).then((response) => {
        appContext.setLoading(false);
        setErrors({errorName: false, errorPass: false, loginError: false});
        appContext.isLoginSuccess = true;
        history.push("/");
    }).catch((error) => {
        appContext.setLoading(false);
        setErrors({errorName: false, errorPass: false, loginError: true});
    });
}

const loginTicket = (user,lang,t, appContext, setIsTicketLogIn) => {
    appContext.setLoading(false)
    ticketLogin(user, appContext.handleError,lang,t).then(response => {
        appContext.setLoading(false)
        storage.store(process.env.REACT_APP_ISTICKET_LOGIN, "true")
        storage.store(process.env.REACT_APP_TICKET_PERIOD, Date.now())
        storage.store(process.env.REACT_APP_USER_CLIENT_ID, response.data.userid)
        setIsTicketLogIn("true")
    })
}

export const loginMethod = (user, lang,t,setErrors, appContext, history, rememberMe, setReemberMe, isTicketLogin, setIsTicketLogIn) => {
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
    if (isTicketLogin) {
        if (rememberMe) {
            storage.store(process.env.REACT_APP_USER_LOGIN_TICKET, user)
        } else {
            storage.remove(process.env.REACT_APP_USER_LOGIN_TICKET)
        }
        appContext.setLoading(true)
        loginTicket(user,lang, t,appContext, setIsTicketLogIn)
    } else {
        if (rememberMe) {
            storage.store(process.env.REACT_APP_USER_LOGIN, JSON.stringify(user))
        } else {
            storage.remove(process.env.REACT_APP_USER_LOGIN)
        }
        userLogin(appContext, setErrors, user, history)
    }
}

export const changeInputMethod = (e, setUser, keyName, setErrors) => {
    let value = e.target.value;
    setUser(prevState => {
        return {
            ...prevState, [keyName]: value
        }
    });
    if (value.length > 0) {
        let currentKey = keyName === "pass" ? "errorPass" : "errorName"
        setErrors(prevState => {
            return {...prevState, [currentKey]: false}
        })
    }
}

export const keyUpMethod = (e, login) => {
    let enterKey = 13; //Key Code for Enter Key
    if (e.which == enterKey) {
        login();
    }
}
