import React, {useEffect, useState, useContext, useCallback} from "react"
import {withNamespaces} from "react-i18next"
import {getMostSeenContentMethod} from "./Index.js"
import AppContext from "contexts/AppContext";
import {
    StyledTableCell,
    StyledTablePaper,
    StyledTableParent
} from "assets/js/App";
import {Typography} from "@material-ui/core";
import {StyledPaginationBox} from "assets/js/pagination";
import Pagination from "@material-ui/lab/Pagination";
import {handlePaginationMethod} from "./Index.js";
import i18next from "i18next";
import actionSvg from "assets/svg/action.svg"
import {StyledFlexColumn, StyledDate, StyledIconMatamo} from "assets/js/library/pages/matamo/matamo"
import {StyledImgAction} from "assets/js/library/pages/matamo/lastVisitsDetails"
import {StyledMatamoTableHeadRow,StyledMatamoTable,StyledMatamoTableRow} from "assets/js/library/pages/matamo/matamoTable";

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

    const getMostSeenContent = useCallback(getMostSeenContentMethod(appContext, handlePagination),[appContext])

    useEffect(() => {
        getMostSeenContent()
    }, [getMostSeenContent])

    return (
        <StyledTableParent length={mostSeen.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('sidebar:lastVisit')} _____</Typography>
                <StyledMatamoTable>
                    <StyledMatamoTableHeadRow lang={lang}>
                        <StyledTableCell width="20" align={leftRightAlign}>{t('translation:date')}</StyledTableCell>
                        <StyledTableCell width="20" align={leftRightAlign}>{t('matamo:devices')}</StyledTableCell>
                        <StyledTableCell width="80" align={leftRightAlign}>{t('translation:action')}</StyledTableCell>
                    </StyledMatamoTableHeadRow>
                        {chunks.length > 0 && chunks[page].map((item, index) =>
                            <StyledMatamoTableRow key={index}>
                                <StyledTableCell width="20" align={leftRightAlign}>
                                    <StyledFlexColumn>
                                        <StyledFlexColumn>
                                            <StyledDate><div> {item.serverTimePrettyFirstAction}</div>
                                                <div>{item.serverDatePretty}</div>
                                            </StyledDate>
                                        {/*<StyledDate> {item.visitDurationPretty}</StyledDate>*/}
                                        </StyledFlexColumn>
                                        <StyledDate><div> IP: {item.visitIp}</div></StyledDate>
                                        <StyledDate>{item.referrerName}<StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.referrerSearchEngineIcon}`} alt=""/>
                                        </StyledDate>
                                    </StyledFlexColumn>
                                </StyledTableCell>
                                <StyledTableCell width="20" align={leftRightAlign}>
                                    <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.deviceTypeIcon}`} alt=""/>
                                    <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.browserIcon}`} alt=""/>
                                    <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.operatingSystemIcon}`} alt=""/>
                                    <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.visitorTypeIcon}`} alt=""/>
                                </StyledTableCell>
                                <StyledTableCell width="80" align={leftRightAlign}>
                                    <span> تعداد کل اکشن ها:{item.actions}</span>
                                    {item.actionDetails.map((action, index) => (
                                        <div key={index}><span> <StyledImgAction src={actionSvg} alt=""/></span><span>{action.pageTitle}</span><div>{action.url}</div></div>
                                    ))}
                                </StyledTableCell>
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
