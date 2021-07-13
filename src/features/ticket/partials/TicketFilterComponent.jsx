import React, {useState} from "react";
import {withNamespaces} from "react-i18next";

import {Typography,Accordion,AccordionDetails ,AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {StyledFilterBlock} from "assets/js/ticket/ticketFilter";
import {MarginTop1} from "assets/js/library/base/all";
import { StyledLabel} from "assets/js/library/base/typography";
import { styledTextField, StyledInput} from "assets/js/library/components/input";
import {StyledAddButton, StyledRadioButton,} from "assets/js/library/components/buttons";
import TextField from "@material-ui/core/TextField"
import {Grid, withStyles} from "@material-ui/core"

import {doFilterHandlerMethod,changeSearchMethod} from "./TicketFilterComponent.js"

const StyledTextField = withStyles(styledTextField)(TextField)

function TicketFilterComponent({t, tickets, expandedFilter,setExpandedFilter,handlePagination, departemanList,setChunkTickets, setTotalPage,setTickets}) {
    const [search, setSearch] = useState({subject: "", department: "", status: ""})
    const statusList = [{value: 'Open', label: "open"},
        {value: 'Answered', label: "answered"},
        {value: 'Closed', label: "close"},
        {value: 'Customer-Reply', label: "customerReply"}]

    let doFilterHandler = () => {
        doFilterHandlerMethod(search, tickets, handlePagination,setChunkTickets, setTotalPage,setTickets)
    }

    const changeSearch = (e, field) => {
        changeSearchMethod(e, field, setSearch)
    }
    const changeExpanding = (e,checked) => {
        setExpandedFilter(checked)
    }
    return (<Accordion  expanded={expandedFilter} onChange={changeExpanding}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content">
                <Typography>{t('translation:filter')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <StyledFilterBlock>
                    <Grid container>
                        <Grid item xs={4}>
                            <StyledRadioButton className="status">
                                <StyledLabel>{t('translation:status')}</StyledLabel>
                                <StyledTextField id="outlined-select-role-native" select
                                                 value={search.status}
                                                 className="tour-status"
                                                 onChange={(e) => changeSearch(e, "status")}
                                                 SelectProps={{
                                                     native: true,
                                                 }}
                                                 variant="outlined">
                                    <option value="">{t('translation:none')}</option>
                                    {statusList.map((current, index) => (
                                        <option key={index} value={current.value}>
                                            {t(`translation:${current.label}`)}
                                        </option>
                                    ))}
                                </StyledTextField>
                            </StyledRadioButton>
                        </Grid>
                        <Grid item xs={4} >
                            <StyledLabel>{t('tickets:departeman')}</StyledLabel>
                            {departemanList.length > 0 ? <StyledTextField id="outlined-select-role-native"
                                                                          select
                                                                          className="tour-department"
                                                                          value={search.department}
                                                                          onChange={(e) => changeSearch(e, "department")}
                                                                          SelectProps={{
                                                                              native: true,
                                                                          }}
                                                                          variant="outlined">
                                <option value="">{t('translation:none')}</option>
                                {departemanList.map((current, index) => (
                                    <option key={current.id} value={current.id}>
                                        {current.name}
                                    </option>
                                ))}
                            </StyledTextField> : ''}
                        </Grid>
                        <Grid item xs={4}>
                            <StyledLabel>{t('translation:subject')}</StyledLabel>
                            <StyledInput placeholder={t('translation:subject')}
                                         value={search.subject}
                                         className="tour-subject"
                                         onChange={(e) => changeSearch(e, "subject")}
                            />
                        </Grid>
                    </Grid>
                    <MarginTop1>
                    <StyledAddButton permission="true" onClick={doFilterHandler}>
                        {t('translation:do')}
                    </StyledAddButton>
                    </MarginTop1>
                </StyledFilterBlock>
            </AccordionDetails>
        </Accordion>);
}

export default withNamespaces('users,translation')(TicketFilterComponent);
