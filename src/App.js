import React from 'react';
import logo from './logo.svg';
import './App.css';
import loadable from '@loadable/component'
import {Box} from '@material-ui/core';
import UseWindowDimensions from './main/useWindowDimensions';
import SecondTestComponent from './components/SecondTestComponent';

const HeaderWebComponent = loadable(() => import('./components/header/HeaderWebComponent'));
const HeaderMobileComponent = loadable(() => import('./components/header/HeaderMobileComponent'));
const ContentComponent = loadable(() => import('./components/ContentComponent'));
const SidebarComponent = loadable(() => import('./components/sidebar/SidebarComponent'));
const TestComponent = loadable(() => import('./components/TestComponent'));


const styles = {
    sidebar: {
        height: '100vh',
        width: '18%',
        flexGrow: 1

    },
    content: {
        flexGrow: 5
    }
};

export function App() {


    return (
        <Box display="flex" flexDirection="row">
            <Box style={styles.sidebar}>
                <SidebarComponent/>
            </Box>
            <Box style={styles.content}>
                <HeaderWebComponent/>
                <HeaderMobileComponent/>
                <ContentComponent/>
                <TestComponent/>
            </Box>
        </Box>
    );

}

export default App;
