import React from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {Typography} from "@material-ui/core";

import {StyledTableBody, StyledTableCell, StyledTable, StyledTableHeadRow} from "assets/js/App"
import {StyledTabeBodyRowCustomized} from "assets/js/taxonomy/taxonomyTable"
import {Link} from "react-router-dom";

function MenuTypeComponent({t}) {
    const lang = i18next.language
    const types = [{label:t('translation:web'),link:'web'},{label:t('translation:mobile'),link:'mobile'}]

    return (<StyledTable>
            <StyledTableHeadRow>
                <StyledTableCell>
                    {t('translation:name')}
                </StyledTableCell>
                <StyledTableCell>
                    {t('translation:action')}
                </StyledTableCell>
            </StyledTableHeadRow>
            <StyledTableBody>
                {types.length > 0 ? (types?.map((type, index) => (
                    <StyledTabeBodyRowCustomized key={index} lang={lang}>
                        <StyledTableCell>{type.label}</StyledTableCell>
                        <StyledTableCell>
                            <Link to={{pathname: `/menu/${type.link}`}}>
                                <Typography>{t('menu:menuList')}</Typography>
                            </Link>
                        </StyledTableCell>
                    </StyledTabeBodyRowCustomized>
                ))) : t('translation:notFoundRecord')}</StyledTableBody>
        </StyledTable>)
}

export default withNamespaces('menu,translation')(MenuTypeComponent)
