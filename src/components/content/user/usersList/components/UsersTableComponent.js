import React, {useContext, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import TableContainer from "@material-ui/core/TableContainer";
import {Box, CardMedia, Paper} from "@material-ui/core";
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

import ButtonComponent from "components/partials/ButtonComponent";
import userImg from "assets/media/image/user.jpg";
import {useStyles, styledTableCell, styledTableRow} from 'assets/js/user/users';
import AppContext from "contexts/AppContext";
import UserContext from "contexts/UserContext";
import userService from "core/services/user.service";
import {danger, success, warning} from "methods/swal";
import storage from "libraries/local-storage";
import UserEditModalComponent from "./UserEditModalComponent";
import {makeStyles} from "@material-ui/styles";

const StyledTableCell = withStyles(styledTableCell)(TableCell);
const StyledTableRow = withStyles(styledTableRow)(TableRow);
const currentStyles=makeStyles(useStyles);

function UsersTableComponent({t,roles,valueRoles, chunckUserList}) {
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
    let loginedUser = JSON.parse(storage.get('user'));
    const [showUserDetail, setShowUserDetail] = useState();
    let handleEditFormClose = () => {
        setOpenEditForm({show: false, id: ''});
    };

    useEffect(() => {
        if (prevOpenDetail.current === true && openDetail === false) {
            anchorRef.current.focus();
        }

        prevOpenDetail.current = openDetail;
    }, [openDetail]);

    let editedUser = (user) => {
        let changedUser = chunckUserList[userContext.page].filter(item => item.uid === user.uid);
        let editedUserIndex = chunckUserList[userContext.page].findIndex(item => item === changedUser[0]);
        if (user.role !== "") {
            let keyRoles = [];
            for (let role of (user.role.split(','))) {
                keyRoles.push(roles[role]);
            }
            user.role = keyRoles.toString();
        } else {
            user.role = t('translation:noRole')
        }
        chunckUserList[userContext.page][editedUserIndex] = user;
        userContext.passChunckUserList([...chunckUserList]);
        setOpenEditForm({show: false, id: ''});
    };

    useEffect(() => {
        document.addEventListener("mousedown", clickOutSide);  // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    }, [node]);

    let handleUserDetail = (e) => {
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

    let handleEditFormOpen = (id) => {
        setOpenEditForm({show: true, id: id});
    };

    let doPaginateActionAfterUpdate = (users) => {
        let currentTotalNumber = users.length;
        userContext.passTotalPage(Math.ceil(currentTotalNumber / userContext.perPage));
        let chunckedUsers = userContext.chunckUserHandler(users, userContext.perPage);
        userContext.passChunckUserList(chunckedUsers);
        handlePaginateUser(chunckedUsers, currentTotalNumber, userContext.page);
    }

    let allCheckboxHandler = (e) => {
        let isChecked = e.currentTarget.checked;
        let currentUserList = chunckUserList[userContext.page];
        let ids = currentUserList.map(user => user.uid);
        if (!isChecked) {
            userContext.handleSelectedCheckBoxes(
                []
            );
        } else {
            userContext.handleSelectedCheckBoxes(
                [...ids]
            );
        }

    };

    let handlePaginateUser = (currentUsers, totalNumberr, currentPage) => {
        userContext.passTotalPage(Math.ceil(totalNumberr / userContext.perPage));
    };

    let isCheckedHandler = (e, user) => {
        let currentId = user.uid;
        if (e.currentTarget.checked) {
            userContext.handleSelectedCheckBoxes(
                [...userContext.selectedCheckBoxes, currentId]
            );
        } else {
            let filteredSelected = userContext.selectedCheckBoxes.filter(item => item !== currentId);
            userContext.handleSelectedCheckBoxes(
                [...filteredSelected]
            );
        }
    };

    let deleteUser = (id) => {
        appContext.toggleLoading(true);
        let loginUserId = loginedUser.uid;
        if (id === loginUserId) {
            danger(t('translation:loginDelete'), t('translation:ok'));
            return;
        }
        userService.deleteUser(id).then((response) => {
            appContext.toggleLoading(false);
            let selectedUser = userContext.users.filter(user => user.uid == id);
            let selectedUserIndex = userContext.users.indexOf(selectedUser[0]);
            userContext.users.splice(selectedUserIndex, 1);
            doPaginateActionAfterUpdate(userContext.users);
            success(t('translation:deletedSuccessfully'), t('translation:ok'));

        }).catch((error) => {
            userContext.handleError(error);
        });
    };

    let confirmDeleteHandler = (e) => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteUser(id)
        });
    };

    return (
        <>
            <TableContainer component={Paper} className={classes.userBlock}>
                <Table className="table" aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">
                                <Checkbox
                                    checked={((userContext.selectedCheckBoxes.length) === ((chunckUserList[userContext.page] !== undefined) ? chunckUserList[userContext.page].length : 'zero'))}
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
                        {chunckUserList[userContext.page] !== undefined && chunckUserList[userContext.page].length > 0 ? (chunckUserList[userContext.page].map((user, index) =>
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
                                        <Box className='buttonBlock'>
                                            <ButtonComponent value={user.uid} text={t('translation:edit')}
                                                             color="primary"
                                                             startIcon={<EditIcon/>}
                                                             clicked={() => handleEditFormOpen(user.uid)}/>
                                            <ButtonComponent value={user.uid} text={t('translation:delete')}
                                                             color="secondary"
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
            <UserEditModalComponent openEditForm={openEditForm} handleEditFormClose={handleEditFormClose}
                                    editedUser={editedUser}
                                    keyRoles={userContext.keyRoles}
                                    valueRoles={valueRoles}
            />
            {/*-------------------------- End edit modal ---------------------*/}
        </>
    );
}
export default withNamespaces('users', 'translation')(UsersTableComponent);
