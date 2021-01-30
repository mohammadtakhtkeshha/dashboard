import React, {useState} from 'react'
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import {Route, Router} from "react-router-dom"
import i18ne from './../configs/locales/locales'

import AppContext from './../contexts/AppContext'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import './../App.css'
import 'assets/css/yekanFont.css'
import {StyledDirection} from "../assets/js/App"
import history from "../configs/History"
import * as components from "../assets/js/AppImports"
import ProtectedRoute from "../shared/routes/protected-routes"
import LoadingComponent from "../components/content/partials/LoadingComponent"
import {defaultStyles, StyledBox} from "assets/js/layout"
import {handleErrorMethod} from "./layout.js"

const theme = createMuiTheme(defaultStyles)

export function Layout({t}) {
    const lang = i18next.language
    const perPage = 5
    const [showUserDrawer, setShowUserDrawer] = useState(false)
    const [loading, setLoading] = useState(false)

    let toggleUserDrawer = (boolean) => {
        setShowUserDrawer(boolean)
    }

    let handleError = (error) => {
        handleErrorMethod(t, error, setLoading)
    }

    return (
        <StyledDirection>
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
                                <Route path="/login" component={components.LoginComponent}/>
                                <Route path="/forget-password" component={components.ForgetPasswordComponent}/>
                                <ProtectedRoute path="/" component={components.AuthorizedComponent}/>
                            </Router>
                        </StyledBox>
                    </AppContext.Provider>
                </ThemeProvider>
        </StyledDirection>
    )
}

export default withNamespaces('translation')(Layout)
