import React from 'react';
import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/index';
import AppContext from './contexts/AppContext'
import './App.css';
import UseWindowDimensions from './main/useWindowDimensions';

import {
    BrowserRouter as Router,
} from "react-router-dom";
// added components
import * as components from './assets/js/AppImports'


const styles = {
    sidebar: {
        height: '100vh',
        flexGrow: 1
    },
    content: {
        flexGrow: 5
    }
};


export function App() {
    const {width} = UseWindowDimensions();
    return (
        <>
            <AppContext.Provider value={{name: 'negar'}}>
                <Box display="flex" flexDirection="row">
                    <Router>
                        <Grid container>
                            <Grid item xs={0} sm={0} md={3} lg={3} xl={3}>
                                {width > 960 ? <Box style={styles.sidebar}>
                                    <components.SidebarComponent/>
                                </Box> : ''}
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                                <Box style={styles.content}>
                                    {width > 960 ? <components.HeaderWebComponent/> :
                                        <components.HeaderMobileComponent/>}
                                    <components.ContentComponent/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Router>
                </Box>
            </AppContext.Provider>
        </>
    );

}

export default App;
