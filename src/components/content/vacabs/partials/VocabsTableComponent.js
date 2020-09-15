import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {withNamespaces} from "react-i18next";

import TableContainer from "@material-ui/core/TableContainer";
import {Paper, Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

import AppContext from "contexts/AppContext";
import {styledTableCell, styledTableRow } from "assets/js/App";

const StyledTableCell = withStyles(styledTableCell)(TableCell);
const StyledTableRow = withStyles(styledTableRow)(TableRow);

function VocabsTableComponent({t,vocabs}) {
    const appContext=useContext(AppContext);
    return (<TableContainer component={Paper}>
        <Table aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell align={appContext.currentAlign()}>
                        {t('translation:name')}
                    </StyledTableCell>
                    <StyledTableCell align={appContext.currentAlign()}>
                        {t('translation:action')}
                    </StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {vocabs.map((vocab, index) =>
                    <StyledTableRow key={index}>
                        <StyledTableCell align={appContext.currentAlign()}>
                            {vocab.vid}
                        </StyledTableCell>
                        <StyledTableCell align={appContext.currentAlign()}>
                            <Link to={{ pathname: '/vocabs/terms',state: {vocab: vocab}}}>
                                <Typography>{t('vocabs:termList')}</Typography>
                            </Link>
                        </StyledTableCell>
                    </StyledTableRow>
                )}
            </TableBody>
        </Table>
    </TableContainer>);
}

export default withNamespaces('vocabs')(VocabsTableComponent);

