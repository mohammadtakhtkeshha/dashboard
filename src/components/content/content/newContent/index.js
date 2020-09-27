import React, {useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {withNamespaces} from "react-i18next";

import {Box, Paper, Typography} from '@material-ui/core/index';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {useStyles} from 'assets/js/content/newContent';
import FileContentTabComponent from "./partials/FileContentTabComponent";
import TextContentTabComponent from "./partials/textContent/index";
import contentService from "core/services/content.service";
import NewContentContext from "contexts/NewContentContext";

const styles = makeStyles(useStyles);

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography variant="h4">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Index({t}) {
    const classes = styles();
    const [value, setValue] = useState(0);
    const newContentContext = useContext(NewContentContext);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }

    const getDomainSource = () => {
        contentService.getDomainSource().then((response) => {
            newContentContext.setDomainAccesses(response.data);
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        getDomainSource();
    }, []);

    return (<>
        <Box>
            <Paper className={classes.paper}>
                <Box className="tabs">
                    <Tabs className='tabButtons' value={value} onChange={handleTabChange}
                          aria-label="simple tabs example">
                        <Tab label={t('translation:description')} {...a11yProps(0)} />
                        <Tab label={t('translation:files')} {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0} className="tabContent">
                        <Box className='block'>
                            <TextContentTabComponent/>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1} className="tabContent">
                        <Box className='block'>
                            <FileContentTabComponent/>
                        </Box>
                    </TabPanel>
                </Box>
            </Paper>
        </Box>
    </>);
}

export default withNamespaces('translation,contents,tags,categories')(Index);