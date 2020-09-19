import React, {useEffect, useState, useContext} from "react";
import {Helmet} from "react-helmet";
import {withNamespaces} from 'react-i18next';

import {Box, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";

import {globalCss} from 'assets/js/globalCss';
import userService from "core/services/user.service";
import Loading from 'components/content/partials/loading';
import AppContext from 'contexts/AppContext';
import Pagination from "@material-ui/lab/Pagination";

import UsersTableComponent from "./usersList/components/UsersTableComponent";
import UsersFilterComponent from "./usersList/components/UsersFilterComponent";
import UsersActionComponent from "./usersList/components/UsersActionComponent";
import UsersRegisterModalComponent from "./usersList/components/UsersRegisterModalComponent";
import UserContext from "contexts/UserContext";
import {StyledPaper, StyledBox} from "assets/js/App";
import {StyledPaginationBox} from "assets/js/pagination";
import {chunkItem, handleTotalPage} from "structure/layout";
import {checkPassWithConfirm, checkMail, checkPass, checkName, getUsersNameAndMail} from './index';
import UsersHeaderComponent from "./usersList/components/UsersHeaderComponent";

const gClass = makeStyles(globalCss);

function UsersComponent({t}) {
    const appContext = useContext(AppContext);
    const gClasses = gClass();
    const [totalPage, setTotalPage] = useState(0);
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [page, setPage] = useState(0);
    const [roles, setRoles] = useState([]);
    const [valueRoles, setValueRoles] = useState();
    const [keyRoles, setKeyRoles] = useState([]);
    const [users, setUsers] = useState([]); //not paginatedUsers
    const [chunkUsers, setChunkUsers] = useState('');//paginatedUsers
    const [openNewUser, setOpenNewUser] = useState(false);
    const [userNameList, setUserNameList] = useState([]);
    const [userMailList, setUserMailList] = useState([]);
    const [errors, setErrors] = useState({
        errorName: {},
        errorPass: {},
        specialChar: {},
        errorMail: {},
        confirmPass: {},
    });

    const getUsers = () => {
        userService.getNotPaginateUser().then((response) => {
            const currentUsers = response.data;
            handlePagination(currentUsers);
            appContext.setLoading(false);
        }).catch((error) => {
            appContext.handleError(error)
        });
    };

    const handlePagination = (items) => {
        setUsers(items);
        const chunks = chunkItem(items);
        setChunkUsers(chunks);
        const totalPage = handleTotalPage(items);
        setTotalPage(totalPage);
        const {nameList, mailList} = getUsersNameAndMail(items);
        setUserNameList([...nameList]);
        setUserMailList([...mailList]);
    }

    const getRoles = () => {
        userService.getRoles().then((response) => {
            const roles = response.data;
            const valueRoles = Object.values(roles);
            const keyRoles = Object.keys(roles);
            setKeyRoles(keyRoles);
            setValueRoles(valueRoles);
            setRoles(roles);
        }).catch((error) => {
            appContext.handleError(error);
        });
    };

    const paginate = (e, value) => {
        setPage(value - 1);
        setSelectedCheckBoxes([]);
    };

    const getRegisteredUser = (user) => {
        user.uid = `${user.uid}`
        users.unshift(user);
        handlePagination(users);
        setOpenNewUser(false);
    }

    const changeChunckUserList = (value, currentTotalPage) => {
        setPage(0);
        setChunkUsers(value);
        setTotalPage(currentTotalPage);
    };

    const handleSelectedCheckBoxes = (array) => {
        setSelectedCheckBoxes(array);
    };

    const nameValidation = (name, exName) => {
        const {unique, length, valid} = checkName(name, exName, userNameList, t);
        setErrors(prevState => {
            return {
                ...prevState,
                errorName: {
                    length: length,
                    unique: unique
                }
            }
        });
        return valid;
    };

    const passValidation = (password, type) => {
        const {message, valid} = checkPass(password, type);
        setErrors(prevState => {
            return {
                ...prevState,
                errorPass: message
            }
        });
        return valid;
    };

    const mailValidation = (mail, exMail) => {
        const {message, valid} = checkMail(mail, exMail, userMailList);
        setErrors(prevState => {
            return {
                ...prevState,
                errorMail: message
            }
        });
        return valid;
    };

    const confirmPassValidation = (pass, confirmPass) => {
        let {message, valid} = checkPassWithConfirm(pass, confirmPass);
        setErrors(prevState => {
            return {
                ...prevState, confirmPass: message
            }
        });
        return valid;
    }

    const allValidation = (user, confirmPass) => {
        let nameValid = nameValidation(user.name, 'null');
        let passValid = passValidation(user.pass, "add");
        let mail = mailValidation(user.mail, "null");
        let confirmPas = confirmPassValidation(user.pass, confirmPass);
        if (nameValid || passValid || mail || confirmPas) {
            appContext.setLoading(false);
            return;
        }
    }

    useEffect(() => {
        appContext.setLoading(true);
        getUsers(page);
        getRoles();
    }, []);

    return (
        <UserContext.Provider value={{
            page: page,
            totalPage: totalPage,
            users: users,
            keyRoles: keyRoles,
            valueRoles: valueRoles,
            selectedCheckBoxes: selectedCheckBoxes,
            errors: errors,
            handleSelectedCheckBoxes: handleSelectedCheckBoxes,
            nameValidation: nameValidation,
            passValidation: passValidation,
            mailValidation: mailValidation,
            confirmPassValidation: confirmPassValidation,
            setErrors: setErrors,
            getRegisteredUser: getRegisteredUser,
            allValidation: allValidation,
        }}>
            <Helmet>
                <title>
                    {t('sidebar:users')}
                </title>
            </Helmet>
            <StyledPaper>
                <Box className={appContext.loading === false ? gClasses.none : gClasses.block}>
                    <Loading/>
                </Box>
                <UsersHeaderComponent setOpenNewUser={setOpenNewUser}/>
                <StyledBox>
                <UsersFilterComponent changeChunckUserList={changeChunckUserList} chunkUsers={chunkUsers}/>


                </StyledBox>
                <UsersTableComponent roles={roles}
                                     valueRoles={valueRoles}
                                     chunkUsers={chunkUsers}
                                     handleSelectedCheckBoxes={handleSelectedCheckBoxes}
                />
                <Box>
                    <UsersRegisterModalComponent
                        openNewUser={openNewUser} handleCloseUserForm={() => setOpenNewUser(false)}
                        getRegisteredUser={getRegisteredUser} userNameList={userNameList}
                        userMailList={userMailList}/>
                </Box>
                <UsersActionComponent/>

                <StyledPaginationBox>
                    <Pagination count={(totalPage)} onChange={paginate}/>
                </StyledPaginationBox>
            </StyledPaper>

        </UserContext.Provider>);
}

export default withNamespaces('users')(UsersComponent);