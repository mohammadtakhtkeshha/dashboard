import React, {useState} from "react";
import {Box, Paper} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import ContentPublishDateComponent from "./tabsContent/ContentPublishDateComponent";
import SeoFormContentComponent from "./tabsContent/SeoFormContentComponent";
import CategoryAndDescriptionComponent from "./CategoryAndDescriptionComponent";
import FileContentTabComponent from "./FileContentTabComponent.jsx";
import NewContentFooterComponent from "./NewContentFooterComponent";
import {StyledTabPanels, StyledFooterButton} from "assets/js/content/newContent";
import {withNamespaces} from "react-i18next";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import {useStyles, TabPanel, a11yProps, styledTabs} from 'assets/js/content/newContent';
// import TextContentTabComponent from "./textContent/index.jsx";

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
                            <CategoryAndDescriptionComponent/>
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
                            <CategoryAndDescriptionComponent/>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={4} className="tabContent">
                        <Box className='block'>
                            <FileContentTabComponent/>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={5} className="tabContent">
                        <Box className='block'>
                            <FileContentTabComponent/>
                        </Box>
                    </TabPanel>
                </StyledTabPanels>
                <NewContentFooterComponent/>
            </Box>
        </Paper>
    );
}

export default withNamespaces('translation')(NewContentTabsComponent);
