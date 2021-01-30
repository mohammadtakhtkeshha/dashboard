import React, {useContext, useEffect, useState} from "react"
import {withNamespaces} from "react-i18next";

import Pagination from "@material-ui/lab/Pagination"

import TaxonomyTableComponent from "./partials/TaxonomyTableComponent.jsx"
import AppContext from "contexts/AppContext"
import {StyledPaper} from "assets/js/App"
import {StyledPaginationBox} from "assets/js/pagination"
import {handlePaginationMethod, getTaxonomiesMethod} from './Index.js'
import {Helmet} from "react-helmet";

function Index({t}) {
    const [taxonomies, setTaxonomies] = useState([])
    const appContext = useContext(AppContext)

    const getTaxonomies = () => {
        getTaxonomiesMethod(appContext, setTaxonomies)
    }

    useEffect(() => {
        getTaxonomies()
    }, []);

    return (<StyledPaper>
        <Helmet>
            <title>
                {t('taxonomy:categoryList')}
            </title>
        </Helmet>
        <TaxonomyTableComponent taxonomies={taxonomies}/>
    </StyledPaper>);
}

export default withNamespaces('translation,taxonomy')(Index)



