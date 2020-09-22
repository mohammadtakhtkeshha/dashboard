import React, {useContext, useState, useEffect} from "react";
import {withNamespaces} from "react-i18next";

import TableContainer from "@material-ui/core/TableContainer";
import {Box, CardMedia, Paper, Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableBody from "@material-ui/core/TableBody";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import {withStyles} from "@material-ui/core/styles";

import contentImg from "assets/media/image/user.jpg";
import {useStyles} from "assets/js/content/contents";
import contentService from "core/services/content.service";
import {warning} from "methods/swal";
import AppContext from "contexts/AppContext";
import ContentsContext from "contexts/ContentsContext";
import {styledTableCell, styledTableRow, StyledActionButtonBlock} from "assets/js/App";

const StyledTableCell = withStyles(styledTableCell)(TableCell);
const StyledTableRow = withStyles(styledTableRow)(TableRow);
const useStyle = makeStyles(useStyles);

function ContentTableComponent({t, selectedCheckBoxes, setSelectedCheckBoxes, page}) {
    const classes = useStyle();
    const appContext = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);
    const [content, setContent] = useState();

    // const editClicked = (e) => {
    //     let id = e.currentTarget.value;
    //     contentService.getContent(id).then((response) => {
    //         setContent(response.data);
    //     }).catch((error) => {
    //         appContext.handleError(error);
    //     });
    // };

    const allCheckboxHandler = (e) => {
        const isChecked = e.currentTarget.checked;
        const currentchunkCheckBox = contentsContext.chunkContents[page];
        const ids = currentchunkCheckBox.map(content => content.nid);
        isChecked ? setSelectedCheckBoxes([...ids]) : setSelectedCheckBoxes([]);
    };

    const isCheckedHandler = (e, content) => {
        let currentId = content.nid;
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

    const confirmDeleteHandler = (e) => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteContent(id)
        });
    };

    const deleteContent = (id) => {
        contentService.deleteContent(id).then((response) => {
            let newContents = contentsContext.contents.filter(content => content.nid !== id);
            contentsContext.handlePagination(newContents, 'deletedSuccessfully');
        });
    };

    return (
        <TableContainer component={Paper} className={classes.contentBlock}>
            <Table className="table" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">
                            <Checkbox
                                checked={selectedCheckBoxes.length === appContext.perPage}
                                onChange={allCheckboxHandler}
                                inputProps={{'aria-label': 'primary checkbox'}}/>
                        </StyledTableCell>
                        <StyledTableCell align="right">{t('translation:image')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:title')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:type')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:status')}</StyledTableCell>
                        <StyledTableCell align="right"> {t('translation:date')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:actions')}</StyledTableCell>
                    </TableRow>
                </TableHead>
                {contentsContext.chunkContents !== undefined ?
                    <TableBody>
                        {contentsContext.chunkContents[page]?.map((content, index) =>
                            <StyledTableRow key={index}>
                                <StyledTableCell align="right">
                                    <Checkbox
                                        onChange={(e) => isCheckedHandler(e, content)}
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                        checked={selectedCheckBoxes.includes(content.nid)}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Box className="imgBlock">
                                        <CardMedia id="img">
                                            {content.field_image ? <img src={content.field_image} alt="content.name"/> :
                                                <img src={contentImg}/>}
                                        </CardMedia>
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <div dangerouslySetInnerHTML={{__html: (content.title)}}></div>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {content.type}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {content.status === "true" ? t('translation:published') : t('translation:unpublished')}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {content.changed}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <StyledActionButtonBlock>
                                        <button value={content.nid} onClick={confirmDeleteHandler}>
                                            <EditIcon/>
                                            <Typography>
                                                {t('translation:edit')}
                                            </Typography>
                                        </button>
                                        <button value={content.nid} onClick={confirmDeleteHandler}>
                                            <DeleteIcon/>
                                            {t('translation:delete')}
                                        </button>
                                    </StyledActionButtonBlock>
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                    : <TableBody></TableBody>}
            </Table>
        </TableContainer>

    );
}

export default withNamespaces('contents')(ContentTableComponent);
