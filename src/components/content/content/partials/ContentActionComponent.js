import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box} from "@material-ui/core";

import {primary, red, blue} from "components/partials/Colors";
import ContentsContext from "contexts/ContentsContext";
import {StyledButton,StyledMultiButtonsBlock} from "assets/js/App";
import contentService from 'core/services/content.service'
import AppContext from "contexts/AppContext";
import {multiAction} from "../index";

function ContentActionComponent({t, selectedCheckBoxes}) {
    const lang = i18next.language;
    const appContext = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);
    const actions = [
        {value: 'delete', label: t('translation:delete'), color: red[1]},
        {value: 'block', label: t('translation:unpublished'), color: blue[1]},
        {value: 'noBlock', label: t('translation:published'), color: primary}
    ];

    let doAction = (e) => {
        const action = e.currentTarget.value;
        if (action === 'delete') {
            contentService.handleContentAction('deleted', selectedCheckBoxes, appContext.handleError).then(() => {
                const currentContents = multiAction(selectedCheckBoxes,contentsContext.contents,'delete');
                contentsContext.handlePagination(currentContents, 'deletedSuccessfully');
            });

        } else if (action === 'block') {
           contentService.handleContentAction('false', selectedCheckBoxes,appContext.handleError).then(()=>{
                const currentContents =multiAction(selectedCheckBoxes,contentsContext.contents,'false');
                contentsContext.handlePagination(currentContents, 'successDone');
            });
        } else {
            contentService.handleContentAction('true', selectedCheckBoxes, appContext.handleError).then(()=>{
                const currentContents =multiAction(selectedCheckBoxes,contentsContext.contents,'true');
                contentsContext.handlePagination(currentContents,'successDone');
            });
        }
    }

    return (
        <Box>
            <StyledMultiButtonsBlock lang={lang}>
                {actions.map((option) => (
                    <StyledButton onClick={doAction} bg={option.color} key={option.value} value={option.value}>
                        {option.label}
                    </StyledButton>
                ))}
            </StyledMultiButtonsBlock>
        </Box>
    );
}

export default withNamespaces('contents')(ContentActionComponent);
