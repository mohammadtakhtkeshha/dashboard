import React, {useEffect, useState} from "react";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";

import {Typography} from "@material-ui/core";

import 'assets/css/yekanFont.css';
import {getCommentChart} from './CommentsChartComponent.js';
import {StyledPaper, StyledDashboardBlock} from "assets/js/dashboard/dashboard";

function CommentsChartComponent({t,appContext}) {
    const [comments, setComments] = useState([]);
    const lang = i18next.language;

    useEffect(() => {
        getCommentChart(setComments,appContext.handleError);
    }, []);

    return (
        <div>
            {comments.length > 0 ?
                <StyledDashboardBlock>
                    <StyledPaper lang={lang}>
                        <Typography variant="h4">_____ {t('translation:commentStatic')} _____</Typography>
                        <figure className="highcharts-figure">
                            <div id="commentchart"></div>
                        </figure>
                    </StyledPaper>
                </StyledDashboardBlock> : <></>}
        </div>
    );
}

export default withNamespaces('comments,translation')(CommentsChartComponent);


