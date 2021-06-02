import styled from 'styled-components';
import {blue, green, grey, purpel, white} from 'assets/js/library/abstracts/colors';

export const StyledTicketPaper = styled.div`
             margin: -64px -27px 0 -26px;
`;

export const styledAccordionSummary = () => ({
    root: {
        backgroundImage: props =>
            props.lang === 'en' ? `linear-gradient(to left,${blue[5]},${green[4]})` : `linear-gradient(to right,${blue[5]}, ${green[4]})`,
    },
});

export const styledAccordionDetails = () => ({
    root: {
        padding: '0!important',
    },
});

export const styledAccordion = () => ({
    root: {
        margin: '0!important',
    },
});

export const StyledBackground = styled.div`
  background-color: ${grey[17]};
`;

export const StyledRegisterButtonTicketReply = styled.button`
             width: 100%;
             color: ${white[0]};
             font-size: 17px;
             font-weight: bold;
             border: 0;
             background-color: ${green[0]};
             padding: 12px;
             border-radius: 0 0 5px 5px;
             cursor: pointer;
             &:focus {
               outline: 0 !important;
             }
`;

export const StyledBody = styled(StyledBackground)`
             margin-top: 0;
`;

export const StyledExpansionTitle = styled.span`
             color: ${white[0]};
`;

export const StyledReplyBox = styled.div`
             background-color:${white[0]};
             width:85%;
             padding: 20px;
             margin: 15px 18px 15px 0;
             box-sizing: border-box;
             display: flex;
             box-shadow: 0px 3px 12px #bebebe;
             border-radius: 5px;
             margin-right:${props => (props.align === true ? 'auto' : '0')};
             flex-direction:${props => (props.align === false ? 'row' : 'row-reverse')};
`;

export const StyledCollapse = styled.div`
             border-radius: 4px;
             overflow:hidden;
`;

export const styledCardMedia = () => ({
    root: {
        width: '80px',
        height: '80px',
        borderRadius: '5px',
        margin: '10px',
    },
});

export const StyledTextBlock = styled.div`
              & > div:first-child {
                box-sizing: border-box;
                line-height: 2;
                margin: 0;
                border-radius: 3px;
                color: #616161;
                font-size: 13px;
                // min-height: 160px;
                padding: 0 30px;
                position: relative;
              }
`;

export const StyledImageBlock = styled.div`
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 13px 11px;
              vertical-align: top;
              border-radius: 5px;
              border: 1px solid #f5f5f5;
              max-width:214px;
              max-height:270px;
              min-width:205px;
              box-sizing: border-box;
`;

export const StyledRoleBlock = styled.div`
              background-color: ${purpel[0]};
              color: white;
              border-radius: 3px;
              border: 2px solid #3f51b5;
              height: 30px;
              margin: 0;
              text-align: center;
              display: flex;
              align-items: center;
              width:calc(94% + 10px);
              & span {
                margin: auto;
              }
`;

export const styledUserCardMedia = () => ({
    root: {
        width: '15px',
        height: '20px',
    },
});

export const StyledUserBlock = styled.div`
                display:flex;
                background-color:${grey[19]}
                color: ${grey[20]};
                font-size: 14px;
                padding: 5px;
                border-radius: 3px;
                line-height: 9px;
                margin-bottom: 10px;
                text-align: center;
                width: 94%;
                background-color: #f9f8f8;
                & p {
                    margin:auto;
                }
`;

export const StyledDateBlock = styled.div`
              color: #ff620d;
              display: inline-block;
              direction: ltr;
              font-size: 11px;
              padding: 3px 5px 0;
              margin-top: 30px;
`;

export const StyledReplyBackground = styled.div`
             background-color:${white[0]}
             padding:20px;
`;

export const constTicket = {
    action: 'AddTicketReply',
    username: 'sBnBbvTbSBpFfIWKeCycxDHNqh8U2vn6',
    password: 'F5tqf9CdD6rLYpIdITlHryNzevXUDe6d',
    ticketid: '',
    message: '',
    clientid: '',
    attachments: 'W3sibmFtZSI6InR0LnR4dCIsImRhdGEiOiJjMkZzWVcwPSJ9XQ==',
    markdown: true,
    responsetype: 'json',
    'Access-Control-Allow-Origin': '*',
};
