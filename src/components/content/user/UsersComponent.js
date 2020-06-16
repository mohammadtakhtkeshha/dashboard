import React, {useEffect, useState} from "react";
import {Box, CardMedia} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles/index";
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios/index";
import ButtonComponent from '../../partials/ButtonComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';
import * as colors from './../../../components/partials/Colors'


const useStyles = makeStyles((theme) => ({
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
            '&:first-child': {
                flexShrink: 2
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
    }
}));

export default function BaseFormComponent() {
    const classes = useStyles();
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState( 1);
    const [users, setUsers] = useState([]);
    let getUsers = (page) => {
        axios.get(`http://sitesaz99.rbp/web/api/user/v2?page=${page}`).then(
            function (response) {
                let currentList = [];
                debugger;
                response.data.rows.map((item) => {
                    currentList.push({
                        uid: item.uid,
                        name: item.name,
                        field_name: item.field_name,
                        field_last_name: item.field_last_name,
                        // role: item.roles_target_id,
                        status: item.status,
                        user_picture: item.user_picture,
                        mail: item.mail,
                    });
                });
                setUsers(currentList);
                setTotalPage(response.data.pager.total_pages);
            }
        ).catch(function (error) {
            debugger
        });
    };
    useEffect(() => {
        getUsers(page);
    }, []);

    console.log(totalPage);
    let allCheckboxHandler = (e) => {
        let ids = users.map(user => user.uid);
        let usersLength = users.length;
        if (selectedCheckBoxes.length == usersLength) {
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
    let paginate = (e,value) => {
        setPage(value);
        getUsers(value);
    };
    console.log(users);
    return (<>
        <Box className={classes.userBlock}>
            <Box className="item">
                <Checkbox
                    checked={selectedCheckBoxes.length === users.length}
                    onChange={(e) => allCheckboxHandler(e)}
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
            </Box>
            <Box className="item">
                نام
            </Box>
            <Box className="item">
                نام خانوادگی
            </Box>
            <Box className="item">
                نام کاربری
            </Box>
            <Box className="item">
                نقش
            </Box>
            <Box className="item">
                ایمیل
            </Box>
            <Box className="item">
                وضعیت
            </Box>
            <Box className="item">
                عکس
            </Box>
            <Box className="item">
                عملیات
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
                <Box className="item">
                    {user.field_name}
                </Box>
                <Box className="item">
                    {user.field_last_name}
                </Box>
                <Box className="item">
                    {user.name}
                </Box>
                {/*<Box className="item">*/}
                {/*    {user.role.length===0?*/}
                {/*        <span>'بدون نقش'</span>:*/}
                {/*        (user.role.map((item)=>{*/}
                {/*            <span>item</span>*/}
                {/*        }))*/}
                {/*    }*/}
                {/*</Box>*/}
                <Box className="item">
                    {user.mail}
                </Box>
                <Box className="item">
                    {user.status ? 'تایید شده' : 'در انتظار تایید'}
                </Box>
                <Box className="item">
                    <CardMedia
                        image={require('./../../../assets/media/image/avatar.jpg')}
                        // image={require('')}
                        // image={require(user.photo)}
                        style={{width: '100px', height: '100px'}}
                    />

                </Box>
                <Box className="item">
                    <ButtonComponent text="ویرایش" color="primary" startIcon={<EditIcon/>}/>
                    <ButtonComponent text="حذف" color="secondary" startIcon={<DeleteIcon/>}/>
                </Box>
            </Box>)}
        <Box className={classes.pagination}>
            <Pagination count={(totalPage-1)}
                        onChange={paginate}/>
        </Box>
    </>);
}
