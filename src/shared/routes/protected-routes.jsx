import React, {useContext} from "react";
import {Route, Redirect, useLocation} from "react-router-dom";
import storage from "libraries/local-storage";
import {getLoginUser} from "core/services/auth.service";
import AppContext from "contexts/AppContext";

const ProtectedRoute = ({component: Component, render, ...rest}) => {
    const externalRequestState = useLocation().search ? true : false;// check if external request for login exists
    const queryToken = useLocation().search.split('=');// ["?token","%22alizadeh%22"]
    const appContext = useContext(AppContext);
    if (externalRequestState) {
        getLoginUser(queryToken[1], appContext);
    }

    const fullToken = storage.get('token') !== null ? storage.get('token') : null
    const checkToken = fullToken !== null && storage.get('token').includes('undefined')

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!storage.get('token') || checkToken) {
                    return (<Redirect to="/login"/> || <Redirect to="/forget-password"/>);
                } else {
                    return Component ? <Component {...props} /> : render(props);
                }
            }}
        />
    );
};

export default ProtectedRoute;
