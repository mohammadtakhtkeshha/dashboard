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
import ListItemText from "@material-ui/core/ListItemText";
import {StyledLi} from "../../../../../assets/js/SidebarContent";

function Index({t}) {
    const lang = i18next.language
    const appContext = useContext(AppContext)
    const [mostSeen, setMostSeen] = useState([])

    useEffect(() => {
        getMostSeenContentMethod(appContext, setMostSeen)
    }, [])

    return (
        <StyledTableParent length={mostSeen.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('sidebar:mostSeen')} _____</Typography>
                <StyledMatamoTable>
                    <StyledMatamoTableHeadRow lang={lang}>
                        <StyledMatamoTableCell align="right">{t('matamo:pageAddress')}</StyledMatamoTableCell>
                        <StyledMatamoLeftHeadMostSeen>
                            <Typography variant="span">{t('matamo:visitNum')}</Typography>
                            <Typography variant="span">{t('matamo:uniqueDisplay')}</Typography>
                            <Typography variant="span">{t('matamo:overflow')}</Typography>
                            <Typography variant="span">{t('matamo:passedTime')}</Typography>
                            <Typography variant="span">{t('matamo:exitRate')}</Typography>
                            <Typography variant="span">avg,page load time</Typography>
                        </StyledMatamoLeftHeadMostSeen>
                    </StyledMatamoTableHeadRow>
                    {mostSeen.length > 0 && mostSeen.map((item, index) =>
                        <StyledMatamoTableRow key={index}>
                            <StyledTableCell align="right">{item.url}</StyledTableCell>
                            <StyledTableCell>
                                <StyledMatamoLeftHeadMostSeen>
                                    <Typography variant="span"> {item.nb_hits} </Typography>
                                    <Typography variant="span"> {item.nb_visits} </Typography>
                                    <Typography variant="span"> {item.bounce_rate} </Typography>
                                    <Typography variant="span"> {item.sum_time_spent} </Typography>
                                    <Typography variant="span"> {item.exit_rate} </Typography>
                                    <Typography variant="span"> {item.avg_page_load_time} </Typography>
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
