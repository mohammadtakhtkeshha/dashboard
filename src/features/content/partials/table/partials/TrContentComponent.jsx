import React, {useContext} from "react"
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {StyledCheckboxImgInTable, StyledTableCell, StyledTr} from "assets/js/library/components/table";
import StyledCheckboxComponent from "features/partials/StyledCheckboxComponent";

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
import {get} from "libraries/local-storage";

function TrContentComponent({t, content, setSelectedCheckBoxes, selectedCheckBoxes, handleOpenContentForm}) {
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER));
    const currentUser = JSON.parse(get(process.env.REACT_APP_USER)).accountName;
    let leftRightAlign = lang === "en" ? "left" : "right"

    /*Description:permission for delete and
     edit for own content and any content is
    *different
    *@return :object
    * */

    let hasPermission = (author, contentType, editOrDelete) => {
        if (author === currentUser) {
            return `${permissions[`${editOrDelete} own ${contentType} content`]?.access}`;
        } else {
            return`${permissions[`${editOrDelete} own ${contentType} content`]?.access}`;
        }
    }

    const isCheckedHandler = (e, content) => {
        isCheckedHandlerMethod(e, content, setSelectedCheckBoxes, selectedCheckBoxes);
    }

    const confirmDeleteHandler = (e) => {
        confirmDeleteHandlerMethod(e, setLoading, contentsContext)
    }

    return (<StyledTr>
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
            {content.uid}
        </StyledTableCell>
        <StyledTableCell width="5" align="center" minWidth={58}>
            {content.created}
        </StyledTableCell>
        <StyledTableCell width="5" align="center" minWidth={58}>
            <StyledActionsBlock>
                <StyledActionButtons
                    permission={hasPermission(content.uid, content.en_type, 'delete')}
                    value={content.nid}
                    onClick={confirmDeleteHandler}>
                    <img src={deleteIcon} alt=""/>
                </StyledActionButtons>
                <StyledActionButtons
                    // permission={`${permissions[`create ${value.machin_name} content`].access}`}
                    permission={hasPermission(content.uid, content.en_type, 'edit')}
                    value={content.nid}
                    onClick={(e) => handleOpenContentForm(e, content.uid)}>
                    <img src={editIcon} alt=""/>
                </StyledActionButtons>
            </StyledActionsBlock>
        </StyledTableCell>
    </StyledTr>)
}

export default withNamespaces('contents')(TrContentComponent);
