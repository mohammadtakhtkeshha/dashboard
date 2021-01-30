import React, {useContext, useEffect, ticketef, useState} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {CardMedia, Typography} from "@material-ui/core"
import {NavLink} from 'react-router-dom';

import {
    StyledActionButtonBlock,
    StyledBtn,
    StyledCheckboxImgInTable,
    StyledTable,
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
    StyledTableCell,
} from "assets/js/App"
import {StyledStatusButton,StyledTitle,StyledTid} from "assets/js/ticket/ticketTable"
import {adjustDepartemanMethod} from "./TicketsTableComponent.js"

function TicketsTableComponent({t, chunkTickets, page, departemanList}) {
    const lang = i18next.language
    const [departmentNames, setDepartmentNames] = useState([])

    const adjustDeparteman = () => {
        adjustDepartemanMethod(departemanList, setDepartmentNames)
    }

    useEffect(() => {
        adjustDeparteman()
    }, [departemanList])

    return (
        <>
            <StyledTable>
                <StyledTableHeadRow>
                    <StyledTableCell align="right">{t('tickets:departeman')}</StyledTableCell>
                    <StyledTableCell align="right">{t('translation:subject')}</StyledTableCell>
                    <StyledTableCell align="right">{t('translation:status')}</StyledTableCell>
                    <StyledTableCell align="right">{t('translation:lastUpdate')}</StyledTableCell>
                </StyledTableHeadRow>
                <StyledTableBody>
                    {chunkTickets[page] !== undefined &&
                    chunkTickets[page].length > 0
                        ? (chunkTickets[page].map((ticket, index) =>
                            (<React.Fragment key={index}>
                                <NavLink to={`ticket/${ticket.tid}`}>
                                <StyledTableBodyRow>
                                    <StyledTableCell align="right">
                                        {departmentNames.map((item) => {
                                            if (item.id === ticket.deptid) {
                                                return item.name
                                            }
                                        })}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <StyledTid>#{ticket.tid}</StyledTid>
                                        <StyledTitle>{ticket.subject}</StyledTitle>
                                        </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <StyledStatusButton status={ticket.status}>
                                            {ticket.status === "Open" ? t('translation:open') : (ticket.status === "Answered" ? t('translation:answered') : (ticket.status === "Closed" ? t('translation:close') : t('tickets:customerReply')))}
                                        </StyledStatusButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {ticket.lastreply}
                                    </StyledTableCell>
                                </StyledTableBodyRow>
                                </NavLink>
                            </React.Fragment>)
                        )) : (<StyledTableBodyRow>
                            <StyledTableCell colSpan="6" align="right">{t('translation:notFoundRecord')}
                            </StyledTableCell>
                        </StyledTableBodyRow>)}
                </StyledTableBody>
            </StyledTable>
            {/*-------------------------edit modal---------------------------*/}
            {/*<ticketsRegisterModalComponent setOpenticketForm={setOpenticketForm}*/}
            {/*                             handleEditFormClose={handleEditFormClose}*/}
            {/*                             editedticket={editedticket}*/}
            {/*                             keyRoles={keyRoles}*/}
            {/*                             valueRoles={valueRoles}*/}
            {/*                             openticketForm={openticketForm}/>*/}
            {/*-------------------------- End edit modal ---------------------*/}
        </>
    )
}

export default withNamespaces('tickets, translation')(TicketsTableComponent)
