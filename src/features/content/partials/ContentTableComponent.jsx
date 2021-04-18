import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import ContentsContext from "contexts/ContentsContext";
import {
    StyledActionsBlock,
    StyledActionButtons
} from "assets/js/App";
import {
    StyledTr,
    StyledTableHeadTr,
    StyledTable,
    StyledCheckboxImgInTable,
    StyledTableCell
} from "assets/js/library/components/table"
import {StyledStatusButton} from "assets/js/library/components/buttons"
import StyledCheckboxComponent from "infrastructure/authorized/partials/StyledCheckboxComponent";
import AppContext from "contexts/AppContext";
import {isCheckedHandlerMethod, confirmDeleteHandlerMethod, allCheckboxHandlerMethod} from "./ContentTableComponent.js"
import deleteIcon from "assets/svg/delete.png";
import editIcon from "assets/svg/edit.png";

function ContentTableComponent({t, selectedCheckBoxes, setSelectedCheckBoxes, page, handleOpenContentForm}) {
    const contentsContext = useContext(ContentsContext);
    const appContext = useContext(AppContext);
    const lang = i18next.language;
    let leftRightAlign = lang === "en" ? "left" : "right"

    const allCheckboxHandler = (e) => {
        allCheckboxHandlerMethod(e, contentsContext, page, setSelectedCheckBoxes)
    }

    const isCheckedHandler = (e, content) => {
        isCheckedHandlerMethod(e, content, setSelectedCheckBoxes, selectedCheckBoxes);
    }

    const confirmDeleteHandler = (e) => {
        confirmDeleteHandlerMethod(e, t, appContext, contentsContext)
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
                {/*{t('translation:actions')}*/}
            </StyledTableCell>
        </StyledTableHeadTr>
        {contentsContext.chunkContents !== undefined && contentsContext.chunkContents.length > 0 ?
            (contentsContext.chunkContents[page]?.map((content, index) =>
                <React.Fragment key={index}>
                    <StyledTr>
                        {/*<StyledTableCell width="10" align={leftRightAlign}  minWidth="92" >*/}
                        {/*<StyledCheckboxImgInTable minWidth="100">*/}
                        {/*    <StyledCheckboxComponent change={(e) => isCheckedHandler(e, content)}*/}
                        {/*                             inputProps={{'aria-label': 'primary checkbox'}}*/}
                        {/*                             checked={selectedCheckBoxes.includes(content.nid)}/>*/}
                        {/*<StyledTableImg>*/}
                        {/*{content.field_image ? <img src={content.field_image} alt="content.name"/> :*/}
                        {/*    <img src={contentImg}/>}*/}
                        {/*</StyledTableImg>*/}
                        {/*</StyledCheckboxImgInTable>*/}
                        {/*</StyledTableCell>*/}
                        <StyledTableCell width="70" align={leftRightAlign} minWidth="92">
                            <StyledCheckboxImgInTable width="60" align={leftRightAlign}>
                                <StyledCheckboxComponent change={(e) => isCheckedHandler(e, content)}
                                                         inputProps={{'aria-label': 'primary checkbox'}}
                                                         checked={selectedCheckBoxes.includes(content.nid)}/>
                                <div dangerouslySetInnerHTML={{__html: (content.title)}}></div>
                            </StyledCheckboxImgInTable>
                        </StyledTableCell>
                        <StyledTableCell width="5" align="center" minWidth={58}>
                            {content.type}
                        </StyledTableCell>
                        <StyledTableCell width="10" align="center" minWidth={94}>
                            <StyledStatusButton status={content.status}>
                                {content.status === "true" ? t('translation:published') : t('translation:unpublished')}
                            </StyledStatusButton>
                        </StyledTableCell>
                        <StyledTableCell width="5" align="center" minWidth="50">
                            {/*{content.status === "true" ? t('translation:published') : t('translation:unpublished')}*/}
                            {content.uid}
                        </StyledTableCell>
                        <StyledTableCell width="5" align="center" minWidth={58}>
                            {content.created}
                        </StyledTableCell>
                        <StyledTableCell width="5" align="center" minWidth={58}>
                            {/*<StyledActionButtonBlock>*/}
                            {/*    <button value={content.nid} onClick={handleOpenContentForm}>*/}
                            {/*        <Typography>*/}
                            {/*            {t('translation:edit')}*/}
                            {/*        </Typography>*/}
                            {/*    </button>*/}
                            {/*    <button value={content.nid} onClick={confirmDeleteHandler}>*/}
                            {/*        {t('translation:delete')}*/}
                            {/*    </button>*/}
                            {/*</StyledActionButtonBlock>*/}

                            <StyledActionsBlock>
                                <StyledActionButtons value={content.nid} onClick={confirmDeleteHandler}>
                                    <img src={deleteIcon} alt=""/>
                                </StyledActionButtons>
                                <StyledActionButtons value={content.nid} onClick={handleOpenContentForm}>
                                    <img src={editIcon} alt=""/>
                                </StyledActionButtons>
                            </StyledActionsBlock>
                        </StyledTableCell>
                    </StyledTr>
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
