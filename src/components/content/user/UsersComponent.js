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
    console.log(colors);
    const classes = useStyles();
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const users = [
        {id: 1, name: 'نگار', role: 'ادمین', status: 'published', photo: "'./../../../assets/media/image/avatar.jpg'"},
        {id: 2, name: 'شادی', role: 'کاربر', status: 'published', photo: "./../../../assets/media/image/avatar.jpg"},
        {id: 3, name: 'payam', role: 'ادمین', status: 'published', photo: './../../../assets/media/image/avatar.jpg'},
        {
            id: 4,
            name: 'behnaz',
            role: 'ادمین',
            status: 'published',
            photo: '"./../../../assets/media/image/avatar.jpg"'
        },
        {id: 5, name: 'akbar', role: 'کاربر', status: 'published', photo: "assets/media/image/avatar.jpg/../../../."},
    ];
    useEffect(() => {
        axios.get('http://sitesaz99.rbp/web/api/user/v2?_format=json').then(
            function (response) {
                console.log(response);
            }
        ).catch(function (error) {
            console.log(error);
        });
    });
    let allCheckboxHandler = (e) => {
        let ids = users.map(user => user.id);
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
        let currentId = user.id;
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
    let paginate = (e) => {
        let currentPage = e.target.innerText;

    };
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
                نقش
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
        {users.map(user =>
            <Box className={classes.userBlock}>
                <Box className="item">
                    <Checkbox
                        onChange={(e) => isCheckedHandler(e, user)}
                        inputProps={{'aria-label': 'primary checkbox'}}
                        checked={selectedCheckBoxes.includes(user.id)}
                    />
                </Box>
                <Box className="item">
                    {user.name}
                </Box>
                <Box className="item">
                    {user.role}
                </Box>
                <Box className="item">
                    {user.status}
                </Box>
                <Box className="item">
                    <CardMedia
                        image={require('./../../../assets/media/image/avatar.jpg')}
                        // image={require('')}
                        // image={require(user.photo)}
                        style={{width: '100px', height: '100px'}}
                    />
                    {/*{user.photo}*/}

                </Box>
                <Box className="item">
                    <ButtonComponent text="ویرایش" color="primary" startIcon={<EditIcon/>}/>
                    <ButtonComponent text="حذف" color="secondary" startIcon={<DeleteIcon/>}/>
                </Box>
            </Box>)}
        <Box className={classes.pagination}>
            <Pagination count={10} variant="outlined" shape="rounded" onClick={(e)=>{paginate(e)}}/>
        </Box>
    </>);
}
