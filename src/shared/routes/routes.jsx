import React from "react";
import { Route, Redirect } from "react-router-dom";
import localStorage from "../../libraries/local-storage";
import { tokenKey } from "../../config.json";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!localStorage.retrieve(tokenKey)) {
                    return <Redirect to="/login" />;
                } else {
                    return Component ? <Component {...props} /> : render(props);
                }
            }}
        />
    );
};

export default ProtectedRoute;
