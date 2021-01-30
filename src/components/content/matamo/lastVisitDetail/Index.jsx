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
} from "assets/js/App";
import {Typography} from "@material-ui/core";
import {StyledPaginationBox} from "assets/js/pagination";
import Pagination from "@material-ui/lab/Pagination";
import {handlePaginationMethod} from "./Index.js";
import i18next from "i18next";
import actionSvg from "assets/svg/action.svg"
import {StyledFlexRow, StyledFlexColumn, StyledDate, StyledIconMatamo} from "assets/js/library/pages/matamo/matamo"
import {StyledImgAction} from "assets/js/library/pages/matamo/lastVisitsDetails"
function Index({t}) {
    const lang = i18next.language
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
                <Typography variant="h4">_____ {t('sidebar:lastVisit')} _____</Typography>
                <StyledTable>
                    <StyledTableHeadRow lang={lang}>
                        <StyledTableCell align="right">{t('translation:date')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:devices')}</StyledTableCell>
                        <StyledTableCell align="right">{t('translation:action')}</StyledTableCell>
                    </StyledTableHeadRow>
                    <StyledTableBody>
                        {chunks.length > 0 && chunks[page].map((item, index) =>
                            <StyledTableBodyRow key={index}>
                                <StyledTableCell align="right">
                                    <StyledFlexColumn>
                                        <StyledFlexColumn>
                                        <StyledDate> {item.serverTimePrettyFirstAction}-{item.serverDatePretty}</StyledDate>
                                        {/*<StyledDate> {item.visitDurationPretty}</StyledDate>*/}
                                        </StyledFlexColumn>
                                        <StyledDate> IP: {item.visitIp}</StyledDate>
                                        <StyledDate>{item.referrerName}<StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.referrerSearchEngineIcon}`} alt=""/>
                                        </StyledDate>
                                    </StyledFlexColumn>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.deviceTypeIcon}`} alt=""/>
                                    <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.browserIcon}`} alt=""/>
                                    <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.operatingSystemIcon}`} alt=""/>
                                    <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.visitorTypeIcon}`} alt=""/>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <span> تعداد کل اکشن ها:{item.actions}</span>
                                        {item.actionDetails.map((action, index) => (
                                            <div key={index}><span> <StyledImgAction src={actionSvg} alt=""/></span><span>{action.pageTitle}</span><div>{action.url}</div></div>
                                        ))}
                                </StyledTableCell>
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
