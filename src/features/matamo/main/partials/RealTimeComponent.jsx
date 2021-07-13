import React, { useEffect, useState, useContext } from 'react';
import i18next from 'i18next';
import { withNamespaces } from 'react-i18next';

import { Typography } from '@material-ui/core';

import { get30MinutesVisitsMethod, get24OursVisitsMethod, visitsDetailsMethod } from './RealTimeComponent.js';
import { StyledIconMatamo, StyledTableCellActivity, StyledTableCellRealtime, StyledBoxRefer } from 'assets/js/library/pages/matamo/matamo';
import AppContext from 'contexts/AppContext';
import { StyledTableCell, StyledTablePaper, StyledTableParent } from 'assets/js/library/components/table';
import {
  StyledMatamoTable,
  StyledMatamoTableRow,
  StyledMatamoTableRowGrey,
  StyledMatamoTableCell,
  StyledMatamoTabelFooter,
  StyledMatamoTableHeadRow,
} from 'assets/js/library/pages/matamo/matamoTable';

import { StyledMatamoLeftHeadRealTime } from 'assets/js/library/pages/matamo/realTime';
import { NavLink } from 'react-router-dom';

function RealTimeComponent({ t }) {
  const lang = i18next.language;
  const { setLoading } = useContext(AppContext);
  const [last30Minutes, setLast30Minutes] = useState([]);
  const [last24Ours, setLast24Ours] = useState([]);
  const [VisitsDetails, setVisitsDetails] = useState([]);

  useEffect(() => {
    get30MinutesVisitsMethod(setLoading, setLast30Minutes);
  }, [setLoading, setLast30Minutes]); //Once

  useEffect(() => {
    get24OursVisitsMethod(setLoading, setLast24Ours);
  }, [setLoading, setLast24Ours]);

  useEffect(() => {
    visitsDetailsMethod(setLoading, setVisitsDetails);
  }, [setLoading, setVisitsDetails]);

  return (
    <>
      <StyledTableParent length={last30Minutes.length}>
        <StyledTablePaper lang={lang}>
          <Typography variant="h4">_____ {t('matamo:visitInRealTime')} _____</Typography>
          <StyledMatamoTable>
            <StyledMatamoTableHeadRow>
              <StyledMatamoTableCell>{t('translation:date')}</StyledMatamoTableCell>
              <StyledMatamoLeftHeadRealTime>
                <Typography variant="subtitle2">{t('matamo:visits')}</Typography>
                <Typography variant="subtitle2">{t('translation:activities')}</Typography>
              </StyledMatamoLeftHeadRealTime>
            </StyledMatamoTableHeadRow>
            {last30Minutes.length > 0 &&
              last30Minutes.map((visit, index) => (
                <StyledMatamoTableRow key={index}>
                  <StyledTableCell align="right"> {t('matamo:last30Minutes')}</StyledTableCell>
                  <StyledTableCell align="right">
                    <StyledMatamoLeftHeadRealTime>
                      <Typography variant="subtitle2"> {visit.visits}</Typography>
                      <Typography variant="subtitle2">{visit.actions}</Typography>
                    </StyledMatamoLeftHeadRealTime>
                  </StyledTableCell>
                </StyledMatamoTableRow>
              ))}
            {last24Ours.length > 0 &&
              last24Ours.map((visit, index) => (
                <StyledMatamoTableRow key={index}>
                  <StyledTableCell align="right"> {t('matamo:last24Ours')}</StyledTableCell>
                  <StyledMatamoLeftHeadRealTime align="right">
                    <Typography variant="subtitle2"> {visit.visits} </Typography>
                    <Typography variant="subtitle2"> {visit.actions}</Typography>
                  </StyledMatamoLeftHeadRealTime>
                </StyledMatamoTableRow>
              ))}
            {VisitsDetails.length > 0 &&
              VisitsDetails.map((item, index) => (
                <div key={index}>
                  <StyledMatamoTableRowGrey>
                    <StyledTableCellRealtime>
                      {item.serverTimePrettyFirstAction}
                      {item.serverDatePretty}
                      <span>
                        {item.deviceTypeIcon && <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.deviceTypeIcon}`} alt="" />}
                      </span>
                      <span>
                        {item.browserIcon && <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.browserIcon}`} alt="" />}
                      </span>
                      <span>
                        {item.operatingSystemIcon && <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.operatingSystemIcon}`} alt="" />}
                      </span>
                      <span>
                        {item.visitorTypeIcon && <StyledIconMatamo src={`https://foroshgahsaz.ir/matomo/${item.visitorTypeIcon}`} alt=""/>}
                      </span>
                    </StyledTableCellRealtime>
                    <StyledBoxRefer>
                      <Typography variant="subtitle2">{item.referrerName}</Typography>
                      <img src={`http://foroshgahsaz.ir/matomo/${item.referrerSearchEngineIcon}`} alt={item.referrerName} />
                    </StyledBoxRefer>
                  </StyledMatamoTableRowGrey>
                  <StyledMatamoTableRow>
                    <StyledTableCellActivity align="right">
                      <Typography variant="subtitle2">{t('translation:activities')} : </Typography>
                      {item.actionDetails.map((action, index) => (
                        <img key={index} src={require('assets/svg/action.svg')} alt="actions" />
                      ))}
                    </StyledTableCellActivity>
                  </StyledMatamoTableRow>
                </div>
              ))}
            <StyledMatamoTabelFooter lang={lang}>
              <NavLink to="/report/real-time-visit">{t('translation:moreItems')}</NavLink>
            </StyledMatamoTabelFooter>
          </StyledMatamoTable>
        </StyledTablePaper>
      </StyledTableParent>
    </>
  );
}

export default withNamespaces('translation,matamo')(RealTimeComponent);
