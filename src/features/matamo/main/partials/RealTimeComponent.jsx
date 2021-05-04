import React, { useEffect, useState, useContext, useCallback } from "react"
import i18next from "i18next"
import { withNamespaces } from "react-i18next"

import { Typography } from "@material-ui/core"

import { get30MinutesVisitsMethod, get24OursVisitsMethod, visitsDetailsMethod } from "./RealTimeComponent.js"
import {
    StyledIconMatamo,
    StyledTableCellActivity,
    StyledTableCellRealtime,
    StyledBoxRefer
} from "assets/js/library/pages/matamo/matamo"
import AppContext from "contexts/AppContext"
import {
    StyledTableCell,
    StyledTablePaper,
    StyledTableParent
} from "assets/js/App"
import {
    StyledMatamoTable,
    StyledMatamoTableRow,
    StyledMatamoTableRowGrey,
    StyledMatamoTableCell,
    StyledMatamoTabelFooter,
    StyledMatamoTableHeadRow
} from "assets/js/library/pages/matamo/matamoTable"

import { StyledMatamoLeftHeadRealTime } from "assets/js/library/pages/matamo/realTime"
import { NavLink } from "react-router-dom";

function RealTimeComponent({ t }) {
    const lang = i18next.language
    const appContext = useContext(AppContext)
    const [last30Minutes, setLast30Minutes] = useState([])
    const [last24Ours, setLast24Ours] = useState([])
    const [VisitsDetails, setVisitsDetails] = useState([])

    const get30MinutesVisits= useCallback(get30MinutesVisitsMethod(appContext, setLast30Minutes),[appContext,setLast30Minutes])
    const get24OursVisits= useCallback(get24OursVisitsMethod(appContext, setLast24Ours),[appContext,setLast24Ours])
    const visitsDetails= useCallback(visitsDetailsMethod(appContext, setVisitsDetails),[appContext,setVisitsDetails])

    useEffect(() => {
        get30MinutesVisits()
    }, [get30MinutesVisits])

    useEffect(() => {
        get24OursVisits()
    }, [get24OursVisits])

    useEffect(() => {
        visitsDetails()
    }, [visitsDetails])

    return (<>
        <StyledTableParent length={last30Minutes.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('matamo:visitInRealTime')} _____</Typography>
                <StyledMatamoTable>
                    <StyledMatamoTableHeadRow>
                        <StyledMatamoTableCell>{t('translation:date')}</StyledMatamoTableCell>
                        <StyledMatamoLeftHeadRealTime>
                            <Typography variant="subtitle2">{t('matamo:visits')}</Typography>
                            <Typography variant="subtitle2">{t('translation:activities')}</Typography>
                        </StyledMatamoLeftHeadRealTime>
                    </StyledMatamoTableHeadRow>
                    {last30Minutes.length > 0 && last30Minutes.map((visit, index) =>
                        <StyledMatamoTableRow key={index}>
                            <StyledTableCell align="right">  {t('matamo:last30Minutes')}</StyledTableCell>
                            <StyledTableCell align="right">
                                <StyledMatamoLeftHeadRealTime>
                                    <Typography variant="subtitle2"> {visit.visits}</Typography>
                                    <Typography variant="subtitle2">{visit.actions}</Typography>
                                </StyledMatamoLeftHeadRealTime>
                            </StyledTableCell>
                        </StyledMatamoTableRow>)}
                    {last24Ours.length > 0 && last24Ours.map((visit, index) =>
                        <StyledMatamoTableRow key={index}>
                            <StyledTableCell align="right">  {t('matamo:last24Ours')}</StyledTableCell>
                            <StyledMatamoLeftHeadRealTime align="right">
                                <Typography variant="subtitle2"> {visit.visits}  </Typography>
                                <Typography variant="subtitle2"> {visit.actions}</Typography>
                            </StyledMatamoLeftHeadRealTime>
                        </StyledMatamoTableRow>
                    )}
                    {VisitsDetails.length > 0 && VisitsDetails.map((item, index) =>
                        <div key={index}>
                            <StyledMatamoTableRowGrey>
                                <StyledTableCellRealtime>
                                    {item.serverTimePrettyFirstAction}{item.serverDatePretty}
                                    <span><StyledIconMatamo
                                        src={`https://foroshgahsaz.ir/matomo/${item.deviceTypeIcon}`} alt="" />
                                    </span>
                                    <span><StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.browserIcon}`}
                                        alt="" />
                                    </span>
                                    <span><StyledIconMatamo
                                        src={`https://foroshgahsaz.ir/matomo/${item.operatingSystemIcon}`} alt="" />
                                    </span>
                                    <span><StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.visitorTypeIcon}`}
                                        alt="" />
                                    </span>
                                </StyledTableCellRealtime>
                                <StyledBoxRefer>
                                    <Typography variant="subtitle2">{item.referrerName}</Typography>
                                    <img src={`http://foroshgahsaz.ir/matomo/${item.referrerSearchEngineIcon}`}
                                        alt={item.referrerName} />
                                </StyledBoxRefer>
                            </StyledMatamoTableRowGrey>
                            <StyledMatamoTableRow>
                                <StyledTableCellActivity align="right">
                                    <Typography variant="subtitle2">{t('translation:activities')} : </Typography>
                                    {item.actionDetails.map((action, index) => (
                                        <img key={index} src={require('assets/svg/action.svg')} alt='actions' />
                                    ))}
                                </StyledTableCellActivity>
                            </StyledMatamoTableRow>
                        </div>
                    )}
                    <StyledMatamoTabelFooter lang={lang}>
                        <NavLink to='/report/real-time-visit'>
                            {t('translation:moreItems')}
                        </NavLink>
                    </StyledMatamoTabelFooter>
                </StyledMatamoTable>
            </StyledTablePaper>
        </StyledTableParent>

    </>)
}

export default withNamespaces('translation,matamo')(RealTimeComponent)
