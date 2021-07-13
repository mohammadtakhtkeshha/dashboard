import React, {useState} from "react";

import TourHeader from './partials/SettingsTourComponent.jsx';
import SettingsHeader from './partials/SettingsHeaderComponent.jsx';

export default function HeaderSettingsComponent({setOpenForm,openForm}) {
    const [isTourOpen, setIsTourOpen] = useState(false);

    return (<>
        <SettingsHeader
            setIsTourOpen={setIsTourOpen}
            setOpenForm={setOpenForm}
            openForm={openForm}
        />
        <TourHeader
            setIsTourOpen={setIsTourOpen}
            isTourOpen={isTourOpen}
        />
    </>);
}

