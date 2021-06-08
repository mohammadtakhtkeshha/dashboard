import React, {useState} from 'react';
import {withNamespaces} from "react-i18next";
import ElementHeader from "./partials/elementHeader/Index.jsx";
import ElementList from "./partials/elementsTable/Index.jsx";
import ElementModal from "./partials/elementModal/Index.jsx";
import {useHistory} from "react-router-dom";

function Index({t}) {
    const history = useHistory()
    const [openElementForm, setOpenElementForm] = useState({show: false, id: ''})
    const [elements, setElements] = useState([])
    const form_id = history.location.pathname.split('/').pop()
    const constElement ={
        "form_id": form_id,
        "field_required": false,
        "field_title": "",
        "field_type": "",
        "field_id": "",
        "admin_title": ""
    }
    const [element, setElement] = useState(constElement)

    const closeForm = () => {
        setOpenElementForm({show: false, id: ''})
        setElement(constElement)
    }

    return (<>
        <ElementHeader setOpenElementForm={setOpenElementForm}/>
        <ElementModal element={element} setElement={setElement} setElements={setElements} closeForm={closeForm} openElementForm={openElementForm}/>
        <ElementList elements={elements} setElements={setElements}/>
    </>)
}

export default withNamespaces('translation')(Index)
