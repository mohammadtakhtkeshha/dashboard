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
    commentBlock: {
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

export default function CommentDashboardComponent() {
    const classes = useStyles();
    const [comments , setComments]=useState([]);
    useEffect(()=>{
        getTenNumberOfComments();
    },[]);
    let getTenNumberOfComments=()=>{
        // let url = 'http://sitesaz99.rbp/web/api/comment/v2/dashboard';
        let url = 'http://sitesaz99.rbp/web/last_comment/dashboard?_format=json';
        axios.get(url).then((response)=>{debugger
            let comments=response.data;
            debugger
            setComments([...comments]);
        }).catch((error)=>{
            console.log(error);
        });
    };
    return (
        <>
            <Paper className={classes.paper}>
                <Box className={classes.commentBlock}>
                    <Box className="item">
                        تصویر
                    </Box>
                    <Box className="item">
                        تاریخ
                    </Box>
                    <Box className="item">
                        وضعیت
                    </Box>
                    <Box className="item">
                        لینک
                    </Box>
                </Box>
                {comments.map((comment, index) =>
                    <Box key={index} className={classes.commentBlock}>
                        <Box className="item">
                            {comment.field_image}
                        </Box>
                        <Box className="item">
                            {comment.subject}
                        </Box>
                        <Box className="item">
                            {comment.last_updated}
                        </Box>
                        <Box className="item">
                            {comment.status ? 'تایید شده':'رد شده'}
                        </Box>
                        <Box className="item">
                            {comment.link}
                        </Box>
                    </Box>
                )}

            </Paper>
        </>
    );

}
