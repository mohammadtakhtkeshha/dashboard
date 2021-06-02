import React, {useState} from 'react';
import {withNamespaces} from "react-i18next";
import ElementHeader from "./partials/elementHeader/Index.jsx";
import ElementList from "./partials/elementsTable/Index.jsx";
import ElementModal from "./partials/elementModal/Index.jsx";

function Index({t}) {
    const [openElementForm, setOpenElementForm] = useState({show: false, id: ''})

    const closeForm = () => {
        setOpenElementForm({show: false, id: ''})
    }
    return (<>
        <ElementHeader setOpenElementForm={setOpenElementForm}/>
        <ElementModal closeForm={closeForm} openElementForm={openElementForm}/>
        <ElementList/>
    </>)
}

export default withNamespaces('translation')(Index)
