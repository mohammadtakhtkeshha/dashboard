import React, {useContext} from "react";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";

import DatePickerrComponent from "components/partials/DatePickerrComponent";
import {StyledTypographyError} from "assets/js/App";
import {Grid} from "@material-ui/core";
import ContentsContext from "contexts/ContentsContext";
import {withStyles} from "@material-ui/core/styles";
import {
    validateDate,
    handleStatusChangeMethod
} from "./FormContentPublishDateComponent.js";
import {
    StyledStatusButton,
    StyledStatusButtonBlock,
    StyledGridBlock,
    StyledStatusBlock,
    ButtonBlock
} from "assets/js/content/partials/new/contentPublishDate";

const StyledGrid = withStyles(ButtonBlock)(Grid);

function CategoryAndDescriptionComponent({t}) {
    const lang = i18next.language;
    let antiAlign = (lang === 'en' ? 'right' : 'left');
    const contentsContext = useContext(ContentsContext);

    const passedDate = (field, date) => {
        validateDate(field, date, contentsContext, t);
    }

    const handleStatusChange = (e) => {
        handleStatusChangeMethod(e, contentsContext);
    }

    const setSelectedDate = (date, field) => {
        if (date !== null && field !== undefined) {
            contentsContext.setContent(prevState => {
                return {
                    ...prevState, [field]: date
                }
            });
        }
    }

    return (<Grid container>
        <Grid item xs={6}>
            <StyledGridBlock>
                <DatePickerrComponent
                    currentKey={'publish_on'}
                    placeholder={t('contents:choosePublishDate')}
                    passedDate={(e) => passedDate('publish_on', e)}
                    selectedDate={contentsContext.content.publish_on || null}
                    setSelectedDate={setSelectedDate}/>
                {contentsContext.errors.publish_on ?
                    <StyledTypographyError>{contentsContext.errors.publish_on}</StyledTypographyError> : ''}
            </StyledGridBlock>
        </Grid>
        <Grid item xs={6}>
            <StyledGridBlock>
                <DatePickerrComponent currentKey={'unpublish_on'}
                                      placeholder={t('contents:chooseUnpublishDate')}
                                      passedDate={(e) => passedDate('unpublish_on', e)}
                                      selectedDate={contentsContext.content.unpublish_on || null}
                                      setSelectedDate={setSelectedDate}/>
                {contentsContext.errors.unpublish_on ?
                    <StyledTypographyError>{contentsContext.errors.unpublish_on}</StyledTypographyError> : ''}
            </StyledGridBlock>
        </Grid>
        <StyledGrid item xs={12}>
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
        </StyledGrid>
    </Grid>);
}

export default withNamespaces('translation')(CategoryAndDescriptionComponent);
