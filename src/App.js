import React, {Component} from 'react';
import './App.css';
import loadable from '@loadable/component'
import { Box} from '@material-ui/core';


const HeaderComponent = loadable(() => import('./components/HeaderComponent'));
const ContentComponent = loadable(() => import('./components/ContentComponent'));
const SidebarComponent = loadable(() => import('./components/SidebarComponent'));
const TestComponent = loadable(() => import('./components/TestComponent'));
const styles={
    sidebar:{
        height:'100vh',
        width:'18%',
        flexGrow:1

    },
    content:{
        flexGrow:5
    }
};
class App extends Component {

    render() {
        return (
            <Box display="flex" flexDirection="row">
                <Box style={styles.sidebar} >
                    <SidebarComponent/>
                    <TestComponent/>
                </Box>
                <Box style={styles.content}>
                    <HeaderComponent/>
                    <ContentComponent/>
                </Box>
            </Box>
        );
    }
}

export default App;
