import { getTicket, addTicketReply } from 'core/services/ticket.service';
import { success } from 'methods/swal';
import i18next from 'i18next';

export const getTicketRepliesMethod = (setLoading, setTicket, id, setReplies) => {
  const params = {
    action: 'GetTicket',
    username: 'sBnBbvTbSBpFfIWKeCycxDHNqh8U2vn6',
    password: 'F5tqf9CdD6rLYpIdITlHryNzevXUDe6d',
    responsetype: 'json',
    ticketnum: id,
  };
  setLoading(true);
  getTicket(setLoading, params).then(response => {
    setLoading(false);
    setTicket(prevState => {
      return { ...prevState, ticketid: response.data.ticketid };
    });
    for (let eachReply of response.data.replies.reply) {
      for (let i in eachReply.attachments) {
        let id = eachReply.replyid === '0' ? response.data.ticketid : eachReply.replyid;
        let type = eachReply.replyid === '0' ? 'ticket' : 'reply';
        eachReply.attachments[i].dlUrl = `http://crm.webrbp.ir/imageProxy.php?data=${id}_${i}_${type}`;
      }
    }
    setReplies(response.data.replies.reply.reverse());
  });
};

export const registerReplyMethod = (setLoading, ticket, getTicketRepliesMethod, id, setReplies, setTicket, closeForm) => {
  setLoading(true);
  addTicketReply(setLoading, ticket).then(response => {
    setLoading(false);
    getTicketRepliesMethod(setLoading, setTicket, id, setReplies);
    success(i18next.t('translation:successDone'), i18next.t('translation:ok'));
    closeForm();
  });
};
