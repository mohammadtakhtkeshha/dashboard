import React, {useState, useEffect, useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box, Typography} from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'

import {StyledPaper} from "assets/js/dashboard/dashboard";
import dashboardService from "core/services/dashboard.service";
import {StyledDashboardBlock} from "assets/js/dashboard/dashboard";
import {Center} from "assets/js/App";
import {getContentList, changeFormatMethod} from "./ContentChartComponent.js";

import {
    StyledFlex,
    StyledFlexRow,
    StyledFlexBlock,
    StyledFlexColumn,
    StyledIcon,
    StyledPercentLine,
    PercentageNumber,
    styledCarousel,
    StyledFlexBox,
    ContentChartBlock
} from "assets/js/dashboard/partials/contentChart";
import {ReactComponent as NewsSvg} from "assets/svg/contentType/news-hover.svg";
import {ReactComponent as ArticleSvg} from "assets/svg/contentType/article-hover.svg";
import {ReactComponent as VideoSvg} from "assets/svg/contentType/video-hover.svg";
import {ReactComponent as SoundSvg} from "assets/svg/contentType/sound-hover.svg";
import {ReactComponent as PhotoSvg} from "assets/svg/contentType/photo-hover.svg";
import {ReactComponent as ContentSvg} from "assets/svg/contentType/content-hover.svg";
import withStyles from "@material-ui/core/styles/withStyles";

const StyledCarousel = withStyles(styledCarousel)(Carousel)

function ContentChartComponent({t, appContext}) {
    const lang = i18next.language;
    const [totalLength, setTotalLength] = useState(0);
    const [index, setIndex] = useState(0);
    const [showNavButtons, setShowNavButtons] = useState(false);
    const [chunks, setChunks] = useState([]);
    const [contents, setContents] = useState([
        {icon: <NewsSvg/>, name: 'خبر', machin_name: 'news', number: 0},
        {icon: <ArticleSvg/>, name: 'مقاله', machin_name: 'article', number: 0},
        {icon: <VideoSvg/>, name: 'ویدیو', machin_name: 'video', number: 0},
        {icon: <SoundSvg/>, name: 'صوت', machin_name: 'voice', number: 0},
        {icon: <PhotoSvg/>, name: 'گالری', machin_name: 'gallery', number: 0},
        {icon: <ContentSvg/>, name: 'صفحه ساده', machin_name: 'simple page', number: 0}
    ]);

    useEffect(() => {
        getContentList(setContents, setTotalLength, appContext);
    }, []);



  useEffect(() => {
        changeFormatMethod(contents, setChunks,index)
    }, [contents]);

    const mouseEnter = () => {
        setShowNavButtons(true)
    }

    const mouseLeave = () => {
        setShowNavButtons(false)
    }

    const changeCarousel = (index, active) => {

    }

    const next = (index, active) => {
        setIndex(prevState => {
            if(prevState === 5){
                // changeFormatMethod(contents, setChunks,0)
                return 0
            }else{
                // changeFormatMethod(contents, setChunks,prevState+1)
                return prevState+1
            }
        })
    }

    const prev = (index, active) => {
        setIndex(prevState => {
            if(prevState === 0){
                return 5
            }else{
                return prevState-1
            }
        })
    }

    return (<>
            <StyledDashboardBlock length={totalLength}>
                <StyledPaper>
                    <Typography variant="h4">______ {t('contents:contents')} ______</Typography>
                    <ContentChartBlock onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                        <StyledFlexBlock>
                            <StyledCarousel swipe={true}
                                            autoPlay={false}
                                            animation="slide"
                                            interval={1000}
                                            navButtonsAlwaysVisible={showNavButtons}
                                            // onChange={(e,active)=>changeCarousel(e,active)}
                                            next={next}
                                            prev={prev}
                                            indicators={false}>
                                {chunks.length > 0 && chunks.map((item, i) => {
                                  return(<StyledFlexBox key={i}>{
                                      item.length > 0 && item.map((content, index) => {
                                          let length = content.number;
                                          const percentage = Math.round((length / totalLength) * 100);
                                          return (<StyledFlex key={index}>
                                              <StyledFlexRow>
                                                  <StyledFlexColumn>
                                                      <Center>{content.name}</Center>
                                                      <Center>{length}</Center>
                                                  </StyledFlexColumn>
                                                  <StyledIcon>
                                                      {content.icon}
                                                  </StyledIcon>
                                              </StyledFlexRow>
                                              <StyledFlexColumn>
                                                  <PercentageNumber lang={lang} length={percentage}>
                                                      {percentage}%
                                                  </PercentageNumber>
                                                  <StyledPercentLine length={percentage}>
                                                      <Box/>
                                                  </StyledPercentLine>
                                              </StyledFlexColumn>
                                          </StyledFlex>)
                                      })

                                  }
                                  </StyledFlexBox>)
                                })}
                            </StyledCarousel>
                        </StyledFlexBlock>
                    </ContentChartBlock>
                </StyledPaper>
            </StyledDashboardBlock>
        </>
    );

}

export default withNamespaces('translation,contents')(ContentChartComponent);
