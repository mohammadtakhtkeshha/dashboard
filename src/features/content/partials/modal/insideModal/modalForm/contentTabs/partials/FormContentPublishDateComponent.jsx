import React, {useContext} from "react";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";

import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

import DatePickerrComponent from "infrastructure/authorized/partials/DatePickerrComponent";
import {StyledStatusButtons, StyledStatusButtonBlock} from "assets/js/library/components/buttons";
import {StyledTypographyError} from "assets/js/library/base/typography";
import ContentsContext from "contexts/ContentsContext";
import {
    validateDate,
    handleStatusChangeMethod,
    handleShowInMainPageMethod,
    handleShowInSidebarMethod
} from "./FormContentPublishDateComponent.js";
import {
    StyledGridBlock,
    StyledTypography,
    styledGridHomeSlider,
    styledGrid,
    styledGridPublishOnAndUnpublish,
    styledGridSidebarSlider
} from "assets/js/content/partials/new/contentPublishDate";

const StyledGridHomeSlider = withStyles(styledGridHomeSlider)(Grid);
const StyledGridPublishOnAndUnpublish = withStyles(styledGridPublishOnAndUnpublish)(Grid);
const StyledGridSidebarSlider = withStyles(styledGridSidebarSlider)(Grid);
const StyledGrid = withStyles(styledGrid)(Grid);

function CategoryAndDescriptionComponent({t, contentype}) {
    const contentsContext = useContext(ContentsContext);
    const lang = i18next.language;
    let antiAlign = (lang === 'en' ? 'right' : 'left');

    const passedDate = (field, date) => {
        validateDate(field, date, contentsContext, t);
    }

    const handleStatusChange = (e) => {
        handleStatusChangeMethod(e, contentsContext);
    }

    const handleShowInMainPage = (e) => {
        handleShowInMainPageMethod(e, contentsContext);
    }

    const handleShowInSidebar = (e) => {
        handleShowInSidebarMethod(e, contentsContext);
    }

    const setSelectedDate = (date, field) => {
        // if (date !== null && field !== undefined) {
        //     contentsContext.setContent(prevState => {
        //         return {
        //             ...prevState, [field]: [{value:date}]
        //         }
        //     });
        // }
    }

    return (<Grid container>
        <StyledGridPublishOnAndUnpublish className="publish-date" contentype={contentsContext.content.type[0].target_id}
                                         item xs={6}>
            <StyledGridBlock>
                <DatePickerrComponent
                    currentKey={'publish_on'}
                    placeholder={t('contents:choosePublishDate')}
                    passedDate={(e) => passedDate('publish_on', e)}
                    selectedDate={contentsContext.content.publish_on ? (contentsContext.content.publish_on.length > 0 ? (contentsContext.content.publish_on[0].value) : null) : null}
                    setSelectedDate={setSelectedDate}/>
                {contentsContext.errors.publish_on ?
                    <StyledTypographyError>{contentsContext.errors.publish_on}</StyledTypographyError> : ''}
            </StyledGridBlock>
        </StyledGridPublishOnAndUnpublish>
        <StyledGridPublishOnAndUnpublish className="unpublish-date"
                                         contentype={contentsContext.content.type[0].target_id} item xs={6}>
            <StyledGridBlock>
                <DatePickerrComponent currentKey={'unpublish_on'}
                                      placeholder={t('contents:chooseUnpublishDate')}
                                      passedDate={(e) => passedDate('unpublish_on', e)}
                                      selectedDate={contentsContext.content.unpublish_on ? (contentsContext.content.unpublish_on.length > 0 ? (contentsContext.content.unpublish_on[0].value) : null) : null}
                                      setSelectedDate={setSelectedDate}/>
                {contentsContext.errors.unpublish_on ?
                    <StyledTypographyError>{contentsContext.errors.unpublish_on}</StyledTypographyError> : ''}
            </StyledGridBlock>
        </StyledGridPublishOnAndUnpublish>
        <StyledGridHomeSlider className="show-in-main-page" contentype={contentype} item xs={4}>
            <StyledGridBlock>
                <StyledTypography>
                    {t('contents:showInMainPage')}
                </StyledTypography>
                <StyledStatusButtonBlock align={antiAlign}>
                    <StyledStatusButtons value="true"
                                         status={contentsContext.content.field_home_slider && contentsContext.content.field_home_slider[0]?.value}
                                         onClick={handleShowInMainPage}>
                        {t('translation:active')}
                    </StyledStatusButtons>
                    <StyledStatusButtons value="false"
                                         status={contentsContext.content.field_home_slider && contentsContext.content.field_home_slider[0].value}
                                         onClick={handleShowInMainPage}>
                        {t('translation:notActive')}
                    </StyledStatusButtons>
                </StyledStatusButtonBlock>
            </StyledGridBlock>
        </StyledGridHomeSlider>
        <StyledGrid item xs={4} className="publish-status">
            <StyledTypography>
                {t('contents:publishStatus')}
            </StyledTypography>
            <StyledGridBlock>
                <StyledStatusButtonBlock align={antiAlign}>
                    <StyledStatusButtons value="true" status={contentsContext.content.status[0].value}
                                         onClick={handleStatusChange}>
                        {t('translation:active')}
                    </StyledStatusButtons>
                    <StyledStatusButtons value="false" status={contentsContext.content.status[0].value}
                                         onClick={handleStatusChange}>
                        {t('translation:notActive')}
                    </StyledStatusButtons>
                </StyledStatusButtonBlock>
            </StyledGridBlock>
        </StyledGrid>
        <StyledGridSidebarSlider className="show-in-sidebar" contentype={contentype} item xs={4}>
            <StyledGridBlock>
                <StyledTypography>
                    {t('contents:showInSidebar')}
                </StyledTypography>
                <StyledStatusButtonBlock align={antiAlign}>
                    <StyledStatusButtons value="true"
                                         status={contentsContext.content.field_sidebar_news_slider && contentsContext.content.field_sidebar_news_slider[0].value}
                                         onClick={handleShowInSidebar}>
                        {t('translation:active')}
                    </StyledStatusButtons>
                    <StyledStatusButtons value="false"
                                         status={contentsContext.content.field_sidebar_news_slider && contentsContext.content.field_sidebar_news_slider[0].value}
                                         onClick={handleShowInSidebar}>
                        {t('translation:notActive')}

                    </StyledStatusButtons>
                </StyledStatusButtonBlock>
            </StyledGridBlock>
        </StyledGridSidebarSlider>
    </Grid>);
}

export default withNamespaces('translation')(CategoryAndDescriptionComponent);
