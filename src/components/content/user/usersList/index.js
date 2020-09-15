import React, {useEffect, useState, useContext} from "react";
import clsx from "clsx";
import {Helmet} from "react-helmet";
import {withNamespaces} from 'react-i18next';

import {Box, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";

import {globalCss} from 'assets/js/globalCss';
import userService from "core/services/user.service";
import Loading from 'components/content/partials/loading';
import AppContext from 'contexts/AppContext';
import {danger} from 'methods/swal';

import UsersTableComponent from "./components/UsersTableComponent";
import UsersFilterComponent from "./components/UsersFilterComponent";
import UsersActionComponent from "./components/UsersActionComponent";
import UsersRegisterModalComponent from "./components/UsersRegisterModalComponent";
import {useStyles} from 'assets/js/user/users';
import UserContext from "contexts/UserContext";
import {StyledPaper,StyledHead,StyledHeadTypography,StyledButton,StyledBox} from "assets/js/App";
import Pagination from "@material-ui/lab/Pagination";
import {StyledPaginationBox} from "../../../../assets/js/pagination";

const gClass = makeStyles(globalCss);
const currentStyles = makeStyles(useStyles);

function UsersComponent({t}) {
    let perPage = 5;
    const appContext = useContext(AppContext);
    const gClasses = gClass();
    const classes = currentStyles();
    const [totalPage, setTotalPage] = useState(0);
    const [action, setAction] = useState('delete');
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [page, setPage] = useState(0);
    const [roles, setRoles] = useState([]);
    const [valueRoles, setValueRoles] = useState();
    const [keyRoles, setKeyRoles] = useState([]);
    const [users, setUsers] = useState([]); //not paginatedUsers
    const [chunckUserList, setChunckUserList] = useState('');//paginatedUsers
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

    let getUsers = () => {
        userService.getNotPaginateUser().then((response) => {
            let nameList = [];
            let mailList = [];
            response.data.map(user => {
                nameList.push(user.name);
                mailList.push(user.mail);
            });
            setUserNameList([...nameList]);
            setUserMailList([...mailList]);
            appContext.toggleLoading(false);
            setUsers(response.data);
            let usersPaginatedList = chunckUser(response.data, perPage);
            let totalNumberr = response.data.length;
            setTotalPage(Math.ceil(totalNumberr / perPage));
            setChunckUserList(usersPaginatedList);
        }).catch((error) => {
            appContext.handleError(error)
        });
    };

    let chunckUserHandler = (currentArray, chunkSize) => {
        let index = 0;
        let arrayLength = currentArray.length;
        let tempArray = [];
        for (index = 0; index < arrayLength; index += chunkSize) {
            let myChunk = currentArray.slice(index, index + chunkSize);
            tempArray.push(myChunk);
        }
        return tempArray;
    }

    useEffect(() => {
        appContext.toggleLoading(true);
        getUsers(page);
    }, []);

    let getRoles = () => {
        userService.getRoles().then((response) => {
            let valueRoles = Object.values(response.data);
            let keyRoles = Object.keys(response.data);
            setKeyRoles(keyRoles);
            setValueRoles(valueRoles);
            setRoles(response.data);
        }).catch((error) => {
            appContext.handleError(error);
        });
    };

    useEffect(() => {
        getRoles();
    }, []);

    let handleActionChange = (event) => {
        setAction(event.target.value);
    };

    let openNewUserForm = () => {
        setOpenNewUser(true);
    };

    let handleCloseUserForm = () => {
        setOpenNewUser(false);
    };

    let chunckUser = (currentArray, chunkSize) => {
        let index = 0;
        let arrayLength = currentArray.length;
        let tempArray = [];
        for (index = 0; index < arrayLength; index += chunkSize) {
            let myChunk = currentArray.slice(index, index + chunkSize);
            tempArray.push(myChunk);
        }

        return tempArray;
    }

    let paginate = (e, value) => {
        setPage(value - 1);
        setSelectedCheckBoxes([]);
    };

    let getRegisteredUser = (user) => {
        user.uid = `${user.uid}`
        let currentTotalNumber = users.unshift(user);
        setUsers(users);
        setUserNameList(prevState => {
            return [...prevState, user.name];
        });
        setUserMailList(prevState => {
            return [...prevState, user.mail];
        });
        setTotalPage(Math.ceil(currentTotalNumber / perPage));
        let chunckedUsers = chunckUser(users, perPage);
        setChunckUserList(chunckedUsers);
        handleCloseUserForm();
    }

    let changeChunckUserList = (value, currentTotalPage) => {
        setPage(0);
        setChunckUserList(value);
        setTotalPage(currentTotalPage);
    };

    let passChunckUserList = (list) => {
        setChunckUserList(list)
    };

    let passTotalPage = (num) => {
        setTotalPage(num);
    };

    let handleSelectedCheckBoxes = (array) => {
        setSelectedCheckBoxes(array);
    };

    let nameValidation = (name, exName) => {
        let valid;
        let length;
        let unique;
        let currentNameList = [];
        if (exName !== "null") {
            for (let item of userNameList) {
                currentNameList.push(item);
            }
            let currentIndex = currentNameList.indexOf(exName);
            currentNameList.splice(currentIndex, 1);
        } else {
            currentNameList = userNameList;
        }

        if (name.length < 3) {
            length = t('translation:3LeastNumber')
            valid = true;
        } else if (currentNameList.includes(name)) {
            unique = t('translation:uniqueValidation');
            valid = true;
        }
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

    let passValidation = (password,type) => {
        let lengthValid;
        let regexValid;
        let valid;
        let message = {};
        if(type==="edit"){
            if(password.length === 0 ){
                return;
            }
        }
        if (password.length < 8) {
            lengthValid = 'حداقل تعداد کاراکترهای انتخابی 8 میباشد!';
            message.length = lengthValid;
            lengthValid = true;
        }
        let regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;؟|,\.?~_+-=\|])/;
        if (!regex.test(password)) {
            let specialChar = 'پسورد مورد نظر باید شامل اعداد حروف بزرگ و کوچک و علامت ها خاص باشد!';
            message.specialChar = specialChar;
            regexValid = true;
        }
        setErrors(prevState => {
            return {
                ...prevState,
                errorPass: message
            }
        });


        if (lengthValid || regexValid) {
            valid = true;
        }
        return valid;
    };

    let mailValidation = (mail,exMail) => {
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let message = {};
        let valid;
        if (!regex.test(mail)) {
            let mail = 'ایمیل وارد شده معتبر نمیباشد!';
            message.mail = mail;
            valid = true;
        }
        let currentMailList = [];
        if (exMail !== "null") {
            for (let item of userMailList) {
                currentMailList.push(item);
            }
            let currentIndex = currentMailList.indexOf(exMail);
            currentMailList.splice(currentIndex, 1);
        } else {
            currentMailList = userMailList;
        }

        if (currentMailList.includes(mail)) {
            let mail = 'ایمیل وارد شده تکراری میباشد!';
            message.unique = mail;
            valid = true;

        }
        setErrors(prevState => {
            return {
                ...prevState,
                errorMail: message
            }
        });
        return valid;
    };

    let confirmPassValidation = (pass, confirmPass) => {
        let valid;
        let message = {};
        let confirmPassword = confirmPass;
        if (confirmPassword !== pass) {
            message.harmony = 'پسوردهای وارد شده باهم همخوانی ندارند!'
            valid = true;
        }
        setErrors(prevState => {
            return {
                ...prevState, confirmPass: message
            }
        });
        return valid;
    }

    return (
        <UserContext.Provider value={{
            perPage: perPage,
            page: page,
            totalPage: totalPage,
            passTotalPage: passTotalPage,
            users: users,
            keyRoles: keyRoles,
            valueRoles: valueRoles,
            passChunckUserList: passChunckUserList,
            selectedCheckBoxes: selectedCheckBoxes,
            chunckUserHandler: chunckUserHandler,
            errors: errors,
            handleSelectedCheckBoxes: handleSelectedCheckBoxes,
            nameValidation: nameValidation,
            passValidation: passValidation,
            mailValidation: mailValidation,
            confirmPassValidation: confirmPassValidation,
            setErrors: setErrors,

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
                <StyledHead>
                    <StyledHeadTypography>{t('users:usersList')}</StyledHeadTypography>
                    <StyledButton onClick={openNewUserForm}>
                        <Typography>{t('users:newUser')}</Typography>
                    </StyledButton>
                </StyledHead>
                <StyledBox>
                <UsersFilterComponent chunckUser={chunckUser}
                                      changeChunckUserList={changeChunckUserList}
                                      chuckUserList={chunckUserList}
                />
                </StyledBox>
                <StyledBox>
                    <UsersActionComponent action={action}
                                          handleActionChange={handleActionChange}

                    />
                </StyledBox>
                <UsersTableComponent roles={roles}
                                     valueRoles={valueRoles}
                                     chunckUserList={chunckUserList}
                                     handleSelectedCheckBoxes={handleSelectedCheckBoxes}
                />
                <Box>
                    <UsersRegisterModalComponent openNewUser={openNewUser} handleCloseUserForm={handleCloseUserForm}
                                                 getRegisteredUser={getRegisteredUser} userNameList={userNameList}
                                                 userMailList={userMailList}/>
                </Box>

                <StyledPaginationBox>
                    <Pagination count={(totalPage)} onChange={paginate}/>
                </StyledPaginationBox>
            </StyledPaper>

        </UserContext.Provider>);
}

export default withNamespaces('users', 'translation')(UsersComponent);
