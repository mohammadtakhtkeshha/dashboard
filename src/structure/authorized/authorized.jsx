import React from "react";
import {withNamespaces} from "react-i18next";

import Grid from "@material-ui/core/Grid";

import * as components from "assets/js/AppImports";
import UseWindowDimensions from "configs/useWindowDimensions";
import {
    StyledSidebarBox,
    StyledContentBox,
    styledGridSidebar,
    styledGridContent,
    StyledPaper
} from "assets/js/authorized";
import {withStyles} from "@material-ui/core/styles";
import i18next from "i18next";
import {grey} from "components/partials/Colors";

const StyledGridSidebar = withStyles(styledGridSidebar)(Grid);
const StyledGridContent = withStyles(styledGridContent)(Grid);

function AuthorizedComponent({t}) {
    const lang = i18next.language;
    const {width} = UseWindowDimensions();

    return (
        <Grid container>
            <StyledGridSidebar item>
                {width > 992 ? <StyledSidebarBox>
                    <components.SidebarComponent/>
                </StyledSidebarBox> : ''}
            </StyledGridSidebar>
            <StyledGridContent lang={lang}>
                <StyledPaper>
                    <StyledContentBox>
                        {width > 992 ? <components.HeaderWebComponent/> :
                            <components.HeaderMobileComponent/>}
                        <components.ContentComponent/>
                    </StyledContentBox>
                </StyledPaper>
            </StyledGridContent>
        </Grid>)
}

export default withNamespaces('translation,sidebar')(AuthorizedComponent);
