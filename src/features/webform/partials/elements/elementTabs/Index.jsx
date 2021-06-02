import React ,{useState} from "react";
import {withNamespaces} from "react-i18next";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import {TabPanel, a11yProps, StyledPaper} from "assets/js/comment/commentTabs";
import {changeTab} from "./Index.js";
import ElementsList from "./partials/elementsList/Index.jsx"
import withStyles from "@material-ui/core/styles/withStyles";
import {styledTabs,StyledElementList} from "assets/js/library/pages/webform/elements";
import i18next from "i18next";

const StyledTabs = withStyles(styledTabs)(Tabs)

function Index({t}) {
    const [value, setValue] = useState(0);
    const lang = i18next.language

    return (<StyledElementList>
        <StyledTabs value={value} onChange={(e, newValue) => changeTab(e, newValue, setValue)}>
            {/*<Tab label={t('translation:observe')} {...a11yProps(0)} />*/}
            <Tab label={`${t('translation:settings')}`}  {...a11yProps(0)} />
            <Tab label={`${t('translation:results')}`}  {...a11yProps(1)} />
            <Tab label={`${t('webforms:addElement')}`}  {...a11yProps(2)} />
        </StyledTabs>
        {/*<TabPanel value={value} index={0}>*/}
        {/*    <ElementsList/>*/}
        {/*</TabPanel>*/}
        <TabPanel value={value} index={0}>
            <ElementsList/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            three
        </TabPanel>
        <TabPanel value={value} index={2}>
            <ElementsList/>
        </TabPanel>
    </StyledElementList>);
}

export default withNamespaces('comments')(Index);
