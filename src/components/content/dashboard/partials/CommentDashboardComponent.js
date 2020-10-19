import React, {useState, useEffect} from "react";

import {Box, Typography} from "@material-ui/core";
import {CardMedia} from '@material-ui/core/index';

import dashboardService from "core/services/dashboard.service";
import userImg from "assets/media/image/user.jpg";
import {
    StyledTable,
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
    StyledTableCell,
    StyledPaper
} from "assets/js/dashboard/dashboard";
import {withNamespaces} from "react-i18next";

 function CommentDashboardComponent({t}) {
    const [comments, setComments] = useState([]);

    const getTenNumberOfComments = () => {
        dashboardService.getTenNumberOfComments().then((response) => {
            let comments = response.data;
            setComments([...comments]);
        }).catch((error) => {
        });
    };

    useEffect(() => {
        getTenNumberOfComments();
    }, []);

    return (
        <>
            <StyledPaper>
                <Typography variant="h4">_____ {t('comments:comments')} _____</Typography>
                <StyledTable>
                    <StyledTableHeadRow>
                        <StyledTableCell align="right">{t('translation:image')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:subject')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:date')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:status')}</StyledTableCell>
                    </StyledTableHeadRow>
                    <StyledTableBody>
                        {comments.map((comment, index) =>
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
                                <StyledTableCell align="right"> {comment.last_updated}</StyledTableCell>
                                <StyledTableCell
                                    align="right">  {comment.status ? 'تایید شده' : 'رد شده'}</StyledTableCell>
                            </StyledTableBodyRow>
                        )}
                    </StyledTableBody>
                </StyledTable>

            </StyledPaper>
        </>
    );

}
export default withNamespaces('comments,translation')(CommentDashboardComponent);

