import React, {useState, useEffect, useContext} from "react";
import {Box, Typography, Paper} from "@material-ui/core";
import {CardMedia} from '@material-ui/core/index';
import dashboardService from "./../../../../core/services/dashboard.service";
import * as ContentDashboard from './../../../../assets/js/dashboard/ContentDashboar';
import AppContext from "../../../../contexts/AppContext";
import userImg from "../../../../assets/media/image/user.jpg";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

import * as colors from './../../../../components/partials/Colors';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: colors.primary,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
    root:{
        padding:'0',
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:tr':{
            border: '1px solid red',
        }
    },
}))(TableRow);

export default function ContentDashboardComponent() {
    const classes = ContentDashboard.useStyles();
    const [contents ,setContents]=useState([]);
    const appContext=useContext(AppContext);
    useEffect(()=>{
        getTenNumberOfContents();
    },[]);

    let getTenNumberOfContents=()=>{
        dashboardService.getTenNumberOfContents(appContext.token).then((response)=>{
          let contents=response.data;
            setContents([...contents]);
      }).catch((error)=>{
            console.log(error);
      });
    };

    return (
        <>
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title}>محتواها</Typography>
                {/*----------*/}
                <TableContainer component={Paper} className={classes.userBlock}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right" style={{width:'10%'}}>تصویر</StyledTableCell>
                                <StyledTableCell align="right">عنوان</StyledTableCell>
                                <StyledTableCell align="right">نوع</StyledTableCell>
                                <StyledTableCell align="right">تاریخ</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contents.map((content, index) =>
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="right" >
                                        <Box className="imgBlock">
                                        <CardMedia id="img">
                                            { content.field_image ? <img src={content.field_image}/>:<img src={userImg}/>}
                                        </CardMedia>
                                    </Box></StyledTableCell>
                                    <StyledTableCell align="right">{content.title}</StyledTableCell>
                                    <StyledTableCell align="right"> {content.type}</StyledTableCell>
                                    <StyledTableCell align="right"> {content.created}</StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*---------*/}
            </Paper>
        </>
    );

}
