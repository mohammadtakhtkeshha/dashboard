import React, {useState} from 'react';
import {withNamespaces} from "react-i18next";
import ElementHeader from "./partials/elementHeader/Index.jsx";
import ElementList from "./partials/elementsTable/Index.jsx";
import ElementModal from "./partials/elementModal/Index.jsx";
import {useParams} from "react-router-dom";

function Index({t}) {
    const [openElementForm, setOpenElementForm] = useState(false)
    const [elements, setElements] = useState([])
    const {form_id} = useParams()
    const[isEditForm,setIsEditForm]=useState(false)
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
        setOpenElementForm(false)
        setElement(constElement)
    }

    return (<>
        <ElementHeader setOpenElementForm={setOpenElementForm} setIsEditForm={setIsEditForm}/>
        <ElementModal isEditForm={isEditForm} element={element} setElement={setElement} setElements={setElements} closeForm={closeForm} openElementForm={openElementForm}/>
        <ElementList setIsEditForm={setIsEditForm} elements={elements} setElements={setElements} setOpenElementForm={setOpenElementForm} setElement={setElement}/>
    </>)
}

export default withNamespaces('translation')(Index)
