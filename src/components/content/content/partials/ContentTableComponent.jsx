import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";

import {CardMedia, Typography} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";

import contentImg from "assets/media/image/user.jpg";
import ContentsContext from "contexts/ContentsContext";
import {
    StyledActionButtonBlock, StyledTable,
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
    StyledTableCell,
    StyledCheckboxImgInTable
} from "assets/js/App";
import StyledCheckboxComponent from "components/partials/StyledCheckboxComponent";
import AppContext from "contexts/AppContext";
import {isCheckedHandlerMethod,confirmDeleteHandlerMethod,allCheckboxHandlerMethod} from "./ContentTableComponent.js"

function ContentTableComponent({t, selectedCheckBoxes, setSelectedCheckBoxes, page, handleOpenContentForm}) {
    const contentsContext = useContext(ContentsContext);
    const appContext = useContext(AppContext);

    const allCheckboxHandler = (e) => {
        allCheckboxHandlerMethod(e,contentsContext,page,setSelectedCheckBoxes)
    }

    const isCheckedHandler = (e, content) => {
        isCheckedHandlerMethod(e,content,setSelectedCheckBoxes,selectedCheckBoxes);
    }

    const confirmDeleteHandler = (e) => {
        confirmDeleteHandlerMethod(e,t,appContext,contentsContext)
    }

    return (<StyledTable>
        <StyledTableHeadRow>
            <StyledTableCell align="right">
                <StyledCheckboxImgInTable>
                <StyledCheckboxComponent
                    checked={selectedCheckBoxes.length === appContext.perPage}
                    change={allCheckboxHandler}
                    inputProps={{'aria-label': 'primary checkbox'}}/>
                <div>{t('translation:image')}</div>
                </StyledCheckboxImgInTable>
                </StyledTableCell>
            <StyledTableCell align="right">{t('translation:title')}</StyledTableCell>
            <StyledTableCell align="right">{t('translation:type')}</StyledTableCell>
            <StyledTableCell align="right">{t('translation:status')}</StyledTableCell>
            <StyledTableCell align="right"> {t('translation:date')}</StyledTableCell>
            <StyledTableCell align="right">{t('translation:actions')}</StyledTableCell>
        </StyledTableHeadRow>
        {contentsContext.chunkContents !== undefined ?
            <StyledTableBody>
                {contentsContext.chunkContents.length > 0 ?
                    contentsContext.chunkContents[page]?.map((content, index) =>
                        <StyledTableBodyRow key={index}>
                            <StyledTableCell align="right">
                                <StyledCheckboxImgInTable>
                                <StyledCheckboxComponent change={(e) => isCheckedHandler(e, content)}
                                                         inputProps={{'aria-label': 'primary checkbox'}}
                                                         checked={selectedCheckBoxes.includes(content.nid)}/>
                                <CardMedia id="img">
                                    {content.field_image ? <img src={content.field_image} alt="content.name"/> :
                                        <img src={contentImg}/>}
                                </CardMedia>
                                </StyledCheckboxImgInTable>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <div dangerouslySetInnerHTML={{__html: (content.title)}}></div>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {content.type}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {content.status === "true" ? t('translation:published') : t('translation:unpublished')}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {content.created}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <StyledActionButtonBlock>
                                    <button value={content.nid} onClick={handleOpenContentForm}>
                                        <Typography>
                                            {t('translation:edit')}
                                        </Typography>
                                    </button>
                                    <button value={content.nid} onClick={confirmDeleteHandler}>
                                        {t('translation:delete')}
                                    </button>
                                </StyledActionButtonBlock>
                            </StyledTableCell>
                        </StyledTableBodyRow>
                    ) :
                    <StyledTableBodyRow>
                        <StyledTableCell>
                            {t('translation:notFoundRecord')}
                        </StyledTableCell>
                    </StyledTableBodyRow>
                }
            </StyledTableBody>
            : <TableBody>
                <StyledTableBodyRow>
                    <StyledTableCell align="right">
                        {t('translation:notFoundRecord')}
                    </StyledTableCell>
                </StyledTableBodyRow>
            </TableBody>}
    </StyledTable>);
}

export default withNamespaces('contents')(ContentTableComponent);
