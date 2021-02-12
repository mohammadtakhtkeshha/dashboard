import React from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import {Link} from "react-router-dom";

import {StyledTableBody, StyledTableCell, StyledTable, StyledTableHeadRow} from "assets/js/App"
import {StyledTabeBodyRowCustomized} from "assets/js/taxonomy/taxonomyTable"
import {Typography} from "@material-ui/core";

function TaxonomyTableComponent({t, taxonomies}) {
    const lang = i18next.language

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
                {taxonomies.length > 0 ? (taxonomies?.map((taxonomy, index) => (
                    <StyledTabeBodyRowCustomized key={index} lang={lang}>
                        <StyledTableCell>{t(`taxonomy:${taxonomy.vid}`)}</StyledTableCell>
                        <StyledTableCell>
                            <Link to={{pathname: `/taxonomy/${taxonomy.vid}`, state: {vocab: taxonomy.name}}}>
                                <Typography>{t('taxonomy:termList')}</Typography>
                            </Link>
                        </StyledTableCell>
                    </StyledTabeBodyRowCustomized>
                ))) : t('translation:notFoundRecord')}</StyledTableBody>
        </StyledTable>)
}

export default withNamespaces('taxonomy,translation')(TaxonomyTableComponent)
