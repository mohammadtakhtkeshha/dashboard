import React, {useEffect, useContext} from 'react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";
import { useParams } from "react-router";

import ElementLiComponent from "./paritals/ElementLiComponent.jsx";
import {getElementsListMethod} from "./Index.js"
import AppContext from "contexts/AppContext";
import {StyledTable, StyledTableCell, StyledTableHeadTr} from "assets/js/library/components/table";

function Index({t,elements,setElements,setOpenElementForm,setElement,setIsEditForm}) {
    const lang = i18next.language
    const {setLoading} = useContext(AppContext);
    let align = lang === 'en' ? 'left' : 'right'
    let { form_id } = useParams();

    useEffect(() => {
        getElementsListMethod(setLoading,form_id,setElements)
    }, [setLoading,setElements,form_id]);//once

    return (<StyledTable>
        <StyledTableHeadTr>
            <StyledTableCell width="69" align={align} minWidth={58}>{t('translation:title')}</StyledTableCell>
            <StyledTableCell width="5" align="center" minWidth={58}>{t('translation:key')}</StyledTableCell>
            <StyledTableCell width="10" align="center" minWidth={58}>{t('translation:type')}</StyledTableCell>
            <StyledTableCell width="5" align="center" minWidth={58}>{t('translation:compulsory')}</StyledTableCell>
            <StyledTableCell width="11" align="center" minWidth={58}></StyledTableCell>
        </StyledTableHeadTr>
        <ElementLiComponent setIsEditForm={setIsEditForm} setElement={setElement} elements={elements} setElements={setElements} setOpenElementForm={setOpenElementForm}/>
    </StyledTable>)
}

export default withNamespaces('translation')(Index)
