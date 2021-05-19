import React, {useContext, useEffect, useState} from 'react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {getLastSeenMethod} from "./LastSeenChartComponent.js";
import AppContext from "contexts/AppContext";
import {Typography} from "@material-ui/core";
import {StyledTablePaper, StyledTableParent} from "assets/js/App"

function LastSeenChartComponent({t}) {
    const lang = i18next.language;
    const [lastSeen, setLastSeen] = useState([]);
    const {setLoading}=useContext(AppContext)

    useEffect(() => {
        getLastSeenMethod(setLastSeen,setLoading);
    }, [setLoading]);

    return (
        <>
            {lastSeen.length>0  ?
                <StyledTableParent length={lastSeen.length}>
                    <StyledTablePaper lang={lang}>
                        <Typography variant="h4">________{t('matamo:visits')}________</Typography>
                    <figure className="highcharts-figure">
                        <div id="lastseenchart"></div>
                    </figure>
                    </StyledTablePaper>
                </StyledTableParent>
                : <div></div>}
        </>
    );
}

export default withNamespaces('users')(LastSeenChartComponent);
