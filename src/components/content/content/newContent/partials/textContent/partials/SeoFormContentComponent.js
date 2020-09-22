import React, {useContext} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

import {globalCss} from "assets/js/globalCss";
import NewContentContext from "contexts/NewContentContext";
import {StyledButton,StyledInput} from "assets/js/App";

const gClass = makeStyles(globalCss);

function SeoFormContentComponent({t}) {
    const lang = i18next.language;
    const gClasses = gClass();
    const newContentContext = useContext(NewContentContext);

    let clickEditorMetaTag = (e, keyName) => {
        let currentValue = e.currentTarget.value;
        let titleValue = keyName === "title" ? currentValue : '';
        let desciptionValue = keyName === "description" ? currentValue : '';
        let abstractValue = keyName === "abstract" ? currentValue : '';
        let keywordsValue = keyName === "keywords" ? currentValue : '';
        newContentContext.setContent(prevState => {
            return {
                ...prevState, field_seo_list: {
                    title:  titleValue,
                    description:desciptionValue,
                    abstract: abstractValue,
                    keywords:keywordsValue
                }
            }
        });
    };
    return (
        <Box className="card">
            <Typography
                className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:metaTag')}</Typography>
            <Box className="metaTag">
                <Box className="right">
                    <StyledInput lang={lang} type="text" placeholder={t('translation:title')}
                           label={t('translation:title')}
                           value={newContentContext.content.field_seo_list.title || ''}
                            onChange={e => clickEditorMetaTag(e, 'title')}/>
                    <Typography
                        className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('translation:description')}</Typography>
                    <TextField
                        value={newContentContext.content.field_seo_list.description}
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
                    <StyledInput
                        value={newContentContext.content.field_seo_list.keywords || ''}
                        lang={lang} type="text" placeholder={t('contents:keywords')}
                           label={t('contents:keywords')}
                           small='' onChange={e => clickEditorMetaTag(e, 'keywords')}/>
                    <Typography
                        className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:summary')}</Typography>
                    <TextField
                        value={newContentContext.content.field_seo_list.abstract}
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

    );
}

export default withNamespaces('contents,translation')(SeoFormContentComponent);
