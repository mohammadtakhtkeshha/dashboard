import React, {useState, useEffect} from "react";
import {Box, Typography, Grid, Paper} from "@material-ui/core";
import axios from "axios/index";
import {CardMedia} from '@material-ui/core/index';
import userImg from "../../../../assets/media/image/user.jpg";
import * as CommentDashboard from './../../../../assets/js/dashboard/CommentDashboard';
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
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
export default function CommentDashboardComponent() {
    const classes = CommentDashboard.useStyles();
    const [comments , setComments]=useState([]);
    useEffect(()=>{
        getTenNumberOfComments();
    },[]);
    let getTenNumberOfComments=()=>{
        let url = 'http://sitesaz99.rbp/web/last_comment/dashboard?_format=json';
        axios.get(url).then((response)=>{
            let comments=response.data;
            setComments([...comments]);
        }).catch((error)=>{
            console.log(error);
        });
    };
    return (
        <>
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title}>کامنت ها</Typography>
                <TableContainer component={Paper} className={classes.commentBlock}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">تصویر</StyledTableCell>
                                <StyledTableCell align="right">موضوع</StyledTableCell>
                                <StyledTableCell align="right">تاریخ</StyledTableCell>
                                <StyledTableCell align="right">وضعیت</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comments.map((comment, index) =>
                                <StyledTableRow key={index}>
                                    {/*<StyledTableCell align="right" >{row.name}</StyledTableCell>*/}
                                    <StyledTableCell align="right">
                                        <Box className="imgBlock">
                                        <CardMedia id="img">
                                            { comment.field_image ? <img src={comment.field_image}/>:<img src={userImg}/>}
                                        </CardMedia>
                                    </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="right"> {comment.subject}</StyledTableCell>
                                    <StyledTableCell align="right"> {comment.last_updated}</StyledTableCell>
                                    <StyledTableCell align="right">  {comment.status ? 'تایید شده':'رد شده'}</StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </>
    );

}
