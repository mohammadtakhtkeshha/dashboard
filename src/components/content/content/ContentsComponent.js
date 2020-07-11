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
// import contentImg from "../../../assets/media/image/content.jpg";
import Input from "./../../partials/inputComponent";

import NewContent from './forms/NewContentComponent';

//icons
import CancelIcon from '@material-ui/icons/Cancel';

//for browser title
import {Helmet} from "react-helmet";

//locales
import {withNamespaces} from 'react-i18next';


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
import styles from './../../../assets/js/content/contents'


function BaseFormComponent({t}) {
    const [role, setRole] = React.useState('EUR');

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

    const statuses = [{
        value: 'published',
        label: t('translation:unpublished'),
    }, {
        value: 'unpublished',
        label: t('translation:published'),
    }];

    const contentTypes = [{
        value: 'published',
        label: t('translation:unpublished'),
    }, {
        value: 'unpublished',
        label: t('translation:published'),
    }];

    const actions = [
        {value: 'delete', label: t('translation:delete')},
        {value: 'block', label: t('translation:published')},
        {value: 'noBlock', label: t('translation:unpublished')}
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

    const [contents, setContents] = useState([]);

    const appContext = useContext(AppContext);

    // ------------------  modal --------------------------
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // ------------------ get roles ---------------------------
    let getContents = (page) => {
        const config = {
            headers: {
                Authorization: appContext.token
            }
        };
        axios.get(`http://sitesaz99.rbp/web/api/content/v2?page=${page}`, config).then(
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
                        content_picture: item.content_picture,
                        mail: item.mail,
                    });
                });
                setContents(currentList);
                setTotalPage(response.data.pager.total_pages);
            }
        ).catch(function (error) {
            console.log(error);
        });
    };

    let deleteContent = (e) => {
        let id = e.currentTarget.value;
        let url = `http://sitesaz99.rbp/web/content/${id}?_format=json`;
        let config = {
            headers: {
                Authorization: appContext.token,
            }
        };
        axios.delete(url, config).then((response) => {
            let newContents = contents.filter(content => content.uid !== id);
            setContents([...newContents]);
        }).catch((error) => {
            console.log(`delete Content error : ${error}`);
        });
    };

    useEffect(() => {
        getContents(page);
    }, []);

    let allCheckboxHandler = (e) => {
        let ids = contents.map(content => content.uid);
        let contentsLength = contents.length;
        if (selectedCheckBoxes.length === contentsLength) {
            setSelectedCheckBoxes(
                []
            );
        } else {
            setSelectedCheckBoxes(
                [...ids]
            );
        }

    };

    let isCheckedHandler = (e, content) => {
        let currentId = content.uid;
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
        getContents(value);
    };

    return (<>
        <Helmet>
            <title>
                {t('sidebar:contents')}
            </title>
        </Helmet>
        <Paper className={classes.mypaper}>
            <Box className="head">
                <Typography className="text">{t('contents:contentList')}</Typography>
                <button type="button" onClick={handleOpen}>
                    <Typography>{t('contents:newContent')}</Typography>
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
                            <Input placeholder={t('contents:name')}/>
                            <Input placeholder={t('contents:contentType')}/>

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
                                {statuses ? statuses.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                )) : ''}
                            </TextField>
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
                                {contentTypes ? contentTypes.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                )) : ''}
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
                    <Fade in={open} id="modal">
                        <div className={classes.paper} dir="rtl">
                            <Box className="header">
                                <button onClick={handleClose}>
                                    <CancelIcon/>
                                </button>
                            </Box>
                            <Box className="body">
                                <NewContent/>
                            </Box>
                        </div>
                    </Fade>
                </Modal>
                {/*-------------------------modal---------------------------*/}
            </Box>
            <Box className={classes.contentBlock}>
                <Box className="item">
                    <Checkbox
                        checked={selectedCheckBoxes.length === contents.length}
                        onChange={(e) => allCheckboxHandler(e)}
                        inputProps={{'aria-label': 'primary checkbox'}}
                    />
                </Box>
                <Box className="item">
                    {t('contents:name')}
                </Box>
                <Box className="item">
                    {t('contents:contentType')}
                </Box>
                <Box className="item">
                    {t('contents:author')}
                </Box>
                <Box className="item">
                    {t('translation:date')}
                </Box>
                <Box className="item">
                    {t('contents:status')}
                </Box>
                <Box className="item">
                    {t('translation:actions')}
                </Box>
            </Box>
            {contents.map((content, index) =>
                <Box key={index} className={classes.contentBlock}>
                    <Box className="item">
                        <Checkbox
                            onChange={(e) => isCheckedHandler(e, content)}
                            inputProps={{'aria-label': 'primary checkbox'}}
                            checked={selectedCheckBoxes.includes(content.uid)}
                        />
                    </Box>
                    <Box className="item firstName">
                        <Box className="imgBlock">
                            <CardMedia id="img">
                                {content.content_picture ? <img src={content.content_picture} alt={content.name}/> :
                                    <img alt={content.name}/>}
                            </CardMedia>
                        </Box>
                        <Box className="name">
                            {content.field_name}
                        </Box>
                    </Box>
                    <Box className="item">
                        {content.field_last_name}
                    </Box>
                    <Box className="item">
                        {content.name}
                    </Box>
                    <Box className="item">
                        {content.role}
                    </Box>
                    <Box className="item">
                        {content.mail}
                    </Box>
                    <Box className="item">
                        {content.status ? 'تایید شده' : 'در انتظار تایید'}
                    </Box>

                    <Box className="item">
                        <Link to={`edit-content/${content.uid}`}>
                            <ButtonComponent value={content.uid} text="ویرایش" color="primary" startIcon={<EditIcon/>}/>
                        </Link>
                        <ButtonComponent value={content.uid} text="حذف" color="secondary" startIcon={<DeleteIcon/>}
                                         clicked={deleteContent}/>
                    </Box>
                </Box>)}
            <Box className={classes.pagination}>
                <Pagination count={(totalPage - 1)}
                            onChange={paginate}/>
            </Box>
        </Paper>
    </>);
}

export default withNamespaces('contents')(BaseFormComponent);
