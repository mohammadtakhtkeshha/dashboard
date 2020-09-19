import React from 'react';
import 'App.css';
import {Switch,Route} from "react-router-dom";
import {routes} from 'store/routes'

function Index() {
    return (
        <>
            <Switch>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
            </Switch>
        </>
    );
}

export default Index;



