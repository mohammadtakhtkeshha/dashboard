import React, {useState} from "react"
import HeaderSettings from './headerSettingsElement/HeaderSettingsComponent.jsx'

export default function Index() {
    const [openForm, setOpenForm] = useState(false);

    return (<>
        <HeaderSettings/>
    </>)
}
