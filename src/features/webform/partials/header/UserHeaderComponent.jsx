import React, {useState} from "react";
import {withNamespaces} from "react-i18next";

import TourHeader from './partials/UserTourComponent.jsx';
import UserHeaderContentComponent from "./partials/UserHeaderContentComponent.jsx";

function UserHeaderComponent({t, setOpenWebform, setExpandedFilter,lastActiveFocus}) {
    const [isTourOpen, setIsTourOpen] = useState(false);

    return (<>
        <UserHeaderContentComponent lastActiveFocus={lastActiveFocus} setIsTourOpen={setIsTourOpen} setOpenWebform={setOpenWebform}/>
        <TourHeader setExpandedFilter={setExpandedFilter} setIsTourOpen={setIsTourOpen} isTourOpen={isTourOpen}/>
    </>);
}

export default withNamespaces('users,translation')(UserHeaderComponent);
