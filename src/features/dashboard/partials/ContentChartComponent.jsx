import React, { useState, useEffect, useContext, useCallback } from "react"
import { withNamespaces } from "react-i18next"

import { Typography } from "@material-ui/core"

import { StyledPaper } from "assets/js/dashboard/dashboard"
import { StyledDashboardBlock } from "assets/js/dashboard/dashboard"
import { getContentListMethod } from "./ContentChartComponent.js"
import Carsoul from "./Carsoul.jsx";

import {
    StyledFlexBlock,
    ContentChartBlock
} from "assets/js/dashboard/partials/contentChart"
import { ReactComponent as NewsSvg } from "assets/svg/contentType/news-hover.svg"
import { ReactComponent as ArticleSvg } from "assets/svg/contentType/article-hover.svg"
import { ReactComponent as VideoSvg } from "assets/svg/contentType/video-hover.svg"
import { ReactComponent as SoundSvg } from "assets/svg/contentType/sound-hover.svg"
import { ReactComponent as PhotoSvg } from "assets/svg/contentType/photo-hover.svg"
import { ReactComponent as ContentSvg } from "assets/svg/contentType/content-hover.svg"
import AppContext from "contexts/AppContext";

function ContentChartComponent({ t }) {
    const appContext = useContext(AppContext)
    const [totalLength, setTotalLength] = useState(0)
    const [isRequestSuccess, setIsRequestSuccess] = useState(false)
    const [contents, setContents] = useState([
        { icon: <NewsSvg />, name: 'خبر', machin_name: 'news', number: 0 },
        { icon: <ArticleSvg />, name: 'مقاله', machin_name: 'article', number: 0 },
        { icon: <VideoSvg />, name: 'ویدیو', machin_name: 'video', number: 0 },
        { icon: <SoundSvg />, name: 'صوت', machin_name: 'voice', number: 0 },
        { icon: <PhotoSvg />, name: 'گالری', machin_name: 'gallery', number: 0 },
        { icon: <ContentSvg />, name: 'صفحه ساده', machin_name: 'simple page', number: 0 }
    ])

    useEffect(() => {
        getContentListMethod(setContents, setTotalLength, appContext, setIsRequestSuccess)
    }, [])

    return (<>
        {(totalLength > 0 && isRequestSuccess) && <StyledDashboardBlock length={totalLength}>
            <StyledPaper>
                <Typography variant="h4">______ {t('contents:contentType')} ______</Typography>
                <ContentChartBlock>
                    <StyledFlexBlock>
                        <Carsoul chunks={contents} totalLength={totalLength} />
                    </StyledFlexBlock>
                </ContentChartBlock>
            </StyledPaper>
        </StyledDashboardBlock>}
    </>
    )

}

export default withNamespaces('translation,contents')(ContentChartComponent)
