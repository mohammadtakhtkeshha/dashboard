import React from "react"
import {withNamespaces} from "react-i18next";

function EditProfileFormComponent() {
    return (<>
        <h1>
            edit profile component
        </h1>
    </>)
}

export default withNamespaces('sidebar')(EditProfileFormComponent);
