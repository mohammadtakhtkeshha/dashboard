import React, {useState, useEffect, useContext} from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box, Paper, Typography} from '@material-ui/core/index';
import InputBase from '@material-ui/core/InputBase';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import contentService from 'core/services/content.service';
import tagService from 'core/services/tag.service';
import {useStyles, bootstrapInput, useTabStyless} from 'assets/js/content/newContent';
import {globalCss} from 'assets/js/globalCss';
import FileContentTabComponent from "./partials/FileContentTabComponent";
import TextContentTabComponent from "./partials/TextContentTabComponent";
import ContentContext from "contexts/ContentContext";

const useTabStyles = makeStyles(useTabStyless);

const gClass = makeStyles(globalCss);
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
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Index({t}) {
    const lang = i18next.language;
    const [tags, setTags] = useState([]);
    const gClasses = gClass();
    const contentContext = useContext(ContentContext);

    // -----auto complete ------
    const [openAutoComplete, setOpenAutoComplete] = useState(false);
    const loading = openAutoComplete && tags.length === 0;

    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            tagService.getTags().then((response) => {
                if (active) {
                    setTags(response.data.rows.map((key) => key));
                }
            });
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!openAutoComplete) {
            setTags([]);
        }
    }, [openAutoComplete]);

    // -----auto complete ------

    const BootstrapInput = withStyles(bootstrapInput)(InputBase);
    const classes = styles();
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState([]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedJalaliDate, setSelectedJalaliDate] = useState(moment());
    const [errors, setErrors] = useState({
        errorName: {},
        errorMail: {},
    });
    const [domainAccesses, setDomainAccesses] = useState([]);
    const [selectedDomainAccess, setSelectedDomainAccess] = useState([]);

    useEffect(() => {
        tagService.getTags().then((response) => {
            let tags = response.data;
            setTags(tags.rows);
        }).catch((error) => {
            console.log(error)
        });
    }, []);

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        getDomainSource();
    }, []);

    let handleDateChange = (date) => {
        if (lang === 'fa') {
            setSelectedJalaliDate(date);
        } else {
            setSelectedDate(date);
        }
        contentContext.setContent(prevState => {
            return {
                ...prevState, publishDate: {value: date.toLocaleString()},
            }
        })
    }

    let handleChange = (e, field) => {
        let currentName;
        currentName = e.currentTarget.value;
        contentContext.setContent(prevState => {
            return {
                ...prevState, [field]: currentName
            }
        });
    };

    let handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    let handleTagChange = (event) => {
        let currentTag = event.target.value;
        contentContext.setContent(prevState => {
            return {
                ...prevState, tag: currentTag
            }
        });
    };

    let handleCategoryChange = (event) => {
        let currentCat = event.target.value;
        contentContext.setContent(prevState => {
            return {
                ...prevState, category: currentCat
            }
        });
    };

    let handleStatusChange = (e) => {
        contentContext.setContent(prevState => {
            return {
                ...prevState, status: {value: e.currentTarget.value},
            }
        });
    };

    let getDomainSource = () => {
        contentService.getDomainSource().then((response) => {
            setDomainAccesses(response.data);
        }).catch((error) => {
            console.log(error)
        });
    };

    // let getTags = () => {
    //     let url = `http://dash.webrbp.ir/vocabularies/tags`;
    //     let config = {
    //         headers: {
    //             'Content-Type': 'application/hal+json',
    //             'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
    //             'Accept': 'application/hal+json'
    //         }
    //     }
    //     return axios.get(url, config);
    //
    // };

    let getCategories = () => {
        contentService.getCategories().then((response) => {
            let categories = response.data.rows;
            setCategories(categories);
        }).catch((error) => {
            console.log(error)
        });

    };

    // let handleShowPlaceChange = (e) => {
    //     let val;
    //     let showPlace = e.currentTarget.value;
    //     if (showPlace === "true") {
    //         val = true;
    //     } else {
    //         val = false;
    //     }
    //     setContent(prevState => {
    //         return {
    //             ...prevState, showPlace: {value: val},
    //         }
    //     });
    // };

    let getPublishDate = (date) => {
        contentContext.setContent(prevState => {
            return {
                ...prevState, publishDate: {value: date},
            }
        });
    };

    let handleDomainAccessChange = (e, domain) => {
        if (e.target.checked) {
            setSelectedDomainAccess(prevState => {
                return [...prevState, domain];
            });
            contentContext.setContent(prevState => {
                let domainAccessArray = prevState.field_domain_access === "" ? [] : prevState.field_domain_access.target_id.split(',');
                domainAccessArray.push(domain.id);
                let domainAccessString = domainAccessArray.toString();
                return {...prevState, field_domain_access: {target_id: domainAccessString, target_type: 'domain'}};
            });
        } else {
            let exSelectedDomainAccess = selectedDomainAccess;
            let newSelectedDomainAccess = exSelectedDomainAccess.filter(item => item !== domain);
            setSelectedDomainAccess([...newSelectedDomainAccess]);
            contentContext.setContent(prevState => {
                let domainAccessArray = prevState.field_domain_access.target_id.split(',');
                let currentIndex = domainAccessArray.indexOf(domain.id);
                domainAccessArray.splice(currentIndex, 1);
                let domainAccessString = domainAccessArray.toString();
                return {...prevState, field_domain_access: {target_id: domainAccessString, target_type: 'domain'}};
            });
        }

    };

    let handleDomainResourceChange = (e) => {
        let currentDomainResource = e.target.value;
        contentContext.tent(prevState => {
            return {
                ...prevState, field_domain_source: {
                    "target_id": currentDomainResource,
                    "target_type": "domain"
                }
            }
        });
    };

    let clickEditorDescription = (e) => {
        contentContext.setContent(prevState => {
            return {
                ...prevState, description: e
            }
        });
    };

    let clickEditorMetaTag = (e, keyName) => {
        let currentValue = e.currentTarget.value;
        let titleValue = keyName === "title" ? currentValue : '';
        let desciptionValue = keyName === "desciptionValue" ? currentValue : '';
        let abstractValue = keyName === "abstract" ? currentValue : '';
        let keywordsValue = keyName === "keywords" ? currentValue : '';

        contentContext.setContent(prevState => {
            return {
                ...prevState, field_seo_list: {
                    title: titleValue === '' ? prevState.field_seo_list.title : titleValue,
                    description: desciptionValue === "" ? prevState.field_seo_list.description : desciptionValue,
                    abstract: abstractValue === "" ? prevState.field_seo_list.abstract : abstractValue,
                    keywords: keywordsValue === "" ? prevState.field_seo_list.keywords : keywordsValue
                }
            }
        });
    };

    let onTagsChange = (event, values) => {
        let tags = values.map(item => item.name);
        contentContext.setContent(prevState => {
            return {
                ...prevState, field_tags: [...tags]
            }
        });
    };


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