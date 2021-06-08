import React, {useState} from "react";
import {withNamespaces} from "react-i18next";

import TourHeader from './partials/FormTourComponent.jsx';
import UserHeaderContentComponent from "./partials/FormHeaderContentComponent.jsx";

function FormHeaderComponent({t, setOpenWebform, setExpandedFilter,lastActiveFocus}) {
    const [isTourOpen, setIsTourOpen] = useState(false);

    return (<>
        <UserHeaderContentComponent lastActiveFocus={lastActiveFocus} setIsTourOpen={setIsTourOpen} setOpenWebform={setOpenWebform}/>
        <TourHeader setExpandedFilter={setExpandedFilter} setIsTourOpen={setIsTourOpen} isTourOpen={isTourOpen}/>
    </>);
}

export default withNamespaces('users,translation')(FormHeaderComponent);
