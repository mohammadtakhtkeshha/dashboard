import React from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import {Link} from "react-router-dom";

import {StyledTableBody, StyledTableCell, StyledTable, StyledTableHeadRow} from "assets/js/App"
import {StyledTabeBodyRowCustomized, StyledVisibilityIcon} from "assets/js/taxonomy/taxonomyTable"

function TaxonomyTableComponent({t, taxonomies}) {
    const lang = i18next.language

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
            {taxonomies.length > 0 ? (taxonomies?.map((taxonomy, index) => (
                <Link to={{pathname: `/taxonomy/${taxonomy.vid}`, state: {vocab: taxonomy.name}}}>
                    <StyledTabeBodyRowCustomized key={index} lang={lang}>
                        <StyledTableCell>{t(`taxonomy:${taxonomy.vid}`)}</StyledTableCell>
                        <StyledTableCell>
                            <StyledVisibilityIcon lang={lang}>
                                <img src={require('assets/svg/visibility.png')} alt=""/>
                                {/*{t('taxonomy:termList')}*/}
                            </StyledVisibilityIcon>
                        </StyledTableCell>
                    </StyledTabeBodyRowCustomized>
                </Link>
            ))) : t('translation:notFoundRecord')}</StyledTableBody>
    </StyledTable>)
}

export default withNamespaces('taxonomy,translation')(TaxonomyTableComponent)
