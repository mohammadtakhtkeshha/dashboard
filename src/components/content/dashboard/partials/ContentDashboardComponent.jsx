import React, {useState, useEffect, useContext} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {Box, Typography} from "@material-ui/core"
import {CardMedia} from '@material-ui/core/index'

import dashboardService from "core/services/dashboard.service"
import userImg from "assets/media/image/user.jpg"

import {
    StyledPaper,
    StyledDashboardBlock
} from "assets/js/dashboard/dashboard"
import {
    StyledTable,
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
    StyledTableCell,
} from "assets/js/App"
import {NavLink} from "react-router-dom"

function ContentDashboardComponent({t, appContext}) {
    const [contents, setContents] = useState([])
    const lang = i18next.language

    useEffect(() => {
        getTenNumberOfContents()
    }, [])

    const getTenNumberOfContents = () => {
        dashboardService.getTenNumberOfContents(appContext.handleError).then((response) => {
            let contents = response.data
            setContents([...contents])
        }).catch((error) => {
        })
    }

    return (
        <>
            {contents.length > 0 ?
                <StyledDashboardBlock>
                    <StyledPaper lang={lang}>
                        <Typography variant="h4">______ {t('contents:contents')} _______</Typography>
                        <StyledTable>
                            <StyledTableHeadRow lang={lang}>
                                <StyledTableCell align="right"
                                                 style={{width: '10%'}}>{t('translation:image')}</StyledTableCell>
                                <StyledTableCell align="right">{t('translation:subject')}</StyledTableCell>
                                <StyledTableCell align="right">{t('translation:type')}</StyledTableCell>
                                <StyledTableCell align="right">{t('translation:date')}</StyledTableCell>
                            </StyledTableHeadRow>
                            <StyledTableBody>
                                {contents.map((content, index) =>
                                    <a key={index} href={content.view_node} target='_blank' >
                                        {/*link: {content.link}*/}
                                        <StyledTableBodyRow key={index}>
                                            <StyledTableCell align="right">
                                                <Box className="imgBlock">
                                                    <CardMedia id="img">
                                                        {content.field_image ? <img src={content.field_image}/> :
                                                            <img src={userImg}/>}
                                                    </CardMedia>
                                                </Box>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {content.title}
                                            </StyledTableCell>
                                            <StyledTableCell align="right"> {content.type}</StyledTableCell>
                                            <StyledTableCell align="right"> {content.created}</StyledTableCell>
                                        </StyledTableBodyRow>
                                    </a>
                                )}
                            </StyledTableBody>
                        </StyledTable>
                    </StyledPaper>
                </StyledDashboardBlock>
                : <></>}
        </>
    )
}

export default withNamespaces('translation,contents')(ContentDashboardComponent)

