import React, { useState } from 'react';
import { withNamespaces } from 'react-i18next';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography, Grid, withStyles, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

import {StyledGreenButton} from 'assets/js/library/components/buttons';
import { StyledBox } from 'assets/js/library/base/box';
import { MarginTop1 } from 'assets/js/library/base/all';
import { filterByMethod, doFilterHandlerMethod } from './CommentsFilterComponent.js';
import { styledAccordionDetails, StyledCommentInput } from 'assets/js/library/pages/comment/commentFilter';

const StyledAccordionDetails = withStyles(styledAccordionDetails)(AccordionDetails);

function CommentFilterComponent({ t, commentStatus, unconfirmedComments, publishedComments, handlePagination, expandedFilter, setExpandedFilter }) {
  const [searchedComment, setSearchedComment] = useState({
    subject: '',
    author: '',
  });

  const filterBy = (e, key) => {
    filterByMethod(e, key, setSearchedComment);
  };

  const doFilterHandler = () => {
    doFilterHandlerMethod(commentStatus, searchedComment, unconfirmedComments, publishedComments, handlePagination);
  };

  const changeExpanding = (e, checked) => {
    setExpandedFilter(checked);
  };

  return (
    <StyledBox>
      <Accordion expanded={expandedFilter} onChange={changeExpanding}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography>{t('translation:filter')}</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Grid container>
            <Grid item xs={6}>
              <StyledCommentInput className="filter-subject" placeholder={t('translation:subject')} onChange={e => filterBy(e, 'subject')} />
            </Grid>
            <Grid item xs={6}>
              <StyledCommentInput className="filter-author" placeholder={t('translation:author')} onChange={e => filterBy(e, 'author')} />
            </Grid>
          </Grid>
          <MarginTop1>
            <StyledGreenButton onClick={doFilterHandler}>{t('translation:do')}</StyledGreenButton>
          </MarginTop1>
        </StyledAccordionDetails>
      </Accordion>
    </StyledBox>
  );
}

export default withNamespaces('translation,contents')(CommentFilterComponent);
