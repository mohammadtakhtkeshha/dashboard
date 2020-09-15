import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {withNamespaces} from "react-i18next";

import {Box, Paper, Typography} from '@material-ui/core/index';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {useStyles} from 'assets/js/content/newContent';
import FileContentTabComponent from "./partials/FileContentTabComponent";
import TextContentTabComponent from "./partials/textContent/index";
import NewContentContext from "contexts/NewContentContext";
import contentService from "core/services/content.service";

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

function Index({t,contentType}) {
    const classes = styles();
    const [value, setValue] = useState(0);
    const [content, setContent] = useState({
        "type": {
            "target_id": "article"
        },
        "title": "test",
        "body": "dيشيسيرxfcgvhjkلرالالربیبیباذlmس",
        "field_domain_access": {},
        "field_domain_all_affiliates": true,
        "field_domain_source": {},
        "field_field_galeries": {},
        "field_files": {},
        "field_image": {},
        "field_rotitr": "",
        "field_sotitr": "",
        "field_sounds": {},
        "field_article_cat": {},
        "field_tags": {},
        "field_seo_list": {},
        "field_videos": {},
        "field_special_news_display": false,
        "status": false,
        "publish_on": "2022-11-29T21:33:09+00:00",
        "unpublish_on": "2023-11-29T21:33:09+00:00"
    });
    const [errors, setErrors] = useState({});
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedDomainAccess, setSelectedDomainAccess] = useState([]);
    const [domainAccesses, setDomainAccesses] = useState([]);

    let handleTabChange = (event, newValue) => {
        setValue(newValue);
    }

    let isObjectEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    let getDomainSource = () => {
        contentService.getDomainSource().then((response) => {debugger
            setDomainAccesses(response.data);
        }).catch((error) => {
            console.log(error)
        });
    };


    useEffect(() => {
        getDomainSource();
    }, []);

    // useEffect(() => {
    //     setContent(prevState => {
    //         return{
    //             ...prevState,type: {
    //                 target_id:contentType
    //             }
    //         }
    //     });
    // }, [contentType]);



    return (
        <NewContentContext.Provider
            value={{
                content: content,
                setContent: setContent,
                setErrors: setErrors,
                errors: errors,
                selectedTags: selectedTags,
                setSelectedTags: setSelectedTags,
                isObjectEmpty: isObjectEmpty,
                selectedDomainAccess: selectedDomainAccess,
                setSelectedDomainAccess: setSelectedDomainAccess,
                domainAccesses: domainAccesses,
                setDomainAccesses: setDomainAccesses,
            }}>
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
        </NewContentContext.Provider>
    );
}

export default withNamespaces('translation,contents,tags,categories')(Index);
