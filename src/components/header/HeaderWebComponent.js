import React from 'react';
import {withNamespaces} from "react-i18next";

import {Toolbar, AppBar} from '@material-ui/core/index';

import RightWebHeaderComponent from './RightWebHeaderComponent';
import LeftWebHeaderComponent from './LeftWebHeaderComponent';
import {withStyles} from "@material-ui/core/styles";
import AppContext from 'contexts/AppContext';
import {webHeaderStyle} from "assets/js/header/webheader";
import i18next from "i18next";

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

export default withNamespaces(['translatino'])(HeaderWebComponent);
