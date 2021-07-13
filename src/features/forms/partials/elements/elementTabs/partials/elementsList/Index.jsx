import React, {useContext, useState} from 'react';
import {withNamespaces} from "react-i18next";
import {useParams} from "react-router-dom";

import {Typography} from "@material-ui/core";

import ElementHeader from "./partials/elementHeader/Index.jsx";
import ElementList from "./partials/elementsTable/Index.jsx";
import ElementModal from "./partials/elementModal/Index.jsx";
import {StyledGreenButton} from "assets/js/library/components/buttons";
import {requiredMethod} from "./Index.js";
import AppContext from "contexts/AppContext";

function Index({t}) {
    const [openElementForm, setOpenElementForm] = useState(false)
    const [elements, setElements] = useState([])
    const {form_id} = useParams()
    const [isEditForm, setIsEditForm] = useState(false)
    const [required, setRequired] = useState([]);
    const constElement = {
        "form_id": form_id,
        "field_required": false,
        "field_title": "",
        "field_type": "",
        "field_id": "",
        "admin_title": ""
    }
    const [element, setElement] = useState(constElement);
    const {setLoading} = useContext(AppContext);

    const closeForm = () => {
        setOpenElementForm(false)
        setElement(constElement)
    }

    return (<>
        <ElementHeader
            setOpenElementForm={setOpenElementForm}
            setIsEditForm={setIsEditForm}
        />
        <ElementModal
            isEditForm={isEditForm}
            element={element}
            setElement={setElement}
            setElements={setElements}
            closeForm={closeForm}
            openElementForm={openElementForm}/>
        <ElementList
            setIsEditForm={setIsEditForm}
            elements={elements}
            setElements={setElements}
            setOpenElementForm={setOpenElementForm}
            setRequired={setRequired}
            setElement={setElement}
        />
        <StyledGreenButton onClick={() => requiredMethod(setLoading, required)}>
            <Typography>{t('translation:makeRequire')}</Typography>
        </StyledGreenButton>
    </>)
}

export default withNamespaces('translation')(Index)
