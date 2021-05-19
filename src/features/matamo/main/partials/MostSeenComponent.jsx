import React, {useEffect, useState, useContext} from "react"
import {withNamespaces} from "react-i18next"

import {getMostSeenContentMethod} from "./MostSeenComponent.js"
import AppContext from "contexts/AppContext"
import {
    StyledTableCell,
    StyledTablePaper,
    StyledTableParent
} from "assets/js/App"
import {
    StyledMatamoTable,
    StyledMatamoTableRow,
    StyledMatamoTableCell,
    StyledMatamoTableHeadRow, StyledMatamoTabelFooter
} from "assets/js/library/pages/matamo/matamoTable"

import {StyledMatamoLeftHeadMostSeen} from "assets/js/library/pages/matamo/mostSeen";

import {Typography} from "@material-ui/core"
import i18next from "i18next"
import {NavLink} from "react-router-dom";

function Index({t}) {
    const lang = i18next.language
    const {setLoading} = useContext(AppContext)
    const [mostSeen, setMostSeen] = useState([])

    useEffect(() => {
        getMostSeenContentMethod(setLoading, setMostSeen)
    }, [setLoading,setMostSeen])//Once

    return (
        <StyledTableParent length={mostSeen.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('sidebar:mostSeen')} _____</Typography>
                <StyledMatamoTable>
                    <StyledMatamoTableHeadRow lang={lang}>
                        <StyledMatamoTableCell align="right">{t('matamo:pageAddress')}</StyledMatamoTableCell>
                        <StyledMatamoLeftHeadMostSeen>
                            <span >{t('matamo:visitNum')}</span>
                            <span >{t('matamo:uniqueDisplay')}</span>
                            <span >{t('matamo:overflow')}</span>
                            <span >{t('matamo:passedTime')}</span>
                            <span >{t('matamo:exitRate')}</span>
                            <span >avg,page load time</span>
                        </StyledMatamoLeftHeadMostSeen>
                    </StyledMatamoTableHeadRow>
                    {mostSeen.length > 0 && mostSeen.map((item, index) =>
                        <StyledMatamoTableRow key={index}>
                            <StyledTableCell align="right">{item.url}</StyledTableCell>
                            <StyledTableCell>
                                <StyledMatamoLeftHeadMostSeen>
                                    <span > {item.nb_hits} </span>
                                    <span > {item.nb_visits} </span>
                                    <span > {item.bounce_rate} </span>
                                    <span > {item.sum_time_spent} </span>
                                    <span > {item.exit_rate} </span>
                                    <span > {item.avg_page_load_time} </span>
                                </StyledMatamoLeftHeadMostSeen>
                            </StyledTableCell>
                        </StyledMatamoTableRow>
                    )}
                    <StyledMatamoTabelFooter lang={lang}>
                        <NavLink to='/report/most-seen'>
                            {t('translation:moreItems')}
                        </NavLink>
                    </StyledMatamoTabelFooter>
                </StyledMatamoTable>
            </StyledTablePaper>
        </StyledTableParent>
    )
}

export default withNamespaces('translation,matamo')(Index)
