import React, {useState, useEffect} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box, Typography} from "@material-ui/core";
import {CardMedia} from '@material-ui/core/index';

import dashboardService from "core/services/dashboard.service";
import {
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
} from "assets/js/App";
import {StyledTr, StyledTableHeadTr, StyledTable, StyledTableImg,StyledCheckboxImgInTable,StyledTableCell} from "assets/js/library/components/table"
import userImg from "assets/media/image/user.jpg";
import {StyledDashboardTable,
    StyledPaper, StyledDashboardBlock
} from "assets/js/dashboard/dashboard";
import {StyledStatusButton} from "assets/js/library/components/buttons"

function CommentDashboardComponent({t, appContext}) {
    const [comments, setComments] = useState([]);
    const lang = i18next.language;
    let leftRightAlign = lang === "en" ? "left" : "right"
    const getTenNumberOfComments = () => {
        dashboardService.getTenNumberOfComments(appContext.handleError).then((response) => {
            let comments = response.data;
            setComments([...comments]);
        }).catch((error) => {
        });
    };

    useEffect(() => {
        getTenNumberOfComments();
    }, []);

    return (
        <StyledDashboardBlock length={comments.length}>
            <StyledPaper lang={lang}>
                <Typography variant="h4">_____ {t('comments:comments')} _____</Typography>
                <StyledDashboardTable>
                    <StyledTableHeadRow lang={lang}>
                        {/*<StyledTableCell align="center">{t('translation:image')}</StyledTableCell>*/}
                        <StyledTableCell align={leftRightAlign} width="90">{t('translation:subject')}</StyledTableCell>
                        <StyledTableCell align="center" width="5" minWidth="98">{t('translation:status')}</StyledTableCell>
                        <StyledTableCell align="center" width="5" minWidth="60">{t('translation:date')}</StyledTableCell>
                    </StyledTableHeadRow>
                    <StyledTableBody>
                        {comments.map((comment, index) =>
                            <a key={index} href={comment.link} target='_blank'>
                                <StyledTableBodyRow key={index}>
                                    {/*<StyledTableCell align="center" >{row.name}</StyledTableCell>*/}
                                    {/*<StyledTableCell align="center">*/}
                                    {/*    <Box className="imgBlock">*/}
                                    {/*        <CardMedia id="img">*/}
                                    {/*            {comment.field_image ? <img src={comment.field_image}/> :*/}
                                    {/*                <img src={userImg}/>}*/}
                                    {/*        </CardMedia>*/}
                                    {/*    </Box>*/}
                                    {/*</StyledTableCell>*/}
                                    <StyledTableCell align={leftRightAlign} width="90"> {comment.subject}</StyledTableCell>
                                    <StyledTableCell align="center" width="5" minWidth="98">
                                        <StyledStatusButton status={comment.status}>
                                            {comment.status === "true" ? t('translation:confirmed') : t('translation:notConfirmed')}
                                        </StyledStatusButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" width="5" minWidth="60"> {comment.created}</StyledTableCell>
                                </StyledTableBodyRow>
                            </a>
                        )}
                    </StyledTableBody>
                </StyledDashboardTable>
            </StyledPaper>
        </StyledDashboardBlock>
    );

}

export default withNamespaces('comments,translation')(CommentDashboardComponent);

