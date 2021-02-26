import React, {useContext, useEffect, useState} from "react"
import {withNamespaces} from "react-i18next";
import {Helmet} from "react-helmet";

import TaxonomyTableComponent from "./partials/TaxonomyTableComponent.jsx"
import AppContext from "contexts/AppContext"
import {StyledPaper} from "assets/js/App"
import {getTaxonomiesMethod} from './Index.js'
// import visibility from "assets/svg/visibility.png"

function Index({t}) {
    const [taxonomies, setTaxonomies] = useState([])
    const appContext = useContext(AppContext)

    const getTaxonomies = () => {
        getTaxonomiesMethod(appContext, setTaxonomies)
    }

    useEffect(() => {
        getTaxonomies()
    }, []);

    return (<>
        <Helmet>
            <title>
                {t('taxonomy:categoryList')}
            </title>
        </Helmet>
        <TaxonomyTableComponent taxonomies={taxonomies}/>
    </>);
}

export default withNamespaces('translation,taxonomy')(Index)
