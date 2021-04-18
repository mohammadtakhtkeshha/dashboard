import React, {useEffect, useState} from 'react'
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import {Route, Router} from "react-router-dom"
import i18ne from './../configs/locales/locales'
import "assets/css/yekanFont.css"
import "assets/css/byekanFont.css"
import AppContext from 'contexts/AppContext'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import 'App.css'
import history from "configs/History"
import ProtectedRoute from "shared/routes/protected-routes"
import LoadingComponent from "features/partials/LoadingComponent"
import {defaultStyles, StyledBox,layoutClasses} from "assets/js/layout.js"
import {handleErrorMethod} from "./layout.js"
import {makeStyles} from "@material-ui/styles";
import AuthorizedComponent from "infrastructure/authorized/authorized.jsx"
import ForgetPasswordComponent from "infrastructure/unauthorized/ForgetPasswordComponent"
import LoginComponent from "infrastructure/unauthorized/LoginComponent.jsx"

const theme = createMuiTheme(defaultStyles)
const useStyles = makeStyles(layoutClasses)

export function Layout({t}) {
    const lang = i18next.language
    const perPage = 30
    const [showUserDrawer, setShowUserDrawer] = useState(false)
    const [loading, setLoading] = useState(false)
    const classes = useStyles({lang:lang})

    let toggleUserDrawer = (boolean) => {
        setShowUserDrawer(boolean)
    }

    let handleError = (error) => {
        handleErrorMethod(t, error, setLoading)
    }

    useEffect(() => {
        let fontFamily =  lang === "en" ? classes.fontFamilyByekan:classes.fontFamilyPrimary
        document.body.className = fontFamily;
    }, [lang]);

    return (<>
            <LoadingComponent loading={loading}/>
            <ThemeProvider theme={theme}>
                <AppContext.Provider
                    value={{
                        perPage: perPage,
                        handleError: handleError,
                        showUserDrawer: showUserDrawer,
                        toggleUserDrawer: toggleUserDrawer,
                        isLoginSuccess: false,
                        loading: loading,
                        setLoading: setLoading,
                    }}>
                    <StyledBox lang={lang}>
                        <Router history={history}>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/forget-password" component={ForgetPasswordComponent}/>
                            <ProtectedRoute path="/" component={AuthorizedComponent}/>
                        </Router>
                    </StyledBox>
                </AppContext.Provider>
            </ThemeProvider>
        </>
    )
}

export default withNamespaces('translation')(Layout)
