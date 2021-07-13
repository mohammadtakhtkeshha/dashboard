import React, {useState} from "react";

import TourHeader from './partials/SettingsTourComponent.jsx';
import SettingsHeader from './partials/SettingsHeaderComponent.jsx';

export default function HeaderSettingsComponent({setOpenElementForm, setExpandedFilter, setIsEditForm}) {
    const [isTourOpen, setIsTourOpen] = useState(false);

    return (<>
        <SettingsHeader
            setIsTourOpen={setIsTourOpen}
            setOpenElementForm={setOpenElementForm}
            setIsEditForm={setIsEditForm}
        />
        <TourHeader
            setExpandedFilter={setExpandedFilter}
            setIsTourOpen={setIsTourOpen}
            isTourOpen={isTourOpen}
        />
    </>);
}

