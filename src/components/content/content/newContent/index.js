import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";

import {Box, Paper} from '@material-ui/core/index';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fade from "@material-ui/core/Fade";

import {useStyles, TabPanel, a11yProps, styledTabs} from 'assets/js/content/newContent';
import FileContentTabComponent from "./partials/FileContentTabComponent.jsx";
import TextContentTabComponent from "./partials/textContent/index.jsx";
import contentService from "core/services/content.service";
import NewContentContext from "contexts/NewContentContext";
import CategoryAndDescriptionComponent from "./partials/CategoryAndDescriptionComponent";
import {
    ModalAround,
    ModalBody,
    ModalBox,
    StyledCancelButton,
    StyledFooterRegisterContent
} from "assets/js/content/contentRegisterModal";
import { StyledSvg} from "assets/js/App";
import {green} from "components/partials/Colors";
import AppContext from "contexts/AppContext";
import ContentsContext from "contexts/ContentsContext";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import i18next from "i18next";
import {StyledTabPanels,StyledFooterButton} from "assets/js/content/newContent";


const styles = makeStyles(useStyles);
const StyledTabs = withStyles(styledTabs)(Tabs);

function Index({t, contentType, openRegisterForm, handleCloseRegisterForm}) {
    const lang = i18next.language;
    let dir = lang === 'en' ? 'ltr' : 'rtl';
    const classes = styles(dir);
    const [value, setValue] = useState(0);
    const newContentContext = useContext(NewContentContext);
    const appContext = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);
    const [publishDate, setPublishDate] = useState(null);
    const [unpublishDate, setUnpublishDate] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [domainAccesses, setDomainAccesses] = useState([]);
    const [selectedDomainAccess, setSelectedDomainAccess] = useState([]);
    const [content, setContent] = useState({
        "type": {
            "target_id": ""
        },
        "title": "",
        "body": "",
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
    });

    const isObjectEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    const [errors, setErrors] = useState({});

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

    const register = () => {
        if (content.title === "") {
            setErrors({title: t('translation:requiredValid')});
        }
        contentService.registerContent(content).then((response) => {
            contentsContext.getRegisteredContent(response.data);
        }).catch((error) => {
            if (error === "وب سایت با یک خطای غیر منتظره مواجه شد. لطفا بعدا دوباره تلاش کنید.") {
                appContext.handleError(t('translation:networkError'));
            } else {
                let objError = {};
                const errorString = error.response.data.FailureReason.message.replace(/\n/g, 'a');
                const errorArray = errorString.split('.');
                for (let i in errorArray) {
                    let newErrorMessage = errorArray[i].split(':');
                    objError[newErrorMessage[0]] = newErrorMessage[1];
                }
                let titleError;
                const arrayError = [];
                if (objError.atitle === " This value should not be null") {
                    titleError = t('contents:nullTitle')
                }
                arrayError.push(titleError)
                appContext.handleError(arrayError);
            }
        });
    }

    useEffect(() => {
        getDomainSource();
    }, []);

    useEffect(() => {
        setContent(prevState => {
            return {
                ...prevState, type: {
                    target_id: contentType
                }
            }
        });
    }, [contentType]);

    return (<NewContentContext.Provider value={{
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
        setUnpublishDate: setUnpublishDate,
        setPublishDate: setPublishDate,
        publishDate: publishDate,
        unpublishDate: unpublishDate,
    }}>
        <Fade in={openRegisterForm} id="modal">
            <div>
                <StyledCancelButton onClick={handleCloseRegisterForm} className='exitButton'>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <Paper className={classes.paper}>
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
                                        <TextContentTabComponent/>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value} index={1} className="tabContent">
                                    <Box className='block'>
                                        <CategoryAndDescriptionComponent/>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value} index={2} className="tabContent">
                                    <Box className='block'>
                                        <FileContentTabComponent/>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value} index={3} className="tabContent">
                                    <Box className='block'>
                                        <FileContentTabComponent/>
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
                            <StyledFooterRegisterContent>
                                <StyledFooterButton bg={green[1]} onClick={register}>
                                    {t('translation:register')}
                                </StyledFooterButton>
                                <StyledFooterButton bg={green[1]} onClick={register}>
                                    {t('translation:register')}
                                </StyledFooterButton>
                                <StyledFooterButton bg={green[1]} onClick={register}>
                                    {t('translation:register')}
                                </StyledFooterButton>
                            </StyledFooterRegisterContent>
                        </Box>
                    </Paper>
                </ModalBody>
            </div>
        </Fade>
    </NewContentContext.Provider>);
}

export default withNamespaces('translation,contents,tags,categories')(Index);
