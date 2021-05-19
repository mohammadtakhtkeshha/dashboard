import React, {useContext, useState, useEffect} from 'react';
import {withNamespaces} from 'react-i18next';
import i18next from 'i18next';

import {Grid, Paper, Typography, withStyles} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import {StyledInput, StyledRadioButton, StyledLabel} from 'assets/js/App';
import {StyledTypographyError} from 'assets/js/App';
import {
    uploadImgMethod,
    handleChangeMethodTitle,
    handleCommentChangeMethod,
    changeTagsMethod,
    handleChangeUrgentNewsMethod,
    handleChangeChosenMethod,
    handleChangeHightlightMethod,
    handleChangeSpecialMethod,
    clickImageTitleAndAltMethod,
    handleChangeNewsCategoryMethod,
    removeImgMethod,
    handleChangeSubtitleMethod,
    changeNewsCategoryByGettingContentMethod,
} from './FormContentTitleAndImgComponent.js';
import AppContext from 'contexts/AppContext';
import ContentsContext from 'contexts/ContentsContext';
import {
    styledGridTagsBlock,
    styledGridNewsCategory,
    styledGridUrgentNews,
    styledGridSoundsVideosImages,
    StyledCheckboxBody,
    styledGridSubtitle,
    StyledImgsInputBlock,
    StyledImgError,
    styledGridSingleImg,
    styledGridComment,
} from 'assets/js/content/partials/modal/insideModal/modalForm/contentTabs/partials/formContentTitleAndImg';
import StyledCheckboxComponent from 'infrastructure/authorized/partials/StyledCheckboxComponent.jsx';
import UploadImgComponent from 'infrastructure/authorized/partials/UploadImgComponent.jsx';
import MultiSelect from 'infrastructure/authorized/partials/AutocompleteComponent.jsx';
import {StyledTypography} from 'assets/js/content/partials/new/contentPublishDate';

const StyledGridSingleImg = withStyles(styledGridSingleImg)(Grid);
const StyledGridTagsBlock = withStyles(styledGridTagsBlock)(Grid);
const StyledGridNewsCategory = withStyles(styledGridNewsCategory)(Grid);
const StyledGridSubtitle = withStyles(styledGridSubtitle)(Grid);
const StyledGridSoundsVideosImages = withStyles(styledGridSoundsVideosImages)(Grid);
const StyledGridUrgentNews = withStyles(styledGridUrgentNews)(Grid);
const StyledGridComment = withStyles(styledGridComment)(Grid);

function FormContentTitleAndImgComponent({t, contentype, newsCategory}) {
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);
    const contentContext = useContext(ContentsContext);
    const [selectedNewsCategory, setSelectedNewsCategory] = useState([]);

    useEffect(() => {
        changeNewsCategoryByGettingContentMethod(contentContext.content.field_news_category, setSelectedNewsCategory);
    }, [contentContext.content.field_news_category,setSelectedNewsCategory]); //Once

    return (<Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper>
                    <StyledLabel>{t('translation:title')}</StyledLabel>
                    <StyledInput
                        type="text"
                        value={contentContext.content.title[0].value}
                        placeholder={t('translation:title')}
                        className="title"
                        onChange={e => handleChangeMethodTitle(e, contentContext)}/>
                    {contentContext.errors.title && (
                        <StyledTypographyError
                            align={lang === 'en' ? 'left' : 'right'}>{contentContext.errors.title}</StyledTypographyError>
                    )}
                </Paper>
            </Grid>
            <StyledGridSubtitle item contentype={contentype} xs={6}>
                <Paper>
                    <StyledLabel>{t('contents:subtitle')}</StyledLabel>
                    <StyledInput placeholder={t('contents:subtitle')}
                                 value={
                                     contentContext.content.field_subtitle !== undefined && contentContext.content.field_subtitle.length > 0
                                         ? contentContext.content.field_subtitle[0].value
                                         : ''
                                 }
                                 type="text"
                                 className="subtitle"
                                 label={t('contents:contentAddress')}
                                 onChange={e => handleChangeSubtitleMethod(e, contentContext)}/>
                </Paper>
            </StyledGridSubtitle>
            <StyledGridSoundsVideosImages item contentype={contentype} xs={6} className="chosen">
                <StyledCheckboxComponent
                    label={t('contents:chosen')}
                    value={contentContext.content.field_chosen !== undefined && contentContext.content.field_chosen[0].value}
                    checked={contentContext.content.field_chosen !== undefined && contentContext.content.field_chosen[0].value}
                    change={e => handleChangeChosenMethod(e, contentContext)}
                />
            </StyledGridSoundsVideosImages>
            <StyledGridSoundsVideosImages item contentype={contentype} xs={6} className="highlight">
                <StyledCheckboxComponent
                    label={t('contents:highlight')}
                    value={contentContext.content.field_highlight !== undefined && contentContext.content.field_highlight[0].value}
                    checked={contentContext.content.field_highlight !== undefined && contentContext.content.field_highlight[0].value}
                    change={e => handleChangeHightlightMethod(e, contentContext)}
                />
            </StyledGridSoundsVideosImages>
            <StyledGridSoundsVideosImages item contentype={contentype} xs={6} className="special">
                <StyledCheckboxComponent
                    label={t('contents:special')}
                    value={contentContext.content.field_special_mm !== undefined && contentContext.content.field_special_mm[0].value}
                    checked={contentContext.content.field_special_mm !== undefined && contentContext.content.field_special_mm[0].value}
                    change={e => handleChangeSpecialMethod(e, contentContext)}
                />
            </StyledGridSoundsVideosImages>
            <StyledGridUrgentNews item contentype={contentype} xs={6} className="urgent-news">
                <Typography>{t('contents:urgentNews')}</Typography>
                <StyledRadioButton className="status">
                    <RadioGroup
                        aria-label="status"
                        name="status"
                        value={contentContext.content.field_urgent_news !== undefined && contentContext.content.field_urgent_news[0].value}
                        checked={contentContext.content.field_urgent_news !== undefined && contentContext.content.field_urgent_news[0].value}
                        onChange={e => handleChangeUrgentNewsMethod(e, contentContext)}>
                        <FormControlLabel value={false} control={<Radio/>} label={t('translation:no')}/>
                        <FormControlLabel value={true} control={<Radio/>} label={t('translation:yes')}/>
                    </RadioGroup>
                </StyledRadioButton>
            </StyledGridUrgentNews>
            <StyledGridComment item contentype={contentype} className="comment" xs={6}>
                <FormControl component="fieldset">
                    <label>
                        <Typography>{t('contents:commentStatus')}</Typography>
                    </label>
                    <StyledRadioButton>
                        <RadioGroup
                            aria-label="status"
                            name="status"
                            value={contentContext.content.comment !== undefined && contentContext.content.comment[0].status}
                            onChange={e => handleCommentChangeMethod(e, contentContext)}>
                            <FormControlLabel value={1} control={<Radio/>} label={t('translation:active')}/>
                            <FormControlLabel value={2} control={<Radio/>} label={t('translation:block')}/>
                        </RadioGroup>
                    </StyledRadioButton>
                </FormControl>
            </StyledGridComment>
            <StyledGridTagsBlock item contentype={contentype} className="tags" xs={12}>
                <StyledTypography>{t('translation:tags')}</StyledTypography>
                <MultiSelect
                    array={contentContext.tags}
                    changedTags={e => changeTagsMethod(e, contentContext)}
                    label={t('translation:tags')}
                    setSelectedTags={contentContext.setSelectedTags}
                    selectedTags={contentContext.selectedTags}
                />
            </StyledGridTagsBlock>
            <StyledGridSingleImg item contentype={contentype} className="image" xs={12}>
                <UploadImgComponent type="image"
                                    getFileInParent={e => uploadImgMethod(e, 'single', contentContext, setLoading)}
                                    imgsAndUrls={contentContext.imgAndUrl}
                                    title={t('translation:choosePic')}
                                    removeImgInParent={e => removeImgMethod(contentContext, 'field_image')}
                                    multiple={false}/>
                <StyledImgsInputBlock showImgInputs={contentContext.content.field_image?.length > 0 ? true : false}>
                    <StyledInput
                        placeholder={t('translation:title')}
                        value={
                            contentContext.content.field_image !== undefined && contentContext.content.field_image.length > 0 && contentContext.content.field_image[0].title !== undefined
                                ? contentContext.content.field_image[0].title
                                : ''
                        }
                        type="text"
                        className="subtitle"
                        label={t('contents:contentAddress')}
                        onChange={e => clickImageTitleAndAltMethod(e, 'title', contentContext)}
                    />
                    <StyledInput
                        placeholder={t('translation:alt')}
                        value={
                            contentContext.content.field_image !== undefined && contentContext.content.field_image.length > 0 && contentContext.content.field_image[0].alt !== undefined
                                ? contentContext.content.field_image[0].alt
                                : ''
                        }
                        type="text"
                        className="subtitle"
                        label={t('contents:contentAddress')}
                        onChange={e => clickImageTitleAndAltMethod(e, 'alt', contentContext)}
                    />
                </StyledImgsInputBlock>
                <StyledImgError error={contentContext.errors?.field_image ? true : false}>
                    <StyledTypographyError
                        align={lang === 'en' ? 'left' : 'right'}>{contentContext.errors.title}</StyledTypographyError>
                </StyledImgError>
            </StyledGridSingleImg>
            <StyledGridNewsCategory contentype={contentype} item xs={4} className="news-category">
                <Typography>{t('translation:newsCategory')}</Typography>
                {newsCategory.map(function (item, index) {
                    return (
                        <StyledCheckboxBody key={index}>
                            <StyledCheckboxComponent
                                label={item.name}
                                value={item.tid}
                                checked={selectedNewsCategory.includes(item.tid)}
                                change={e => handleChangeNewsCategoryMethod(e, contentContext, setSelectedNewsCategory)}
                            />
                        </StyledCheckboxBody>
                    );
                })}
            </StyledGridNewsCategory>
        </Grid>
    );
}

export default withNamespaces('contents,translation')(FormContentTitleAndImgComponent);
