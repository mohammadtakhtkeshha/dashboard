import React, {useContext, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Typography, Grid} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";


import ContentsContext from "contexts/ContentsContext";
import {StyledFilterBlock, StyledInsideGrid} from "assets/js/content/partials/contentFilter";
import {StyledRegisterButton, StyledInput} from "assets/js/App";
import {styledTextField} from "assets/js/App";

const StyledTextField = withStyles(styledTextField)(TextField);

function ContentsFilterComponent({t}) {
    const lang = i18next.language;
    const contentsContext = useContext(ContentsContext);
    const [status, setStatus] = useState('');
    const [contentType, setContentType] = useState('');
    const [searchedContent, setSearchedContent] = useState({
        title: '',
        status: '',
        contentType: ''
    });

    const changeTitle = (e) => {
        const currentValue = e.currentTarget.value;
        setSearchedContent(prevState => {
            return {
                ...prevState, title: currentValue
            }
        });
    }

    const changeStatus = (event) => {
        switch (event.currentTarget.value) {
            case 'published':
                setStatus('published');
                setSearchedContent(prevState => {
                    return {
                        ...prevState, status: "true"
                    }
                });
                break;
            case 'unpublished':
                setStatus('unpublished');
                setSearchedContent(prevState => {
                    return {
                        ...prevState, status: "false"
                    }
                });
                break;
            default:
                setStatus('');
                setSearchedContent(prevState => {
                    return {
                        ...prevState, status: ""
                    }
                });
        }
    }

    const changeContentType = (e) => {
        const currentValue = e.currentTarget.value;
        setContentType(currentValue);
        setSearchedContent(prevState => {
            return {
                ...prevState, contentType: currentValue
            }
        });
    }

    const doFilterHandler = () => {
        const currentContents = contentsContext.contents;

        const filteredContent = currentContents.filter((content) => {
                return content['title'].includes(searchedContent.title)
                    && content.status.includes(searchedContent.status)
                    && content.type.includes(contentType)
            }
        );
        contentsContext.handlePagination(filteredContent, false);
    }

    return (<ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{t('translation:filter')}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={4}>
                        <StyledInsideGrid lang={lang}>
                            <StyledInput placeholder={t('translation:title')} onChange={changeTitle}/>
                        </StyledInsideGrid>
                    </Grid>
                    <Grid item xs={4}>
                        <StyledInsideGrid>
                            <StyledTextField id="outlined-select-role-native"
                                             select
                                             value={status}
                                             onChange={changeStatus}
                                             SelectProps={{
                                                 native: true,
                                             }}
                                             variant="outlined">
                                <option value="">{t('translation:status')}</option>
                                <option value="published">{t('translation:published')}</option>
                                <option value="unpublished">{t('translation:unpublished')}</option>
                            </StyledTextField>
                        </StyledInsideGrid>
                    </Grid>
                    <Grid item xs={4}>
                        <StyledInsideGrid>
                            <StyledTextField
                                id="outlined-select-role-native"
                                select
                                value={contentType}
                                onChange={changeContentType}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined">
                                <option value="">{t('contents:contentType')}</option>
                                {contentsContext.contentTypeNameList?.map((item, index) => (
                                    <option key={index} value={item.name}>
                                        {lang === 'en' ? item.machin_name : item.name}
                                    </option>
                                )) || ''}
                            </StyledTextField>
                        </StyledInsideGrid>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledFilterBlock>
                            <StyledRegisterButton onClick={doFilterHandler}>
                                {t('translation:do')}
                            </StyledRegisterButton>
                        </StyledFilterBlock>
                    </Grid>
                </Grid>

            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default withNamespaces('contents,translation')(ContentsFilterComponent);
