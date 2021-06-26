import React from "react"
import {withNamespaces} from "react-i18next";
import {Helmet} from "react-helmet";

import ElementTabsComponent from "./elementTabs/Index.jsx";

function Index({t}) {

    return (<>
        <Helmet>
            <title>{t('sidebar:elements')}</title>
        </Helmet>
        <ElementTabsComponent/>
    </>)
}

export default withNamespaces('translation')(Index);
