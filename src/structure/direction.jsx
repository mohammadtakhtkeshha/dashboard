import React from "react";
import {Box} from "@material-ui/core";
import {Route, Router} from "react-router-dom";
import history from "../configs/History";
import * as components from "../assets/js/AppImports";
import ProtectedRoute from "../shared/routes/protected-routes";
import {withNamespaces} from "react-i18next";

function Direction({t}) {
    return (
        <Box display="flex" flexDirection="row" dir={t('translation:direction')}>
            <Router history={history}>
                <Route path="/login" component={components.LoginComponent}/>
                <Route path="/forget-password" component={components.ForgetPasswordComponent}/>
                <ProtectedRoute path="/" component={components.AuthorizedComponent}/>
            </Router>
        </Box>
    );
}

export default withNamespaces('translation')(Direction);