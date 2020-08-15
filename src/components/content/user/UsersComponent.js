import React, {useEffect, useRef, useState} from "react";
import {Box, CardMedia, Paper, Typography} from '@material-ui/core';
import clsx from "clsx";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {withStyles} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';
import * as colors from './../../../components/partials/Colors';
import userImg from "../../../assets/media/image/user.jpg";
import Input from "./../../partials/inputComponent";
import EditUserComponent from "./forms/EditUserComponent";
import swal from "sweetalert";
import NewUserComponent from './forms/NewUserComponent';
import CancelIcon from '@material-ui/icons/Cancel';
import {Helmet} from "react-helmet";
import {withNamespaces} from 'react-i18next';
import i18next from "i18next";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import ButtonComponent from '../../partials/ButtonComponent';
import {primary} from "./../../../components/partials/Colors";
import styles from './../../../assets/js/user/users';
import {globalCss} from '../../../assets/js/globalCss';
import userService from "../../../core/services/user.service";
import {makeStyles} from "@material-ui/styles";

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
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const gClass = makeStyles(globalCss);

function UsersComponent({t}) {
    const gClasses = gClass();
    let lang = i18next.language;
    const [role, setRole] = useState('');
    const [keyRoles, setKeyRoles] = useState([]);
    const [valueRoles, setValueRoles] = useState();
    const [action, setAction] = useState('delete');
    const classes = styles.useStyles();
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [openNewUser, setOpenNewUser] = useState(false);
    const [openEditForm, setOpenEditForm] = useState({show: false, id: ''});
    const [searchedUser, setSearcheUser] = useState({
        field_name: "",
        field_last_name: "",
        name: "",
        mail: "",
        role: ""
    });
    const actions = [
        {value: 'delete', label: t('translation:delete')},
        {value: 'block', label: t('translation:block')},
        {value: 'active', label: t('translation:active')}
    ];
    const [openDetail, setOpenDetail] = useState(false);
    const anchorRef = useRef(null);
    let id = '';
    const node = useRef(id);
    const [showUserDetail, setShowUserDetail] = useState();

    useEffect(() => {
        document.addEventListener("mousedown", clickOutSide);  // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    }, [node]);

    const clickOutSide = e => {
        if (node.current !== "" && node.current !== null && node.current.contains(e.target)) {
            setShowUserDetail(true);
            return;
        }
        setShowUserDetail(false);
    };

    let handleUserDetail = (e) => {debugger
        id = e.currentTarget.value;
        console.log(id);
        setShowUserDetail(id);
    };

    useEffect(() => {
        getRoles();
    }, []);

    useEffect(() => {
        getUsers(page);
    }, []);

    let getRoles = () => {
        userService.getRoles().then((response) => {
            let valueRoles = Object.values(response.data);
            let keyRoles = Object.keys(response.data);
            setKeyRoles(keyRoles);
            setValueRoles(valueRoles);
        }).catch((error) => {
            console.log(error);
        });
    };

    let handleActionChange = (event) => {
        setAction(event.target.value);
    };

    // ------------------  modal --------------------------
    let openNewUserForm = () => {
        setOpenNewUser(true);
    };

    let handleEditFormOpen = (id) => {
        setOpenEditForm({show: true, id: id});
    };

    let handleCloseUserForm = () => {
        setOpenNewUser(false);
    };

    let handleEditFormClose = () => {
        setOpenEditForm({show: false, id: ''});
    };
    // ------- /MODAL -------
    let getUsers = (page) => {
        userService.getUsers(page).then(
            function (response) {
                let currentList = [];
                response.data.rows.map((item) => {
                    currentList.push({
                        uid: item.uid,
                        name: item.name,
                        field_name: item.field_name,
                        field_last_name: item.field_last_name,
                        role: (item.roles_target_id === "[]" ? 'بدون نقش' : item.roles_target_id),
                        status: (item.status === "true" ? true : false),
                        user_picture: item.user_picture,
                        mail: item.mail
                    });
                });
                setUsers(currentList);
                setFilteredUsers(currentList);
                setTotalPage(response.data.pager.total_pages);
            }
        ).catch((error) => {
            console.log(error);
        });
    };

    let confirmDeleteHandler = (e) => {
        let id = e.currentTarget.value;
        swal({
            title: t('translation:sureQuestion'),
            icon: "warning",
            buttons: {
                confirm: {
                    text: t('translation:ok'),
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                },
                cancel: {
                    text: t('translation:cancel'),
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                }

            },
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteUser(id);
                } else {
                    swal({
                        text: t('translation:notDone'),
                        button: {
                            text: t('translation:ok')
                            , className: gClasses.confirmSwalButton
                        },
                        className: gClasses.makeSwalButtonCenter,
                        icon: "success"
                    });
                }
            });
    }

    let deleteUser = (id) => {
        userService.deleteUser(id).then((response) => {
            let selectedUser = users.filter(user => user.uid == id);
            let selectedUserIndex = users.indexOf(selectedUser[0]);
            users.splice(selectedUserIndex, 1);
            setFilteredUsers([...users]);
            swal({
                text: t('translation:deletedSuccessfully'),
                button: {
                    text: t('translation:ok')
                    , className: gClasses.confirmSwalButton
                },
                className: gClasses.makeSwalButtonCenter,
                icon: "success"
            });
        }).catch((error) => {
            console.log(`delete user error : ${error}`);
        });
    };

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

    let getRegisteredUser = (user) => {
        setFilteredUsers(prevState => {
            return [user, ...prevState];
        });
        handleCloseUserForm();
    }

    let editedUser = (user) => {
        let changedUser = filteredUsers.filter(item => item.uid === user.uid);
        let editedUserIndex = filteredUsers.findIndex(item => item === changedUser[0]);
        filteredUsers[editedUserIndex] = user;
        setFilteredUsers([...filteredUsers]);
        setOpenEditForm({show: false, id: ''});
    }

    let doFilterHandler = () => {
        let fieldName = searchedUser.field_name;
        let fieldLastName = searchedUser.field_last_name;
        let name = searchedUser.name;
        let mail = searchedUser.mail;
        let filteredUser;
        filteredUser = users.filter((user) => {
            let newUser = user['field_name'].includes(fieldName) &&
                user['field_last_name'].includes(fieldLastName) &&
                user['name'].includes(name) &&
                user['mail'].includes(mail) &&
                user['role'].includes(role)
            return newUser;
        });
        setFilteredUsers(filteredUser);
    }

    let filterBy = (e, key) => {
        let keyValue = e.currentTarget.value;
        setSearcheUser(prevState => {
            return {
                ...prevState, [key]: keyValue
            }
        });
    }

    let changeRole = (e) => {
        let currentValue = e.currentTarget.value;
        setRole(currentValue);
    }

    let handleMultiAction = () => {
        swal({
            title: t('translation:sureQuestion'),
            icon: "warning",
            buttons: {
                confirm: {
                    text: t('translation:ok'),
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                },
                cancel: {
                    text: t('translation:cancel'),
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                }

            },
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    if (action === "delete") {
                        let data = [];
                        for (let id of selectedCheckBoxes) {
                            data.push({
                                "id": id,
                                "status": "deleted"
                            })
                        }
                        userService.multiAction(data).then((response) => {
                            let selectedUsers = [];
                            selectedCheckBoxes.map((id) => {
                                let currentUser = filteredUsers.filter(user => user.uid !== id);
                                selectedUsers.push(currentUser);
                            });
                            setFilteredUsers(...selectedUsers);
                        }).catch((error) => {
                            console.log(error);
                        });
                    } else if (action === "block") {
                        let data = [];
                        for (let id of selectedCheckBoxes) {
                            data.push({
                                "id": id,
                                "status": "blocked"
                            })
                        }
                        userService.multiAction(data).then((response) => {
                            for (let i = 0; i < filteredUsers.length; i++) {
                                selectedCheckBoxes.map((id) => {
                                    if (filteredUsers[i].uid === id) {
                                        filteredUsers[i].status = false;
                                    }
                                });
                            }
                            setFilteredUsers([...filteredUsers]);
                            swal({
                                text: t('translation:successDone'),
                                button: {
                                    text: t('translation:ok')
                                    , className: gClasses.confirmSwalButton
                                },
                                className: gClasses.makeSwalButtonCenter,
                                icon: "success"
                            });
                        }).catch((error) => {
                            console.log(error);
                        });
                    } else {
                        let data = [];
                        for (let id of selectedCheckBoxes) {
                            data.push({
                                "id": id,
                                "status": "actived"
                            })
                        }
                        userService.multiAction(data).then((response) => {
                            for (let i = 0; i < filteredUsers.length; i++) {
                                selectedCheckBoxes.map((id) => {
                                    if (filteredUsers[i].uid === id) {
                                        filteredUsers[i].status = true;
                                    }
                                });
                            }
                            setFilteredUsers([...filteredUsers]);
                            swal({
                                text: t('translation:successDone'),
                                button: {
                                    text: t('translation:ok')
                                    , className: gClasses.confirmSwalButton
                                },
                                className: gClasses.makeSwalButtonCenter,
                                icon: "success"
                            });
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                } else {
                    swal({
                        text: t('translation:notDone'),
                        button: {
                            text: t('translation:ok')
                            , className: gClasses.confirmSwalButton
                        },
                        className: gClasses.makeSwalButtonCenter,
                        icon: "success"
                    });
                }
            });


    }

// ------- more details ------
    const prevOpenDetail = useRef(openDetail);

    useEffect(() => {
        if (prevOpenDetail.current === true && openDetail === false) {
            anchorRef.current.focus();
        }

        prevOpenDetail.current = openDetail;
    }, [openDetail]);

    return (<>
        <Helmet>
            <title>
                {t('sidebar:users')}
            </title>
        </Helmet>
        <Paper className={classes.mypaper}>
            <Box className="head">
                <Typography className="text">{t('users:usersList')}</Typography>
                <button type="button" onClick={openNewUserForm}>
                    <Typography>{t('users:newUser')}</Typography>
                </button>
            </Box>
            <Box className={clsx("filter", "box")}>
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
                            <Input placeholder={t('translation:name')} handleClick={e => filterBy(e, 'field_name')}/>
                            <Input placeholder={t('users:family')} handleClick={e => filterBy(e, 'field_last_name')}/>
                            <Input placeholder={t('users:username')} handleClick={e => filterBy(e, 'name')}/>
                            <Input placeholder={t('users:email')} handleClick={e => filterBy(e, 'mail')}/>

                            {valueRoles ? <TextField
                                id="outlined-select-role-native"
                                select
                                value={role}
                                onChange={e => changeRole(e)}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                            >
                                <option value="">{t('translation:none')}</option>
                                {valueRoles.map((current, index) => (
                                    <option key={keyRoles[index]} value={current}>
                                        {current}
                                    </option>
                                ))}
                            </TextField> : ''}

                        </Box>
                        <Box className="buttonBlock">
                            <ButtonComponent text={t('translation:do')}
                                             color="primary"
                                             background={primary}
                                             startIcon={<EditIcon/>}
                                             clicked={() => doFilterHandler()}/>
                        </Box>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Box>
            <Box className={clsx("actions", "box")}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{t('translation:operator')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails id="actions">
                        <Box className="inputBlock">
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
                        </Box>
                        <Box className="buttonBlock">
                            <ButtonComponent text={t('translation:do')}
                                             color="primary"
                                             background={primary}
                                             startIcon={<EditIcon/>}
                                             clicked={() => handleMultiAction()}/>
                        </Box>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Box>


            {/*---------------------- table -----------------------------*/}
            <TableContainer component={Paper} className={classes.userBlock}>
                <Table className="table" aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">
                                <Checkbox
                                    checked={selectedCheckBoxes.length === users.length}
                                    onChange={(e) => allCheckboxHandler(e)}
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            </StyledTableCell>
                            <StyledTableCell align="right">{t('translation:image')}</StyledTableCell>
                            {/*<StyledTableCell align="right">{t('users:name')}</StyledTableCell>*/}
                            {/*<StyledTableCell align="right">{t('users:family')}</StyledTableCell>*/}
                            <StyledTableCell align="right">{t('users:username')}</StyledTableCell>
                            {/*<StyledTableCell align="right"> {t('users:role')}</StyledTableCell>*/}
                            {/*<StyledTableCell align="right">{t('users:email')}</StyledTableCell>*/}
                            <StyledTableCell align="right">{t('translation:status')}</StyledTableCell>
                            <StyledTableCell align="right">{t('translation:more')}</StyledTableCell>
                            <StyledTableCell align="right">{t('translation:actions')}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.length > 0 ? (filteredUsers.map((user, index) =>
                            (<React.Fragment key={index}>
                                <StyledTableRow>
                                    <StyledTableCell align="right">
                                        <Checkbox
                                            onChange={(e) => isCheckedHandler(e, user)}
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                            checked={selectedCheckBoxes.includes(user.uid)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Box className="imgBlock">
                                            <CardMedia id="img">
                                                {user.user_picture ? <img src={user.user_picture} alt="user.name"/> :
                                                    <img src={userImg}/>}
                                            </CardMedia>
                                            <Box>{user.name}</Box>
                                        </Box>
                                    </StyledTableCell>
                                    {/*<StyledTableCell align="right"> {user.field_name}</StyledTableCell>*/}
                                    {/*<StyledTableCell align="right">{user.field_last_name}</StyledTableCell>*/}
                                    <StyledTableCell align="right"> {user.name}</StyledTableCell>
                                    {/*<StyledTableCell align="right"> {user.role}</StyledTableCell>*/}
                                    {/*<StyledTableCell align="right"> {user.mail}</StyledTableCell>*/}
                                    <StyledTableCell align="right">
                                        {user.status ? 'تایید شده' : 'در انتظار تایید'}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Box>
                                            <button className="detailButton" ref={node}
                                                    onClick={(e) => handleUserDetail(e)} value={user.uid}>
                                                <UnfoldMoreIcon/>
                                            </button>

                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Box className='buttonBlock'>
                                            <ButtonComponent value={user.uid} text="ویرایش" color="primary"
                                                             startIcon={<EditIcon/>}
                                                             clicked={() => handleEditFormOpen(user.uid)}/>
                                            <ButtonComponent value={user.uid} text="حذف" color="secondary"
                                                             startIcon={<DeleteIcon/>}
                                                             clicked={(e) => confirmDeleteHandler(e)}/>
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                                {showUserDetail === user.uid ?
                                    <StyledTableRow key={index}
                                                    className={clsx('userBlockDetails', lang === 'fa' ? 'rightZero' : 'leftZero')}>
                                        <StyledTableCell align="right">
                                            <Box className="text">
                                                <Table className="table" aria-label="customized table">
                                                    <TableBody>
                                                        <TableRow key={index}>
                                                            <TableCell align="right">
                                                                {t('translation:name')}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {user.field_name}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow key={index}>
                                                            <TableCell align="right">
                                                                {t('users:family')}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {user.field_last_name}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow key={index}>
                                                            <TableCell align="right">
                                                                {t('users:mail')}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {user.mail}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow key={index}>
                                                            <TableCell align="right">
                                                                {t('users:role')}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {user.role}
                                                            </TableCell>
                                                        </TableRow>

                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    : <StyledTableRow style={{display: 'none'}}>
                                        <StyledTableCell align="right">
                                        </StyledTableCell>
                                    </StyledTableRow>}
                            </React.Fragment>)
                        )) : (<StyledTableRow>
                            <StyledTableCell colSpan="6" align="right">{t('translation:notFoundRecord')}
                            </StyledTableCell>
                        </StyledTableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*---------------------- //table -----------------------------*/}
            <Box>

                {/*-------------------------register modal---------------------------*/}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openNewUser}
                    onClose={handleCloseUserForm}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openNewUser} id="modal">
                        <div className={classes.paper} dir="rtl">
                            <Box className={clsx('header', (lang === 'en' ? 'flexDirL' : 'flexDirR'))}>
                                <Typography className="title">{t('translation:registerUser')}</Typography>
                                <button onClick={handleCloseUserForm} className='button'>
                                    <CancelIcon/>
                                </button>
                            </Box>
                            <Box className="body">
                                <NewUserComponent name="negar" getRegisteredUser={(user) => getRegisteredUser(user)}/>
                            </Box>
                        </div>
                    </Fade>
                </Modal>

                {/*-------------------------edit modal---------------------------*/}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openEditForm.show}
                    onClose={handleEditFormClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openEditForm.show} id="modal">
                        <div className={classes.paper} dir="rtl">
                            <Box className={clsx('header', (lang === 'en' ? 'flexDirL' : 'flexDirR'))}>
                                <Typography className="title">{t('users:editUser')}</Typography>
                                <button onClick={handleEditFormClose} className='button'>
                                    <CancelIcon/>
                                </button>
                            </Box>
                            <Box className="body">
                                <EditUserComponent editedUser={editedUser} id={openEditForm.id} keyRoles={keyRoles}
                                                   valueRoles={valueRoles}/>
                            </Box>
                        </div>
                    </Fade>
                </Modal>
                {/*-------------------------- End edit modal ---------------------*/}
            </Box>
            <Box className={classes.pagination}>
                <Pagination count={(totalPage - 1)}
                            onChange={paginate}/>
            </Box>
        </Paper>
    </>);
}


export default withNamespaces('users', 'translation')(UsersComponent);
