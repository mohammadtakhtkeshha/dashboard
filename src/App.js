import React, {useState,useEffect} from 'react';
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


export function App() {
    const {width} = UseWindowDimensions();
    const [test, setTest] = useState(history.location.pathname);
    // useEffect(()=>{
    //     debugger;
    //     setTest(history.location.pathname);
    // });
    history.listen(()=>{
        debugger
    });
    return (
        <>
            {/*<AppContext.Provider value={{name: test}}>*/}
            {/*    <Box display="flex" flexDirection="row">*/}
            {/*        <Router history={history}>*/}
            {/*            <Grid container>*/}
            {/*                <Grid item style={{width:'300px'}}>*/}
            {/*                    {width > 960 ? <Box style={styles.sidebar}>*/}
            {/*                        <components.SidebarComponent/>*/}
            {/*                    </Box> : ''}*/}
            {/*                </Grid>*/}
            {/*                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>*/}
            {/*                    <Box style={styles.content}>*/}
            {/*                        {width > 960 ? <components.HeaderWebComponent/> :*/}
            {/*                            <components.HeaderMobileComponent/>}*/}
            {/*                        <components.ContentComponent/>*/}
            {/*                    </Box>*/}
            {/*                </Grid>*/}
            {/*            </Grid>*/}
            {/*        </Router>*/}
            {/*    </Box>*/}
            {/*</AppContext.Provider>*/}

            <AppContext.Provider value={{name: test}}>
                <Box display="flex" flexDirection="row">
                    <Router history={history}>
                        <Grid container>
                            <Grid item style={{width:'300px'}}>
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
