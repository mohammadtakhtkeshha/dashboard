import React from "react";
import {withNamespaces} from "react-i18next";

import Tab from "@material-ui/core/Tab";
import {withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";

import {TabPanel, a11yProps, StyledPaper, styledTabs} from "assets/js/comment/commentTabs";
import {changeTab} from "./Index.js";
import ElementsList from "./partials/elementsList/Index.jsx"

const StyledTabs = withStyles(styledTabs)(Tabs);

function Index({t}) {
    const [value, setValue] = React.useState(0);

    return (<StyledPaper>
        <StyledTabs value={value} onChange={(e, newValue) => changeTab(e, newValue, setValue)}>
            <Tab label={t('translation:observe')} {...a11yProps(0)} />
            <Tab label={`${t('translation:settings')}`}  {...a11yProps(1)} />
            <Tab label={`${t('translation:results')}`}  {...a11yProps(2)} />
            <Tab label={`${t('webforms:addElement')}`}  {...a11yProps(3)} />
        </StyledTabs>
        <TabPanel value={value} index={0}>
            one
        </TabPanel>
        <TabPanel value={value} index={1}>
            two
        </TabPanel>
        <TabPanel value={value} index={2}>
            three
        </TabPanel>
        <TabPanel value={value} index={3}>
            <ElementsList/>
        </TabPanel>
    </StyledPaper>);
}

export default withNamespaces('comments')(Index);
