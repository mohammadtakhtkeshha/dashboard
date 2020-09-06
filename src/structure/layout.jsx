import React, {useState, useEffect} from 'react';
import Direction from './direction';
import i18ne from './../configs/locales/locales';
import {Box} from '@material-ui/core';
import AppContext from './../contexts/AppContext';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import './../App.css';

import rtl from 'jss-rtl';

// ------------- mamato ---------
import {MatomoProvider, createInstance} from '@datapunt/matomo-tracker-react'
import i18next from "i18next";
import Loading from "../components/content/partials/loading";
import {globalCss} from "../assets/js/globalCss";

const instance = createInstance({
    urlBase: 'https://reactwebrbpir.matomo.cloud/',
})

const lang = i18next.language;


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
        }
    }

});
const gClass = makeStyles(globalCss);

export function App() {
    const [showUserDrawer, setShowUserDrawer] = useState(false);
    const [loading,setLoading]=useState(false);
    const gClasses = gClass();

    // const [user, setUser] = useState({
    //     name: '',
    //     field_name: '',
    //     field_last_name: '',
    //     mail: '',
    //     pass: '',
    //     confirm_pass: '',
    //     user_picture: '',
    // });

    let toggleUserDrawer = (boolean) => {
        setShowUserDrawer(boolean)
    };

    let toggleLoading = (boolean) => {
      setLoading(boolean);
    }
    // let changeUser = (keyName, value) => {
    //     setUser(prevState => {
    //         return {
    //             ...prevState, [keyName]: value
    //         }
    //     });
    // };


    return (
        <>
            <Box className={loading === false ? gClasses.none : gClasses.block}>
                <Loading/>
            </Box>

            <MatomoProvider value={instance}>
                <ThemeProvider theme={theme}>
                    <AppContext.Provider
                        value={{
                            showUserDrawer: showUserDrawer,
                            toggleUserDrawer: toggleUserDrawer,
                            isLoginSuccess:false,
                            loading:loading,
                            toggleLoading:toggleLoading
                        }}>
                        <Direction/>
                    </AppContext.Provider>
                </ThemeProvider>
            </MatomoProvider>
        </>
    );

}

export default App;
