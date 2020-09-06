import React, {useState, useEffect, useContext} from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import {withNamespaces} from "react-i18next";
import swal from "sweetalert";
import clsx from "clsx";
import i18next from "i18next";
import axios from 'axios';

import {Box, Paper, Typography} from '@material-ui/core/index';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from "@material-ui/core/FormControl";
import InputBase from '@material-ui/core/InputBase';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import contentService from 'core/services/content.service';
import tagService from 'core/services/tag.service';
import {useStyles, bootstrapInput, useTabStyless} from 'assets/js/content/newContent';
import UploadImg from "components/partials/UploadImg";
import UploadFile from "components/partials/UploadFile";
import ButtonComponent from 'components/partials/ButtonComponent'
import Input from "components/partials/inputComponent";
import DatePickerr from "components/partials/DatePickerr";
import EditorComponent from "components/partials/EditorComponent";
import storage from 'libraries/local-storage';
import {globalCss} from 'assets/js/globalCss';
import AppContext from "contexts/AppContext";
import FileContentTabComponent from "./partials/FileContentTabComponent";

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
    const appContext = useContext(AppContext);
    const [tags, setTags] = useState([]);
    const gClasses = gClass();

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
    const [content, setContent] = useState({
        type: {
            target_id: "article"
        },
        title: "title",
        body: "dxfcgvhjkلرالالراذlmس",
        field_domain_access: {
            target_id: "dash_webrbp_ir",
            target_type: "domain",
            target_uuid: "67f5f76f-7730-4aa5-8504-8d00e44bc720"
        },
        field_domain_all_affiliates: true,
        field_domain_source: {
            target_id: "dash_webrbp_ir",
            target_type: "domain",
            target_uuid: "67f5f76f-7730-4aa5-8504-8d00e44bc720"
        },
        field_field_galeries: {
            target_id: "162,344,345",
            target_type: "file"
        },
        field_files: {
            target_id: "161",
            target_type: "file"
        },
        field_image: {
            target_id: "158",
            target_type: "file"
        },
        field_rotitr: "این روتیتر برای تست مقاله از پست من میباشد",
        field_sotitr: " سوتيتر مقاله ىر اين قسمت نوشته شده است",
        field_sounds: {
            target_id: "346",
            target_type: "file"
        },
        field_tags: {
            target_id: "25"
        },
        field_seo_list: {
            title: "article116",
            description: "a",
            bstract: "a",
            keywords: "a"
        }
    });
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
        setContent(prevState => {
            return {
                ...prevState, publishDate: {value: date.toLocaleString()},
            }
        })
    }

    let handleChange = (e, field) => {
        let currentName;
        currentName = e.currentTarget.value;
        setContent(prevState => {
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
        setContent(prevState => {
            return {
                ...prevState, tag: currentTag
            }
        });
    };

    let handleCategoryChange = (event) => {
        let currentCat = event.target.value;
        setContent(prevState => {
            return {
                ...prevState, category: currentCat
            }
        });
    };

    let handleStatusChange = (e) => {
        setContent(prevState => {
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
        setContent(prevState => {
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
            setContent(prevState => {
                let domainAccessArray = prevState.field_domain_access === "" ? [] : prevState.field_domain_access.target_id.split(',');
                domainAccessArray.push(domain.id);
                let domainAccessString = domainAccessArray.toString();
                return {...prevState, field_domain_access: {target_id: domainAccessString, target_type: 'domain'}};
            });
        } else {
            let exSelectedDomainAccess = selectedDomainAccess;
            let newSelectedDomainAccess = exSelectedDomainAccess.filter(item => item !== domain);
            setSelectedDomainAccess([...newSelectedDomainAccess]);
            setContent(prevState => {
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
        setContent(prevState => {
            return {
                ...prevState, field_domain_source: {
                    "target_id": currentDomainResource,
                    "target_type": "domain"
                }
            }
        });
    };

    let clickEditorDescription = (e) => {
        setContent(prevState => {
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

        setContent(prevState => {
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
        setContent(prevState => {
            return {
                ...prevState, field_tags: [...tags]
            }
        });
    };

    console.log(content);

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
                            <Box className="items">
                                <Input
                                    lang={lang}
                                    type="text" placeholder={t('translation:title')} label={t('translation:title')}
                                    error={errors.title ? errors.title : ''}
                                    small='' handleClick={e => handleChange(e, "title")}/>
                                <Input
                                    lang={lang}
                                    type="text" placeholder={t('contents:rotitr')}
                                    label={t('contents:rotitr')}
                                    error={errors.family}
                                    small='' handleClick={e => handleChange(e, "rotitr")}/>
                            </Box>
                            <Box className="editor">
                                <EditorComponent textAlign={lang === 'en' ? gClasses.textLeft : gClasses.textRight}
                                                 lang={lang} title={t('translation:description')} onClick={(e) => {
                                    clickEditorDescription(e)
                                }}/>
                            </Box>
                            <Box className="items">
                                <Input lang={lang} type="text" placeholder={t('contents:lidkhabar')}
                                       label={t('contents:lidkhabar')}
                                       error={errors.family}
                                       small='' handleClick={e => handleChange(e, "lidkhabar")}/>
                                <Box className={clsx("publishDate", "card")}>
                                    <Typography
                                        className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:publishDate')}</Typography>
                                    <div className={clsx("number", lang === 'en' ? gClasses.ltr : gClasses.rtl)}>
                                        <DatePickerr
                                            selectedDate={lang === 'fa' ? selectedJalaliDate : selectedDate}
                                            onChange={handleDateChange}
                                            // locale={lang === 'fa' ? 'primary-font' : 'byekan'}
                                            lang={lang}/>
                                    </div>
                                </Box>
                            </Box>
                            <Box className="items">
                                <Box className={clsx('select', 'card', lang === 'fa' ? 'faTag' : 'enTag')}>
                                    <Typography
                                        className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('tags:tags')}</Typography>
                                    <Autocomplete
                                        id="asynchronous-demo"
                                        multiple={true}
                                        style={{width: '100%'}}
                                        open={openAutoComplete}
                                        onOpen={() => {
                                            setOpenAutoComplete(true);
                                        }}
                                        onClose={() => {
                                            setOpenAutoComplete(false);
                                        }}
                                        getOptionSelected={(option, value) => option.name === value.name}
                                        getOptionLabel={(option) => option.name}
                                        options={tags}
                                        loading={loading}
                                        onChange={onTagsChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <>
                                                            {loading ?
                                                                <CircularProgress color="inherit" size={20}/> : null}
                                                            {params.InputProps.endAdornment}
                                                        </>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                </Box>
                                <Box className={clsx('select', 'card')}>
                                    <FormControl className={classes.margin}>
                                        <Typography
                                            className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('categories:categories')}</Typography>
                                        <NativeSelect
                                            value={content.category}
                                            onChange={handleCategoryChange}
                                            input={<BootstrapInput/>}
                                            className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}
                                        >
                                            <option aria-label="None" value="">{t('translation:none')}</option>
                                            {categories.map((item) => (
                                                <option key={item.tid} value={item.name}>{item.name}</option>
                                            ))}

                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box className={clsx('items', lang === 'en' ? gClasses.ltr : gClasses.rtl)}>
                                <Box className={clsx('card', lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>
                                    {/*<FormControl component="fieldset">*/}
                                    {/*    <FormLabel component="legend">{t('translation:status')}</FormLabel>*/}
                                    {/*    <RadioGroup aria-label="status" value={content.status.value}*/}
                                    {/*                onChange={e => handleStatusChange(e)}>*/}
                                    {/*        <FormControlLabel value="published" control={<Radio/>}*/}
                                    {/*                          label={t('contents:published')}/>*/}
                                    {/*        <FormControlLabel value="unpublished" control={<Radio/>}*/}
                                    {/*                          label={t('contents:unpublished')}/>*/}
                                    {/*    </RadioGroup>*/}
                                    {/*</FormControl>*/}
                                </Box>
                                <Box className="card">
                                    <FormControl component="fieldset">
                                        {/*<FormLabel component="legend">{t('contents:showPlace')}</FormLabel>*/}
                                        {/*<RadioGroup aria-label="showPlace" value={content.showPlace.value}*/}
                                        {/*            onChange={e => handleShowPlaceChange(e)}>*/}
                                        {/*    <FormControlLabel value={true} control={<Radio/>}*/}
                                        {/*                      label={t('contents:show')}/>*/}
                                        {/*    <FormControlLabel value={false} control={<Radio/>}*/}
                                        {/*                      label={t('contents:notShow')}/>*/}

                                        {/*</RadioGroup>*/}
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box className={clsx('items', lang === 'en' ? gClasses.ltr : gClasses.rtl)}>
                                <Box
                                    className={clsx('select', 'card', lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>
                                    <Typography
                                        className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:domainAccess')}</Typography>

                                    <FormGroup row>
                                        {domainAccesses.map(domain => (
                                            <Box key={domain.id}>
                                                <FormControlLabel
                                                    control={<Checkbox checked={selectedDomainAccess.includes(domain)}
                                                                       onChange={(e) => handleDomainAccessChange(e, domain)}
                                                                       name={domain.name}
                                                    />}
                                                    label={domain.name}
                                                />
                                            </Box>
                                        ))}
                                    </FormGroup>
                                </Box>
                                <Box className={clsx('select', 'card')}>
                                    <FormControl className={classes.margin}>
                                        <Typography
                                            className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:domainSource')}</Typography>
                                        <NativeSelect
                                            value={content.domainSource}
                                            onChange={e => handleDomainResourceChange(e)}
                                            input={<BootstrapInput/>}
                                        >
                                            <option aria-label="None" value="">{t('translation:none')}</option>
                                            {selectedDomainAccess.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box className="card">
                                <Typography
                                    className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:metaTag')}</Typography>
                                <Box className="metaTag">
                                    <Box className="right">
                                        <Input lang={lang} type="text" placeholder={t('translation:title')}
                                               label={t('translation:title')}
                                               error={errors.family}
                                               small='' handleClick={e => clickEditorMetaTag(e, 'title')}/>
                                        <Typography
                                            className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('translation:description')}</Typography>
                                        <TextField
                                            id="outlined-size-normal"
                                            placeholder={t('translation:description')}
                                            variant="outlined"
                                            rows={10}
                                            rowsMax={10}
                                            fullWidth
                                            multiline
                                            onChange={(e) => {
                                                clickEditorMetaTag(e, 'description')
                                            }}
                                        />
                                    </Box>
                                    <Box className="left">
                                        <Input lang={lang} type="text" placeholder={t('contents:keywords')}
                                               label={t('contents:keywords')}
                                               error={errors.family}
                                               small='' handleClick={e => clickEditorMetaTag(e, 'keywords')}/>
                                        <Typography
                                            className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:summary')}</Typography>
                                        <TextField
                                            id="outlined-size-normal"
                                            placeholder={t('contents:summary')}
                                            variant="outlined"
                                            rows={10}
                                            rowsMax={10}
                                            fullWidth
                                            multiline
                                            onChange={(e) => {
                                                clickEditorMetaTag(e, 'abstract')
                                            }}
                                        />
                                    </Box>
                                    {/*<EditorComponent title={t('translation:description')} onClick={(e) => {*/}
                                    {/*    clickEditorMetaTag(e, 'description')*/}
                                    {/*}}/>*/}
                                    {/*<EditorComponent title={t('contents:summary')} onClick={(e) => {*/}
                                    {/*    clickEditorMetaTag(e, 'abstract')*/}
                                    {/*}}/>*/}
                                </Box>
                            </Box>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1} className="tabContent">
                        <Box className='block'>
                            <FileContentTabComponent setContent={setContent} content={content}/>
                        </Box>
                    </TabPanel>
                </Box>
            </Paper>
        </Box>
    </>);
}

export default withNamespaces('translation,contents,tags,categories')(Index);
