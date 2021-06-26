import React from "react";
import i18next from "i18next";

import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";

import HeaderWebComponent from "infrastructure/authorized/header/web/Index.jsx"
import ContentComponent from "infrastructure/authorized/body/body.jsx";
import HeaderMobileComponent from "./header/mobile/HeaderMobileComponent";
import SidebarComponent from "./sidebar/SidebarComponent";
import UseWindowDimensions from "configs/useWindowDimensions";
import {
    StyledSidebarBox,
    StyledContentBox,
    styledGridSidebar,
    styledGridContent,
    StyledPaper
} from "assets/js/authorized";

const StyledGridSidebar = withStyles(styledGridSidebar)(Grid);
const StyledGridContent = withStyles(styledGridContent)(Grid);

export default function AuthorizedComponent({t}) {
    const lang = i18next.language
    const {width} = UseWindowDimensions()

    return (
        <Grid container>
            <StyledGridSidebar item>
                {width > 992 ? <StyledSidebarBox>
                    <SidebarComponent/>
                </StyledSidebarBox> : ''}
            </StyledGridSidebar>
            <StyledGridContent lang={lang} ismobile={(width > 992).toString()}>
                <StyledPaper>
                    <StyledContentBox>
                        {width > 992 ? <HeaderWebComponent/> : <HeaderMobileComponent/>}
                        <ContentComponent/>
                    </StyledContentBox>
                </StyledPaper>
            </StyledGridContent>
        </Grid>)
}

