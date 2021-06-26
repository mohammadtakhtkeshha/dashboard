import React from 'react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Toolbar, AppBar} from '@material-ui/core/index';
import {withStyles} from "@material-ui/core/styles";

import RightWebHeaderComponent from './partials/RightWebHeaderComponent';
import LeftWebHeaderComponent from './partials/LeftWebHeaderComponent';
import AppContext from 'contexts/AppContext';
import {webHeaderStyle} from "assets/js/header/webheader";

const StyledAppBar = withStyles(() => (webHeaderStyle))(AppBar);

function HeaderWebComponent({t}) {
    const lang = i18next.language;
    return (
        <>
            <AppContext.Consumer>
                {context => (
                    <StyledAppBar
                        lang={lang}>
                        <Toolbar>
                            <RightWebHeaderComponent/>
                            <LeftWebHeaderComponent/>
                        </Toolbar>
                    </StyledAppBar>
                )}
            </AppContext.Consumer>
        </>
    );
}

export default withNamespaces(['translation'])(HeaderWebComponent);
