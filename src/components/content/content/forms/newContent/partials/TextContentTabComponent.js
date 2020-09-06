import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";
import moment from "moment";
import clsx from "clsx";

import {Box, Typography} from "@material-ui/core";
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
import DatePickerr from "components/partials/DatePickerr";
import Input from "components/partials/inputComponent";
import {useStyles, bootstrapInput} from 'assets/js/content/newContent';
import ContentContext from "contexts/ContentContext";

const gClass = makeStyles(globalCss);
const styles = makeStyles(useStyles);

function TextContentTabComponent({t}) {
    const lang = i18next.language;
    const gClasses = gClass();
    const contentContext = useContext(ContentContext);
    const classes = styles();
    const [tags, setTags] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openAutoComplete, setOpenAutoComplete] = useState(false);
    const [selectedJalaliDate, setSelectedJalaliDate] = useState(moment());
    const [selectedDomainAccess, setSelectedDomainAccess] = useState([]);
    const [selectedDomainSource, setSelectedDomainSource] = useState('');
    const [domainAccesses, setDomainAccesses] = useState([]);
    const BootstrapInput = withStyles(bootstrapInput)(InputBase);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({
        errorName: {},
        errorMail: {},
    });

    let getDomainSource = () => {
        contentService.getDomainSource().then((response) => {
            setDomainAccesses(response.data);
        }).catch((error) => {
            console.log(error)
        });
    };

    let handleChange = (e, field) => {
        let currentName;
        currentName = e.currentTarget.value;
        contentContext.setContent(prevState => {
            return {
                ...prevState, [field]: currentName
            }
        });
    };

    let getCategories = () => {
        contentService.getCategories().then((response) => {
            let categories = response.data.rows;
            setCategories(categories);
        }).catch((error) => {
            console.log(error)
        });

    };

    let clickEditorDescription = (e) => {
        contentContext.setContent(prevState => {
            return {
                ...prevState, body: e
            }
        });
    };

    let handleTagChange = (event) => {
        let currentTag = event.target.value;
        contentContext.setContent(prevState => {
            return {
                ...prevState, tag: currentTag
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

    let handleCategoryChange = (event) => {
        let currentCat = event.target.value;
        contentContext.setContent(prevState => {
            return {
                ...prevState, category: currentCat
            }
        });
    };

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
        setSelectedDomainSource(currentDomainResource);
        // contentContext.setContent(prevState => {
        //     return {
        //         ...prevState, field_domain_source: {
        //             "target_id": currentDomainResource,
        //             "target_type": "domain"
        //         }
        //     }
        // });
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
        let tags = values.map(item => item.tid);
        contentContext.setContent(prevState => {
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
        contentContext.setContent(prevState => {
            return {
                ...prevState, publishDate: {value: date.toLocaleString()},
            }
        })
    };

    useEffect(() => {
        getDomainSource();
    }, []);

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

    // console.log(contentContext.content);

    return (<>
        <Box className="items">
            <Box className="inputBlock">
                <Input
                    lang={lang}
                    type="text" placeholder={t('translation:title')} label={t('translation:title')}
                    error={errors.title ? errors.title : ''}
                    small='' handleClick={e => handleChange(e, "title")}/>
                {contentContext.errors.title ?
                    <Typography className="error">{contentContext.errors.title}</Typography> : ''}
            </Box>
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
                        value={contentContext.content.category}
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
                        value={selectedDomainSource}
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
    </>);
}

export default withNamespaces('contents,translation')(TextContentTabComponent);
