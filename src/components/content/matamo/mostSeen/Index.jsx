import React, {useEffect, useState, useContext} from "react"
import {withNamespaces} from "react-i18next"

import i18next from "i18next";

import Pagination from "@material-ui/lab/Pagination";
import {Typography} from "@material-ui/core";

import {
    StyledTablePaper,
    StyledTableParent
} from "assets/js/App";
import {StyledTableCell} from "assets/js/library/components/table"
import {
    StyledMatamoTable,
    StyledMatamoTableRow,
    StyledMatamoTableHeadRow
} from "assets/js/library/pages/matamo/matamoTable"
import {StyledPaginationBox} from "assets/js/pagination";
import {handlePaginationMethod} from "./Index.js";
import {getMostSeenContentMethod} from "./Index.js"
import AppContext from "contexts/AppContext";

function Index({t}) {
    const lang = i18next.language
    let leftRightAlign = lang === "en" ? "left" : "right"
    const appContext = useContext(AppContext)
    const [chunks, setChunks] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(0)
    const [mostSeen, setMostSeen] = useState([])

    const handlePagination = (items) => {
        handlePaginationMethod(items, setChunks, setTotalPage, setMostSeen)
    }

    const paginate = (e, value) => {
        setPage(value - 1);
    }

    useEffect(() => {
        getMostSeenContentMethod(appContext, handlePagination);
    }, [])

    return (
        <StyledTableParent length={mostSeen.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('sidebar:mostSeen')} _____</Typography>
                <StyledMatamoTable>
                    <StyledMatamoTableHeadRow lang={lang}>
                        <StyledTableCell align={leftRightAlign} width="40">{t('matamo:pageAddress')}</StyledTableCell>
                        <StyledTableCell align="center" width="10">{t('matamo:visitNum')}</StyledTableCell>
                        <StyledTableCell align="center" width="10">{t('matamo:uniqueDisplay')}</StyledTableCell>
                        <StyledTableCell align="center" width="10">{t('matamo:overflow')}</StyledTableCell>
                        <StyledTableCell align="center" width="10">{t('matamo:passedTime')}</StyledTableCell>
                        <StyledTableCell align="center" width="10">{t('matamo:exitRate')}</StyledTableCell>
                        <StyledTableCell align="center" width="10">avg,page load time</StyledTableCell>
                    </StyledMatamoTableHeadRow>
                    {chunks.length > 0 && chunks[page].map((item, index) =>
                        <StyledMatamoTableRow key={index}>
                            <StyledTableCell align={leftRightAlign} width="40">  {item.url}</StyledTableCell>
                            <StyledTableCell align="center" width="10"> {item.nb_hits} </StyledTableCell>
                            <StyledTableCell align="center" width="10"> {item.nb_visits} </StyledTableCell>
                            <StyledTableCell align="center" width="10"> {item.bounce_rate} </StyledTableCell>
                            <StyledTableCell align="center" width="10"> {item.sum_time_spent} </StyledTableCell>
                            <StyledTableCell align="center" width="10"> {item.exit_rate} </StyledTableCell>
                            <StyledTableCell align="center" width="10"> {item.avg_page_load_time} </StyledTableCell>
                        </StyledMatamoTableRow>
                    )}
                </StyledMatamoTable>
            </StyledTablePaper>
            <StyledPaginationBox>
                <Pagination count={(totalPage)} onChange={paginate}/>
            </StyledPaginationBox>
        </StyledTableParent>

    )
}

export default withNamespaces('translation,matamo')(Index)
