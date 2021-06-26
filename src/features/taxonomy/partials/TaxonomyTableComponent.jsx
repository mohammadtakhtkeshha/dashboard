import React from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import {Link} from "react-router-dom";

import {StyledTableBody, StyledTableCell, StyledTable} from "assets/js/App"
import {StyledTabeBodyRowCustomized, StyledVisibilityIcon} from "assets/js/taxonomy/taxonomyTable"
import {StyledTableHeadTr} from "assets/js/library/components/table";

function TaxonomyTableComponent({t, taxonomies}) {
    const lang = i18next.language

    return (<StyledTable>
        <StyledTableHeadTr>
            <StyledTableCell>
                {t('translation:name')}
            </StyledTableCell>
        </StyledTableHeadTr>
        <StyledTableBody>
            {taxonomies.length > 0 ? (taxonomies?.map((taxonomy, index) => (
                <Link key={index} to={{pathname: `/taxonomy/${taxonomy.vid}`, state: {vocab: taxonomy.name}}}>
                    <StyledTabeBodyRowCustomized key={index} lang={lang}>
                        <StyledTableCell>{t(`taxonomy:${taxonomy.name}`)}</StyledTableCell>
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
