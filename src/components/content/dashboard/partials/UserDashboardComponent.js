import React, {useState, useEffect} from "react";
import {Box, Typography, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import axios from "axios/index";
import * as colors from './../../../partials/Colors'
import ButtonComponent from "../../../partials/ButtonComponent";
import EditIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Pagination from "@material-ui/lab/Pagination/Pagination";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    userBlock: {
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '11px 0px',
        '& .MuiCheckbox-root': {
            padding: '0 0 0 15px',
        },
        '&:not(:last-child)': {
            borderBottom: '1px solid #d9dbe4',
        },
        '& .item': {
            width: '100%',
        }
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        '& ul': {
            '& li': {
                '& button': {
                    borderRadius: '0',
                    margin: '0',
                    borderColor: colors.grey.tooLight,
                    color: colors.primary,
                    padding: '13px'
                }
            }
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: colors.primary,
            color: 'white',
            border: '0'
        }
    }
}));

export default function UserDashboardComponent() {
    const classes = useStyles();
    const [users , setUsers]=useState([]);
    useEffect(()=>{
        getTenNumberOfUsers();
    });
    let getTenNumberOfUsers=()=>{
        let url = 'http://sitesaz99.rbp/web/api/user/v2/dashboard';
        axios.get(url).then((response)=>{
            let users=response.data;
            setUsers([...users]);
        }).catch((error)=>{
            console.log(error);
        });
    };
    return (
        <>
            <Paper className={classes.paper}>
                <Box className={classes.userBlock}>
                    <Box className="item">
                        تصویر
                    </Box>
                    <Box className="item">
                        نام کاربری
                    </Box>
                    <Box className="item">
                        ایمیل
                    </Box>
                    <Box className="item">
                        تاریخ
                    </Box>
                </Box>
                {users.map((user, index) =>
                    <Box key={index} className={classes.userBlock}>
                        <Box className="item">
                            تصویر
                        </Box>
                        <Box className="item">
                            {user.name}
                        </Box>
                        <Box className="item">
                            {user.mail}
                        </Box>
                        <Box className="item">
                            {user.create}
                        </Box>
                    </Box>
                )}

            </Paper>
        </>
    );

}
