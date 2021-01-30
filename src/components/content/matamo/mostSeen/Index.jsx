import React, {useEffect, useState, useContext} from "react"
import {withNamespaces} from "react-i18next"
import {getMostSeenContentMethod} from "./Index.js"
import AppContext from "contexts/AppContext";
import {
    StyledTable, StyledTableBody, StyledTableBodyRow,
    StyledTableCell,
    StyledTableHeadRow,
    StyledTablePaper,
    StyledTableParent
} from "../../../../assets/js/App";
import {Typography} from "@material-ui/core";
import {StyledPaginationBox} from "../../../../assets/js/pagination";
import Pagination from "@material-ui/lab/Pagination";
import {handlePaginationMethod} from "./Index.js";
import i18next from "i18next";

function Index({t}) {
    const lang=i18next.language
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
        getMostSeenContentMethod(appContext,handlePagination);
    }, [])

    return (
        <StyledTableParent length={mostSeen.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('sidebar:mostSeen')} _____</Typography>
                <StyledTable>
                    <StyledTableHeadRow lang={lang}>
                        <StyledTableCell align="right">{t('matamo:pageAddress')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:visitNum')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:uniqueDisplay')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:overflow')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:passedTime')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:exitRate')}</StyledTableCell>
                        <StyledTableCell align="right">avg,page load time</StyledTableCell>
                    </StyledTableHeadRow>
                    <StyledTableBody>
                        {chunks.length > 0  && chunks[page].map((item, index) =>
                            <StyledTableBodyRow key={index}>
                                <StyledTableCell align="right">  {item.url}</StyledTableCell>
                                <StyledTableCell align="right"> {item.nb_hits} </StyledTableCell>
                                <StyledTableCell align="right"> {item.nb_visits} </StyledTableCell>
                                <StyledTableCell align="right"> {item.bounce_rate} </StyledTableCell>
                                <StyledTableCell align="right"> {item.sum_time_spent} </StyledTableCell>
                                <StyledTableCell align="right"> {item.exit_rate} </StyledTableCell>
                                <StyledTableCell align="right"> {item.avg_page_load_time} </StyledTableCell>
                            </StyledTableBodyRow>
                        )}
                    </StyledTableBody>
                </StyledTable>
            </StyledTablePaper>
            <StyledPaginationBox>
                <Pagination count={(totalPage)} onChange={paginate}/>
            </StyledPaginationBox>
        </StyledTableParent>

   )
}

export default withNamespaces('translation,matamo')(Index)
