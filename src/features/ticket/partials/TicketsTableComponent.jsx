import React, {useEffect, useState} from 'react';
import {withNamespaces} from 'react-i18next';

import {NavLink} from 'react-router-dom';

import {StyledTableBody, StyledTableBodyRow} from 'assets/js/App';
import {StyledTableHeadTr, StyledTable, StyledTableCell} from 'assets/js/library/components/table';
import {adjustDepartemanMethod} from './TicketsTableComponent.js';
import {StyledTid, StyledTitle, StyledStatusButton} from 'assets/js/ticket/ticketTable';

function TicketsTableComponent({t, chunkTickets, page, departemanList}) {
    const [departmentNames, setDepartmentNames] = useState([]);

    useEffect(() => {
        adjustDepartemanMethod(departemanList, setDepartmentNames);
    }, [departemanList]);

    return (<StyledTable>
        <StyledTableHeadTr>
            <StyledTableCell align="center" width={100}>
                {t('tickets:departeman')}
            </StyledTableCell>
            <StyledTableCell align="center" width={100}>
                {t('translation:subject')}
            </StyledTableCell>
            <StyledTableCell align="center" width={100}>
                {t('translation:status')}
            </StyledTableCell>
            <StyledTableCell align="center" width={100}>
                {t('translation:lastUpdate')}
            </StyledTableCell>
        </StyledTableHeadTr>
        <StyledTableBody>
            {chunkTickets[page] !== undefined && chunkTickets[page].length > 0 ? (
                chunkTickets[page].map((ticket, index) => (
                    <React.Fragment key={index}>
                        <NavLink to={{pathname: `ticket/${ticket.tid}`, state: ticket.id}}>
                            <StyledTableBodyRow>
                                <StyledTableCell align="center" width={100}>
                                    {departmentNames.map(item => {
                                        let name=''
                                        if (parseInt(item.id) === parseInt(ticket.deptid)) {
                                            name=item.name;
                                        }
                                        return name
                                    })}
                                </StyledTableCell>
                                <StyledTableCell align="center" width={100}>
                                    <StyledTid>#{ticket.tid}</StyledTid>
                                    <StyledTitle>{ticket.subject}</StyledTitle>
                                </StyledTableCell>
                                <StyledTableCell align="center" width={100}>
                                    <StyledStatusButton status={ticket.status}>
                                        {ticket.status === 'Open'
                                            ? t('translation:open')
                                            : ticket.status === 'Answered'
                                                ? t('translation:answered')
                                                : ticket.status === 'Closed'
                                                    ? t('translation:close')
                                                    : t('tickets:customerReply')}
                                    </StyledStatusButton>
                                </StyledTableCell>
                                <StyledTableCell align="center" width={100}>
                                    {ticket.lastreply}
                                </StyledTableCell>
                            </StyledTableBodyRow>
                        </NavLink>
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
    </StyledTable>);
}

export default withNamespaces('tickets, translation')(TicketsTableComponent);
