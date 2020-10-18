import React, {useState, useEffect,useContext} from "react";
import {Box, Typography, Paper} from "@material-ui/core";
import dashboardService from "./../../../../core/services/dashboard.service";
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
import {withNamespaces} from "react-i18next";
import {
    StyledTable,
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
    StyledTableCell,
    StyledPaper
} from "assets/js/dashboard/dashboard";

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function UserDashboardComponent({t}) {
    const classes = UserDashboard.useStyles();
    const appContext = useContext(AppContext);
    const [users , setUsers]=useState([]);
    useEffect(()=>{
        getTenNumberOfUsers();
    },[]);

    let getTenNumberOfUsers=()=>{
         dashboardService.getTenNumberOfUsers(appContext.token).then((response)=>{
            let users=response.data;
            setUsers([...users]);
        }).catch((error)=>{
        });
    };

    return (
        <>
            <StyledPaper>
                <Typography variant="h4" className={classes.title}>{t('users:users')}</Typography>
                {/*---------------------------*/}
                <TableContainer component={Paper} className={classes.userBlock}>
                    <Table className="table" aria-label="customized table">
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
            </StyledPaper>
        </>
    );

}


export default withNamespaces('translation')(UserDashboardComponent);
