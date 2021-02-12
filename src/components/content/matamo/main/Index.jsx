import React from "react"

import {Grid} from "@material-ui/core"

import DevicesComponent from "./partials/DevicesComponent.jsx"
import RealTimeComponent from "./partials/RealTimeComponent.jsx";
import {StyledBoxMargin} from "assets/js/library/pages/matamo/matamo"
import LastSeenChartComponent from "./partials/LastSeenChartComponent.jsx";
import MostSeenComponent from "./partials/MostSeenComponent.jsx";

export default function Index({t}) {

    return (<>
        <Grid container>
            <Grid item xs={8}>
                <StyledBoxMargin>
                    {/*<LastSeenChartComponent/>*/}
                </StyledBoxMargin>
                <StyledBoxMargin>
                    <DevicesComponent/>
                </StyledBoxMargin>
            </Grid>
            {/*<Grid item xs={4}>*/}
            {/*    <StyledBoxMargin>*/}
            {/*        <RealTimeComponent/>*/}
            {/*    </StyledBoxMargin>*/}
            {/*</Grid>*/}
            {/*<Grid item xs={12}>*/}
            {/*    <StyledBoxMargin>*/}
            {/*        <MostSeenComponent/>*/}
            {/*    </StyledBoxMargin>*/}
            {/*</Grid>*/}
        </Grid>
    </>)
}

