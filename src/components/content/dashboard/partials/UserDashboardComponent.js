import React, {useState, useEffect,useContext} from "react";
import {Box, Typography, Paper} from "@material-ui/core";
import axios from "axios/index";
import {CardMedia} from '@material-ui/core/index';
import AppContext from './../../../../contexts/AppContext';
import userImg from './../../../../assets/media/image/user.jpg';
import * as UserDashboard from './../../../../assets/js/dashboard/UserDashboard';
import * as colors from './../../../../components/partials/Colors';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";



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

export default function UserDashboardComponent() {
    const classes = UserDashboard.useStyles();
    const appContext = useContext(AppContext);
    const [users , setUsers]=useState([]);
    useEffect(()=>{
        getTenNumberOfUsers();
    },[]);

    let getTenNumberOfUsers=()=>{
        let url = 'http://sitesaz99.rbp/web/api/user/v2/dashboard';
        let config={
            headers:{
                'Authorization':appContext.token,
            }
        };
        axios.get(url,config).then((response)=>{
            let users=response.data;
            setUsers([...users]);
        }).catch((error)=>{
            console.log(error);
        });
    };

    return (
        <>
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title}>لیست کاربران</Typography>
                {/*---------------------------*/}
                <TableContainer component={Paper} className={classes.userBlock}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">تصویر</StyledTableCell>
                                <StyledTableCell align="right">نام کاربری</StyledTableCell>
                                <StyledTableCell align="right">ایمیل</StyledTableCell>
                                <StyledTableCell align="right">تاریخ</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) =>
                                <StyledTableRow key={index}>
                                    {/*<StyledTableCell align="right" >{row.name}</StyledTableCell>*/}
                                    <StyledTableCell align="right">
                                        <Box className="imgBlock">
                                            <CardMedia id="img">
                                                { user.user_picture ? <img src={user.user_picture} alt="user.name"/>:<img src={userImg}/>}
                                            </CardMedia>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{user.name}</StyledTableCell>
                                    <StyledTableCell align="right">{user.mail}</StyledTableCell>
                                    <StyledTableCell align="right">{user.created}</StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );

}
