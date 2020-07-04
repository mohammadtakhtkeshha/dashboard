import React, {useEffect, useState, useContext} from "react";
import {Box, CardMedia, Paper, Typography} from '@material-ui/core';
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
import Input from "./../../partials/inputComponent";

import NewUser from './forms/NewUserComponent';

//icons
import CancelIcon from '@material-ui/icons/Cancel';


// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import TextField from '@material-ui/core/TextField';
//locales
import {withNamespaces} from 'react-i18next';
import i18n from './../../../configs/locales/locales';

import {
    Link
} from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
//styles
import styles from './../../../assets/js/user/users'


function BaseFormComponent({t}) {
    const [role, setRole] = React.useState('EUR');
    const [keyRoles, setKeyRoles] = useState([]);
    const [valueRoles, setValueRoles] = useState();
    const [action, setAction] = React.useState('EUR');
    const roles = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
    ];
    const actions = [
        {value: 'delete', label: t('translation:delete')},
        {value: 'block', label: t('translation:block')},
        {value: 'noBlock', label: t('translation:notBlock')}
    ];
    const handleFilterChange = (event) => {
        setRole(event.target.value);
    };
    const handleActionChange = (event) => {
        setAction(event.target.value);
    };
    const classes = styles.useStyles();
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

    // ------------------ get roles ---------------------------
    let getUsers = (page) => {
        const config = {
            headers: {
                Authorization: appContext.token
            }
        };
        axios.get(`http://dash.webrbp.ir/api/user/v2?page=${page}`, config).then(
            function (response) {
                let currentList = [];
                response.data.rows.map((item) => {
                    currentList.push({
                        uid: item.uid,
                        name: item.name,
                        field_name: item.field_name,
                        field_last_name: item.field_last_name,
                        role: (item.roles_target_id === "[]" ? 'بدون نقش' : item.roles_target_id),
                        status: item.status,
                        user_picture: item.user_picture,
                        mail: item.mail,
                    });
                });
                setUsers(currentList);
                setTotalPage(response.data.pager.total_pages);
            }
        ).catch( (error)=> {
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

    const headers =[
        {name: 'srgvsege',className:'esgrtg'},
        {name: 'srgvsege',className:'esgrtg'},
        {name: 'srgvsege',className:'esgrtg'},
        {name: 'srgvsege',className:'esgrtg'},
        {name: 'srgvsege',className:'esgrtg'},
        {name: 'srgvsege',className:'esgrtg'},
    ]
    return (<>
        <Paper className={classes.mypaper}>
            <Box className="head">
                <Typography className="text">{t('users:usersList')}</Typography>
                <button type="button" onClick={handleOpen}>
                    <Typography>{t('users:newUser')}</Typography>
                </button>
            </Box>
            <Box className="filter">
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{t('translation:filter')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails id="details">
                        <Box className="inputBlock">
                            <Input placeholder={t('users:name')}/>
                            <Input placeholder={t('users:family')}/>
                            <Input placeholder={t('users:role')}/>
                            <Input placeholder={t('users:username')}/>
                            <Input placeholder={t('users:email')}/>

                            <TextField
                                id="outlined-select-role-native"
                                select
                                value={role}
                                onChange={handleFilterChange}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                            >
                                {valueRoles?Object.keys(valueRoles).map((keyname,index) => (
                                    <option key={valueRoles[keyname]} value={valueRoles[keyname]}>
                                        {valueRoles[keyname]}
                                    </option>
                                )):''}
                            </TextField>
                        </Box>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Box>
            <Box className="actions">
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{t('translation:operator')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails id="actions">
                        <TextField
                            id="outlined-select-role-native"
                            select
                            value={action}
                            onChange={handleActionChange}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                        >
                            {actions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Box>
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
                    <Fade in={open}  id="modal">
                        <div className={classes.paper} dir="rtl">
                            <Box className="header">
                                <button onClick={handleClose}>
                                    <CancelIcon/>
                                </button>
                            </Box>
                            <Box className="body">
                            <NewUser/>
                            </Box>
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
                    {t('translation:actions')}
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
                                {user.user_picture ? <img src={user.user_picture} alt={user.name}/> :
                                    <img src={userImg} alt={user.name}/>}
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
