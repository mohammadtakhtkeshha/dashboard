import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import ContentsContext from "contexts/ContentsContext";
import {
    StyledTr,
    StyledTableHeadTr,
    StyledTable,
    StyledCheckboxImgInTable,
    StyledTableCell
} from "assets/js/library/components/table"
import StyledCheckboxComponent from "infrastructure/authorized/partials/StyledCheckboxComponent";
import AppContext from "contexts/AppContext";
import { allCheckboxHandlerMethod} from "./ContentTableComponent.js"
import TrContentComponent from "./partials/TrContentComponent.jsx";

function ContentTableComponent({t, selectedCheckBoxes, setSelectedCheckBoxes, page, handleOpenContentForm}) {
    const contentsContext = useContext(ContentsContext);
    const appContext = useContext(AppContext);
    const lang = i18next.language;

    let leftRightAlign = lang === "en" ? "left" : "right"

    const allCheckboxHandler = (e) => {
        allCheckboxHandlerMethod(e, contentsContext, page, setSelectedCheckBoxes)
    }

    return (<StyledTable>
        <StyledTableHeadTr>
            {/*<StyledTableCell width="10" align={leftRightAlign} minWidth="92">*/}
            {/*    <StyledCheckboxImgInTable minWidth="100">*/}
            {/*        <StyledCheckboxComponent*/}
            {/*            checked={selectedCheckBoxes.length === appContext.perPage}*/}
            {/*            change={allCheckboxHandler}*/}
            {/*            inputProps={{'aria-label': 'primary checkbox'}}/>*/}
            {/*        <div>{t('translation:image')}</div>*/}
            {/*    </StyledCheckboxImgInTable>*/}
            {/*</StyledTableCell>*/}
            <StyledTableCell width="70" align={leftRightAlign}>
                <StyledCheckboxImgInTable minWidth="100">
                    <StyledCheckboxComponent
                        checked={selectedCheckBoxes.length === appContext.perPage}
                        change={allCheckboxHandler}
                        inputProps={{'aria-label': 'primary checkbox'}}/>
                    <div>{t('translation:title')}</div>
                </StyledCheckboxImgInTable>
            </StyledTableCell>
            <StyledTableCell width="5" align="center" minWidth={58}>{t('translation:type')}</StyledTableCell>
            <StyledTableCell width="10" align="center" minWidth={94}>{t('translation:status')}</StyledTableCell>
            <StyledTableCell width="5" align="center">{t('translation:author')}</StyledTableCell>
            <StyledTableCell width="5" align="center" minWidth={58}> {t('translation:date')}</StyledTableCell>
            <StyledTableCell width="5" align="center" minWidth={58}>
            </StyledTableCell>
        </StyledTableHeadTr>
        {contentsContext.chunkContents !== undefined && contentsContext.chunkContents.length > 0 ?
            (contentsContext.chunkContents[page]?.map((content, index) =>
                <React.Fragment key={index}>
                    <TrContentComponent content={content} handleOpenContentForm={handleOpenContentForm} setSelectedCheckBoxes={setSelectedCheckBoxes} selectedCheckBoxes={selectedCheckBoxes}/>
                </React.Fragment>
            ))
            : (
                <StyledTr>
                    <StyledTableCell align="center">
                        {t('translation:notFoundRecord')}
                    </StyledTableCell>
                </StyledTr>
            )}
    </StyledTable>);
}

export default withNamespaces('contents')(ContentTableComponent);
