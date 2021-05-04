import React, { useCallback, useContext, useEffect, useState } from "react"
import { withNamespaces } from "react-i18next"
import i18next from "i18next"

import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"

import { StyledInput, MarginTop1, StyledAlignTypography, StyledTypographyError } from "assets/js/App"
import { StyledRowBox, StyledRow, StyledCol } from "assets/js/content/partials/contents"
import { clickEditorMetaTagMethod, seoChangedMethod } from './FormContentSeoComponent.js'
import ContentsContext from "contexts/ContentsContext"
import StyledCheckboxComponent from "infrastructure/authorized/partials/StyledCheckboxComponent"
import { handleChangeAutoPathMethod, handleChangePathMethod } from "./FormContentTitleAndImgComponent.js"
import { StyledMt1 } from "assets/js/library/base/typography"

function FormContentSeoComponent({ t, contentype }) {
    const lang = i18next.language
    const contentsContext = useContext(ContentsContext)
    const [title, setTitle] = useState(contentsContext.content.field_seo_list[0].value?.title || '')
    const [description, setDescription] = useState(contentsContext.content.field_seo_list[0].value?.description || '')
    const [keywords, setKeywords] = useState(contentsContext.content.field_seo_list[0].value?.keywords || '')

    const clickEditorMetaTag = (e, keyName) => {
        clickEditorMetaTagMethod(e, keyName, setTitle, setDescription, setKeywords)
    }
    const seoChanged = useCallback(seoChangedMethod(contentsContext, title, description, keywords), [])

    useEffect(() => {
        seoChanged()
    }, [seoChanged])

    return (<StyledRowBox contentype={contentype}>
        <StyledRow>
            <StyledCol className="seo-path">
                <StyledMt1>
                    <StyledCheckboxComponent value={contentsContext.content.field_alias_status[0].value}
                        checked={contentsContext.content.field_alias_status[0].value}
                        label={t('contents:autoPath')}
                        change={(e) => handleChangeAutoPathMethod(e, contentsContext)} />
                </StyledMt1>
                <StyledInput placeholder={t('contents:path')}
                    value={contentsContext.content.path[0].alias}
                    type="text"
                    disabled={contentsContext.content.field_alias_status[0].value}
                    label={t('contents:path')}
                    className='path'
                    onChange={(e) => handleChangePathMethod(e, t, contentsContext)}/>
                {contentsContext.errors.path && <StyledTypographyError align={lang === 'en' ? 'left' : 'right'}>
                    {contentsContext.errors.path}
                </StyledTypographyError>}
            </StyledCol>
        </StyledRow>
        <StyledRow>
            <Typography>{t('contents:metaTag')}</Typography>
        </StyledRow>
        <StyledRow>
            <StyledCol>
                <MarginTop1>
                    <StyledInput type="text"
                        placeholder={t('translation:title')}
                        value={title}
                        className="seo-title"
                        onChange={e => clickEditorMetaTag(e, 'title')} />
                </MarginTop1>
            </StyledCol>
            <StyledCol>
                <MarginTop1>
                    <StyledInput
                        value={keywords}
                        lang={lang}
                        type="text"
                        className="seo-keywords"
                        placeholder={t('contents:keywords')}
                        onChange={e => clickEditorMetaTag(e, 'keywords')} />
                </MarginTop1>
            </StyledCol>
        </StyledRow>
        <StyledRow>
            <StyledCol>
                <MarginTop1>
                    <StyledAlignTypography lang={lang}>{t('translation:description')}</StyledAlignTypography>
                    <TextField
                        value={description}
                        id="outlined-size-normal"
                        placeholder={t('translation:description')}
                        variant="outlined"
                        rows={10}
                        rowsMax={10}
                        className="seo-description"
                        fullWidth
                        multiline
                        onChange={(e) => {
                            clickEditorMetaTag(e, 'description')
                        }}
                    />
                </MarginTop1>
            </StyledCol>
        </StyledRow>
    </StyledRowBox>)
}

export default withNamespaces('contents,translation')(FormContentSeoComponent)
