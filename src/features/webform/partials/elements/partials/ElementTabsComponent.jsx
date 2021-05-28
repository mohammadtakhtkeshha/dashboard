import React from "react";
import {withNamespaces} from "react-i18next";

import Tab from "@material-ui/core/Tab";
import {withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";

import {TabPanel, a11yProps, StyledPaper, styledTabs} from "assets/js/comment/commentTabs";
import {changeTab} from "./ElementTabsComponent.js";
import NewWebformComponent from "../../modal/partials/NewWebformComponent.jsx";

const StyledTabs = withStyles(styledTabs)(Tabs);

function ElementTabsComponent({t}) {
    const [value, setValue] = React.useState(0);

    // ویرایش
    // مشاهده نتایج
    // تنظیمات
    // مشاهده

    return (<StyledPaper>
        <StyledTabs value={value} onChange={(e, newValue) => changeTab(e, newValue, setValue)}>
            <Tab label={t('translation:observe')} {...a11yProps(0)} />
            <Tab label={`${t('translation:settings')}`}  {...a11yProps(1)} />
            <Tab label={`${t('translation:results')}`}  {...a11yProps(2)} />
        </StyledTabs>
        <TabPanel value={value} index={0}>
            one
        </TabPanel>
        <TabPanel value={value} index={1}>
            <NewWebformComponent/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            three
        </TabPanel>
    </StyledPaper>);
}

export default withNamespaces('comments')(ElementTabsComponent);
