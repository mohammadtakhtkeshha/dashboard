import React, { useContext, useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';

import { StyledUserChartTitle, StyledFigureUser } from 'assets/js/dashboard/partials/userChart';
import { getUsersMethod } from './UserChartComponent.js';
import { StyledDashboardBlock } from 'assets/js/dashboard/dashboard';
import AppContext from 'contexts/AppContext';

function UserChartComponent({ t }) {
  const lang = i18next.language;
  const [users, setUsers] = useState([]);
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    getUsersMethod(setUsers, setLoading, lang);
  }, [lang, setLoading]);

  return (
    <>
      {users.length > 0 ? (
        <StyledDashboardBlock>
          <StyledUserChartTitle lang={lang}>{t('translation:userStatic')}</StyledUserChartTitle>
          <StyledFigureUser>
            <div id="userchart"></div>
          </StyledFigureUser>
        </StyledDashboardBlock>
      ) : (
        <></>
      )}
    </>
  );
}

export default withNamespaces('users')(UserChartComponent);
