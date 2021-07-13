import React, { useContext, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography, Grid, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import ContentsContext from 'contexts/ContentsContext';
import { StyledInsideGrid } from 'assets/js/content/partials/contentFilter';
import { MarginTop1 } from 'assets/js/library/base/all';
import { StyledInput ,styledTextField} from 'assets/js/library/components/input';
import { changeTitleMethod, changeStatusMethod, changeContentTypeMethod, doFilterHandlerMethod } from './ContentsFilterComponent.js';
import {StyledGreenButton} from "assets/js/library/components/buttons";

const StyledTextField = withStyles(styledTextField)(TextField);

function ContentsFilterComponent({ t, expandedFilter, setExpandedFilter }) {
  const lang = i18next.language;
  const contentsContext = useContext(ContentsContext);
  const [status, setStatus] = useState('');
  const [contentType, setContentType] = useState('');
  const [searchedContent, setSearchedContent] = useState({
    title: '',
    status: '',
    contentType: '',
  });
  const enContentTypes = ['news', 'article', 'sounds', 'images', 'page', 'videos'];
  const faContentTypes = ['اخبار', 'مقاله', 'صوت', 'گالری', 'صفحه اصلی', 'ویدیو'];
  let contentTypes = lang === 'eng' ? enContentTypes : faContentTypes;

  const changeTitle = e => {
    changeTitleMethod(e, setSearchedContent);
  };

  const changeStatus = event => {
    changeStatusMethod(event, setStatus, setSearchedContent);
  };

  const changeContentType = e => {
    changeContentTypeMethod(e, setContentType, setSearchedContent);
  };

  const doFilterHandler = () => {
    doFilterHandlerMethod(contentsContext, searchedContent, contentType);
  };

  const changeExpanding = (e, checked) => {
    setExpandedFilter(checked);
  };
  return (
    <Accordion expanded={expandedFilter} onChange={changeExpanding}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{t('translation:filter')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={4}>
            <StyledInsideGrid lang={lang}>
              <StyledInput className="filter-title" placeholder={t('translation:title')} onChange={changeTitle} />
            </StyledInsideGrid>
          </Grid>
          <Grid item xs={4}>
            <StyledInsideGrid>
              <StyledTextField
                id="outlined-select-role-native"
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
                SelectProps={{ native: true }}
                variant="outlined">
                <option value="">{t('contents:contentType')}</option>
                {contentTypes.map((item, index) => (
                  <option key={index} value={enContentTypes[index]}>
                    {item}
                  </option>
                ))}
              </StyledTextField>
            </StyledInsideGrid>
          </Grid>
          <Grid item xs={12}>
            <MarginTop1>
              <StyledGreenButton  onClick={doFilterHandler}>{t('translation:do')}</StyledGreenButton>
            </MarginTop1>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default withNamespaces('contents,translation')(ContentsFilterComponent);
