import React, {useEffect, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import ElementLiComponent from "./paritals/ElementLiComponent";
import {getElementsListMethod} from "./Index.js"
import AppContext from "contexts/AppContext";
import {StyledTable, StyledTableCell, StyledTableHeadTr} from "assets/js/library/components/table";

function Index({t,elements,setElements}) {
    const history = useHistory();
    const lang = i18next.language
    const {setLoading} = useContext(AppContext);
    let align = lang === 'en' ? 'left' : 'right'

    useEffect(() => {
        getElementsListMethod(setLoading,history.location.pathname.split('/').pop(),setElements)
    }, [setLoading,setElements,history.location.pathname]);//once

    return (<StyledTable>
        <StyledTableHeadTr>
            <StyledTableCell width="69" align={align} minWidth={58}>{t('translation:title')}</StyledTableCell>
            <StyledTableCell width="5" align="center" minWidth={58}>{t('translation:key')}</StyledTableCell>
            <StyledTableCell width="10" align="center" minWidth={58}>{t('translation:type')}</StyledTableCell>
            <StyledTableCell width="5" align="center" minWidth={58}>{t('translation:compulsory')}</StyledTableCell>
            <StyledTableCell width="11" align="center" minWidth={58}></StyledTableCell>
        </StyledTableHeadTr>
        <ElementLiComponent elements={elements} setElements={setElements}/>
    </StyledTable>)
}

export default withNamespaces('translation')(Index)
