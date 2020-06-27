import React, {useState, useEffect} from "react";
import {Box, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import axios from "axios/index";
import * as colors from './../../partials/Colors'



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
    });
    let getTenNumberOfComments=()=>{
        let url = 'http://sitesaz99.rbp/web/api/comment/v2/dashboard';
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
                <Box className={classes.commentBlock}>
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
                {comments.map((comment, index) =>
                    <Box key={index} className={classes.commentBlock}>
                        <Box className="item">
                            تصویر
                        </Box>
                        <Box className="item">
                            {comment.name}
                        </Box>
                        <Box className="item">
                            {comment.mail}
                        </Box>
                        <Box className="item">
                            {comment.create}
                        </Box>
                    </Box>
                )}

            </Paper>
        </>
    );

}
