import React, {useContext, useState, useEffect} from "react";
import {withNamespaces} from "react-i18next";

import TableContainer from "@material-ui/core/TableContainer";
import {Box, CardMedia, Paper} from "@material-ui/core";
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
import ButtonComponent from "components/partials/ButtonComponent";
import {styledTableCell, styledTableRow, useStyles} from "assets/js/content/contents";
import contentService from "core/services/content.service";
import {danger, success, warning} from "methods/swal";
import AppContext from "contexts/AppContext";

const StyledTableCell = withStyles(styledTableCell)(TableCell);
const StyledTableRow = withStyles(styledTableRow)(TableRow);
const useStyle = makeStyles(useStyles);

function ContentTableComponent({t, selectedCheckBoxes, contents, setContents, setSelectedCheckBoxes, perPage, setTotalPage, page}) {
    const classes = useStyle();
    const appContext = useContext(AppContext);
    const [chuckContents, setChunckContents] = useState();

    let editClicked = () => {

    };
    useEffect(() => {
        chuckHandler();
        debugger
    }, [contents]);

    let chuckHandler = () => {
        let contentLength=contents.length;
        if (contentLength > 0) {
            let newList = [];
            for (let i = 0; i < contents.length; ) {
                newList.push(contents[i]);
            }
            debugger
        }
    }

    let handleError = (error) => {
        danger(t('translation:error'), t('translation:ok'));
        appContext.toggleLoading(false);
        console.log(error);
    };

    let allCheckboxHandler = (e) => {
        let ids = contents.map(content => content.nid);
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

    let confirmDeleteHandler = (e) => {
        let id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'), function () {
            deleteContent(id)
        });
    };

    let deleteContent = (id) => {
        contentService.deleteContent(id).then((response) => {
            let newContents = contents.filter(content => content.nid !== id);
            setContents([...newContents]);
            let currentTotalPage = Math.ceil(response.data.length / perPage);
            setTotalPage(currentTotalPage);
            success(t('translation:deletedSuccessfully'), t('translation:ok'));
        }).catch((error) => {
            handleError(error);
        });
    };

    return (
        <TableContainer component={Paper} className={classes.contentBlock}>
            <Table className="table" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">
                            <Checkbox
                                checked={selectedCheckBoxes.length === contents.length}
                                onChange={(e) => allCheckboxHandler(e)}
                                inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">{t('translation:image')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:title')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:type')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:status')}</StyledTableCell>
                        <StyledTableCell align="right"> {t('translation:date')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:actions')}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contents.map((content, index) =>
                        <StyledTableRow key={index}>
                            <StyledTableCell align="right">
                                <Checkbox
                                    onChange={(e) => isCheckedHandler(e, content)}
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                    // checked={selectedCheckBoxes.includes(content.nid)}
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
                                {content.status ? t('translation:confirmed') : t('translation:block')}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {content.changed}
                            </StyledTableCell>

                            {/*<StyledTableCell*/}
                            {/*    align="right">*/}
                            {/*    {content.field_domain_access.map(access => access.target_id)}</StyledTableCell>*/}

                            <StyledTableCell align="right">
                                <ButtonComponent value={content.nid} text="ویرایش" color="primary"
                                                 startIcon={<EditIcon/>}
                                                 clicked={editClicked}
                                />
                                <ButtonComponent value={content.nid} text="حذف" color="secondary"
                                                 startIcon={<DeleteIcon/>}
                                                 clicked={confirmDeleteHandler}/>
                            </StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

export default withNamespaces('contents')(ContentTableComponent);
