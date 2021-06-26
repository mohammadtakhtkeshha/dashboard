import React, {useEffect} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import {Link} from "react-router-dom";

import {StyledTableBody, StyledTableCell, StyledTable} from "assets/js/App"
import {StyledTabeBodyRowCustomized, StyledVisibilityIcon} from "assets/js/taxonomy/taxonomyTable"
import {StyledTableHeadTr} from "assets/js/library/components/table";
import {get} from "libraries/local-storage";

function TaxonomyTableComponent({t, taxonomies}) {
    const lang = i18next.language
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER))

    const currentPermission = (taxonomyType) => {
        switch (taxonomyType) {
            case 'category':
                return 'restful get tax_category_rest_resource'
            case 'images_category':
                return 'restful get tax_cat_img_rest_resource'
            case 'sounds_category':
                return 'restful get tax_cat_sound_rest_resource'
            case 'state':
                return 'restful get tax_rest_resource'
            case 'tags':
                return 'restful get tax_tags_rest_resource'
            default: //'videos_category'
                return 'restful get tax_videos_category_rest_resource'
        }
    }

    return (<StyledTable>
        <StyledTableHeadTr>
            <StyledTableCell>
                {t('translation:name')}
            </StyledTableCell>
        </StyledTableHeadTr>
        <StyledTableBody>
            {taxonomies.length > 0 ? (taxonomies?.map((taxonomy, index) => (
                <Link key={index} to={{pathname: `/taxonomy/${taxonomy.vid}`, state: {vocab: taxonomy.name}}}>
                    <StyledTabeBodyRowCustomized permission={`${permissions[`${currentPermission('category')}`].access}`}
                                                 key={index}
                                                 lang={lang}>
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
