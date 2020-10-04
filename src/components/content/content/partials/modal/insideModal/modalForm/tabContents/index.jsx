import React, {useState} from "react";
import {withNamespaces} from "react-i18next";

import {Box, Paper} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";

import ContentPublishDateComponent from "../tabContents/FormContentPublishDateComponent.jsx";
import SeoFormContentComponent from "../tabContents/FormContentSeoComponent";
import TitleAndImgComponent from "./FormContentTitleAndImgComponent.jsx";
import FormContentFileComponent from "./FormContentFileComponent.jsx";
import NewContentFooterComponent from "./FormContentFooterComponent";
import {StyledTabPanels} from "assets/js/content/partials/newContent";
import {useStyles, TabPanel, a11yProps, styledTabs} from 'assets/js/content/partials/newContent';
import FormDescriptionComponent from "./FormContentDescriptionComponent";
// import TextContentTabComponent from "./textContent/ModalComponent.jsx";

const StyledTabs = withStyles(styledTabs)(Tabs);
const styles = makeStyles(useStyles);

function NewContentTabsComponent({t}) {
    const classes = styles();
    const [value, setValue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }

    return(<Paper>
            <Box className="tabs">
                <StyledTabs className='tabButtons' value={value} onChange={handleTabChange}
                            aria-label="simple tabs example">
                    <Tab label={t('contents:title&picture')} {...a11yProps(0)} />
                    <Tab label={t('contents:publishSetting')} {...a11yProps(1)} />
                    <Tab label={t('contents:seo')} {...a11yProps(2)} />
                    <Tab label={t('translation:description')} {...a11yProps(3)} />
                    <Tab label={t('translation:files')} {...a11yProps(4)} />
                    <Tab label={t('contents:portal')} {...a11yProps(5)} />
                </StyledTabs>
                <StyledTabPanels>
                    <TabPanel value={value} index={0} className="tabContent">
                        <Box className='block'>
                            {/*<TextContentTabComponent/>*/}
                            <TitleAndImgComponent/>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1} className="tabContent">
                        <Box className='block'>
                            <ContentPublishDateComponent/>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={2} className="tabContent">
                        <Box className='block'>
                            <SeoFormContentComponent/>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={3} className="tabContent">
                        <Box className='block'>
                            <FormDescriptionComponent/>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={4} className="tabContent">
                        <Box className='block'>
                            <FormContentFileComponent/>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={5} className="tabContent">
                        <Box className='block'>
                            <FormContentFileComponent/>
                        </Box>
                    </TabPanel>
                </StyledTabPanels>
                <NewContentFooterComponent/>
            </Box>
        </Paper>
    );
}

export default withNamespaces('translation')(NewContentTabsComponent);
