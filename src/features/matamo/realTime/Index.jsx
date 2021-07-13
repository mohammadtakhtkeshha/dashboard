import React, { useEffect, useState, useContext } from "react"
import i18next from "i18next"
import { withNamespaces } from "react-i18next"

import { Typography } from "@material-ui/core"

import { get30MinutesVisitsMethod, get24OursVisitsMethod, visitsDetailsMethod } from "./Index.js"
import {
    StyledBoxRefer,
    StyledIconMatamo,
    StyledTableCellActivity,
    StyledTableCellRealtime
} from "assets/js/library/pages/matamo/matamo"
import AppContext from "contexts/AppContext"
import {
    StyledTableCell,
    StyledTablePaper,
    StyledTableParent
} from "assets/js/library/components/table"
import { StyledMatamoLeftHeadRealTime } from "assets/js/library/pages/matamo/realTime";
import {
    StyledMatamoTable,
    StyledMatamoTableRow,
    StyledMatamoTableRowGrey,
    StyledMatamoTableCell,
    StyledMatamoTableHeadRow
} from "assets/js/library/pages/matamo/matamoTable"

function Index({ t }) {
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext)
    const [last30Minutes, setLast30Minutes] = useState([])
    const [last24Ours, setLast24Ours] = useState([])
    const [VisitsDetails, setVisitsDetails] = useState([])

    useEffect(() => {
        get30MinutesVisitsMethod(setLoading, setLast30Minutes)
    }, [setLoading,setLast30Minutes])

    useEffect(() => {
        get24OursVisitsMethod(setLoading, setLast24Ours)
    }, [setLoading,setLast24Ours])

    useEffect(() => {
        visitsDetailsMethod(setLoading, setVisitsDetails)
    }, [setLoading,setVisitsDetails])

    return (<>
        <StyledTableParent length={last30Minutes.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('matamo:last30Minutes')} _____</Typography>
                <StyledMatamoTable>
                    <StyledMatamoTableHeadRow lang={lang}>
                        <StyledMatamoTableCell align="right">{t('matamo:pageAddress')}</StyledMatamoTableCell>
                        <StyledMatamoLeftHeadRealTime>
                            <Typography variant="span">{t('matamo:visitNum')}</Typography>
                            <Typography variant="span">{t('translation:activities')}</Typography>
                        </StyledMatamoLeftHeadRealTime>
                    </StyledMatamoTableHeadRow>
                    {last30Minutes.length > 0 && last30Minutes.map((visit, index) =>
                        <StyledMatamoTableRow key={index}>
                            <StyledTableCell align="right">  {t('matamo:last30Minutes')}</StyledTableCell>
                            <StyledMatamoLeftHeadRealTime>
                                <Typography variant="span"> {visit.visits}</Typography>
                                <Typography variant="span">{visit.actions}</Typography>
                            </StyledMatamoLeftHeadRealTime>
                        </StyledMatamoTableRow>
                    )}
                    {last24Ours.length > 0 && last24Ours.map((visit, index) =>
                        <StyledMatamoTableRow key={index}>
                            <StyledTableCell align="right">  {t('matamo:last24Ours')}</StyledTableCell>
                            <StyledMatamoLeftHeadRealTime>
                                <Typography variant="span"> {visit.visits}</Typography>
                                <Typography variant="span">{visit.actions}</Typography>
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
                                    <Typography variant="span">{item.referrerName}</Typography>
                                    <img src={`http://foroshgahsaz.ir/matomo/${item.referrerSearchEngineIcon}`}
                                        alt={item.referrerName} />
                                </StyledBoxRefer>
                            </StyledMatamoTableRowGrey>
                            <StyledMatamoTableRow>
                                <StyledTableCellActivity align="right">
                                    <Typography variant="span">{t('translation:activities')} : </Typography>
                                    {item.actionDetails.map((action, index) => (
                                        <img key={index} src={require('assets/svg/action.svg')} alt="action" />
                                    ))}
                                </StyledTableCellActivity>
                            </StyledMatamoTableRow>
                        </div>
                    )}
                </StyledMatamoTable>
            </StyledTablePaper>
        </StyledTableParent>
        {/*<StyledTableParent length={VisitsDetails.length}>*/}
        {/*    <StyledTablePaper lang={lang}>*/}
        {/*        <Typography variant="h4">_____ {t('matamo:last24Ours')} _____</Typography>*/}
        {/*        <StyledTable>*/}
        {/*            <StyledTableHeadRow lang={lang}>*/}
        {/*                <StyledTableCell align="right">{t('translation:date')}</StyledTableCell>*/}
        {/*                /!*<StyledTableCell align="right">{t('matamo:visitNum')}</StyledTableCell>*!/*/}
        {/*                /!*<StyledTableCell align="right">{t('matamo:uniqueDisplay')}</StyledTableCell>*!/*/}
        {/*            </StyledTableHeadRow>*/}
        {/*            <StyledTableBody>*/}
        {/*                {VisitsDetails.length > 0 && VisitsDetails.map((item, index) =>*/}
        {/*                    <StyledTableBodyRow key={index}>*/}
        {/*                        <StyledTableCell align="right">*/}
        {/*                            {item.serverTimePrettyFirstAction}{item.serverDatePretty}*/}
        {/*                            <span><StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.deviceTypeIcon}`} alt=""/></span>*/}
        {/*                            <span><StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.browserIcon}`} alt=""/></span>*/}
        {/*                            <span><StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.operatingSystemIcon}`} alt=""/></span>*/}
        {/*                            <span><StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.visitorTypeIcon}`} alt=""/></span>*/}
        {/*                        </StyledTableCell>*/}
        {/*                        /!*<StyledTableCell align="right">*!/*/}
        {/*                        /!*    {item.actionDetails.map((action, index) => (*!/*/}
        {/*                        /!*    <div key={index}><span>{action.pageTitle}</span><span>{action.url}</span></div>*!/*/}
        {/*                        /!*))} </StyledTableCell>*!/*/}
        {/*                    </StyledTableBodyRow>*/}
        {/*                )}*/}
        {/*            </StyledTableBody>*/}
        {/*        </StyledTable>*/}
        {/*    </StyledTablePaper>*/}
        {/*</StyledTableParent>*/}
    </>)
}

export default withNamespaces('translation,matamo')(Index)
