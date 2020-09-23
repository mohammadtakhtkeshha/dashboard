import React, {useState, useEffect, useContext} from 'react';
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
import {withNamespaces} from "react-i18next";
import {danger} from "../methods/swal";

const instance = createInstance({
    urlBase: 'https://reactwebrbpir.matomo.cloud/',
})
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

export function Layout({t}) {
    const lang = i18next.language;
    const perPage = 5;
    const [showUserDrawer, setShowUserDrawer] = useState(false);
    const [loading,setLoading]=useState(false);
    const gClasses = gClass();
    const appContext=useContext(AppContext);

    let toggleUserDrawer = (boolean) => {
        setShowUserDrawer(boolean)
    };

    let handleError = (error) => {
        let errorString;
        if(error){
            errorString = error.toString();
        }
        debugger
        danger(error?errorString:t('translation:error'), t('translation:ok'));
        setLoading(false);
        console.log(error);
    };

    const isFa = (lang) => {
        if (lang === 'fa') {
            return true;
        }
        return false;
    }

    const currentAlign = () => {
        return isFa(lang) ? 'right' : 'left';
    }

    return (
        <>
            <Box className={loading === false ? gClasses.none : gClasses.block}>
                <Loading/>
            </Box>

            <MatomoProvider value={instance}>
                <ThemeProvider theme={theme}>
                    <AppContext.Provider
                        value={{
                            perPage:perPage,
                            handleError:handleError,
                            showUserDrawer: showUserDrawer,
                            toggleUserDrawer: toggleUserDrawer,
                            isLoginSuccess:false,
                            loading:loading,
                            setLoading:setLoading,
                            currentAlign:currentAlign,
                        }}>
                        <Direction/>
                    </AppContext.Provider>
                </ThemeProvider>
            </MatomoProvider>
        </>
    );

}

export default withNamespaces('translation')(Layout);
