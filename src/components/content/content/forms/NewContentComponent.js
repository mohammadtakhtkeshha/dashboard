import React, {useState, useEffect} from "react";
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
import PropTypes from 'prop-types';
import moment from "moment";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import contentSercice from './../../../../core/services/content.serveice';
import tagService from './../../../../core/services/tag.service';
import * as newContent from './../../../../assets/js/content/newContent';
import {withNamespaces} from "react-i18next";
import UploadImg from "../../../partials/UploadImg";
import ButtonComponent from './../../../../components/partials/ButtonComponent'
import Input from "../../../partials/inputComponent";
import DatePickerr from "../../../partials/DatePickerr";
import clsx from "clsx";
import EditorComponent from "../../../partials/EditorComponent";
import i18next from "i18next";
import axios from 'axios';
import storage from './../../../../libraries/local-storage';
import UploadVideo from "../../../partials/UploadVideo";
import UploadVoice from "../../../partials/UploadVoice";
import {globalCss} from '../../../../assets/js/globalCss';
import {primary} from "../../../partials/Colors";

const useTabStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const gClass=makeStyles(globalCss);

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

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

function NewContentComponent({t}) {
    const lang = i18next.language;
    const [tags, setTags] = useState([]);
    const gClasses=gClass();

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
                    setTags(response.data.map((key) => key));
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

    const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }))(InputBase);
    const classes = newContent.useStyles();
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedJalaliDate, setSelectedJalaliDate] = useState(moment());
    const [content, setContent] = useState({
            _links: {
                type: {
                    href: "http://dash.webrbp.ir/rest/type/node/article"
                }
            },
            type: [
                {
                    target_id: "article"
                }
            ],
            title: [
                {
                    value: "اين عنوان براي تست مقاله مي باشد"
                }
            ],
            body: [
                {
                    value: "این بادی برای تست مقاله می باشد",
                    summary: "این خلاصه برای مقاله و تست می باشد"
                }
            ],
            field_rotitr: [
                {
                    value: "این روتیتر برای تست مقاله از پست من میباشد"
                }
            ],
            field_seo_list: [
                {
                    value: {
                        title: "این عنوان در بالای صفحه برای سئو نمایش داده می شود",
                        description: "این یک توضیح برای ربات های گوگل می باشد",
                        abstract: "ابسترکت برای تست می باشد",
                        keywords: "کلمه یک , كلمه دو , كلمه سه"
                    }
                }
            ],
            field_sotitr: [
                {
                    value: " سوتيتر مقاله ىر اين قسمت نوشته شده است"
                }
            ],
            field_tags: [
                {
                    target_id: 9,
                    target_type: "taxonomy_term",
                    target_uuid: "a53e7020-ebda-40a3-b985-ea89c6cafa97",
                    url: "/web/taxonomy/term/9"
                }
            ],
            field_domain_access: [
                {
                    target_id: "dash_webrbp_ir",
                    target_type: "domain",
                    target_uuid: "67f5f76f-7730-4aa5-8504-8d00e44bc720"
                }
            ],
            field_domain_all_affiliates: [
                {
                    value: true
                }
            ],
            field_domain_source: [
                {
                    target_id: "dash_webrbp_ir",
                    target_type: "domain",
                    target_uuid: "67f5f76f-7730-4aa5-8504-8d00e44bc720"
                }
            ],
            field_image: [
                {
                    target_id: 158,
                    alt: "سشیسیش",
                    title: "",
                    width: 520,
                    height: 410,
                    target_type: "file",
                    target_uuid: "2e2838d5-21e7-44ef-8f20-05c74ca043a0",
                    url: "http://dash.webrbp.ir/sites/default/files/2020-08/78456985.jpg"
                }
            ],
            status: [
                {
                    value: false
                }
            ],
            field_files: [
                {
                    target_id: 161,
                    display: true,
                    target_type: "file",
                    target_uuid: "12671557-e624-473a-8443-3caba3725706",
                    url: "http://dash.webrbp.ir/sites/default/files/2020-08/file.zip"
                },
                {
                    target_id: 161,
                    display: true,
                    target_type: "file",
                    target_uuid: "12671557-e624-473a-8443-3caba3725706",
                    url: "http://dash.webrbp.ir/sites/default/files/2020-08/file.zip"
                }
            ],
            field_field_galeries: [
                {
                    target_id: 162,
                    target_type: "file",
                    target_uuid: "0baa638b-5472-428b-abed-9a53417c299a",
                    url: "http://dash.webrbp.ir/sites/default/files/2020-08/gallery1_0.jpg"
                },
                {
                    target_id: 162,
                    target_type: "file",
                    target_uuid: "0baa638b-5472-428b-abed-9a53417c299a",
                    url: "http://dash.webrbp.ir/sites/default/files/2020-08/gallery1_0.jpg"
                }
            ],
            field_sounds: [
                {
                    target_id: 163,
                    target_type: "file",
                    target_uuid: "8cb1f7da-9695-4a70-916d-22f799cbcc8b",
                    url: "http://dash.webrbp.ir/sites/default/files/2020-08/test11.mp3"

                },
                {
                    target_id: 163,
                    target_type: "file",
                    target_uuid: "8cb1f7da-9695-4a70-916d-22f799cbcc8b",
                    url: "http://dash.webrbp.ir/sites/default/files/2020-08/test11.mp3"
                }
            ],
            publish_on: [
                {
                    value: "2020/08/30T11:43:00+00:00",
                    format: "Y/m/d\\TH:i:sP"
                }
            ],
            unpublish_on: [
                {
                    value: "2020/09/29T11:45:00+00:00",
                    format: "Y/m/d\\TH:i:sP"
                }
            ],
            // "showPlace": {value: false},

        }
    );
    // const [content, setContent] = useState({
    //     title: {value: ''},
    //     // author: {value: storage.get('user').name},
    //     author: {value: 'admin'},
    //     description: {value: ''},
    //     status: {value: 'published'},
    //     currentDate: {value: ''},
    //     domainSource: {value: ''},
    //     showPlace: {value: false},
    //     publishDate: {value: selectedDate},
    //     registerDate: {value: ''},
    //     rotitr: {value: ''},
    //     lidkhabar: {value: ''},
    //     field_seo_list: [
    //         {
    //             value: {
    //                 title: "",
    //                 description: "",
    //                 abstract: "",
    //                 keywords: ""
    //             }
    //         }
    //     ],
    //     category: '',
    //     tags: '',
    //     singleImg: '',
    //     voice: '',
    //     video: '',
    // });
    const [multiImg, setMultiImg] = useState([]);
    const [video, setVideo] = useState([]);
    const [voice, setVoice] = useState([]);
    const [errors, setErrors] = useState({
        errorName: {},
        errorMail: {},
    });
    const [domainAccesses, setDomainAccesses] = useState([]);
    const [selectedDomainAccess, setSelectedDomainAccesses] = useState([]);

    useEffect(() => {
        tagService.getTags().then((response) => {
            let tags = response.data;
            setTags(tags);
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
                ...prevState, [field]: {value: currentName}
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

    let handleFileChange = () => {
        console.log('change');
    };

    let register = () => {
        // let date = new Date();
        // let currentDate = date.toDateString();
        // let arrDate = currentDate.split(' ');
        // setContent((prevState) => {
        //     return {
        //         ...prevState, arrDate
        //     }
        // });
        let data = JSON.stringify(content);
        let url = 'http://dash.webrbp.ir/entity/node?_format=hal_json';
        let config = {
            headers: {
                'Content-Type': 'application/hal+json',
                'Authorization': storage.get(process.env.REACT_APP_TOKEN_KEY),
                'Accept': 'application/hal+json'
            }
        };
        axios.post(url, content, config).then((response) => {

        }).catch((error) => {
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
        contentSercice.getDomainSource().then((response) => {
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
        contentSercice.getCategories().then((response) => {debugger
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
            setSelectedDomainAccesses(prevState => {
                return [...prevState, domain];
            });
        } else {
            let exSelectedDomainAccess = selectedDomainAccess;
            let newSelectedDomainAccess = exSelectedDomainAccess.filter(item => item !== domain);
            setSelectedDomainAccesses([...newSelectedDomainAccess]);
        }

    };

    let handleDomainResourceChange = (e) => {
        let currentDomainResource = e.target.value;
        setContent(prevState => {
            return {
                ...prevState, domainSource: currentDomainResource
            }
        });
    };

    let uploadSingImg = (e) => {
        contentSercice.uploadSingImg(e).then((response) => {
            let item = response.data;
            setContent(prevState => {
                return {
                    ...prevState, singleImg: `http://dash.webrbp.ir/${item.uri[0].url}`
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    let uploadMultiImg = (file) => {
        setMultiImg(file);
    };

    let uploadVideo = (e) => {
        contentSercice.uploadVideo(e).then((response) => {
            let item = response.data;
            setContent(prevState => {
                return {
                    ...prevState, video: `http://dash.webrbp.ir/${item.uri[0].url}`
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    let uploadVoice = (e) => {
        contentSercice.uploadVoice(e).then((response) => {
            let item = response.data;
            setContent(prevState => {
                return {
                    ...prevState, voice: `http://dash.webrbp.ir/${item.uri[0].url}`
                }
            });
        }).catch((error) => {
            console.log(error);
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
        if (keyName === "description") {
            setContent(prevState => {
                return {
                    ...prevState, field_seo_list: [{
                        value: {
                            title: prevState.field_seo_list[0].value.title,
                            description: e,
                            abstract: prevState.field_seo_list[0].value.abstract,
                            keywords: prevState.field_seo_list[0].value.keywords
                        }
                    }]
                }
            });
        } else {
            setContent(prevState => {
                return {
                    ...prevState, field_seo_list: [{
                        value: {
                            title: prevState.field_seo_list[0].value.title,
                            description: prevState.field_seo_list[0].value.description,
                            abstract: e,
                            keywords: prevState.field_seo_list[0].value.keywords
                        }
                    }]
                }
            });
        }
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
                                <EditorComponent textAlign={lang==='en'?gClasses.textLeft:gClasses.textRight} lang={lang} title={t('translation:description')} onClick={(e) => {
                                    clickEditorDescription(e)
                                }}/>
                            </Box>
                            <Box className="items">
                                <Input lang={lang} type="text" placeholder={t('contents:lidkhabar')}
                                       label={t('contents:lidkhabar')}
                                       error={errors.family}
                                       small='' handleClick={e => handleChange(e, "lidkhabar")}/>
                                <Box className={clsx("publishDate", "card")}>
                                    <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('contents:publishDate')}</Typography>
                                    <div className={clsx("number",lang==='en'?gClasses.ltr:gClasses.rtl)} >
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
                                    <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('tags:tags')}</Typography>
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
                                        <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('categories:categories')}</Typography>
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
                            <Box className={clsx('items',lang==='en'?gClasses.ltr:gClasses.rtl )}>
                                <Box  className={clsx('card',lang==='en'?gClasses.textLeft:gClasses.textRight )}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">{t('translation:status')}</FormLabel>
                                        <RadioGroup aria-label="status" value={content.status.value}
                                                    onChange={e => handleStatusChange(e)}>
                                            <FormControlLabel value="published" control={<Radio/>}
                                                              label={t('contents:published')}/>
                                            <FormControlLabel value="unpublished" control={<Radio/>}
                                                              label={t('contents:unpublished')}/>
                                        </RadioGroup>
                                    </FormControl>
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
                            <Box className={clsx('items',lang==='en'?gClasses.ltr:gClasses.rtl )}>
                                <Box  className={clsx('select','card',lang==='en'?gClasses.textLeft:gClasses.textRight )}>
                                    <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('contents:domainAccess')}</Typography>

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
                                        <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('contents:domainSource')}</Typography>
                                        <NativeSelect
                                            value={content.domainSource}
                                            onChange={e => handleDomainResourceChange(e)}
                                            input={<BootstrapInput/>}
                                        >
                                            <option aria-label="None" value="">{t('translation:none')}</option>
                                            {selectedDomainAccess.map((item) => (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </Box>

                            <Box className="card">
                                <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('contents:metaTag')}</Typography>
                                <Box className="metaTag">
                                    <Box className="right">
                                        <Input lang={lang} type="text" placeholder={t('translation:title')}
                                               label={t('translation:title')}
                                               error={errors.family}
                                               small='' handleClick={e => handleChange(e, "lidkhabar")}/>
                                        <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('translation:description')}</Typography>
                                        <TextField
                                            id="outlined-size-normal"
                                            placeholder="Normal"
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
                                               small='' handleClick={e => handleChange(e, "lidkhabar")}/>
                                        <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('contents:summary')}</Typography>
                                        <TextField
                                            id="outlined-size-normal"
                                            placeholder="Normal"
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
                            <Box className="card">
                                <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('contents:indexImg')}</Typography>
                                <UploadImg multiple={false} title={t('translation:choosePic')} getFile={uploadSingImg}/>
                            </Box>
                            <Box className="card">
                                <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('contents:imgGallery')}</Typography>
                                <UploadImg multiple={true} title={t('translation:choosePic')} getFile={uploadMultiImg}/>
                            </Box>
                            <Box className="card">
                                <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('contents:videoGallery')}</Typography>
                                {/*<UploadImg multiple={true} title={t('translation:chooseVideo')} getFile={uploadVideo}/>*/}
                                <UploadVideo multiple={true} title={t('translation:chooseVideo')}
                                             getFile={uploadVideo}/>
                            </Box>
                            <Box className="card">
                                <Typography className={lang==='en'?gClasses.textLeft:gClasses.textRight}>{t('contents:voiceGallery')}</Typography>
                                <UploadVoice multiple={true} title={t('translation:chooseVoice')}
                                             getFile={uploadVoice}/>
                            </Box>
                            <Box mt={2} className={lang==='en'?gClasses.textLeft:gClasses.textRight}>
                                <ButtonComponent background={primary} color="primary" clicked={register} text={t('translation:register')}/>
                            </Box>

                        </Box>
                    </TabPanel>
                </Box>
            </Paper>
        </Box>
    </>);
}

export default withNamespaces('translation,contents,tags,categories')(NewContentComponent);