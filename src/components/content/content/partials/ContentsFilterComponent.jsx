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
import { StyledInsideGrid} from "assets/js/content/partials/contentFilter";
import {MarginTop1} from "assets/js/library/base/all";
import {StyledRegisterButton, StyledInput} from "assets/js/App";
import {styledTextField} from "assets/js/App";
import {changeTitleMethod, changeStatusMethod,changeContentTypeMethod,doFilterHandlerMethod} from "./ContentsFilterComponent.js";

const StyledTextField = withStyles(styledTextField)(TextField);

function ContentsFilterComponent({t,expandedFilter,setExpandedFilter}) {
    const lang = i18next.language;
    const contentsContext = useContext(ContentsContext);
    const [status, setStatus] = useState('');
    const [contentType, setContentType] = useState('');
    const [searchedContent, setSearchedContent] = useState({
        title: '',
        status: '',
        contentType: ''
    });
    const enContentTypes = ['news','article','sounds','images','page','videos'];
    const faContentTypes = ['اخبار','مقاله','صوت','گالری','صفحه اصلی','ویدیو'];
    let contentTypes=lang === 'eng' ? enContentTypes : faContentTypes;

    const changeTitle = (e) => {
        changeTitleMethod(e, setSearchedContent);
    }

    const changeStatus = (event) => {
        changeStatusMethod(event, setStatus, setSearchedContent)
    }

    const changeContentType = (e) => {
        changeContentTypeMethod(e,setContentType,setSearchedContent);
    }

    const doFilterHandler = () => {
        doFilterHandlerMethod(contentsContext,searchedContent,contentType);
    }

    const changeExpanding = (e,checked) => {
        setExpandedFilter(checked)
    }
    return (<ExpansionPanel  expanded={expandedFilter} onChange={changeExpanding}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>{t('translation:filter')}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={4}>
                        <StyledInsideGrid lang={lang}>
                            <StyledInput className="filter-title" placeholder={t('translation:title')} onChange={changeTitle}/>
                        </StyledInsideGrid>
                    </Grid>
                    <Grid item xs={4}>
                        <StyledInsideGrid>
                            <StyledTextField id="outlined-select-role-native"
                                             select
                                             value={status}
                                             className="filter-status"
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
                                className="filter-type"
                                value={contentType}
                                onChange={changeContentType}
                                SelectProps={{native: true}}
                                variant="outlined">
                                <option value="">{t('contents:contentType')}</option>
                                {contentTypes.map((item, index) => (
                                    <option key={index} value={enContentTypes[index]}>
                                        {item}
                                    </option>))}
                            </StyledTextField>
                        </StyledInsideGrid>
                    </Grid>
                    <Grid item xs={12}>
                        <MarginTop1>
                            <StyledRegisterButton onClick={doFilterHandler}>
                                {t('translation:do')}
                            </StyledRegisterButton>
                        </MarginTop1>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default withNamespaces('contents,translation')(ContentsFilterComponent);
