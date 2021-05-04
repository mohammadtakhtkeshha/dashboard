import React from "react"

import {Grid} from "@material-ui/core"

import DevicesComponent from "./partials/DevicesComponent.jsx"
import RealTimeComponent from "./partials/RealTimeComponent.jsx";
import {StyledBoxMarginRight,StyledBoxMarginLeft} from "assets/js/library/pages/matamo/matamo"
import LastSeenChartComponent from "./partials/LastSeenChartComponent.jsx";
import MostSeenComponent from "./partials/MostSeenComponent.jsx";
import i18next from "i18next";

export default function Index({t}) {
    const lang=i18next.language

    return (<>
        <Grid container>
            <Grid item xs={8}>
                <StyledBoxMarginLeft lang={lang}>
                    <LastSeenChartComponent/>
                </StyledBoxMarginLeft>
                <StyledBoxMarginLeft lang={lang}>
                    <DevicesComponent/>
                </StyledBoxMarginLeft>
            </Grid>
            <Grid item xs={4}>
                <StyledBoxMarginRight lang={lang}>
                    <RealTimeComponent/>
                </StyledBoxMarginRight>
            </Grid>
            <Grid item xs={12}>
                <StyledBoxMarginRight lang={lang}>
                    <MostSeenComponent/>
                </StyledBoxMarginRight>
            </Grid>
        </Grid>
    </>)
}

