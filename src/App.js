import React, {useState, useEffect} from 'react';
import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/index';
import AppContext from './contexts/AppContext';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import './App.css';
import font from './assets/css/font.css'

import UseWindowDimensions from './main/useWindowDimensions';

import {
    BrowserRouter as Router,
} from "react-router-dom";
// added components
import * as components from './assets/js/AppImports'
import history from './main/History';


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
        width : '300px'
    },
    content: {
        marginRight: 'auto',
        width : 'calc(100% - 300px)',
        '@media (max-width: 992px)': {
                width: '100%'
        },
        padding: theme.spacing(2),
    }
}));

const theme = createMuiTheme({
    typography:{
        fontFamily :["primary-font", "segoe ui", "tahoma"],
        body1:{
            fontSize : '13px'
        }
    },
    breakpoints: {
        values: {
            xs: 576, sm: 768, md: 992, lg: 1200, xl: 1200
        }
    },
    overrides:{
        MuiPaper: {
            elevation1:{
                boxShadow:'0 0 0 0',
            }
        },
    }

});

export function App() {
    const {width} = UseWindowDimensions();
    const classes = useStyle();
    console.log(theme);
    return (
        <>
            <ThemeProvider theme={theme}>
                <AppContext.Provider>
                    <Box display="flex" flexDirection="row">
                        <Router history={history}>
                            <Grid container>
                                <Grid item className={classes.sidebar}>
                                    {width > 992 ? <Box style={styles.sidebar}>
                                        <components.SidebarComponent/>
                                    </Box> : ''}
                                </Grid>
                                <Grid item  className={classes.content}>
                                    <Box style={styles.content}>
                                        {width > 992 ? <components.HeaderWebComponent/> :
                                            <components.HeaderMobileComponent/>}
                                        <components.ContentComponent/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Router>
                    </Box>
                </AppContext.Provider>
            </ThemeProvider>
        </>
    );

}

export default App;
