import React from "react";
import {Helmet} from "react-helmet";
import {withNamespaces} from 'react-i18next';

function TitleComponent({t,title}) {
    return (
        <Helmet>
            <title>
                {t(`sidebar:${title}`)}
            </title>
        </Helmet>
    );
}

export default withNamespaces('sidebar')(TitleComponent);
