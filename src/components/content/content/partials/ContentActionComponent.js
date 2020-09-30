import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box} from "@material-ui/core";

import ContentsContext from "contexts/ContentsContext";
import {StyledDeleteButton, StyledEditButton, StyledMultiButtonsBlock, StyledRegisterButton} from "assets/js/App";
import contentService from 'core/services/content.service'
import AppContext from "contexts/AppContext";
import {multiAction} from "../index";

function ContentActionComponent({t, selectedCheckBoxes}) {
    const lang = i18next.language;
    const appContext = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);

    const doAction = (e) => {
        const action = e.currentTarget.value;
        if (action === 'delete') {
            contentService.handleContentAction('deleted', selectedCheckBoxes, appContext.handleError).then(() => {
                const currentContents = multiAction(selectedCheckBoxes, contentsContext.contents, 'delete');
                contentsContext.handlePagination(currentContents, 'deletedSuccessfully');
            });

        } else if (action === 'block') {
            contentService.handleContentAction('false', selectedCheckBoxes, appContext.handleError).then(() => {
                const currentContents = multiAction(selectedCheckBoxes, contentsContext.contents, 'false');
                contentsContext.handlePagination(currentContents, 'successDone');
            });
        } else {
            contentService.handleContentAction('true', selectedCheckBoxes, appContext.handleError).then(() => {
                const currentContents = multiAction(selectedCheckBoxes, contentsContext.contents, 'true');
                contentsContext.handlePagination(currentContents, 'successDone');
            });
        }
    }

    return (
        <Box>
            <StyledMultiButtonsBlock lang={lang}>
                <StyledRegisterButton value="noBlock" onClick={doAction}>
                    {t('translation:published')}
                </StyledRegisterButton>
                <StyledEditButton value="block" onClick={doAction}>
                    {t('translation:unpublished')}
                </StyledEditButton>
                <StyledDeleteButton value="delete" onClick={doAction}>
                    {t('translation:delete')}
                </StyledDeleteButton>
            </StyledMultiButtonsBlock>
        </Box>
    );
}

export default withNamespaces('contents')(ContentActionComponent);
