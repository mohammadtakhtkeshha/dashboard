import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import loadable from '@loadable/component'


const HeaderComponent = loadable(() => import('./components/HeaderComponent'));
const ContentComponent = loadable(() => import('./components/ContentComponent'));
const SidebarComponent = loadable(() => import('./components/SidebarComponent'));
const TestComponent = loadable(() => import('./components/TestComponent'));

class App extends Component {

    render() {
        return (
            <div className={App}>
                <HeaderComponent/>
                <ContentComponent/>
                <SidebarComponent/>
                <TestComponent/>
            </div>
        );
    }
}

export default App;
