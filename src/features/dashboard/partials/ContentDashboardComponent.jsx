import React, { useState, useEffect, useContext, useCallback } from "react"
import { withNamespaces } from "react-i18next"
import i18next from "i18next"

import { Typography } from "@material-ui/core"

import { getTenNumberOfContents } from "core/services/dashboard.service"
import { StyledTableCell } from "assets/js/library/components/table"

import {
    StyledPaper,
    StyledDashboardBlock, StyledDashboardTable
} from "assets/js/dashboard/dashboard"
import {
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
} from "assets/js/App"
import AppContext from "contexts/AppContext";

function ContentDashboardComponent({ t }) {
    const [contents, setContents] = useState([])
    const lang = i18next.language
    let leftRightAlign = lang === "en" ? "left" : "right"
    const appContext = useContext(AppContext)

    const getTenNumberOfContentsMethod = useCallback(() => {
        getTenNumberOfContents(appContext.handleError).then((response) => {
            let contents = response.data
            setContents([...contents])
        }).catch((error) => {
        })
    }, [appContext])

    useEffect(() => {
        getTenNumberOfContentsMethod()
    }, [getTenNumberOfContentsMethod])

    return (
        <>
            {contents.length > 0 ?
                <StyledDashboardBlock>
                    <StyledPaper lang={lang}>
                        <Typography variant="h4">______ {t('contents:contents')} _______</Typography>
                        <StyledDashboardTable>
                            <StyledTableHeadRow lang={lang}>
                                {/*<StyledTableCell align="center"*/}
                                {/*                 style={{width: '10%'}}>{t('translation:image')}</StyledTableCell>*/}
                                <StyledTableCell width="90" align={leftRightAlign}>{t('translation:subject')}</StyledTableCell>
                                <StyledTableCell width="5" align={leftRightAlign === 'left' ? "right" : "left"} minWidth="57">{t('translation:type')}</StyledTableCell>
                                <StyledTableCell width="5" align={leftRightAlign === 'left' ? "right" : "left"} minWidth={68}>{t('translation:date')}</StyledTableCell>
                            </StyledTableHeadRow>
                            <StyledTableBody>
                                {contents.map((content, index) =>
                                    <a key={index} href={content.view_node} target='_blank' rel="noopener noreferrer">
                                        {/*link: {content.link}*/}
                                        <StyledTableBodyRow key={index}>
                                            {/*<StyledTableCell align="center">*/}
                                            {/*    <Box className="imgBlock">*/}
                                            {/*        <CardMedia id="img">*/}
                                            {/*            {content.field_image ? <img src={content.field_image}/> :*/}
                                            {/*                <img src={userImg}/>}*/}
                                            {/*        </CardMedia>*/}
                                            {/*    </Box>*/}
                                            {/*</StyledTableCell>*/}
                                            <StyledTableCell width="90" align={leftRightAlign}>
                                                {content.title}
                                            </StyledTableCell>
                                            <StyledTableCell width="5" minWidth="57" align={leftRightAlign === 'left' ? "right" : "left"}> {content.type}</StyledTableCell>
                                            <StyledTableCell width="5" minWidth={68} align={leftRightAlign === 'left' ? "right" : "left"}> {content.created}</StyledTableCell>
                                        </StyledTableBodyRow>
                                    </a>
                                )}
                            </StyledTableBody>
                        </StyledDashboardTable>
                    </StyledPaper>
                </StyledDashboardBlock>
                : <></>}
        </>
    )
}

export default withNamespaces('translation,contents')(ContentDashboardComponent)

