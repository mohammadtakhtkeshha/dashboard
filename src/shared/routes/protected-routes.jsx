import React from "react";
import { Route, Redirect } from "react-router-dom";
import storage from "libraries/local-storage";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
    console.log('token : '+!storage.get(process.env.REACT_APP_TOKEN_KEY));

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!storage.get(process.env.REACT_APP_TOKEN_KEY)) {
                    return (<Redirect to="/login"/> || <Redirect to="/forget-password"/>);
                } else {
                    return Component ? <Component {...props} /> : render(props);
                }
            }}
        />
    );
};

export default ProtectedRoute;
