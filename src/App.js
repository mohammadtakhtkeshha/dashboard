import React from 'react';
import './App.css';
import loadable from '@loadable/component'
import {Box} from '@material-ui/core';
import UseWindowDimensions from './main/useWindowDimensions';
// import SecondTestComponent from './components/SecondTestComponent';
import {makeStyles} from '@material-ui/core/styles/index';


const HeaderWebComponent = loadable(() => import('./components/header/HeaderWebComponent'));
const HeaderMobileComponent = loadable(() => import('./components/header/HeaderMobileComponent'));
const ContentComponent = loadable(() => import('./components/ContentComponent'));
const SidebarComponent = loadable(() => import('./components/sidebar/SidebarComponent'));
const TestComponent = loadable(() => import('./components/TestComponent'));


const styles = {
    sidebar: {
        height: '100vh',
        width: '300px',
        flexGrow: 1

    },
    content: {
        flexGrow: 5
    }
};
const useStyles= makeStyles((theme)=>({
    content:{
        padding:'15px 15px'
    }
}));

export function App() {
const {width}=UseWindowDimensions();
const classes = useStyles();
    return (
        <Box display="flex" flexDirection="row" >
            {width > 992 ?  <Box style={styles.sidebar}>
                <SidebarComponent/>
            </Box> :  ''}

            {/*<Box style={styles.content} className={classes.content}>*/}
            {/*    {width > 992 ?  <HeaderWebComponent/> :  <HeaderMobileComponent/>}*/}
            {/*    <ContentComponent/>*/}
            {/*    <TestComponent/>*/}
            {/*</Box>*/}
        </Box>
    );

}

export default App;
