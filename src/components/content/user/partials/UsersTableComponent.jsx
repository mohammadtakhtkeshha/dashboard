import React, {useContext, useEffect, useRef, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {CardMedia, Typography} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import userImg from "assets/media/image/user.jpg";
import AppContext from "contexts/AppContext";
import userService from "core/services/user.service";
import {danger, success, warning} from "methods/swal";
import storage from "libraries/local-storage";
// import UsersRegisterModalComponent from "./modal/Index.jsx";
import {
    StyledActionButtonBlock,
    StyledBtn,
    StyledCheckboxImgInTable,
    StyledTable,
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
    StyledTableCell,
} from "assets/js/App";
import StyledCheckboxComponent from "components/partials/StyledCheckboxComponent";
import {
    StyledDetailBlock,
    StyledMoreIconBlock,
    DetailTable,
    DetailTableRow,
    DetailTableCell,
} from "assets/js/user/partials/userTable";

function UsersTableComponent({t, page,roles, openUserForm, setOpenUserForm, valueRoles, chunkUsers, setSelectedCheckBoxes,passChunckUserList,passTotalPage,perPage,chunckUserHandler,selectedCheckBoxes,users,handlePagination,keyRoles}) {
    let id = '';
    const lang = i18next.language;
    const anchorRef = useRef(null);
    const [openDetail, setOpenDetail] = useState(false);
    const prevOpenDetail = useRef(openDetail);
    const node = useRef(id);
    const appContext = useContext(AppContext);
    const loginedUser = JSON.parse(storage.get('user'));
    const [showUserDetail, setShowUserDetail] = useState('');

    const handleEditFormClose = () => {
        setOpenUserForm({show: false, id: ''});
    };

    const editedUser = (user) => {
        let changedUser = chunkUsers[page].filter(item => item.uid === user.user_id);
        let editedUserIndex = chunkUsers[page].findIndex(item => item === changedUser[0]);
        if (user.role !== "") {
            let keyRoles = [];
            for (let role of (user.role.split(','))) {
                keyRoles.push(roles[role]);
            }
            user.role = keyRoles.toString();
        } else {
            user.role = t('translation:noRole')
        }
        chunkUsers[page][editedUserIndex] = user;
        passChunckUserList([...chunkUsers]);
        setOpenUserForm({show: false, id: ''});
    };

    const handleUserDetail = (e) => {
        const id = e.currentTarget.value;
        setShowUserDetail(id);
    };

    const clickOutSide = e => {
        if (node.current !== "" && node.current !== null && node.current.contains(e.target)) {
            setShowUserDetail(true);
            return;
        }
        setShowUserDetail(false);
    };

    const handleEditFormOpen = (e) => {
        const id=e.currentTarget.value;
        setOpenUserForm({show: true, id: id});
    };

    const doPaginateActionAfterUpdate = (users) => {
        let currentTotalNumber = users.length;
        passTotalPage(Math.ceil(currentTotalNumber / perPage));
        let chunckedUsers = chunckUserHandler(users, perPage);
        passChunckUserList(chunckedUsers);
        handlePaginateUser(chunckedUsers, currentTotalNumber, page);
    }

    const allCheckboxHandler = (e) => {
        let isChecked = e.currentTarget.checked;
        let currentUserList = chunkUsers[page];
        let ids = currentUserList.map(user => user.user_id);
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
        passTotalPage(Math.ceil(totalNumberr / perPage));
    };

    const isCheckedHandler = (e, user) => {
        let currentId = user.user_id;
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

    const deleteUser = (id) => {
        appContext.setLoading(true);
        let loginUserId = loginedUser.id;
        if (id === loginUserId) {
            danger(t('translation:loginDelete'), t('translation:ok'));
            return;
        }
        userService.deleteUser(id).then((response) => {
            appContext.setLoading(false);
            let selectedUser = users.filter(user => user.user_id === id);
            let selectedUserIndex = users.indexOf(selectedUser[0]);
            users.splice(selectedUserIndex, 1);
            handlePagination(users, true);
            success(t('translation:deletedSuccessfully'), t('translation:ok'));

        }).catch((error) => {
            appContext.handleError(error);
        });
    };

    const confirmDeleteHandler = (e) => {
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
            <StyledTable>
                <StyledTableHeadRow>
                    <StyledTableCell align="right">
                        <StyledCheckboxImgInTable>
                            <StyledCheckboxComponent
                                checked={((selectedCheckBoxes.length) === ((chunkUsers[page] !== undefined) ? chunkUsers[page].length : 'zero'))}
                                change={(e) => allCheckboxHandler(e)}
                            />
                            <div>{t('translation:image')}</div>
                        </StyledCheckboxImgInTable>
                    </StyledTableCell>
                    <StyledTableCell align="right">{t('users:username')}</StyledTableCell>
                    <StyledTableCell align="right">{t('translation:status')}</StyledTableCell>
                    <StyledTableCell align="right">{t('translation:more')}</StyledTableCell>
                    <StyledTableCell align="right">{t('translation:actions')}</StyledTableCell>
                </StyledTableHeadRow>
                <StyledTableBody>
                    {chunkUsers[page] !== undefined &&
                    chunkUsers[page].length > 0
                        ? (chunkUsers[page].map((user, index) =>
                            (<React.Fragment key={index}>
                                <StyledTableBodyRow>
                                    <StyledTableCell align="right">
                                        <StyledCheckboxImgInTable>
                                            <StyledCheckboxComponent
                                                change={(e) => isCheckedHandler(e, user)}
                                                checked={selectedCheckBoxes.includes(user.user_id)}
                                            />
                                            <CardMedia id="img">
                                                {user.picture ? <img src={user.picture} alt="user.name"/> :
                                                    <img src={userImg}/>}
                                            </CardMedia>
                                        </StyledCheckboxImgInTable>
                                    </StyledTableCell>
                                    <StyledTableCell align="right"> {user.user_name}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {user.status === "false" ? t('translation:notConfirmed') : t('translation:confirmed')}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <StyledMoreIconBlock>
                                            <StyledBtn ref={node} onClick={(e) => handleUserDetail(e)}
                                                       value={user.user_id}>
                                                <MoreVertIcon/>
                                                {showUserDetail === user.user_id ?
                                                    <StyledDetailBlock key={index}>
                                                        <DetailTable>
                                                            <DetailTableRow>
                                                                <DetailTableCell align="right">
                                                                    {t('translation:name')}
                                                                </DetailTableCell>
                                                                <DetailTableCell align="right">
                                                                    {user.firs_name}
                                                                </DetailTableCell>
                                                            </DetailTableRow>
                                                            <DetailTableRow>
                                                                <DetailTableCell align="right">
                                                                    {t('users:family')}
                                                                </DetailTableCell>
                                                                <DetailTableCell align="right">
                                                                    {user.last_name}
                                                                </DetailTableCell>
                                                            </DetailTableRow>
                                                            <DetailTableRow>
                                                                <DetailTableCell align="right">
                                                                    {t('users:mail')}
                                                                </DetailTableCell>
                                                                <DetailTableCell align="right">
                                                                    {user.mail}
                                                                </DetailTableCell>
                                                            </DetailTableRow>
                                                            <DetailTableRow>
                                                                <DetailTableCell align="right">
                                                                    {t('users:role')}
                                                                </DetailTableCell>
                                                                <DetailTableCell align="right">
                                                                    {user.roles === "" ? t('translation:noRole') : user.roles}
                                                                </DetailTableCell>
                                                            </DetailTableRow>
                                                        </DetailTable>
                                                    </StyledDetailBlock>
                                                    : <></>
                                                }
                                            </StyledBtn>
                                        </StyledMoreIconBlock>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <StyledActionButtonBlock>
                                            <button value={user.user_id} onClick={handleEditFormOpen}>
                                                <Typography>
                                                    {t('translation:edit')}
                                                </Typography>
                                            </button>
                                            <button value={user.user_id} onClick={confirmDeleteHandler}>
                                                {t('translation:delete')}
                                            </button>
                                        </StyledActionButtonBlock>
                                    </StyledTableCell>
                                </StyledTableBodyRow>
                            </React.Fragment>)
                        )) : (<StyledTableBodyRow>
                            <StyledTableCell colSpan="6" align="right">{t('translation:notFoundRecord')}
                            </StyledTableCell>
                        </StyledTableBodyRow>)}
                </StyledTableBody>
            </StyledTable>
            {/*-------------------------edit modal---------------------------*/}
            {/*<UsersRegisterModalComponent setOpenUserForm={setOpenUserForm}*/}
            {/*                             handleEditFormClose={handleEditFormClose}*/}
            {/*                             editedUser={editedUser}*/}
            {/*                             keyRoles={keyRoles}*/}
            {/*                             valueRoles={valueRoles}*/}
            {/*                             openUserForm={openUserForm}/>*/}
            {/*-------------------------- End edit modal ---------------------*/}
        </>
    );
}

export default withNamespaces('users, translation')(UsersTableComponent);
