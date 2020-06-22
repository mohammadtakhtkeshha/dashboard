import React, {useState, useEffect, useContext} from "react";
import {Box, Typography, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {CardMedia} from '@material-ui/core/index';
import axios from "axios/index";
import * as colors from './../../../partials/Colors';
import AppContext from "../../../../contexts/AppContext";
import ButtonComponent from "../../../partials/ButtonComponent";
import EditIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Pagination from "@material-ui/lab/Pagination/Pagination";
import {Link} from "react-router-dom";
import userImg from "../../../../assets/media/image/user.jpg";


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
                display:'flex',
                overflow:'hidden',
                '& img':{
                    width:'100%',
                    height:'100%',
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

export default function ContentDashboardComponent() {
    const classes = useStyles();
    const [contents ,setContents]=useState([]);
    const appContext=useContext(AppContext);
    useEffect(()=>{
        getTenNumberOfContents();
    },[]);
    let getTenNumberOfContents=()=>{
        let url='http://sitesaz99.rbp/web/api/all_content/dashboard?_format=json';
        let config={
            headers:{
                Authorization:appContext.token,
            }
        };
      axios.get(url,config).then((response)=>{
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

                <Box className={classes.userBlock}>
                    <Box className="item">
                        تصویر
                    </Box>
                    <Box className="item">
                        عنوان
                    </Box>
                    <Box className="item">
                       نوع
                    </Box>
                    <Box className="item">
                       تاریخ
                    </Box>
                </Box>
                {contents.map((content, index) =>

                    <Box key={index} className={classes.userBlock}>
                        <Box className="item">
                            <Box className="imgBlock">
                                <CardMedia id="img">
                                    { content.field_image ? <img src={content.field_image}/>:<img src={userImg}/>}
                                </CardMedia>
                            </Box>
                        </Box>
                        <Box className="item">
                            {content.title}
                        </Box>
                        <Box className="item">
                            {content.type}
                        </Box>
                        <Box className="item">
                            {content.created}
                        </Box>
                    </Box>
                )}

            </Paper>
        </>
    );

}
