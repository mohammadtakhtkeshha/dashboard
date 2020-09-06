import React, {useState} from "react";
import {Box, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import swal from "sweetalert";
import {withStyles} from "@material-ui/core/styles";
import * as colors from "../../../partials/Colors";
import TableCell from "@material-ui/core/TableCell";
import {withNamespaces} from "react-i18next";
import {globalCss} from "../../../../assets/js/globalCss";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from '@material-ui/core/Modal';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CancelIcon from "@material-ui/icons/Cancel";
import NewTagComponent from "../forms/NewTagComponent";
import i18next from "i18next";
import tagService from '../../../../core/services/tag.service'
import ButtonComponent from "../../../partials/ButtonComponent";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import userService from "../../../../core/services/user.service";
import {tags} from '../../../../assets/js/tags/tags';
import {getCurrentTime} from "material-ui-audio-player/dist/components/state/helpers";
import Pagination from "@material-ui/lab/Pagination";

const styles = makeStyles(tags);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: colors.primary,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
    root: {
        width: 'calc(100%/3)',
        '&:last-child': {
            width: '20%!important',
        }
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
const gClass=makeStyles(globalCss);
function TagsCompnent({t}) {
    const classes = styles();
    const gClasses=gClass();
    const lang = i18next.language;
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(0);
    const [openError,setOpenError]=useState(false);
    const [modalError, setModalError] = useState(0);


    let handleCloseError = ()=>{
        setOpenError(false);
    }

    let getTags=(page)=>{
        tagService.getTags(page).then((response) => {
            let currentTags = response.data.rows;
            setTags([...currentTags]);
            setTotalPage(response.data.pager.total_pages);
        });
    }

    useState(() => {
        getTags(page);
      }, []);

    let allCheckboxHandler = (e) => {
        let ids = tags.map(term => term.tid);
        let contentsLength = tags.length;
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

    let paginate = (e, value) => {
        setPage(value-1);
        getTags(value-1);
    };

    let isCheckedHandler = (e, term) => {
        let currentId = term.tid;
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

    let isFa = (lang) => {
        if (lang === 'fa') {
            return true;
        }
        return false;
    };

    let currrentAlign = () => {
        return isFa(lang) ? globalCss.textRight : globalCss.textLeft;
    };
    // ------ modal ------
    const [openRegister, setOpenRegister] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpen = () => {
        setOpenRegister(true);
    };

    const handleOpenError = ()=>{
        setOpenError(true);
    }

    const handleOpenEditForm = (e) => {
        setOpenEdit(true);
        let id = e.currentTarget.value;
        setTag('');
        tagService.getTag(id).then((response)=>{
            setTag(response.data);
        }).catch((error)=>{
            console.log(error);
            setOpenError(true);
            setModalError(error);
        });
    };

    const handleClose = () => {
        setOpenRegister(false);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    let getTag = (e) => {

        let tag = {
            "name": e.name,
            "uuid": e.uuid,
            "tid": e.tid,

        }
        setTags(prevState => {
            return [tag , ...prevState];
        });
        setOpenRegister(false);
        swal({
            text: t('translation:successRegistered'),
            button: {
                text: t('translation:ok')
                , className: gClasses.confirmSwalButton
            },
            className: gClasses.makeSwalButtonCenter,
            icon: "success"
        });
    };

    let deleteTag = (e) => {
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
                    let currentTag = tags.filter(tag => tag.tid === id);
                    let currentIndex = tags.indexOf(currentTag[0]);
                    tagService.deleteTag(id).then((response) => {
                        tags.splice(currentIndex, 1);
                        setTags([...tags]);
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
                        console.log(error)
                    });
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


    };

    return (
        <>
            <Paper className={classes.mainpaper}>
                <Box className="head">
                    <Typography className="text">{t('tags:tags')}</Typography>
                    <button type="button" onClick={handleOpen}>
                        <Typography>{t('tags:newTag')}</Typography>
                    </button>
                </Box>
                {/********************  register modal ******************* */}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openRegister}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openRegister} id="modal">
                        <div className={classes.paper} dir="rtl">
                            <Box className="header">
                                <button onClick={handleClose}>
                                    <CancelIcon/>
                                </button>
                            </Box>
                            <Box className="body">
                                <NewTagComponent type="addTag" getRegisteredTag={getTag}/>
                            </Box>
                        </div>
                    </Fade>
                </Modal>
                {/*******************  end modal ******************* */}

                {/******************* edit modal ***********************/}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openEdit}
                    onClose={handleCloseEdit}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openEdit} id="modal">
                        <div className={classes.paper} dir="rtl">
                            <Box className="header">
                                <button onClick={handleCloseEdit}>
                                    <CancelIcon/>
                                </button>
                            </Box>
                            <Box className="body">
                                <NewTagComponent type="editTag" getRegisteredTag={getTag} currentTag={tag?tag:''}/>
                            </Box>
                        </div>
                    </Fade>
                </Modal>
                {/********************** edit modal ********************/}

                {/* ************************* error message ******************* */}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openError}
                    onClose={handleCloseError}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openError} id="modal">
                        <div className={classes.paper} dir="rtl">
                            <Box className="header">
                                <button onClick={handleCloseError}>
                                    <CancelIcon/>
                                </button>
                            </Box>
                            <Box className="body">
                            {modalError}
                            </Box>
                        </div>
                    </Fade>
                </Modal>

                {/* ************************* error message ******************* */}



                <TableContainer component={Paper} className={classes.tagsBlock}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={currrentAlign()}>
                                    <Checkbox
                                        checked={selectedCheckBoxes.length === tags.length}
                                        onChange={(e) => allCheckboxHandler(e)}
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                    />
                                    {t('translation:name')}
                                </StyledTableCell>
                                <StyledTableCell style={currrentAlign()}>{t('translation:action')}</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tags.map((tag, index) =>
                                <StyledTableRow key={index}>
                                    <StyledTableCell style={currrentAlign()}>
                                        <Checkbox
                                            onChange={(e) => isCheckedHandler(e, tag)}
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                            checked={selectedCheckBoxes.includes(tag.tid)}
                                        />{tag.name}
                                    </StyledTableCell>
                                    <StyledTableCell style={currrentAlign()}>
                                        {/*<button>delete</button>*/}
                                        <Box className='buttonBlock'>
                                            <ButtonComponent value={tag.tid} text="ویرایش" color="primary"
                                                clicked={(e) => handleOpenEditForm(e)}
                                                             startIcon={<EditIcon/>}
                                            />
                                            <ButtonComponent
                                                clicked={(e) => deleteTag(e)}
                                                value={tag.tid} text="حذف" color="secondary"
                                                startIcon={<DeleteIcon/>}
                                            />
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box className={classes.pagination}>
                    <Pagination count={(totalPage )}
                                onChange={paginate}/>
                </Box>
            </Paper>
        </>);
}

export default withNamespaces('translation')(TagsCompnent);
