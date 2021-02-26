import React from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {StyledTableBody, StyledTableCell, StyledTable, StyledTableHeadRow} from "assets/js/App"
import {StyledTabeBodyRowCustomized, StyledVisibilityIcon} from "assets/js/taxonomy/taxonomyTable"
import {Link} from "react-router-dom";

function MenuTypeComponent({t}) {
    const lang = i18next.language
    const types = [{label: t('translation:web'), link: 'web'}, {label: t('translation:mobile'), link: 'mobile'}]

    return (<StyledTable>
        <StyledTableHeadRow>
            <StyledTableCell>
                {t('translation:name')}
            </StyledTableCell>
            {/*<StyledTableCell>*/}
            {/*    {t('translation:action')}*/}
            {/*</StyledTableCell>*/}
        </StyledTableHeadRow>
        <StyledTableBody>
            {types.length > 0 ? (types?.map((type, index) => (
                <Link to={{pathname: `/menu/${type.link}`}}>
                    <StyledTabeBodyRowCustomized key={index} lang={lang}>
                        <StyledTableCell>{type.label}</StyledTableCell>
                        <StyledTableCell>
                            <StyledVisibilityIcon lang={lang}>
                                <img src={require('assets/svg/visibility.png')} alt=""/>
                            </StyledVisibilityIcon>
                        </StyledTableCell>
                    </StyledTabeBodyRowCustomized>
                </Link>
            ))) : t('translation:notFoundRecord')}</StyledTableBody>
    </StyledTable>)
}

export default withNamespaces('menu,translation')(MenuTypeComponent)
