import React, {useEffect, useState, useContext} from "react";
import {Box, CardMedia, Paper,Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles/index";
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios/index";
import ButtonComponent from '../../partials/ButtonComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';
import * as colors from './../../../components/partials/Colors';
import AppContext from './../../../contexts/AppContext';
import userImg from "../../../assets/media/image/user.jpg";
//locales
import { withNamespaces } from 'react-i18next';
import i18n from  './../../../configs/locales/locales';

import {
    Link
} from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";



const useStyles = makeStyles((theme) => ({
    userBlock: {
        overflow: 'auto',
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
            '&:first-child': {
                flexShrink: 2
            },
            '&.firstName':{
                display:'flex',
                '& .name':{
                    paddingRight:'5px',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                },
                '& .imgBlock':{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:'100%',
                    overflow:'hidden',
                    width:'50px',
                    height:'50px',
                    '& .MuiCardMedia-root':{
                        width:'50px!important',
                        height:'50px!important',
                    },
                    '& img':{
                        width:'100%',
                        height:'100%',
                    }
                },
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
    mypaper:{
        margin:theme.spacing(2),
        padding:theme.spacing(2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function BaseFormComponent({t}) {

    const classes = useStyles();
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [users, setUsers] = useState([]);
    const appContext = useContext(AppContext);

    // ------------------  modal --------------------------
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // ------------------  modal --------------------------
    let getUsers = (page) => {
        const config = {
            headers: {
                Authorization: appContext.token
            }
        };
        axios.get(`http://sitesaz99.rbp/web/api/user/v2?page=${page}`, config).then(
            function (response) {
                let currentList = [];
                response.data.rows.map((item) => {
                    currentList.push({
                        uid: item.uid,
                        name: item.name,
                        field_name: item.field_name,
                        field_last_name: item.field_last_name,
                        role: (item.roles_target_id==="[]"?'بدون نقش':item.roles_target_id),
                        status: item.status,
                        user_picture: item.user_picture,
                        mail: item.mail,
                    });
                });
                setUsers(currentList);
                setTotalPage(response.data.pager.total_pages);
            }
        ).catch(function (error) {
            console.log(error);
        });
    };
    let deleteUser = (e) => {
        let id = e.currentTarget.value;
        let url = `http://sitesaz99.rbp/web/user/${id}?_format=json`;
        let config = {
            headers: {
                Authorization: appContext.token,
            }
        };
        axios.delete(url, config).then((response) => {
            let newUsers = users.filter(user => user.uid !== id);
            setUsers([...newUsers]);
        }).catch((error) => {
            console.log(`delete user error : ${error}`);
        });
    };

    useEffect(() => {
        getUsers(page);
    }, []);

    // console.log(totalPage);
    let allCheckboxHandler = (e) => {
        let ids = users.map(user => user.uid);
        let usersLength = users.length;
        if (selectedCheckBoxes.length === usersLength) {
            setSelectedCheckBoxes(
                []
            );
        } else {
            setSelectedCheckBoxes(
                [...ids]
            );
        }

    };
    console.log(appContext.token);
    let isCheckedHandler = (e, user) => {
        let currentId = user.uid;
        if (e.currentTarget.checked) {
            setSelectedCheckBoxes(
                [...selectedCheckBoxes, currentId]
            );
        } else {
            let filteredSelected = selectedCheckBoxes.filter(item => item !== currentId);
            setSelectedCheckBoxes(
                [...filteredSelected]
            );
        }
    };
    let paginate = (e, value) => {
        setPage(value);
        getUsers(value);
    };
    console.log(users);
    return (<>
        <Paper className={classes.mypaper}>
            <button type="button" onClick={handleOpen}>
                <Typography>{t('users:newUser')}</Typography>
            </button>
            <Box>

                {/*-------------------------modal---------------------------*/}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Transition modal</h2>
                            <p id="transition-modal-description">react-transition-group animates me.</p>
                            <button onClick={handleClose}>cancel</button>
                        </div>
                    </Fade>
                </Modal>
                {/*-------------------------modal---------------------------*/}
</Box>
            <Box className={classes.userBlock}>
                <Box className="item">
                    <Checkbox
                        checked={selectedCheckBoxes.length === users.length}
                        onChange={(e) => allCheckboxHandler(e)}
                        inputProps={{'aria-label': 'primary checkbox'}}
                    />
                </Box>
                <Box className="item">
                    {t('users:name')}
                </Box>
                <Box className="item">
                    {t('users:family')}
                </Box>
                <Box className="item">
                    {t('users:username')}
                </Box>
                <Box className="item">
                    {t('users:role')}
                </Box>
                <Box className="item">
                    {t('users:email')}
                </Box>
                <Box className="item">
                    {t('users:status')}
                </Box>
                <Box className="item">
                    {t('users:actions')}
                </Box>
            </Box>
            {users.map((user, index) =>
                <Box key={index} className={classes.userBlock}>
                    <Box className="item">
                        <Checkbox
                            onChange={(e) => isCheckedHandler(e, user)}
                            inputProps={{'aria-label': 'primary checkbox'}}
                            checked={selectedCheckBoxes.includes(user.uid)}
                        />
                    </Box>
                    <Box className="item firstName">
                        <Box className="imgBlock">
                            <CardMedia id="img">
                                { user.user_picture ? <img src={user.user_picture} alt={user.name}/>:<img src={userImg} alt={user.name}/>}
                            </CardMedia>
                        </Box>
                        <Box className="name">
                            {user.field_name}
                        </Box>
                    </Box>
                    <Box className="item">
                        {user.field_last_name}
                    </Box>
                    <Box className="item">
                        {user.name}
                    </Box>
                    <Box className="item">
                        {user.role}
                    </Box>
                    <Box className="item">
                        {user.mail}
                    </Box>
                    <Box className="item">
                        {user.status ? 'تایید شده' : 'در انتظار تایید'}
                    </Box>

                    <Box className="item">
                        <Link to={`edit-user/${user.uid}`}>
                            <ButtonComponent value={user.uid} text="ویرایش" color="primary" startIcon={<EditIcon/>}/>
                        </Link>
                        <ButtonComponent value={user.uid} text="حذف" color="secondary" startIcon={<DeleteIcon/>}
                                         clicked={deleteUser}/>
                    </Box>
                </Box>)}
            <Box className={classes.pagination}>
                <Pagination count={(totalPage - 1)}
                            onChange={paginate}/>
            </Box>
        </Paper>
    </>);
}


export default withNamespaces('users')(BaseFormComponent);
