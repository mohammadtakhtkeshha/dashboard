import React, {useState, useEffect,useContext} from "react";
import {Box, Typography, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import axios from "axios/index";
import * as colors from './../../../partials/Colors';
import {CardMedia} from '@material-ui/core/index';
import AppContext from './../../../../contexts/AppContext';
import userImg from './../../../../assets/media/image/user.jpg'


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
            '& .imgBlock':{
                width:'50px!important',
                height:'50px',
                borderRadius:'100%',
                overflow:'hidden',
                '& img':{
                    width:'100%'
                }
            }
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
    },
    title: {
        marginBottom: '10px',
        fontSize: '14px',
        fontWeight: '500'
    },
}));

export default function UserDashboardComponent() {
    const classes = useStyles();
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
                            <Box className="imgBlock">
                            <CardMedia id="img">
                                { user.user_picture ? <img src={user.user_picture} alt="user.name"/>:<img src={userImg}/>}
                            </CardMedia>
                            </Box>
                        </Box>
                        <Box className="item">
                            {user.name}
                        </Box>
                        <Box className="item">
                            {user.mail}
                        </Box>
                        <Box className="item">
                            {user.created}
                        </Box>
                    </Box>
                )}

            </Paper>
        </>
    );

}
