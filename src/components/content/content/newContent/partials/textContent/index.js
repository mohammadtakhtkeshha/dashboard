import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";
import moment from "moment";
import clsx from "clsx";

import {Box, Typography, RadioGroup, Radio, FormLabel} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles, withStyles} from "@material-ui/core/styles";

import {globalCss} from "assets/js/globalCss";
import tagService from "core/services/tag.service";
import contentService from "core/services/content.service";
import EditorComponent from "components/partials/EditorComponent";
import DatePickerrComponent from "components/partials/DatePickerrComponent";
import Input from "components/partials/inputComponent";
import {useStyles, bootstrapInput} from 'assets/js/content/newContent';
import NewContentContext from "contexts/NewContentContext";
import SeoFormContentComponent from "./partials/SeoFormContentComponent";

const gClass = makeStyles(globalCss);
const styles = makeStyles(useStyles);

function TextContentTabComponent({t}) {
    const lang = i18next.language;
    const gClasses = gClass();
    const newContentContext = useContext(NewContentContext);
    const classes = styles();
    const [tags, setTags] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openAutoComplete, setOpenAutoComplete] = useState(false);
    const [selectedJalaliDate, setSelectedJalaliDate] = useState(moment());
    const [selectedDomainSource, setSelectedDomainSource] = useState('');
    const BootstrapInput = withStyles(bootstrapInput)(InputBase);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});

    let handleChange = (e, field) => {
        let currentName;
        currentName = e.currentTarget.value;
        newContentContext.setContent(prevState => {
            return {
                ...prevState, [field]: currentName
            }
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

    let handleAffiliateChange = (e) => {
        let checked = e.currentTarget.checked;
        newContentContext.setContent(prevState => {
            return {
                ...prevState, field_domain_all_affiliates: checked
            }
        });
    }

    let clickEditorDescription = (e) => {
        newContentContext.setContent(prevState => {
            return {
                ...prevState, body: e
            }
        });
    };

    let handleStatusChange = (e) => {
        newContentContext.setContent(prevState => {
            return {
                ...prevState, status: e.currentTarget.value,
            }
        });
    };

    let handleSpecialNewsDisplayChange = (e) => {
        debugger
        newContentContext.setContent(prevState => {
            return {
                ...prevState, field_special_news_display: e.currentTarget.value,
            }
        });
    };

    let handleCategoryChange = (event) => {
        let currentCat = event.target.value;
        newContentContext.setContent(prevState => {
            return {
                ...prevState, category: currentCat
            }
        });
    };

    let getPublishDate = (date) => {
        newContentContext.setContent(prevState => {
            return {
                ...prevState, publishDate: {value: date},
            }
        });
    };

    // let handleDomainAccessChange = (e, domain) => {
    //     if (e.target.checked) {
    //         newContentContext.setSelectedDomainAccess(prevState => {
    //             return [...prevState, domain];
    //         });
    //         newContentContext.setContent(prevState => {
    //             let domainAccessArray = newContentContext.isObjectEmpty(prevState.field_domain_access) ? [] : prevState.field_domain_access.target_id.split(',');
    //             domainAccessArray.push(domain.id);
    //             let domainAccessString = domainAccessArray.toString();
    //             return {...prevState, field_domain_access: {target_id: domainAccessString, target_type: 'domain'}};
    //         });
    //     } else {
    //         debugger
    //         let exSelectedDomainAccess = newContentContext.selectedDomainAccess;
    //         let newSelectedDomainAccess = exSelectedDomainAccess.filter(item => item !== domain);
    //         newContentContext.setSelectedDomainAccess([...newSelectedDomainAccess]);
    //         newContentContext.setContent(prevState => {
    //             let domainAccessArray = prevState.field_domain_access.target_id.split(',');
    //             let currentIndex = domainAccessArray.indexOf(domain.id);
    //             domainAccessArray.splice(currentIndex, 1);
    //             let domainAccessString = domainAccessArray.toString();
    //             return {...prevState, field_domain_access: {target_id: domainAccessString, target_type: 'domain'}};
    //         });
    //     }
    //
    // };

    let handleDomainSourceChange = (e) => {
        let currentDomainSource = e.target.value;
        setSelectedDomainSource(currentDomainSource);
        newContentContext.setContent(prevState => {
            return {
                ...prevState, field_domain_source: {
                    "target_id": currentDomainSource,
                    "target_type": "domain"
                }
            }
        });
    };

    let handleTagChange = (event, values) => {
        let tags = values.map(item => item.tid);
        newContentContext.setSelectedTags([...values]);
        newContentContext.setContent(prevState => {
            return {
                ...prevState, field_tags: {
                    target_id: tags.toString()
                }
            }
        });
    };

    let handleDateChange = (date) => {
        if (lang === 'fa') {
            setSelectedJalaliDate(date);
        } else {
            setSelectedDate(date);
        }
        newContentContext.setContent(prevState => {
            return {
                ...prevState, publishDate: {value: date.toLocaleString()},
            }
        })
    };


    let getCategories = () => {
        contentService.getCategories().then((response) => {
            let categories = response.data.rows;
            setCategories(categories);
        }).catch((error) => {
            console.log(error)
        });

    };


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
    let handleDomainAccessChange = (e, domain) => {
        if (e.target.checked) {
            newContentContext.setSelectedDomainAccess(prevState => {
                return [...prevState, domain];
            });
            newContentContext.setContent(prevState => {
                let domainAccessArray = newContentContext.isObjectEmpty(prevState.field_domain_access) ? [] : prevState.field_domain_access.target_id.split(',');
                domainAccessArray.push(domain.id);
                let domainAccessString = domainAccessArray.toString();
                return {...prevState, field_domain_access: {target_id: domainAccessString, target_type: 'domain'}};
            });
        } else {
            let exSelectedDomainAccess = newContentContext.selectedDomainAccess;
            let newSelectedDomainAccess = exSelectedDomainAccess.filter(item => item !== domain);
            newContentContext.setSelectedDomainAccess([...newSelectedDomainAccess]);
            newContentContext.setContent(prevState => {
                let domainAccessArray = prevState.field_domain_access.target_id.split(',');
                let currentIndex = domainAccessArray.indexOf(domain.id);
                domainAccessArray.splice(currentIndex, 1);
                let domainAccessString = domainAccessArray.toString();
                return {...prevState, field_domain_access: {target_id: domainAccessString, target_type: 'domain'}};
            });
        }

    };

    // -----auto complete ------
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


    return (<>
        <Box className="items">
            <Box className="inputBlock">
                <Input
                    value={newContentContext.content.title}
                    lang={lang}
                    type="text" placeholder={t('translation:title')} label={t('translation:title')}
                    error={errors.title ? errors.title : ''}
                    small='' handleClick={e => handleChange(e, "title")}/>
                {newContentContext.errors.title ?
                    <Typography className="error">{newContentContext.errors.title}</Typography> : ''}
            </Box>
            <Input
                value={newContentContext.content.rotitr || ''}
                lang={lang}
                type="text" placeholder={t('contents:rotitr')}
                label={t('contents:rotitr')}
                error={errors.family}
                small='' handleClick={e => handleChange(e, "rotitr")}/>
        </Box>
        <Box className="editor">
            <EditorComponent textAlign={lang === 'en' ? gClasses.textLeft : gClasses.textRight}
                             title={t('translation:description')} onClick={(e) => {
                clickEditorDescription(e)
            }}/>
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
                    value={newContentContext.selectedTags}
                    onChange={handleTagChange}
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
                        value={newContentContext.content.category}
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
                <FormControl component="fieldset">
                    <FormLabel component="legend">{t('translation:status')}</FormLabel>
                    <RadioGroup aria-label="status" value={newContentContext.content.status}
                                onChange={e => handleStatusChange(e)}>
                        <FormControlLabel value="true" control={<Radio/>}
                                          label={t('contents:published')}/>
                        <FormControlLabel value="false" control={<Radio/>}
                                          label={t('contents:unpublished')}/>
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box className={clsx('card', lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{t('contents:specialNewsDisplay')}</FormLabel>
                    <RadioGroup value={newContentContext.content.field_special_news_display}
                                onChange={e => handleSpecialNewsDisplayChange(e)}>
                        <FormControlLabel value="true" control={<Radio/>}
                                          label={t('contents:show')}/>
                        <FormControlLabel value="false" control={<Radio/>}
                                          label={t('contents:notShow')}/>
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
        <Box className={clsx('items', lang === 'en' ? gClasses.ltr : gClasses.rtl)}>
            <Box
                className={clsx('select', 'card', lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>
                <Typography
                    className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:domainAccess')}</Typography>
                <FormGroup row>
                    {newContentContext.domainAccesses.map(domain => (
                            <Box key={domain.id}>
                                <FormControlLabel
                                    control={<Checkbox checked={newContentContext.selectedDomainAccess.includes(domain)}
                                                       onChange={(e) => handleDomainAccessChange(e, domain)}
                                                       name={domain.name}
                                    />}
                                    label={domain.name}
                                />
                            </Box>
                        )
                    )}
                </FormGroup>
            </Box>
            <Box className={clsx('select', 'card')}>
                <FormControl className={classes.margin}>
                    <Typography
                        className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:domainSource')}</Typography>
                    <NativeSelect
                        value={selectedDomainSource}
                        onChange={e => handleDomainSourceChange(e)}
                        input={<BootstrapInput/>}
                    >
                        <option aria-label="None" value="">{t('translation:none')}</option>
                        {newContentContext.selectedDomainAccess.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </NativeSelect>
                </FormControl>
            </Box>
        </Box>

        {/*--------------------------------------------------------------------------------------------*/}
        <Box className={clsx('items', lang === 'en' ? gClasses.ltr : gClasses.rtl)}>
            <Box className={clsx('select', 'card', lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>
                <Typography
                    className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:sendToAllAffiliates')}</Typography>
                <FormGroup row>

                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={newContentContext.content.field_domain_all_affiliates}
                                               onChange={(e) => handleAffiliateChange(e)}
                            />}
                            label={t('contents:availableOnAllDomain')}
                        />
                    </Box>

                </FormGroup>
            </Box>
            <Box className={clsx( 'date', lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>
                <DatePickerrComponent/>
            </Box>
        </Box>
        {/*-----------------------------------------------------------------------------------*/}

        <SeoFormContentComponent/>
    </>);
}

export default withNamespaces('contents,translation')(TextContentTabComponent);
