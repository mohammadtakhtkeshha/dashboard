import React, {useContext} from "react";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";

import DatePickerrComponent from "components/partials/DatePickerrComponent";
import {StyledTypographyError, StyledAlignTypography} from "assets/js/App";
import NewContentContext from "contexts/NewContentContext";
import ContentsContext from "contexts/ContentsContext";
import {
    validateDate,
    handleStatusChangeMethod
} from "./FormContentPublishDateComponent.js";
import {
    StyledRow,
    StyledStatusButton,
    StyledStatusButtonBlock,
    StyledRowBox,
    StyledCol, StyledStatusBlock
} from "assets/js/content/partials/new/contentPublishDate";

function CategoryAndDescriptionComponent({t}) {
    const lang = i18next.language;
    let antiAlign = (lang === 'en' ? 'right' : 'left');
    const newContentContext = useContext(NewContentContext);
    const contentsContext = useContext(ContentsContext);

    const passedDate = (field, date) => {
        validateDate(field, date, newContentContext, t);
    }

    const handleStatusChange = (e) => {
        handleStatusChangeMethod(e, newContentContext);
    }

    return (<StyledRowBox>
        <StyledRow>
            <StyledCol>
                <DatePickerrComponent
                    placeholder={t('contents:choosePublishDate')}
                    passedDate={(e) => passedDate('publish_on', e)}
                    selectedDate={newContentContext.publishDate}
                    setSelectedDate={newContentContext.setPublishDate}/>
                {contentsContext.errors.publish_on ?
                    <StyledTypographyError>{contentsContext.errors.publish_on}</StyledTypographyError> : ''}
            </StyledCol>
            <StyledCol>
                <StyledStatusBlock>
                    <StyledStatusButtonBlock align={antiAlign}>
                        <StyledStatusButton value="true" status={contentsContext.content.status}
                                            onClick={handleStatusChange}>
                            {t('contents:published')}
                        </StyledStatusButton>
                        <StyledStatusButton value="false" status={contentsContext.content.status}
                                            onClick={handleStatusChange}>
                            {t('contents:unpublished')}
                        </StyledStatusButton>
                    </StyledStatusButtonBlock>
                </StyledStatusBlock>
            </StyledCol>
        </StyledRow>
        <StyledRow>
            <StyledCol>
                <DatePickerrComponent passedDate={(e) => passedDate('unpublish_on', e)}
                                      placeholder={t('contents:chooseUnpublishDate')}
                                      selectedDate={newContentContext.unpublishDate}
                                      setSelectedDate={newContentContext.setUnpublishDate}/>
                {contentsContext.errors.unpublish_on ?
                    <StyledTypographyError>{contentsContext.errors.unpublish_on}</StyledTypographyError> : ''}
            </StyledCol>
        </StyledRow>
    </StyledRowBox>);
}

export default withNamespaces('translation')(CategoryAndDescriptionComponent);