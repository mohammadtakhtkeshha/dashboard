import React, {useState, useEffect} from 'react';
import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/index';
import AppContext from './../contexts/AppContext';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import './../App.css';
import axios from "axios/index";
import font from './../assets/css/font.css';//fonts
import rtl from 'jss-rtl';
import UseWindowDimensions from './../configs/useWindowDimensions';

import {
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

const useStyle = makeStyles(() => ({
    sidebar: {
        position: 'fixed',
        width: '300px'
    },
    content: {
        marginRight: 'auto',
        width: 'calc(100% - 300px)',
        '@media (max-width: 992px)': {
            width: '100%'
        },
        padding: theme.spacing(2),
    }
}));

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
    const {width} = UseWindowDimensions();
    const [showUserDrawer, setShowUserDrawer] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState({
        name: '',
        field_name: '',
        field_last_name: '',
        mail: '',
        pass: '',
        confirm_pass: '',
        user_picture: '',
    });
    const classes = useStyle();
    let toggleUserDrawer = (boolean) => {
        setShowUserDrawer(boolean)
    };
    let setTokenHandler = (param) => {
        setToken(param);
        if (param === "") {
            localStorage.removeItem('token');
            let url = 'http://sitesaz99.rbp/web/user/logout';
            let config = {headers: {'Content-Type': 'application/json'}};
            axios.post(url, config).then((response) => {
                debugger
            }).catch((error) => {
                console.log(error)
            });
        }
    };
    let changeUser = (keyName, value) => {
        setUser(prevState => {
            return {
                ...prevState, [keyName]: value
            }
        });
    };
    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);
    return (
        <>
            <ThemeProvider theme={theme}>
                <AppContext.Provider
                    value={{
                        showUserDrawer: showUserDrawer,
                        toggleUserDrawer: toggleUserDrawer,
                        setTokenHandler: setTokenHandler,
                        changeUser: changeUser,
                        user: user,
                        token: token,
                    }}>
                    <div dir="rtl">
                        <Box display="flex" flexDirection="row">
                            <Router history={history}>
                                {token ? (
                                        <Grid container>
                                            <Grid item className={classes.sidebar}>
                                                {width > 992 ? <Box style={styles.sidebar}>
                                                    <components.SidebarComponent/>
                                                </Box> : ''}
                                            </Grid>
                                            <Grid item className={classes.content}>
                                                <Box style={styles.content}>
                                                    {width > 992 ? <components.HeaderWebComponent/> :
                                                        <components.HeaderMobileComponent/>}
                                                    <components.ContentComponent/>
                                                </Box>
                                            </Grid>
                                        </Grid>)
                                    : (<components.LoginComponent/>)
                                } </Router>
                        </Box>
                    </div>
                </AppContext.Provider>
            </ThemeProvider>
        </>
    );

}

export default App;
