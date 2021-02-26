import React, {useContext, useEffect, ticketef, useState} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {CardMedia, Typography} from "@material-ui/core"
import {NavLink} from 'react-router-dom';

import {
    StyledActionButtonBlock,
    StyledBtn,
    StyledTableBody,
    StyledTableHeadRow,
    StyledTableBodyRow,
} from "assets/js/App"
import {StyledTr, StyledTableHeadTr, StyledTable, StyledTableImg,StyledCheckboxImgInTable,StyledTableCell} from "assets/js/library/components/table"
import {adjustDepartemanMethod} from "./TicketsTableComponent.js"
import {StyledTid,StyledTitle,StyledStatusButton} from "assets/js/ticket/ticketTable"

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
                <StyledTableHeadTr>
                    <StyledTableCell align="center" width={100}>{t('tickets:departeman')}</StyledTableCell>
                    <StyledTableCell align="center" width={100}>{t('translation:subject')}</StyledTableCell>
                    <StyledTableCell align="center" width={100}>{t('translation:status')}</StyledTableCell>
                    <StyledTableCell align="center" width={100}>{t('translation:lastUpdate')}</StyledTableCell>
                </StyledTableHeadTr>
                <StyledTableBody>
                    {chunkTickets[page] !== undefined &&
                    chunkTickets[page].length > 0
                        ? (chunkTickets[page].map((ticket, index) =>
                            (<React.Fragment key={index}>
                                <NavLink to={`ticket/${ticket.tid}`}>
                                <StyledTableBodyRow>
                                    <StyledTableCell align="center" width={100}>
                                        {departmentNames.map((item) => {
                                            if (item.id === ticket.deptid) {
                                                return item.name
                                            }
                                        })}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" width={100}>
                                        <StyledTid>#{ticket.tid}</StyledTid>
                                        <StyledTitle>{ticket.subject}</StyledTitle>
                                        </StyledTableCell>
                                    <StyledTableCell align="center" width={100}>
                                        <StyledStatusButton status={ticket.status}>
                                            {ticket.status === "Open" ? t('translation:open') : (ticket.status === "Answered" ? t('translation:answered') : (ticket.status === "Closed" ? t('translation:close') : t('tickets:customerReply')))}
                                        </StyledStatusButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" width={100}>
                                        {ticket.lastreply}
                                    </StyledTableCell>
                                </StyledTableBodyRow>
                                </NavLink>
                            </React.Fragment>)
                        )) : (<StyledTableBodyRow>
                            <StyledTableCell colSpan="6" align="center">{t('translation:notFoundRecord')}
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
