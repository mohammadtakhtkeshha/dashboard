import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import NewContentContext from "contexts/NewContentContext";
import {StyledInput, MarginTop1, StyledAlignTypography} from "assets/js/App";
import {StyledRowBox, StyledRow, StyledCol} from "assets/js/content/partials/contents";
import {clickEditorMetaTagMethod,seoChangedMethod} from './FormContentSeoComponent.js'
import ContentsContext from "contexts/ContentsContext";

function FormContentSeoComponent({t}) {
    const lang = i18next.language;
    const newContentContext = useContext(NewContentContext);
    const contentsContext = useContext(ContentsContext);
    const [title, setTitle] = useState(contentsContext.content.field_seo_list?.title || '');
    const [description, setDescription] = useState(contentsContext.content.field_seo_list?.description || '');
    const [abstract, setAbstract] = useState(contentsContext.content.field_seo_list?.abstract || '');
    const [keywords, setKeywords] = useState(contentsContext.content.field_seo_list?.keywords || '');

    const clickEditorMetaTag = (e, keyName) => {
        clickEditorMetaTagMethod(e, keyName,setTitle,setDescription,setAbstract,setKeywords);
    };

    const seoChanged = () => {
        seoChangedMethod(contentsContext,title,description,abstract,keywords);
    }

    useEffect(() => {
        seoChanged();
    }, [title, description, abstract, keywords]);

    return (<StyledRowBox>
        <StyledRow>
            <Typography>{t('contents:metaTag')}</Typography>
        </StyledRow>
        <StyledRow>
            <StyledCol>
                <MarginTop1>
                    <StyledInput type="text"
                                 placeholder={t('translation:title')}
                                 value={title}
                                 onChange={e => clickEditorMetaTag(e, 'title')}/>
                </MarginTop1>
            </StyledCol>
            <StyledCol>
                <MarginTop1>
                    <StyledInput
                        value={keywords}
                        lang={lang} type="text" placeholder={t('contents:keywords')}
                        label={t('contents:keywords')}
                        small='' onChange={e => clickEditorMetaTag(e, 'keywords')}/>
                </MarginTop1>
            </StyledCol>

        </StyledRow>
        <StyledRow>
            <StyledCol>
                <MarginTop1>
                    <StyledAlignTypography lang={lang}>{t('contents:summary')}</StyledAlignTypography>
                    <TextField
                        value={abstract}
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
                </MarginTop1>
            </StyledCol>
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
                        fullWidth
                        multiline
                        onChange={(e) => {
                            clickEditorMetaTag(e, 'description')
                        }}
                    />
                </MarginTop1>
            </StyledCol>
        </StyledRow>
    </StyledRowBox>);
}

export default withNamespaces('contents,translation')(FormContentSeoComponent);