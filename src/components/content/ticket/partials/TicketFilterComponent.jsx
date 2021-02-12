import React, {useState} from "react";
import {withNamespaces} from "react-i18next";

import {Box, Typography} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import {StyledFilterBlock} from "assets/js/ticket/ticketFilter";
import {StyledRegisterButton, StyledRadioButton, StyledLabel, styledTextField, StyledInput} from "assets/js/App";
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
    return (<ExpansionPanel  expanded={expandedFilter} onChange={changeExpanding}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content">
                <Typography>{t('translation:filter')}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
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
                    <StyledRegisterButton onClick={doFilterHandler}>
                        {t('translation:do')}
                    </StyledRegisterButton>
                </StyledFilterBlock>
            </ExpansionPanelDetails>
        </ExpansionPanel>);
}

export default withNamespaces('users,translation')(TicketFilterComponent);
