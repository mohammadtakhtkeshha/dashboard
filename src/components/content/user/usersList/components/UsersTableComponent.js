import React, {useContext, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import TableContainer from "@material-ui/core/TableContainer";
import {Box, CardMedia, Paper,Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableBody from "@material-ui/core/TableBody";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TableCell from "@material-ui/core/TableCell";
import {withStyles} from "@material-ui/core/styles";
import {makeStyles} from "@material-ui/styles";

import userImg from "assets/media/image/user.jpg";
import {useStyles} from 'assets/js/user/users';
import AppContext from "contexts/AppContext";
import UserContext from "contexts/UserContext";
import userService from "core/services/user.service";
import {danger, success, warning} from "methods/swal";
import storage from "libraries/local-storage";
import UsersRegisterModalComponent from "./UsersRegisterModalComponent";
import {StyledActionButtonBlock, styledTableCell, styledTableRow} from "assets/js/App";

const StyledTableCell = withStyles(styledTableCell)(TableCell);
const StyledTableRow = withStyles(styledTableRow)(TableRow);
const currentStyles = makeStyles(useStyles);

function UsersTableComponent({t, roles,setOpenNewUser, valueRoles, chunkUsers,setSelectedCheckBoxes}) {
    let id = '';
    const classes = currentStyles();
    const lang = i18next.language;
    const anchorRef = useRef(null);
    const [openDetail, setOpenDetail] = useState(false);
    const prevOpenDetail = useRef(openDetail);
    const node = useRef(id);
    const appContext = useContext(AppContext);
    const userContext = useContext(UserContext);
    const [openEditForm, setOpenEditForm] = useState({show: false, id: ''});
    const loginedUser = JSON.parse(storage.get('user'));
    const [showUserDetail, setShowUserDetail] = useState();

    const handleEditFormClose = () => {
        setOpenEditForm({show: false, id: ''});
    };

    const editedUser = (user) => {
        let changedUser = chunkUsers[userContext.page].filter(item => item.uid === user.uid);
        let editedUserIndex = chunkUsers[userContext.page].findIndex(item => item === changedUser[0]);
        if (user.role !== "") {
            let keyRoles = [];
            for (let role of (user.role.split(','))) {
                keyRoles.push(roles[role]);
            }
            user.role = keyRoles.toString();
        } else {
            user.role = t('translation:noRole')
        }
        chunkUsers[userContext.page][editedUserIndex] = user;
        userContext.passChunckUserList([...chunkUsers]);
        setOpenEditForm({show: false, id: ''});
    };

    const handleUserDetail = (e) => {
        id = e.currentTarget.value;
        setShowUserDetail(id);
    };

    const clickOutSide = e => {
        if (node.current !== "" && node.current !== null && node.current.contains(e.target)) {
            setShowUserDetail(true);
            return;
        }
        setShowUserDetail(false);
    };

    const handleEditFormOpen = (id) => {
        setOpenNewUser({show: true, id: id});
    };

    const doPaginateActionAfterUpdate = (users) => {
        let currentTotalNumber = users.length;
        userContext.passTotalPage(Math.ceil(currentTotalNumber / userContext.perPage));
        let chunckedUsers = userContext.chunckUserHandler(users, userContext.perPage);
        userContext.passChunckUserList(chunckedUsers);
        handlePaginateUser(chunckedUsers, currentTotalNumber, userContext.page);
    }

    const allCheckboxHandler = (e) => {
        let isChecked = e.currentTarget.checked;
        let currentUserList = chunkUsers[userContext.page];
        let ids = currentUserList.map(user => user.uid);
        if (!isChecked) {
            setSelectedCheckBoxes(
                []
            );
        } else {
            setSelectedCheckBoxes(
                [...ids]
            );
        }

    };

    const handlePaginateUser = (currentUsers, totalNumberr, currentPage) => {
        userContext.passTotalPage(Math.ceil(totalNumberr / userContext.perPage));
    };

    const isCheckedHandler = (e, user) => {
        let currentId = user.uid;
        if (e.currentTarget.checked) {
            setSelectedCheckBoxes(
                [...userContext.selectedCheckBoxes, currentId]
            );
        } else {
            let filteredSelected = userContext.selectedCheckBoxes.filter(item => item !== currentId);
            setSelectedCheckBoxes(
                [...filteredSelected]
            );
        }
    };

    const deleteUser = (id) => {debugger
        appContext.setLoading(true);
        let loginUserId = loginedUser.id;
        if (id === loginUserId) {
            danger(t('translation:loginDelete'), t('translation:ok'));
            return;
        }
        userService.deleteUser(id).then((response) => {debugger
            appContext.setLoading(false);
            debugger
            let selectedUser = userContext.users.filter(user => user.uid === id);
            debugger
            let selectedUserIndex = userContext.users.indexOf(selectedUser[0]);
            debugger
            userContext.users.splice(selectedUserIndex, 1);
            debugger
            // doPaginateActionAfterUpdate(userContext.users);
            userContext.handlePagination(userContext.users,true);
            success(t('translation:deletedSuccessfully'), t('translation:ok'));

        }).catch((error) => {debugger
            appContext.handleError(error);
        });
    };

    const confirmDeleteHandler = (e) => {debugger
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteUser(id)
        });
    };

    useEffect(() => {
        if (prevOpenDetail.current === true && openDetail === false) {
            anchorRef.current.focus();
        }
        prevOpenDetail.current = openDetail;
    }, [openDetail]);

    useEffect(() => {
        document.addEventListener("mousedown", clickOutSide);  // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    }, [node]);

    return (
        <>
            <TableContainer component={Paper} className={classes.userBlock}>
                <Table className="table" aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">
                                <Checkbox
                                    checked={((userContext.selectedCheckBoxes.length) === ((chunkUsers[userContext.page] !== undefined) ? chunkUsers[userContext.page].length : 'zero'))}
                                    onChange={(e) => allCheckboxHandler(e)}
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            </StyledTableCell>
                            <StyledTableCell align="right">{t('translation:image')}</StyledTableCell>
                            <StyledTableCell align="right">{t('users:username')}</StyledTableCell>
                            <StyledTableCell align="right">{t('translation:status')}</StyledTableCell>
                            <StyledTableCell align="right">{t('translation:more')}</StyledTableCell>
                            <StyledTableCell align="right">{t('translation:actions')}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {chunkUsers[userContext.page] !== undefined && chunkUsers[userContext.page].length > 0 ? (chunkUsers[userContext.page].map((user, index) =>
                            (<React.Fragment key={index}>
                                <StyledTableRow>
                                    <StyledTableCell align="right">
                                        <Checkbox
                                            onChange={(e) => isCheckedHandler(e, user)}
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                            checked={userContext.selectedCheckBoxes.includes(user.uid)}
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
                                    <StyledTableCell align="right"> {user.name}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {user.status === "true" ? t('translation:confirmed') : t('translation:notConfirmed')}
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
                                        <StyledActionButtonBlock>
                                            <button onClick={()=>handleEditFormOpen(user.uid)}>
                                                <EditIcon/>
                                                <Typography>
                                                    {t('translation:edit')}
                                                </Typography>
                                            </button>
                                            <button value={user.uid} onClick={ confirmDeleteHandler}>
                                                <DeleteIcon/>
                                                {t('translation:delete')}
                                            </button>
                                        </StyledActionButtonBlock>
                                    </StyledTableCell>
                                </StyledTableRow>
                                {showUserDetail === user.uid ?
                                    <StyledTableRow key={index}
                                                    className={clsx('userBlockDetails', lang === 'fa' ? 'rightZero' : 'leftZero')}>
                                        <StyledTableCell align="right">
                                            <Box className="text">
                                                <Table className="table" aria-label="customized table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="right">
                                                                {t('translation:name')}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {user.field_name}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="right">
                                                                {t('users:family')}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {user.field_last_name}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="right">
                                                                {t('users:mail')}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {user.mail}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="right">
                                                                {t('users:role')}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {user.roles_target_id === "[]" ? t('translation:noRole') : user.roles_target_id}
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
            {/*-------------------------edit modal---------------------------*/}
            <UsersRegisterModalComponent openEditForm={openEditForm}
                                    handleEditFormClose={handleEditFormClose}
                                    editedUser={editedUser}
                                    keyRoles={userContext.keyRoles}
                                    valueRoles={valueRoles}
            />
            {/*-------------------------- End edit modal ---------------------*/}
        </>
    );
}

export default withNamespaces('users, translation')(UsersTableComponent);
