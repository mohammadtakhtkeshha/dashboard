import React, {useContext, useEffect} from "react"
import {withNamespaces} from "react-i18next"

import {Box} from "@material-ui/core"
import Tab from "@material-ui/core/Tab"
import {withStyles} from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"

import {
    TabPanel,
    a11yProps,
    styledTabs,
    styledTabPortal,
    styledTabFiles,
    styledTabSeo,
    StyledTabPanels
} from "assets/js/content/partials/newContent"
import ContentPublishDateComponent from "./partials/FormContentPublishDateComponent.jsx"
import SeoFormContentComponent from "./partials/FormContentSeoComponent.jsx"
import TitleAndImgComponent from "./partials/FormContentTitleAndImgComponent.jsx"
import FormContentFileComponent from "./partials/FormContentFileComponent.jsx"
import NewContentFooterComponent from "./partials/FormContentFooterComponent.jsx"
import FormDescriptionComponent from "./partials/FormContentDescriptionComponent.jsx"
import FormContentPortalComponent from "./partials/FormContentPortalComponent.jsx"
import ContentsContext from "contexts/ContentsContext"
import {
    setTitleValidationMethod,
    setFieldImageContentTypeGallaryErrorMethod,
    changeErrorsWhenFillFieldImageMethod
} from "./partials/FormContentTitleAndImgComponent.js";

const StyledTabs = withStyles(styledTabs)(Tabs);
const StyledTabPortal = withStyles(styledTabPortal)(Tab);
const StyledTabFiles = withStyles(styledTabFiles)(Tab);
const StyledTabSeo = withStyles(styledTabSeo)(Tab);

function NewContentTabsComponent({t, newsCategory, states, value, setValue}) {
    const contentContext = useContext(ContentsContext);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }

    const setTitleError = () => {
        setTitleValidationMethod(contentContext, t);
    }

    const setFieldImageContentTypeGallaryError = () => {
        setFieldImageContentTypeGallaryErrorMethod(contentContext, t);
    }

    const changeErrorsWhenFillFieldImage = () => {
        changeErrorsWhenFillFieldImageMethod(t, contentContext);

    }

    useEffect(() => {
        setTitleError();
        setFieldImageContentTypeGallaryError();
    }, []);

    useEffect(() => {
        changeErrorsWhenFillFieldImage();
    }, [contentContext.content.field_image]);

    return (<>
            <StyledTabs value={value} onChange={handleTabChange}>
                <Tab label={t('contents:title&picture')} {...a11yProps(0)} />
                <Tab label={t('translation:description')} {...a11yProps(1)} />
                <StyledTabFiles contentype={contentContext.contentType}
                                label={t('translation:files')} {...a11yProps(2)} />
                <Tab label={t('contents:publishSetting')} {...a11yProps(3)} />
                <StyledTabSeo contentype={contentContext.contentType} label={t('contents:seo')}
                              {...a11yProps(4)} />
                <StyledTabPortal contentype={contentContext.contentType}
                                 label={t('contents:portal')} {...a11yProps(5)}/>
            </StyledTabs>
            <StyledTabPanels>
                <TabPanel value={value} index={0}>
                    <Box>
                        <TitleAndImgComponent states={states}
                                              contentype={contentContext.contentType}
                                              newsCategory={newsCategory}/>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box>
                        <FormDescriptionComponent/>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box>
                        <FormContentFileComponent contentype={contentContext.contentType}/>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Box>
                        <ContentPublishDateComponent contentype={contentContext.contentType}/>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Box>
                        <SeoFormContentComponent contentype={contentContext.contentType}/>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Box>
                        <FormContentPortalComponent/>
                    </Box>
                </TabPanel>
            </StyledTabPanels>
            <NewContentFooterComponent contentype={contentContext.contentType}
                                       value={value}
                                       setValue={setValue}/>

        </>
    );
}

export default withNamespaces('translation')(NewContentTabsComponent);
