import React, {useEffect, useState, useContext} from "react"
import {withNamespaces} from "react-i18next"
import AppContext from "contexts/AppContext";
import {
    StyledTable, StyledTableBody, StyledTableBodyRow,
    StyledTableCell,
    StyledTableHeadRow,
    StyledTablePaper,
    StyledTableParent
} from "assets/js/App";
import {Typography} from "@material-ui/core";
import {StyledPaginationBox} from "assets/js/pagination";
import Pagination from "@material-ui/lab/Pagination";
import {handlePaginationMethod,getKeywordsMethod} from "./Index.js";
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
        getKeywordsMethod(appContext,handlePagination);
    }, [])

    return (
        <StyledTableParent length={mostSeen.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('sidebar:mostSeen')} _____</Typography>
                <StyledTable>
                    <StyledTableHeadRow lang={lang}>
                        <StyledTableCell align="right">{t('matamo:keyword')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:searches')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:searchResutlPages')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:exitSearch')}</StyledTableCell>
                    </StyledTableHeadRow>
                    <StyledTableBody>
                        {chunks.length > 0  && chunks[page].map((item, index) =>
                            <StyledTableBodyRow key={index}>
                                <StyledTableCell align="right">  {item.label}</StyledTableCell>
                                <StyledTableCell align="right"> {item.nb_visits} </StyledTableCell>
                                <StyledTableCell align="right"> {item.nb_hits} </StyledTableCell>
                                <StyledTableCell align="right"> {item.exit_rate} </StyledTableCell>
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
