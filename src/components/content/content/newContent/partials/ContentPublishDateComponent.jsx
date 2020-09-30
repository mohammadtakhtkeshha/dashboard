import React, {useContext} from "react";
import clsx from "clsx";

import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import DatePickerrComponent from "components/partials/DatePickerrComponent";
import {StyledTypographyError} from "assets/js/App";
import NewContentContext from "contexts/NewContentContext";
import {globalCss} from "assets/js/globalCss";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";
import {validateDate} from "./textContent/index";
import {
    StyledFlexItem,
    StyledStatusButton,
    StyledStatusButtonBlock,
    StyledFlexBox
} from "assets/js/content/newContent/contentPublishDate";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const gClass = makeStyles(globalCss);

function CategoryAndDescriptionComponent({t}) {
    const gClasses = gClass();
    const lang = i18next.language;
    const newContentContext = useContext(NewContentContext);

    const passedDate = (field, date) => {
        validateDate(field, date, newContentContext, t);
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

    return (<StyledFlexBox>
        <StyledFlexItem>
            <Box className={clsx('date', lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>
                <DatePickerrComponent
                    placeholder={t('contents:choosePublishDate')}
                    passedDate={(e) => passedDate('publish_on', e)}
                    selectedDate={newContentContext.publishDate}
                    setSelectedDate={newContentContext.setPublishDate}/>
                {newContentContext.errors.publish_on ?
                    <StyledTypographyError
                        className="error">{newContentContext.errors.publish_on}</StyledTypographyError> : ''}
            </Box>
            <Box className={clsx('date', lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>
                <DatePickerrComponent passedDate={(e) => passedDate('unpublish_on', e)}
                                      placeholder={t('contents:chooseUnpublishDate')}
                                      selectedDate={newContentContext.unpublishDate}
                                      setSelectedDate={newContentContext.setUnpublishDate}/>
                {newContentContext.errors.unpublish_on ?
                    <StyledTypographyError
                        className="error">{newContentContext.errors.unpublish_on}</StyledTypographyError> : ''}
            </Box>
        </StyledFlexItem>
        <StyledFlexItem>
            <StyledStatusButtonBlock>
                <StyledStatusButton value="true" status={newContentContext.content.status} onClick={handleStatusChange}>
                    {t('contents:published')}
                </StyledStatusButton>
                <StyledStatusButton value="false" status={newContentContext.content.status}
                                    onClick={handleStatusChange}>
                    {t('contents:unpublished')}
                </StyledStatusButton>
            </StyledStatusButtonBlock>
            <Box className={clsx('items', lang === 'en' ? gClasses.ltr : gClasses.rtl)}>
                <Box className={clsx('select', 'card', lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>
                    <Typography
                        className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:sendToAllAffiliates')}</Typography>
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
        </StyledFlexItem>
    </StyledFlexBox>);
}

export default withNamespaces('translation')(CategoryAndDescriptionComponent);