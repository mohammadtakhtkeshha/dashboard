import React, {useContext, useEffect, useState} from 'react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {withStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fade from "@material-ui/core/Fade";

import {StyledSvg, StyledDirection} from "assets/js/App";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import {ModalBody, StyledCancelButton} from "assets/js/content/partials/contentModal";
import {listStyles, listItemStyles ,styledListItemText} from "assets/js/content/partials/contentType"
import ContentsContext from "contexts/ContentsContext";
import {ReactComponent as ArticleSvg} from "../../../../../../assets/svg/contentType/article.svg";
import {ReactComponent as ArticleHoverSvg} from "../../../../../../assets/svg/contentType/article-hover.svg";
import {ReactComponent as ContentSvg} from "../../../../../../assets/svg/contentType/content.svg";
import {ReactComponent as ContentHoverSvg} from "../../../../../../assets/svg/contentType/content-hover.svg";
import {ReactComponent as NewsSvg} from "../../../../../../assets/svg/contentType/news.svg";
import {ReactComponent as NewsHoverSvg} from "../../../../../../assets/svg/contentType/news-hover.svg";
import {ReactComponent as PhotoSvg} from "../../../../../../assets/svg/contentType/photo.svg";
import {ReactComponent as PhotoHoverSvg} from "../../../../../../assets/svg/contentType/photo-hover.svg";
import {ReactComponent as SoundSvg} from "../../../../../../assets/svg/contentType/sound.svg";
import {ReactComponent as SoundHoverSvg} from "../../../../../../assets/svg/contentType/sound-hover.svg";
import {ReactComponent as VideoSvg} from "../../../../../../assets/svg/contentType/video.svg";
import {ReactComponent as videoHoverSvg} from "../../../../../../assets/svg/contentType/video-hover.svg";

const StyledListItemText = withStyles(styledListItemText)(ListItemText);
const StyledListItem = withStyles(listItemStyles)(ListItem);
const StyledList = withStyles(listStyles)(List);

function ContentTypeListModalComponent({setContentType, t, openRegisterForm, handleCloseRegisterForm}) {
    const lang = i18next.language;
    const contentsContext = useContext(ContentsContext);
    const [contentTypeNameList, setContentTypeNameList] = useState([
        {icon: <NewsSvg/>, name: 'خبر', machin_name: 'news', description: 'description'},
        {icon: <ArticleSvg/>, name: 'مقاله', machin_name: 'article', description: 'description'},
        {icon: <VideoSvg/>, name: 'ویدیو', machin_name: 'video', description: 'description'},
        {icon: <SoundSvg/>, name: 'صوت', machin_name: 'voice', description: 'description'},
        {icon: <PhotoSvg/>, name: 'گالری', machin_name: 'gallery', description: 'description'},
        {icon: <ContentSvg/>, name: 'صفحه ساده', machin_name: 'simple page', description: 'description'}
    ]);

    const handleToggle = (e, value) => {
        setContentType(value.machin_name);
    }

    // useEffect(() => {
    //     const currentContentTypeList = contentsContext.contentTypeList;
    //     let contentTypeArray = [];
    //     for (const [key, value] of Object.entries(currentContentTypeList)) {
    //         let obj = {machinName: key, name: value[0].name}
    //         contentTypeArray.push(obj);
    //     }
    //     setContentTypeNameList(contentTypeArray);
    // }, [contentsContext.contentTypeList]);

    return (
        <Fade in={openRegisterForm} id="modalContentList">
            <Box>
                <StyledCancelButton onClick={handleCloseRegisterForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <StyledDirection lang={lang}>
                        <StyledList lang={lang}>
                            <StyledListItem role={undefined} dense button>
                                <ListItemText id={0} primary={t('contents:chooseContentType')}/>
                            </StyledListItem>
                            {contentTypeNameList.map((value) => {
                                const labelId = `checkbox-list-label-${value}`;
                                return (
                                    <StyledListItem key={value.machin_name} role={undefined} dense button
                                                    onClick={(e) => handleToggle(e, value)}>
                                        {value.icon}
                                        <StyledListItemText lang={lang} id={labelId}
                                                      primary={lang === 'en' ? value.machin_name : value.name}
                                                      secondary={value.description}/>
                                    </StyledListItem>
                                );
                            })}
                        </StyledList>
                    </StyledDirection>
                </ModalBody>
            </Box>
        </Fade>
    );
}

export default withNamespaces('contents')(ContentTypeListModalComponent);