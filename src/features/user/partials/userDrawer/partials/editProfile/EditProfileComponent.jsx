import React from "react"
import {withNamespaces} from "react-i18next";
import EditProfileHeaderComponent from "./partials/EditProfileHeaderComponent";
import EditProfileFormComponent from "./partials/EditProfileFormComponent";
import {Helmet} from "react-helmet";
import {StyledBox} from "assets/js/library/base/box";


function EditProfileComponent({t}) {
    return (<>
        <Helmet>
            <title>
                {t('sidebar:editProfile')}
            </title>
        </Helmet>
        <StyledBox>
            <EditProfileHeaderComponent/>
            <EditProfileFormComponent/>
        </StyledBox>
    </>)
}

export default withNamespaces('sidebar')(EditProfileComponent);
