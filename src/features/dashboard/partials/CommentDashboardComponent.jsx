import React, { useState, useEffect, useContext } from 'react';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';

import { Typography } from '@material-ui/core';

import { getTenNumberOfComments } from 'core/services/dashboard.service';
import { StyledTableBody, StyledTableHeadRow, StyledTableBodyRow } from 'assets/js/App';
import { StyledTableCell } from 'assets/js/library/components/table';
import { StyledDashboardTable, StyledPaper, StyledDashboardBlock } from 'assets/js/dashboard/dashboard';
import { StyledStatusButton } from 'assets/js/library/components/buttons';
import AppContext from 'contexts/AppContext';

function CommentDashboardComponent({ t }) {
  const [comments, setComments] = useState([]);
  const lang = i18next.language;
  const { setLoading } = useContext(AppContext);
  let leftRightAlign = lang === 'en' ? 'left' : 'right';
;

  useEffect(() => {
    getTenNumberOfComments(setLoading).then(response => {
      let comments = response.data;
      setComments([...comments]);
    });
  }, [setLoading,setComments]);//Once

  return (
    <>
      {comments.length > 0 && (
        <StyledDashboardBlock length={comments.length}>
          <StyledPaper lang={lang}>
            <Typography variant="h4">_____ {t('comments:comments')} _____</Typography>
            <StyledDashboardTable>
              <StyledTableHeadRow lang={lang}>
                {/*<StyledTableCell align="center">{t('translation:image')}</StyledTableCell>*/}
                <StyledTableCell align={leftRightAlign} width="90">
                  {t('translation:subject')}
                </StyledTableCell>
                <StyledTableCell width="5" align="center" minWidth="98">
                  {t('translation:status')}
                </StyledTableCell>
                <StyledTableCell width="5" align="center" minWidth={68}>
                  {t('translation:date')}
                </StyledTableCell>
              </StyledTableHeadRow>
              <StyledTableBody>
                {comments.length > 0 &&
                  comments.map((comment, index) => (
                    <a key={index} href={comment.link} target="_blank" rel="noopener noreferrer">
                      <StyledTableBodyRow key={index}>
                        {/*<StyledTableCell align="center" >{row.name}</StyledTableCell>*/}
                        {/*<StyledTableCell align="center">*/}
                        {/*    <Box className="imgBlock">*/}
                        {/*        <CardMedia id="img">*/}
                        {/*            {comment.field_image ? <img src={comment.field_image}/> :*/}
                        {/*                <img src={userImg}/>}*/}
                        {/*        </CardMedia>*/}
                        {/*    </Box>*/}
                        {/*</StyledTableCell>*/}
                        <StyledTableCell align={leftRightAlign} width="90">
                          {' '}
                          {comment.subject}
                        </StyledTableCell>
                        <StyledTableCell width="5" align={leftRightAlign === 'left' ? 'right' : 'left'} minWidth="98">
                          <StyledStatusButton status={comment.status}>
                            {comment.status === 'true' ? t('translation:confirmed') : t('translation:notConfirmed')}
                          </StyledStatusButton>
                        </StyledTableCell>
                        <StyledTableCell width="5" align={leftRightAlign === 'left' ? 'right' : 'left'} minWidth={68}>
                          {' '}
                          {comment.created}
                        </StyledTableCell>
                      </StyledTableBodyRow>
                    </a>
                  ))}
              </StyledTableBody>
            </StyledDashboardTable>
          </StyledPaper>
        </StyledDashboardBlock>
      )}
    </>
  );
}

export default withNamespaces('comments,translation')(CommentDashboardComponent);
