import React, {useState, useEffect} from "react";
import {Box, CardMedia, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import axios from "axios/index";
import * as colors from './../../partials/Colors'
import {withNamespaces} from "react-i18next";
import userImg from "../../../assets/media/image/user.jpg";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {withStyles} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import storage from "../../../libraries/local-storage";
import {Link} from "react-router-dom";
import ButtonComponent from "../../partials/ButtonComponent";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


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
        '& .table': {
            width: '100%',
            '& .imgBlock':{
                width:'50px!important',
                height:'50px',
                borderRadius:'100%',
                overflow:'hidden',
                margin:'auto',
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
}));
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: colors.primary,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
    root:{
        textAlign:'center',
    }
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
function CommentDashboardComponent({t}) {
    const classes = useStyles();
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    useEffect(() => {
        getTenNumberOfComments();
    });
    let getTenNumberOfComments = () => {
        let url = 'http://dash.webrbp.ir/last_comment?_format=json';
        axios.get(url).then((response) => {
            let comments = response.data.rows;
            setComments([...comments]);
            setTotalPage(response.data.pager.total_pages);
        }).catch((error) => {
            console.log(error);
        });
    };
    let paginate = (e, value) => {
        setPage(value);
        getComments(value);
    };
    let getComments = (page) => {
        const config = {
            headers: {
                Authorization: storage.get(process.env.REACT_APP_TOKEN_KEY)
            }
        };
        axios.get(`http://dash.webrbp.ir/api/user/v2?page=${page}`).then(
            function (response) {
                let currentList = [];
                response.data.rows.map((item) => {
                    currentList.push({
                        name: item.name,
                        subject: item.subject,
                        last_updated: item.last_updated,
                        field_image: item.field_image,
                        status: item.status,
                        link: item.link,
                    });
                });
                setComments(currentList);
                setTotalPage(response.data.pager.total_pages);
            }
        ).catch((error) => {
            console.log(error);
        });
    };

    let deleteComment =()=>{
        console.log('delete');
    }
    return (
        <>
            <Paper className={classes.paper}>
                {/*--------------------- table ------------------------*/}
                <TableContainer component={Paper} className={classes.commentBlock}>
                    <Table className="table" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">{t('translation:name')}</StyledTableCell>
                                <StyledTableCell align="right">{t('translation:subject')}</StyledTableCell>
                                <StyledTableCell align="right">{t('translation:status')}</StyledTableCell>
                                <StyledTableCell align="right">{t('translation:date')}</StyledTableCell>
                                <StyledTableCell align="right">{t('translation:action')}</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comments.map((comment, index) =>
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="right">
                                        <Box className="imgBlock">
                                            <CardMedia id="img">
                                                { comment.field_image ? <img src={comment.field_image} alt="comment.name"/>:<img src={userImg}/>}
                                            </CardMedia>
                                            <Box>{comment.name}</Box>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{comment.subject}</StyledTableCell>
                                    <StyledTableCell align="right">{comment.status?t('translation:confirmed'):t('translation:block')}</StyledTableCell>
                                    <StyledTableCell align="right">{comment.last_updated}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Box className="item">
                                            <Link to='#comment'>
                                                <ButtonComponent value={comment.id} text="ویرایش" color="primary" startIcon={<EditIcon/>}/>
                                            </Link>
                                            <ButtonComponent value={comment.id} text="حذف" color="secondary" startIcon={<DeleteIcon/>}
                                                             clicked={deleteComment}/>
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>





                <Box className={classes.pagination}>
                    <Pagination count={(totalPage - 1)}
                                onChange={paginate}/>
                </Box>
            </Paper>
        </>
    );

}

export default withNamespaces('translation')(CommentDashboardComponent);
