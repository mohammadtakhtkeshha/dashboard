import React, {useContext} from "react";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";

import {Box} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import DatePickerrComponent from "components/partials/DatePickerrComponent";
import {StyledTypographyError, StyledAlignTypography} from "assets/js/App";
import NewContentContext from "contexts/NewContentContext";
import ContentsContext from "contexts/ContentsContext";
import {validateDate,
    handleAffiliateChangeMethod,
    handleStatusChangeMethod
} from "./FormContentPublishDateComponent.js";
import {
    StyledRow,
    StyledStatusButton,
    StyledStatusButtonBlock,
    StyledRowBox,
    StyledCol, StyledInnerColButton
} from "assets/js/content/partials/new/contentPublishDate";

function CategoryAndDescriptionComponent({t}) {
    const lang = i18next.language;
    let currentAlign = (lang === 'en' ? 'left' : 'right');
    let antiAlign = (lang === 'en' ? 'right' : 'left');
    const newContentContext = useContext(NewContentContext);
    const contentsContext = useContext(ContentsContext);

    const passedDate = (field, date) => {
        validateDate(field, date, newContentContext, t);
    }

    const handleStatusChange = (e) => {
        handleStatusChangeMethod(e, newContentContext);
    }

    const handleAffiliateChange = (e) => {
        handleAffiliateChangeMethod(e, newContentContext);
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
                <DatePickerrComponent passedDate={(e) => passedDate('unpublish_on', e)}
                                      placeholder={t('contents:chooseUnpublishDate')}
                                      selectedDate={newContentContext.unpublishDate}
                                      setSelectedDate={newContentContext.setUnpublishDate}/>
                {contentsContext.errors.unpublish_on ?
                    <StyledTypographyError>{contentsContext.errors.unpublish_on}</StyledTypographyError> : ''}
            </StyledCol>
        </StyledRow>
        <StyledRow>
            <StyledCol>
                <StyledInnerColButton>
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
                </StyledInnerColButton>
            </StyledCol>
            <StyledCol>
                <Box>
                    <Box>
                        <StyledAlignTypography
                            align={currentAlign}>{t('contents:sendToAllAffiliates')}</StyledAlignTypography>
                        <FormGroup row>
                            <Box>
                                <FormControlLabel
                                    control={<Checkbox checked={contentsContext.content.field_domain_all_affiliates}
                                                       onChange={(e) => handleAffiliateChange(e)}
                                    />}
                                    label={t('contents:availableOnAllDomain')}
                                />
                            </Box>
                        </FormGroup>
                    </Box>
                </Box>
            </StyledCol>
        </StyledRow>
    </StyledRowBox>);
}

export default withNamespaces('translation')(CategoryAndDescriptionComponent);