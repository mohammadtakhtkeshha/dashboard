import React, {useContext} from "react";
import clsx from "clsx";

import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import DatePickerrComponent from "components/partials/DatePickerrComponent";
import {StyledTypographyError, StyledAlignTypography} from "assets/js/App";
import NewContentContext from "contexts/NewContentContext";
import {globalCss} from "assets/js/globalCss";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";
// import {validateDate} from "../../../new/insideModal/textContent";

import {
    StyledRow,
    StyledStatusButton,
    StyledStatusButtonBlock,
    StyledRowBox,
    StyledCol,StyledInnerColButton
} from "assets/js/content/partials/new/contentPublishDate";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const gClass = makeStyles(globalCss);

function CategoryAndDescriptionComponent({t}) {
    const gClasses = gClass();
    const lang = i18next.language;
    let currentAlign = (lang === 'en' ? 'left' : 'right');
    let antiAlign = (lang === 'en' ? 'right' : 'left');
    const newContentContext = useContext(NewContentContext);

    const passedDate = (field, date) => {
        // validateDate(field, date, newContentContext, t);
    }

    const handleStatusChange = (e) => {
        const status = e.currentTarget.value;
        newContentContext.setContent(prevState => {
            return {
                ...prevState, status: (status === "true" ? true : false),
            }
        });
    }

    const handleAffiliateChange = (e) => {
        const checked = e.currentTarget.checked;
        newContentContext.setContent(prevState => {
            return {
                ...prevState, field_domain_all_affiliates: checked
            }
        });
    }

    return (<StyledRowBox>
        <StyledRow>
            <StyledCol>
                <DatePickerrComponent
                    placeholder={t('contents:choosePublishDate')}
                    passedDate={(e) => passedDate('publish_on', e)}
                    selectedDate={newContentContext.publishDate}
                    setSelectedDate={newContentContext.setPublishDate}/>
                {newContentContext.errors.publish_on ?
                    <StyledTypographyError
                        className="error">{newContentContext.errors.publish_on}</StyledTypographyError> : ''}
            </StyledCol>
            <StyledCol>
                <DatePickerrComponent passedDate={(e) => passedDate('unpublish_on', e)}
                                      placeholder={t('contents:chooseUnpublishDate')}
                                      selectedDate={newContentContext.unpublishDate}
                                      setSelectedDate={newContentContext.setUnpublishDate}/>
                {newContentContext.errors.unpublish_on ?
                    <StyledTypographyError
                        className="error">{newContentContext.errors.unpublish_on}</StyledTypographyError> : ''}
            </StyledCol>
        </StyledRow>
        <StyledRow>
            <StyledCol>
                <StyledInnerColButton>
                    <StyledStatusButtonBlock align={antiAlign}>
                        <StyledStatusButton value="true" status={newContentContext.content.status}
                                            onClick={handleStatusChange}>
                            {t('contents:published')}
                        </StyledStatusButton>
                        <StyledStatusButton value="false" status={newContentContext.content.status}
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
                                    control={<Checkbox checked={newContentContext.content.field_domain_all_affiliates}
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