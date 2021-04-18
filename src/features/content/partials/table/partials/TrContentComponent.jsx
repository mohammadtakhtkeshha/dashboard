import React, {useContext} from "react"
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {StyledCheckboxImgInTable, StyledTableCell, StyledTr} from "assets/js/library/components/table";
import StyledCheckboxComponent from "infrastructure/authorized/partials/StyledCheckboxComponent";

import {
    StyledActionButtons,
    StyledActionsBlock,
    StyledStatusButton
} from "assets/js/library/components/buttons";
import deleteIcon from "assets/svg/delete.png";
import editIcon from "assets/svg/edit.png";
import {confirmDeleteHandlerMethod, isCheckedHandlerMethod} from "./TrContentComponent.js";
import AppContext from "contexts/AppContext";
import ContentsContext from "contexts/ContentsContext";

function TrContentComponent({t, content, setSelectedCheckBoxes, selectedCheckBoxes,handleOpenContentForm}) {
    const lang = i18next.language;
    const appContext = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);

    let leftRightAlign = lang === "en" ? "left" : "right"
    const isCheckedHandler = (e, content) => {
        isCheckedHandlerMethod(e, content, setSelectedCheckBoxes, selectedCheckBoxes);
    }

    const confirmDeleteHandler = (e) => {
        confirmDeleteHandlerMethod(e, t, appContext, contentsContext)
    }


    return (<StyledTr>
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
    </StyledTr>)
}

export default withNamespaces('contents')(TrContentComponent);
