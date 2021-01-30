import React, {useEffect, useState, useContext} from "react"
import i18next from "i18next"
import {withNamespaces} from "react-i18next"

import {Typography} from "@material-ui/core"

import {get30MinutesVisitsMethod, get24OursVisitsMethod,visitsDetailsMethod} from "./Index.js"
import {StyledIconMatamo} from "assets/js/library/pages/matamo/matamo"
import AppContext from "contexts/AppContext"
import {
    StyledTable, StyledTableBody, StyledTableBodyRow,
    StyledTableCell,
    StyledTableHeadRow,
    StyledTablePaper,
    StyledTableParent
} from "assets/js/App"

function Index({t}) {
    const lang = i18next.language
    const appContext = useContext(AppContext)
    const [last30Minutes, setLast30Minutes] = useState([])
    const [last24Ours, setLast24Ours] = useState([])
    const [VisitsDetails, setVisitsDetails] = useState([])

    useEffect(() => {
        get30MinutesVisitsMethod(appContext,setLast30Minutes)
        get24OursVisitsMethod(appContext,setLast24Ours)
        visitsDetailsMethod(appContext,setVisitsDetails)
    }, [])

    return (<>
        <StyledTableParent length={last30Minutes.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('matamo:last30Minutes')} _____</Typography>
                <StyledTable>
                    <StyledTableHeadRow lang={lang}>
                        <StyledTableCell align="right">{t('matamo:pageAddress')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:visitNum')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:uniqueDisplay')}</StyledTableCell>
                    </StyledTableHeadRow>
                    <StyledTableBody>
                        {last30Minutes.length > 0 && last30Minutes.map((visit, index) =>
                            <StyledTableBodyRow key={index}>
                                <StyledTableCell align="right">  {t('matamo:last30Minutes')}</StyledTableCell>
                                <StyledTableCell align="right"> {visit.visits} </StyledTableCell>
                                <StyledTableCell align="right"> {visit.actions} </StyledTableCell>
                            </StyledTableBodyRow>
                        )}
                    </StyledTableBody>
                </StyledTable>
            </StyledTablePaper>
        </StyledTableParent>
        <StyledTableParent length={last24Ours.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('matamo:last24Ours')} _____</Typography>
                <StyledTable>
                    <StyledTableHeadRow lang={lang}>
                        <StyledTableCell align="right">{t('matamo:pageAddress')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:visitNum')}</StyledTableCell>
                        <StyledTableCell align="right">{t('matamo:uniqueDisplay')}</StyledTableCell>
                    </StyledTableHeadRow>
                    <StyledTableBody>
                        {last24Ours.length > 0 && last24Ours.map((visit, index) =>
                            <StyledTableBodyRow key={index}>
                                <StyledTableCell align="right">  {t('matamo:last24Ours')}</StyledTableCell>
                                <StyledTableCell align="right"> {visit.visits} </StyledTableCell>
                                <StyledTableCell align="right"> {visit.actions} </StyledTableCell>
                            </StyledTableBodyRow>
                        )}
                    </StyledTableBody>
                </StyledTable>
            </StyledTablePaper>
        </StyledTableParent>
        <StyledTableParent length={VisitsDetails.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('matamo:last24Ours')} _____</Typography>
                <StyledTable>
                    <StyledTableHeadRow lang={lang}>
                        <StyledTableCell align="right">{t('translation:date')}</StyledTableCell>
                        {/*<StyledTableCell align="right">{t('matamo:visitNum')}</StyledTableCell>*/}
                        {/*<StyledTableCell align="right">{t('matamo:uniqueDisplay')}</StyledTableCell>*/}
                    </StyledTableHeadRow>
                    <StyledTableBody>
                        {VisitsDetails.length > 0 && VisitsDetails.map((item, index) =>
                            <StyledTableBodyRow key={index}>
                                <StyledTableCell align="right">
                                    {item.serverTimePrettyFirstAction}{item.serverDatePretty}
                                    <span><StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.deviceTypeIcon}`} alt=""/></span>
                                    <span><StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.browserIcon}`} alt=""/></span>
                                    <span><StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.operatingSystemIcon}`} alt=""/></span>
                                    <span><StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.visitorTypeIcon}`} alt=""/></span>
                                </StyledTableCell>
                                {/*<StyledTableCell align="right">*/}
                                {/*    {item.actionDetails.map((action, index) => (*/}
                                {/*    <div key={index}><span>{action.pageTitle}</span><span>{action.url}</span></div>*/}
                                {/*))} </StyledTableCell>*/}
                            </StyledTableBodyRow>
                        )}
                    </StyledTableBody>
                </StyledTable>
            </StyledTablePaper>
        </StyledTableParent>
    </>)
}

export default withNamespaces('translation,matamo')(Index)
