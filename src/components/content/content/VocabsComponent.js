import React, {useState} from "react";
import {Box, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import * as global from "../../../assets/js/CssGlobal";
import storage from "../../../libraries/local-storage";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import * as colors from "../../partials/Colors";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import {withNamespaces} from "react-i18next";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CancelIcon from "@material-ui/icons/Cancel";
import NewVocabsComponent from "./forms/NewVocabsComponent";

const styles=makeStyles((theme)=>({
    mainpaper:{
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        '& .head': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: "center",
            marginBottom:theme.spacing(2),
            '& button': {
                backgroundColor: colors.primary,
                border: 0,
                cursor: 'pointer',
                padding: '10px 15px',
                lineHeight: '14px',
                color: colors.white,
                borderRadius: '5px',
                '&:focus':{
                    outline: '0!important',
                }
            },
            '& .text': {
                fontSize: '14px',
                fontWeight: 600,
            }
        },
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& #modal':{
            border: '0!important',
            '&:focus':{
                outline: '0!important',
            },
            position:'relative',
            '& .header':{
                position:'absolute',
                top:'0',
                left:0,
                right:0,
                height:'40px',
                backgroundColor:colors.primary,
                '& button':{
                    background:'transparent',
                    cursor:'pointer',
                    border:0,
                    '&:focus':{
                        outline:'0!important',
                    },
                    '& svg':{
                        color:colors.white,
                        margin:'9px 9px',
                    }
                }
            },
            '& .body':{
                marginTop:'16px',
            }
        }
    },
}));
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
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
function VocabsComponent({t}) {
    const classes=styles();
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    let allCheckboxHandler = (e) => {
        let ids = vocabs.map(vocab => vocab.id);
        let contentsLength = vocabs.length;
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
    let isCheckedHandler = (e, vocab) => {
        let currentId = vocab.id;
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
    const gClasses = global.styles();
    const lang = storage.get('lang');
    const [vocabs,setVocabs]=useState([
        {id: 0, name: 'first', description: 'description 1'},
        {id: 1, name: 'second', description: 'description 2'},
        {id: 2, name: 'third', description: 'description 3'},
        {id: 3, name: 'fourth', description: 'description 4'},
        {id: 4, name: 'fifth', description: 'description 5'},
        {id: 5, name: 'sixth', description: 'description 6'},
    ]);
    let isFa = (lang) => {
        if (lang === 'fa') {
            return true;
        }
        return false;
    }
    let currrentAlign = () => {
        return isFa(lang) ? gClasses.textRight : gClasses.textLeft;
    };
    // ------ modal ------
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return(
        <>
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
                            <NewVocabsComponent/>
                        </Box>
                    </div>
                </Fade>
            </Modal>
            {/*------------ end modal -------------*/}
            <Paper className={classes.mainpaper}>
                <Box className="head">
                    <Typography className="text">{t('vocabs:vocabs')}</Typography>
                    <button type="button" onClick={handleOpen}>
                        <Typography>{t('vocabs:newVocab')}</Typography>
                    </button>
                </Box>
                <TableContainer component={Paper} className={classes.commentBlock}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell className={currrentAlign()}>
                                    <Checkbox
                                        checked={selectedCheckBoxes.length === vocabs.length}
                                        onChange={(e) => allCheckboxHandler(e)}
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                    />
                                    {t('translation:name')}</StyledTableCell>
                                <StyledTableCell className={currrentAlign()}>{t('translation:description')}</StyledTableCell>
                                <StyledTableCell className={currrentAlign()}>{t('translation:action')}</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vocabs.map((vocab, index) =>
                                <StyledTableRow key={index}>
                                    <StyledTableCell className={currrentAlign()}>
                                        <Checkbox
                                            onChange={(e) => isCheckedHandler(e, vocab)}
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                            checked={selectedCheckBoxes.includes(vocab.id)}
                                        />
                                        {vocab.name}</StyledTableCell>
                                    <StyledTableCell className={currrentAlign()}> {vocab.description}</StyledTableCell>
                                    <StyledTableCell className={currrentAlign()}>  <button>delete</button></StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>);
}
export default withNamespaces('translation') (VocabsComponent);