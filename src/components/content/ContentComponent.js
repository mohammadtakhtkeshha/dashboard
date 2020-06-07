import React from 'react';
import '../../App.css';
import TestComponent from './../TestComponent'
import {
    Switch,
    Route,
} from "react-router-dom";
import BaseFormComponent from './partials/BaseFormComponent';
import CustomizedForm from './partials/CustomizedForm';
import * as routes from './../../store/store'

function HeaderComponent() {

    return (
        <>
            <Switch>
                {routes.routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
            </Switch>
            {/*<TestComponent></TestComponent>*/}
        </>
    );
}

export default HeaderComponent;



