import React, {useState} from "react";
import {withNamespaces} from "react-i18next";

import TourHeader from './partials/UserTourComponent.jsx';
import UserHeaderContentComponent from "./partials/UserHeaderContentComponent.jsx";

function UserHeaderComponent({t, setOpenUserForm, setExpandedFilter,lastActiveFocus}) {
    const [isTourOpen, setIsTourOpen] = useState(false);

    return (<>
        <UserHeaderContentComponent lastActiveFocus={lastActiveFocus} setIsTourOpen={setIsTourOpen} setOpenUserForm={setOpenUserForm}/>
        <TourHeader setExpandedFilter={setExpandedFilter} setIsTourOpen={setIsTourOpen} isTourOpen={isTourOpen}/>
    </>);
}

export default withNamespaces('users,translation')(UserHeaderComponent);
