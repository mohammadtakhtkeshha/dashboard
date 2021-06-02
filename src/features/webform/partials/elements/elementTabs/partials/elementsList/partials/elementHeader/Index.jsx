import React, {useState} from "react";

import TourHeader from './partials/ElementTourComponent.jsx';
import ElementHeaderComponent from "./partials/ElementHeaderComponent.jsx";

export default function Index({setOpenElementForm, setExpandedFilter}) {
    const [isTourOpen, setIsTourOpen] = useState(false);

    return (<>
        <ElementHeaderComponent setIsTourOpen={setIsTourOpen} setOpenElementForm={setOpenElementForm}/>
        <TourHeader setExpandedFilter={setExpandedFilter} setIsTourOpen={setIsTourOpen} isTourOpen={isTourOpen}/>
    </>);
}

