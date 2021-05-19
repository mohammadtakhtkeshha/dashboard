import React, { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';
import { StyledTableHeadTr, StyledTable, StyledTableCell, StyledTableBody, StyledTableBodyRow } from 'assets/js/library/components/table';
import { showNotificationMethod } from './FactorsTableComponent.js';
import { removeHourFromMiladiDate, convertDashToSlashInDate, toShamsiDate } from 'methods/commons';
import { StyledStatusBtn } from 'assets/js/library/pages/ticket/factors';
import { useHistory } from 'react-router-dom';

function FactorsTableComponent({ t, factors }) {
  const lang = i18next.language;
  const history = useHistory();
  const formatDate = date => {
    return convertDashToSlashInDate(removeHourFromMiladiDate(date));
  };

  useEffect(() => {
    showNotificationMethod(history);
  }, [history]);

  return (
    <>
      <StyledTable>
        <StyledTableHeadTr>
          <StyledTableCell align="center" width={100}>
            {t('translation:id')}
          </StyledTableCell>
          <StyledTableCell align="center" width={100}>
            {t('tickets:ticketNum')}
          </StyledTableCell>
          <StyledTableCell align="center" width={100}>
            {t('tickets:price')}
          </StyledTableCell>
          <StyledTableCell align="center" width={100}>
            {t('tickets:timePay')}
          </StyledTableCell>
          <StyledTableCell align="center" width={100}>
            {t('translation:status')}
          </StyledTableCell>
          <StyledTableCell align="center" width={100}>
            {t('translation:date')}
          </StyledTableCell>
        </StyledTableHeadTr>
        <StyledTableBody>
          {factors.length > 0 ? (
            factors.map((factor, index) => (
              <React.Fragment key={index}>
                <StyledTableBodyRow>
                  <StyledTableCell align="center" width={100}>
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center" width={100}>
                    {factor.id}
                  </StyledTableCell>
                  <StyledTableCell align="center" width={100}>
                    {factor.total} {factor.currencysuffix}
                  </StyledTableCell>
                  <StyledTableCell align="center" width={100}>
                    {lang === 'en' ? convertDashToSlashInDate(factor.duedate) : toShamsiDate(convertDashToSlashInDate(factor.created_at))}
                  </StyledTableCell>
                  <StyledTableCell align="center" width={100}>
                    {factor.status === 'Unpaid' ? (
                      <form method="post" action="https://drupalhelp.ir/payInvoice.php">
                        <input type="hidden" name="invoiceId" value={factor.id} />
                        <StyledStatusBtn status={factor.status === 'Unpaid'} type="submit">
                          {t('tickets:pay')}
                        </StyledStatusBtn>
                      </form>
                    ) : (
                      t('tickets:paid')
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center" width={100}>
                    {lang === 'en' ? formatDate(factor.created_at) : toShamsiDate(formatDate(factor.created_at))}
                  </StyledTableCell>
                </StyledTableBodyRow>
              </React.Fragment>
            ))
          ) : (
            <StyledTableBodyRow>
              <StyledTableCell colSpan="6" align="center">
                {t('translation:notFoundRecord')}
              </StyledTableCell>
            </StyledTableBodyRow>
          )}
        </StyledTableBody>
      </StyledTable>
    </>
  );
}

export default withNamespaces('tickets, translation')(FactorsTableComponent);
