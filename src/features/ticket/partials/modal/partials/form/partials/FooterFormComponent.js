import { addTicket } from 'core/services/ticket.service';
import { getTicketsMethod } from '../../../../Index.js';
import { success } from 'methods/swal';
import i18next from 'i18next';

export const registerMethod = (setLoading, params, setTickets, handlePagination, closeForm) => {
  setLoading(true);
  addTicket(setLoading, params).then(response => {
    setLoading(false);
    getTicketsMethod(setLoading, setTickets, handlePagination);
    success(i18next.t('translation:successDone'), i18next.t('translation:ok'));
    closeForm();
  });
};
