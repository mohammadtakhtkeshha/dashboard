import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";

import TableContainer from "@material-ui/core/TableContainer";
import {Paper, Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

import {StyledActionButtonBlock, styledTableRow} from "assets/js/App";
import AppContext from "contexts/AppContext";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {styledTableCell} from "assets/js/vocabs/terms";

const StyledTableCell = withStyles(styledTableCell)(TableCell);
const StyledTableRow = withStyles(styledTableRow)(TableRow);

function TermTableComponent({t, chunks, page}) {
    const appContext = useContext(AppContext);

    const handleOpenEditModal = (e) => {
        // setOpenTermForm(true);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align={appContext.currentAlign()} color='red'>
                            {t('translation:name')}
                        </StyledTableCell>
                        <StyledTableCell align={appContext.currentAlign()}>
                            {t('translation:action')}
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {chunks[page]?.map((term, index) =>
                        <StyledTableRow key={index}>
                            <StyledTableCell align={appContext.currentAlign()}>
                                {term.name}
                            </StyledTableCell>
                            <StyledTableCell align={appContext.currentAlign()}>
                                <StyledActionButtonBlock>
                                    <button onClick={handleOpenEditModal}>
                                        <EditIcon/>
                                        <Typography>
                                            {t('translation:edit')}
                                        </Typography>
                                    </button>
                                    <button onClick={handleOpenEditModal}>
                                        <DeleteIcon/>
                                        {t('translation:delete')}
                                    </button>
                                </StyledActionButtonBlock>
                            </StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default withNamespaces('vocabs')(TermTableComponent);