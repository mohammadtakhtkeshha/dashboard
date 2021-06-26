import React, {useState, useEffect} from "react";
import {withNamespaces} from "react-i18next";
import {useParams} from "react-router-dom";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import {TabPanel, a11yProps} from "assets/js/comment/commentTabs";
import {changeTab} from "./Index.js";
import ElementsList from "./partials/elementsList/Index.jsx"
import withStyles from "@material-ui/core/styles/withStyles";
import {styledTabs, StyledElementList, styledTabPanel} from "assets/js/library/pages/webform/elements";
import ElementResults from './partials/elementResults/Index.jsx'
import ElementSettings from './partials/elementSettings/Index.jsx'
import i18next from "i18next";

const StyledTabs = withStyles(styledTabs)(Tabs)
const StyledTabPanel = withStyles(styledTabPanel)(TabPanel)

function Index({t}) {
    const [value, setValue] = useState(0);
    const {tab} = useParams();
    const lang = i18next.language;

    /*Description:these are passed parameters and currentRoute
    * list - settings - results
    *@return :elements/${form.id}/settings
    * */

    useEffect(() => {
        switch (tab) {
            case 'results':
                setValue(1)
                break;
            case 'settings':
                setValue(2)
                break;
            default:
                setValue(0)
        }
    }, [tab]);


    return (<StyledElementList>
        <StyledTabs value={value} onChange={(e, newValue) => changeTab(e, newValue, setValue)}>
            <Tab label={`${t('webforms:addElement')}`}  {...a11yProps(0)} />
            <Tab label={`${t('translation:results')}`}  {...a11yProps(1)} />
            <Tab label={`${t('translation:settings')}`}  {...a11yProps(2)} />
        </StyledTabs>
        <TabPanel value={value} index={0}>
            <ElementsList/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <ElementResults/>
        </TabPanel>
        <StyledTabPanel value={value} index={2}>
            <ElementSettings/>
        </StyledTabPanel>
    </StyledElementList>);
}

export default withNamespaces('comments')(Index);
