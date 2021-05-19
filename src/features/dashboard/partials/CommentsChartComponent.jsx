import React, { useContext, useEffect, useState } from 'react';
import i18next from 'i18next';
import { withNamespaces } from 'react-i18next';

import { Typography } from '@material-ui/core';

import { getCommentChartMethod } from './CommentsChartComponent.js';
import { StyledPaper, StyledDashboardBlock } from 'assets/js/dashboard/dashboard';
import { StyledFigure } from 'assets/js/library/abstracts/hicharts';
import AppContext from 'contexts/AppContext';

function CommentsChartComponent({ t }) {
  const [comments, setComments] = useState([]);
  const lang = i18next.language;
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    getCommentChartMethod(setComments, setLoading, lang);
  }, [lang, setLoading]);

  return (
    <>
      {comments.length > 0 ? (
        <StyledDashboardBlock>
          <StyledPaper lang={lang}>
            <Typography variant="h4">_____ {t('translation:commentStatic')} _____</Typography>
            <StyledFigure className="highcharts-figure">
              <div id="commentchart"></div>
            </StyledFigure>
          </StyledPaper>
        </StyledDashboardBlock>
      ) : (
        <></>
      )}
    </>
  );
}

export default withNamespaces('comments,translation')(CommentsChartComponent);
