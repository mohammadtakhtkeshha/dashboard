import React, {useEffect, useState} from 'react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {StyledDashboardBlock} from "assets/js/dashboard/dashboard";
import {StyledUserChartTitle} from "assets/js/dashboard/partials/userChart";
import {getUsers} from "./UserChartComponent.js";

function UserChartComponent({t,appContext}) {
    const lang = i18next.language;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers(t, setUsers,appContext.handleError);
    }, []);

    return (
        <>
            {users.length > 0 ?
                <StyledDashboardBlock>
                    <StyledUserChartTitle lang={lang}>
                        {t('translation:userStatic')}
                    </StyledUserChartTitle>
                    <figure className="highcharts-figure">
                        <div id="userchart"></div>
                    </figure>
                </StyledDashboardBlock>
                : <></>}
        </>
    );
}

export default withNamespaces('users')(UserChartComponent);
