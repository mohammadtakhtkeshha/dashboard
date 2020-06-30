import React, {useState, useEffect} from 'react';
import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/index';
import AppContext from './../contexts/AppContext';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import './../App.css';
import axios from "axios/index";
import storage from './../libraries/local-storage';
import ProtectedRoute from'./../shared/routes/protected-routes';
import { tokenKey } from "../config.json";


import font from './../assets/css/font.css';//fonts
import rtl from 'jss-rtl';
import UseWindowDimensions from './../configs/useWindowDimensions';

import {
    Route,
    Router,
} from "react-router-dom";
// added components
import * as components from './../assets/js/AppImports'
import history from './../configs/History';


const styles = {
    sidebar: {
        height: '100vh',
        flexGrow: 1
    },
    content: {
        flexGrow: 5
    }
};


const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        fontFamily: ["primary-font", "segoe ui", "tahoma"],
        body1: {
            fontSize: '13px'
        }
    },
    breakpoints: {
        values: {
            xs: 576, sm: 768, md: 992, lg: 1200, xl: 1200
        }
    },
    overrides: {
        MuiPaper: {
            elevation1: {
                boxShadow: '0 0 0 0',
            }
        },
    }

});

export function App() {
    const [showUserDrawer, setShowUserDrawer] = useState(false);
    const [user, setUser] = useState({
        name: '',
        field_name: '',
        field_last_name: '',
        mail: '',
        pass: '',
        confirm_pass: '',
        user_picture: '',
    });

    let toggleUserDrawer = (boolean) => {
        setShowUserDrawer(boolean)
    };



    let changeUser = (keyName, value) => {
        setUser(prevState => {
            return {
                ...prevState, [keyName]: value
            }
        });
    };

    // useEffect(() => {
    //     local.store(tokenKey, token);
    // }, [token]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <AppContext.Provider
                    value={{
                        showUserDrawer: showUserDrawer,
                        toggleUserDrawer: toggleUserDrawer,
                        changeUser: changeUser,
                        user: user,
                        token: storage.get(tokenKey),
                    }}>
                    <div dir="rtl">
                        <Box display="flex" flexDirection="row">
                            <Router history={history}>
                                <Route path="/login" component={components.LoginComponent}/>
                                <ProtectedRoute path="/" component={components.AuthorizedComponent}/>
                            </Router>
                        </Box>
                    </div>
                </AppContext.Provider>
            </ThemeProvider>
        </>
    );

}

export default App;
