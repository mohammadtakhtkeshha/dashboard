import React, {useEffect, useState, useContext} from "react"
import {withNamespaces} from "react-i18next"
import AppContext from "contexts/AppContext";
import {
    StyledTable,
    StyledTableBody,
    StyledTableBodyRow,
    StyledTableHeadRow,
    StyledTablePaper,
    StyledTableParent
} from "assets/js/App";
import {StyledTableCell} from "assets/js/library/components/table"
import {Typography} from "@material-ui/core";
import {StyledPaginationBox} from "assets/js/pagination";
import Pagination from "@material-ui/lab/Pagination";
import {handlePaginationMethod,getKeywordsMethod} from "./Index.js";
import i18next from "i18next";
import {StyledMatamoTableHeadRow,StyledMatamoTable,StyledMatamoTableRow} from "assets/js/library/pages/matamo/matamoTable";

function Index({t}) {
    const lang=i18next.language
    let leftRightAlign = lang === "en" ? "left" : "right"
    const appContext = useContext(AppContext)
    const [chunks, setChunks] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(0)
    const [mostSeen, setMostSeen] = useState([])

    const handlePagination = (items) => {
        handlePaginationMethod(items, setChunks, setTotalPage,setMostSeen)
    }

    const paginate = (e, value) => {
        setPage(value - 1);
    }

    useEffect(() => {
        getKeywordsMethod(appContext,handlePagination);
    }, [])

    return (
        <StyledTableParent length={mostSeen.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('sidebar:mostSeen')} _____</Typography>
                <StyledMatamoTable>
                    <StyledMatamoTableHeadRow lang={lang}>
                        <StyledTableCell align={leftRightAlign} width="70">{t('matamo:keyword')}</StyledTableCell>
                        <StyledTableCell align="center" width="10">{t('matamo:searches')}</StyledTableCell>
                        <StyledTableCell align="center" width="10">{t('matamo:searchResutlPages')}</StyledTableCell>
                        <StyledTableCell align="center" width="10">{t('matamo:exitSearch')}</StyledTableCell>
                    </StyledMatamoTableHeadRow>
                    {/*<StyledTableBody>*/}
                        {chunks.length > 0  && chunks[page].map((item, index) =>
                            <StyledMatamoTableRow key={index}>
                                <StyledTableCell align={leftRightAlign} width="70">{item.label}</StyledTableCell>
                                <StyledTableCell align="center" width="10">{item.nb_visits}</StyledTableCell>
                                <StyledTableCell align="center" width="10">{item.nb_hits}</StyledTableCell>
                                <StyledTableCell align="center" width="10">{item.exit_rate}</StyledTableCell>
                            </StyledMatamoTableRow>
                        )}
                    {/*</StyledTableBody>*/}
                </StyledMatamoTable>
            </StyledTablePaper>
            <StyledPaginationBox>
                <Pagination count={(totalPage)} onChange={paginate}/>
            </StyledPaginationBox>
        </StyledTableParent>

    )
}

export default withNamespaces('translation,matamo')(Index)
