import React from "react";
import {Typography} from '@material-ui/core/index';
import * as routes from '../../store/routes'
import {
    Switch,
    Route,
} from "react-router-dom";
import {withNamespaces} from "react-i18next";
import {StyledPaper} from "assets/js/header/rightWebHeader";

function RightWebHeaderComponent({t}) {
    return (<StyledPaper>
                <Typography variant="h3" component="h3">{t('sidebar:dashboard')}</Typography>
                <Switch>
                    {routes.routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            component={route.breadcrumbs}
                        />
                    ))}
                </Switch>
                </StyledPaper>);
}

export default withNamespaces(['sidebar'])(RightWebHeaderComponent);