import React, {useState, useEffect} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box, Typography} from "@material-ui/core";
import {CardMedia} from '@material-ui/core/index';

import dashboardService from "core/services/dashboard.service";
import {
    StyledTable,
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
    StyledTableCell
} from "assets/js/App";
import userImg from "assets/media/image/user.jpg";
import {
    StyledPaper, StyledDashboardBlock
} from "assets/js/dashboard/dashboard";

function CommentDashboardComponent({t, appContext}) {
    const [comments, setComments] = useState([]);
    const lang = i18next.language;

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
                <StyledTable>
                    <StyledTableHeadRow lang={lang}>
                        <StyledTableCell align="right">{t('translation:image')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:subject')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:date')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:status')}</StyledTableCell>
                    </StyledTableHeadRow>
                    <StyledTableBody>
                        {comments.map((comment, index) =>
                            <a key={index} href={comment.link} target='_blank'>
                                <StyledTableBodyRow key={index}>
                                    {/*<StyledTableCell align="right" >{row.name}</StyledTableCell>*/}
                                    <StyledTableCell align="right">
                                        <Box className="imgBlock">
                                            <CardMedia id="img">
                                                {comment.field_image ? <img src={comment.field_image}/> :
                                                    <img src={userImg}/>}
                                            </CardMedia>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="right"> {comment.subject}</StyledTableCell>
                                    <StyledTableCell align="right"> {comment.created}</StyledTableCell>
                                    <StyledTableCell
                                        align="right">  {comment.status === "true" ? t('translation:confirmed') : t('translation:notConfirmed')}</StyledTableCell>
                                </StyledTableBodyRow>
                            </a>
                        )}
                    </StyledTableBody>
                </StyledTable>
            </StyledPaper>
        </StyledDashboardBlock>
    );

}

export default withNamespaces('comments,translation')(CommentDashboardComponent);

