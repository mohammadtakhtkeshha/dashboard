import React from "react";
import {Route, Redirect, useLocation} from "react-router-dom";
import storage from "libraries/local-storage";
import authService from "./../../core/services/auth.service";

const ProtectedRoute = ({component: Component, render, ...rest}) => {
    const externalRequestState = useLocation().search ? true : false;// check if external request for login exists
    const queryToken = useLocation().search.split('=');// ["?token","%22alizadeh%22"]
    if (externalRequestState) {
        authService.getLoginUser(queryToken[1]);
    }

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!storage.get('token')) {
                    return (<Redirect to="/login"/> || <Redirect to="/forget-password"/>);
                } else {
                    return Component ? <Component {...props} /> : render(props);
                }
            }}
        />
    );
};

export default ProtectedRoute;
