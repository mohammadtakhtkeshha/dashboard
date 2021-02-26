import React, {useEffect, useState, useContext} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next";

import {Typography} from "@material-ui/core"

import {getDevicesMethod} from "./DevicesComponent.js"
import AppContext from "contexts/AppContext"
import {
    StyledTableParent,
    StyledTablePaper,
} from "assets/js/App";
import {
    StyledMatamoTable,
    StyledMatamoTableRow,
    StyledMatamoTableCell,
    StyledMatamoTabelFooter,
    StyledMatamoTableHeadRow
} from "assets/js/library/pages/matamo/matamoTable"
import {StyledIconAndLabel} from "assets/js/library/pages/matamo/matamo"
import {NavLink} from "react-router-dom";

function DevicesComponent({t}) {
    const appContext = useContext(AppContext)
    const lang = i18next.language
    const [devices, setDevices] = useState([])

    useEffect(() => {
        getDevicesMethod(appContext, setDevices)
    }, [])

    return (<>
        <StyledTableParent length={devices.length}>
            <StyledTablePaper lang={lang}>
                <Typography variant="h4">_____ {t('matamo:devices')} _____</Typography>
                <StyledMatamoTable>
                    <StyledMatamoTableHeadRow>
                        <StyledMatamoTableCell>{t('translation:type')}</StyledMatamoTableCell>
                        <StyledMatamoTableCell>{t('matamo:visits')}</StyledMatamoTableCell>
                    </StyledMatamoTableHeadRow>
                    {devices.length > 0 && devices.map((device, index) =>
                        <StyledMatamoTableRow key={index}>
                            <StyledMatamoTableCell align="right">
                                <StyledIconAndLabel>
                                    {device.logo && <img src={require(`assets/svg/devices/${device.logo}`)} alt=""/>}
                                    <span>{device.label}</span>
                                </StyledIconAndLabel>
                            </StyledMatamoTableCell>
                            <StyledMatamoTableCell
                                align="right">{device.nb_visits === 0 ? '-' : device.nb_visits}</StyledMatamoTableCell>
                        </StyledMatamoTableRow>
                    )}
                    <StyledMatamoTabelFooter lang={lang}>
                       <NavLink to='/report/devices'>
                        {t('translation:moreItems')}
                    </NavLink>
                    </StyledMatamoTabelFooter>
                </StyledMatamoTable>
            </StyledTablePaper>
        </StyledTableParent>
    </>)
}

export default withNamespaces('translation,matamo')(DevicesComponent)
