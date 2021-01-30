import React, {useContext, useState, useEffect} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {Grid, Paper, Typography, withStyles} from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import {StyledInput, StyledRadioButton ,StyledLabel} from "assets/js/App"
import {StyledTypographyError} from "assets/js/App"
import {
    uploadImgMethod,
    handleChangeMethodTitle,
    handleVoteChangeMethod,
    handleCommentChangeMethod,
    changeTagsMethod,
    handleChangeUrgentNewsMethod,
    handleChangeChosenMethod,
    handleChangeHightlightMethod,
    handleChangeSpecialMethod,
    handleChangeStatesMethod,
    clickImageTitleAndAltMethod,
    handleChangeNewsCategoryMethod,
    handleChangeImagesCategoryMethod,
    removeImgMethod,
    handleDefaultTagMethod,
    handleChangeSubtitleMethod,
    changeTagsByGettingContentMethod,
    changeStateByGettingContentMethod,
    changeNewsCategoryByGettingContentMethod,
    changeImagesCategoryByGettingContentMethod
} from './FormContentTitleAndImgComponent.js'


import AppContext from "contexts/AppContext"
import ContentsContext from "contexts/ContentsContext"
import {
    styledGridTagsBlock,
    styledGridNewsCategory,
    styledGridStates,
    styledGridUrgentNews,
    styledGridSoundsVideosImages,
    styledGridSubtitle,
    StyledImgsInputBlock,
    StyledImgError,
    styledGridSingleImg,
    styledGridImagesCategory,
    styledGridComment
} from "assets/js/content/partials/modal/insideModal/modalForm/contentTabs/partials/formContentTitleAndImg"
import StyledCheckboxComponent from "components/partials/StyledCheckboxComponent.jsx"
import NewContentContext from "contexts/NewContentContext"
import UploadImgComponent from "components/partials/UploadImgComponent.jsx"

import MultiSelect from "components/partials/AutocompleteComponent.jsx"
import {StyledTypography} from "assets/js/content/partials/new/contentPublishDate";

const StyledGridSingleImg = withStyles(styledGridSingleImg)(Grid)
// const StyledGridVote = withStyles(styledGridVote)(Grid)
const StyledGridTagsBlock = withStyles(styledGridTagsBlock)(Grid)
const StyledGridNewsCategory = withStyles(styledGridNewsCategory)(Grid)
const StyledGridStates = withStyles(styledGridStates)(Grid)
const StyledGridSubtitle = withStyles(styledGridSubtitle)(Grid)
const StyledGridSoundsVideosImages = withStyles(styledGridSoundsVideosImages)(Grid)
const StyledGridUrgentNews = withStyles(styledGridUrgentNews)(Grid)
const StyledGridImagesCategory = withStyles(styledGridImagesCategory)(Grid)
const StyledGridComment = withStyles(styledGridComment)(Grid)

function FormContentTitleAndImgComponent({t, contentype, newsCategory, states, isTitleEmpty, content}) {
    const lang = i18next.language;
    const appContext = useContext(AppContext);
    const contentContext = useContext(ContentsContext);
    const newContentContext = useContext(NewContentContext);
    const [selectedNewsCategory, setSelectedNewsCategory] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [selectedImagesCategory, setSelectedImagesCategory] = useState([]);

    const handleChangeTitle = (e) => {
        handleChangeMethodTitle(e, contentContext, t, contentContext.setContent);
    }

    const uploadImg = (e, multiple) => {
        uploadImgMethod(e, multiple, contentContext, appContext);
    }

    const handleVoteChange = (e) => {
        handleVoteChangeMethod(e, contentContext);
    }

    const handleCommentChange = (e) => {
        handleCommentChangeMethod(e, contentContext);
    }

    const changeTags = (e) => {
        changeTagsMethod(e, contentContext);
    }

    const handleChangeSubtitle = (e) => {
        handleChangeSubtitleMethod(e, contentContext);
    }

    const handleChangeUrgentNews = (e) => {
        handleChangeUrgentNewsMethod(e, contentContext);
    }

    const handleChangeImagesCategory = (e) => {
        handleChangeImagesCategoryMethod(e, contentContext);
    }

    const handleChangeChosen = (e, isChecked) => {
        handleChangeChosenMethod(isChecked, contentContext);
    }

    const handleChangeHightlight = (e, isChecked) => {
        handleChangeHightlightMethod(isChecked, contentContext);
    }

    const handleChangeSpecial = (e, isChecked) => {
        handleChangeSpecialMethod(isChecked, contentContext);
    }

    const removeImg = (e, field) => {
        removeImgMethod(contentContext, field)
    }

    const handleChangeStates = (e) => {
        handleChangeStatesMethod(e, contentContext, setSelectedState);
    }

    const clickImageTitleAndAlt = (e,field) => {
        clickImageTitleAndAltMethod(e,field ,contentContext);
    }

    const handleChangeNewsCategory = (e, isChecked) => {
        handleChangeNewsCategoryMethod(e, isChecked, contentContext, setSelectedNewsCategory);
    }

    // const changeTagsByGettingContent = () => {
    //     changeTagsByGettingContentMethod(contentContext, setSelectedTags);
    // }

    const changeStateByGettingContent = () => {
        changeStateByGettingContentMethod(contentContext, setSelectedState);
    }

    const changeNewsCategoryByGettingContent = () => {
        changeNewsCategoryByGettingContentMethod(contentContext, setSelectedNewsCategory);
    }

    const changeImagesCategoryByGettingContent = () => {
        changeImagesCategoryByGettingContentMethod(contentContext, setSelectedImagesCategory)
    }

    // const handleDefaultTags = () => {
    //     handleDefaultTagMethod(contentContext.content.field_tags,setDefaultTags);
    // }

    useEffect(() => {//for filling edit partials
        // changeTagsByGettingContent()
        changeStateByGettingContent()
        changeNewsCategoryByGettingContent()
        changeImagesCategoryByGettingContent()
        // handleDefaultTags()
    }, [contentContext.content])

    // useEffect(() => {//for filling edit partials
    //     handleDefaultTags();
    // }, [newContentContext.tags])


    console.log(contentContext.content)

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper>
                    <StyledLabel>{t('translation:title')}</StyledLabel>
                    <StyledInput type="text"
                                 value={contentContext.content.title[0].value}
                                 placeholder={t('translation:title')}
                                 className='title'
                                 onChange={e => handleChangeTitle(e)}/>
                    {contentContext.errors.title && <StyledTypographyError align={lang === 'en' ? 'left' : 'right'}>
                        {contentContext.errors.title}
                    </StyledTypographyError>}
                </Paper>
            </Grid>
            <StyledGridSubtitle item contentype={contentype} xs={6}>
                <Paper>
                    <StyledLabel>{t('contents:subtitle')}</StyledLabel>
                    <StyledInput placeholder={t('contents:subtitle')}
                                 value={(contentContext.content.field_subtitle !== undefined &&
                                     contentContext.content.field_subtitle.length > 0) ? contentContext.content.field_subtitle[0].value : ''}
                                 type="text"
                                 className="subtitle"
                                 label={t('contents:contentAddress')}
                                 onChange={e => handleChangeSubtitle(e)}/>
                </Paper>
            </StyledGridSubtitle>
            <StyledGridSoundsVideosImages item contentype={contentype} xs={6} className="chosen">
                <StyledCheckboxComponent label={t('contents:chosen')}
                                         value={contentContext.content.field_chosen !== undefined && contentContext.content.field_chosen[0].value}
                                         checked={contentContext.content.field_chosen !== undefined && contentContext.content.field_chosen[0].value}
                                         change={handleChangeChosen}/>
            </StyledGridSoundsVideosImages>
            <StyledGridSoundsVideosImages item contentype={contentype} xs={6} className="highlight">
                <StyledCheckboxComponent label={t('contents:highlight')}
                                         value={contentContext.content.field_highlight !== undefined && contentContext.content.field_highlight[0].value}
                                         checked={contentContext.content.field_highlight !== undefined && contentContext.content.field_highlight[0].value}
                                         change={handleChangeHightlight}/>
            </StyledGridSoundsVideosImages>
            <StyledGridSoundsVideosImages item contentype={contentype} xs={6} className="special">
                <StyledCheckboxComponent label={t('contents:special')}
                                         value={contentContext.content.field_special_mm !== undefined && contentContext.content.field_special_mm[0].value}
                                         checked={contentContext.content.field_special_mm !== undefined && contentContext.content.field_special_mm[0].value}
                                         change={handleChangeSpecial}/>
            </StyledGridSoundsVideosImages>
            <StyledGridUrgentNews item contentype={contentype} xs={6} className="urgent-news">
                <Typography>{t('contents:urgentNews')}</Typography>
                <StyledRadioButton className="status">
                    <RadioGroup aria-label="status" name="status"
                                value={contentContext.content.field_urgent_news !== undefined && contentContext.content.field_urgent_news[0].value}
                                checked={contentContext.content.field_urgent_news !== undefined && contentContext.content.field_urgent_news[0].value}
                                onChange={handleChangeUrgentNews}>
                        <FormControlLabel value={false} control={<Radio/>}
                                          label={t('translation:no')}/>
                        <FormControlLabel value={true} control={<Radio/>}
                                          label={t('translation:yes')}/>
                    </RadioGroup>
                </StyledRadioButton>
            </StyledGridUrgentNews>

            {/*<StyledGridImagesCategory item xs={6} contentype={contentype}>*/}
            {/*    <Typography>{t('contents:imagesCategory')}</Typography>*/}
            {/*    <StyledRadioButton>*/}
            {/*        <RadioGroup aria-label="status"*/}
            {/*                    name="status"*/}
            {/*                    value={contentContext.content.field_images_category !== undefined && contentContext.content.field_images_category.length > 0 && contentContext.content.field_images_category[0].target_id}*/}
            {/*                    onChange={handleChangeImagesCategory}>*/}
            {/*            {contentContext.imagesCategory.map((item, index) => {*/}
            {/*                return (*/}
            {/*                    <FormControlLabel key={index}*/}
            {/*                                      value={item.tid}*/}
            {/*                                      checked={selectedImagesCategory === item.tid}*/}
            {/*                                      control={<Radio/>}*/}
            {/*                                      label={item.name}/>*/}
            {/*                )*/}
            {/*            })}*/}
            {/*        </RadioGroup>*/}
            {/*    </StyledRadioButton>*/}
            {/*</StyledGridImagesCategory>*/}
            <StyledGridComment item contentype={contentype} className="comment" xs={6}>
                <FormControl component="fieldset">
                    <label><Typography>{t('contents:commentStatus')}</Typography></label>
                    <StyledRadioButton>
                        <RadioGroup aria-label="status" name="status"
                                    value={contentContext.content.comment !== undefined && contentContext.content.comment[0].status}
                                    onChange={handleCommentChange}>
                            <FormControlLabel value={1} control={<Radio/>}
                                              label={t('translation:active')}/>
                            <FormControlLabel value={2} control={<Radio/>}
                                              label={t('translation:block')}/>
                        </RadioGroup>
                    </StyledRadioButton>
                </FormControl>
            </StyledGridComment>
            <StyledGridTagsBlock item contentype={contentype} className="tags" xs={12}>
                <StyledTypography>{t('translation:tags')}</StyledTypography>
                <MultiSelect array={newContentContext.tags}
                             changedTags={changeTags}
                             label={t('translation:tags')}
                             setSelectedTags={contentContext.setSelectedTags}
                             selectedTags={contentContext.selectedTags}/>
            </StyledGridTagsBlock>
            <StyledGridSingleImg item contentype={contentype} className="image" xs={12}>
                <UploadImgComponent type='image'
                                    getFileInParent={(e) => uploadImg(e, 'single')}
                                    imgsAndUrls={contentContext.imgAndUrl}
                                    title={t('translation:choosePic')}
                                    removeImgInParent={(e) => removeImg(e, 'field_image')}
                                    multiple={false}/>
                <StyledImgsInputBlock showImgInputs={contentContext.content.field_image?.length > 0 ? true : false}>
                    <StyledInput placeholder={t('translation:title')}
                                 value={(contentContext.content.field_image !== undefined &&
                                     contentContext.content.field_image.length > 0) ? contentContext.content.field_image[0].title : ''}
                                 type="text"
                                 className="subtitle"
                                 label={t('contents:contentAddress')}
                                 onChange={e => clickImageTitleAndAlt(e,'title')}/>
                    <StyledInput placeholder={t('translation:alt')}
                                 value={(contentContext.content.field_image !== undefined &&
                                     contentContext.content.field_image.length > 0) ? contentContext.content.field_image[0].alt : ''}
                                 type="text"
                                 className="subtitle"
                                 label={t('contents:contentAddress')}
                                 onChange={e => clickImageTitleAndAlt(e,'alt')}/>
                </StyledImgsInputBlock>
                <StyledImgError error={contentContext.errors?.field_image ? true : false}>
                    <StyledTypographyError align={lang === 'en' ? 'left' : 'right'}>
                        {contentContext.errors.title}
                    </StyledTypographyError>
                </StyledImgError>
            </StyledGridSingleImg>
            {/*<StyledGridVote contentype={contentype}>*/}
            {/*    <FormControl component="fieldset">*/}
            {/*        <label><Typography>{t('contents:voteAbility')}</Typography></label>*/}
            {/*        <StyledRadioButton>*/}
            {/*            <RadioGroup aria-label="status" name="status"*/}
            {/*                        value={contentContext.content.field_vote && contentContext.content.field_vote[0].status === 1 ? true : false}*/}
            {/*                        onChange={handleVoteChange}>*/}
            {/*                <FormControlLabel value={true} control={<Radio/>}*/}
            {/*                                  label={t('translation:open')}/>*/}
            {/*                <FormControlLabel value={false} control={<Radio/>}*/}
            {/*                                  label={t('translation:close')}/>*/}
            {/*            </RadioGroup>*/}
            {/*        </StyledRadioButton>*/}
            {/*    </FormControl>*/}
            {/*</StyledGridVote>*/}

            <StyledGridNewsCategory contentype={contentype} item xs={4} className="news-category">
                <Typography>{t('translation:newsCategory')}</Typography>
                {newsCategory.map(function (item, index) {
                    return (<div key={index}>
                        <StyledCheckboxComponent label={item.name}
                                                 value={item.tid}
                                                 checked={selectedNewsCategory.includes(item.tid)}
                                                 change={handleChangeNewsCategory}/>
                    </div>)
                })}
            </StyledGridNewsCategory>
            {/*<StyledGridStates contentype={contentype} item xs={4}>*/}
            {/*    <Typography>{t('contents:provinces')}</Typography>*/}
            {/*    <StyledRadioButton className="states">*/}
            {/*        <RadioGroup aria-label="status" name="status"*/}
            {/*                    value={contentContext.content.field_states !== undefined && contentContext.content.field_states.length > 0 && `${contentContext.content.field_states[0].target_id}`}*/}
            {/*                    onChange={handleChangeStates}>*/}
            {/*            {states.map(function (item, index) {*/}
            {/*                return (<div key={index}>*/}
            {/*                    <FormControlLabel value={item.tid}*/}
            {/*                                      checked={selectedState === item.tid}*/}
            {/*                                      control={<Radio/>}*/}
            {/*                                      label={item.name}/>*/}
            {/*                </div>)*/}
            {/*            })}*/}
            {/*        </RadioGroup>*/}
            {/*    </StyledRadioButton>*/}
            {/*</StyledGridStates>*/}
        </Grid>
    );
}

export default withNamespaces('contents,translation')(FormContentTitleAndImgComponent);
