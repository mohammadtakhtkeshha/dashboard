import authService from "core/services/auth.service";

export const loginMethod = (user, setErrors, appContext, history) => {
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
    authService.login(user, appContext.handleError).then((response) => {
        appContext.setLoading(false);
        setErrors({errorName: false, errorPass: false, loginError: false});
        appContext.isLoginSuccess = true;
        history.push("/");
    }).catch((error) => {
        setErrors({errorName: false, errorPass: false, loginError: true});
        appContext.setLoading(false);
    });
}

export const changeInputMethod = (e,setUser,keyName) => {
    let value = e.target.value;
    setUser(prevState => {
        return {
            ...prevState, [keyName]: value
        }
    });
}

export const keyUpMethod = (e,login) => {
    let enterKey = 13; //Key Code for Enter Key
    if (e.which == enterKey) {
        login();
    }
}
