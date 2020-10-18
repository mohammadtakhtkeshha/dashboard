import React, {useState, useEffect, useContext} from "react";

import {Box, Typography} from "@material-ui/core";
import {CardMedia} from '@material-ui/core/index';

import dashboardService from "core/services/dashboard.service";
import AppContext from "contexts/AppContext";
import userImg from "assets/media/image/user.jpg";
import {
    StyledTable,
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
    StyledTableCell,
    StyledPaper
} from "assets/js/dashboard/dashboard";

export default function ContentDashboardComponent() {
    const [contents, setContents] = useState([]);
    const appContext = useContext(AppContext);
    useEffect(() => {
        getTenNumberOfContents();
    }, []);

    let getTenNumberOfContents = () => {
        dashboardService.getTenNumberOfContents(appContext.token).then((response) => {
            let contents = response.data;
            setContents([...contents]);
        }).catch((error) => {
        });
    };

    return (<>
            {contents.length > 0 ? <StyledPaper>
                    <Typography variant="h4">______ محتواها _______</Typography>
                    <StyledTable>
                        <StyledTableHeadRow>
                            <StyledTableCell align="right" style={{width: '10%'}}>تصویر</StyledTableCell>
                            <StyledTableCell align="right">عنوان</StyledTableCell>
                            <StyledTableCell align="right">نوع</StyledTableCell>
                            <StyledTableCell align="right">تاریخ</StyledTableCell>
                        </StyledTableHeadRow>
                        <StyledTableBody>
                            {contents.map((content, index) =>
                                <StyledTableBodyRow key={index}>
                                    <StyledTableCell align="right">
                                        <Box className="imgBlock">
                                            <CardMedia id="img">
                                                {content.field_image ? <img src={content.field_image}/> :
                                                    <img src={userImg}/>}
                                            </CardMedia>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{content.title}</StyledTableCell>
                                    <StyledTableCell align="right"> {content.type}</StyledTableCell>
                                    <StyledTableCell align="right"> {content.created}</StyledTableCell>
                                </StyledTableBodyRow>
                            )}
                        </StyledTableBody>
                    </StyledTable>
                </StyledPaper>
                : ''}
        </>
    );
}
