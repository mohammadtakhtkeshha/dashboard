import React, {useState, useEffect, useContext} from "react"
import {withNamespaces} from 'react-i18next'
import i18next from "i18next"

import {Grid, Box, withStyles} from "@material-ui/core";
import {StyledDirection, StyledInput, StyledRegisterButton, StyledRadioButton, ModalBody} from "assets/js/App"
import {primary} from "components/partials/Colors"
import {StyledText} from "assets/js/ticket/ticketModal";

import {StyledModalFooter, StyledModalBody} from "assets/js/library/layout/modal"
import {
    listModalStyles,
    listItemModalStyles,
    StyledModalHeader
} from "assets/js/library/pages/modalList"
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";


const StyledListModalItem = withStyles(listItemModalStyles)(ListItem);
const StyledModalList = withStyles(listModalStyles)(List);

function NewUserComponent({t, departemanList, setChosenDeparteman, setTicket}) {
    const lang = i18next.language

    const departmentClicked = (e) => {
        const departmentId=e.currentTarget.value
        setChosenDeparteman(departmentId)
        setTicket(prevState => {
            return {...prevState,deptid:departmentId}
        })
    }

    return (<>
        <StyledModalHeader dense button>
            {t('tickets:ticketList')}
        </StyledModalHeader>
        <StyledModalList lang={lang}>
            {departemanList.map((department, index) => (
                <StyledListModalItem value={department.id} key={index} xs={12} onClick={departmentClicked}>
                    <StyledText>
                        {department.name}
                    </StyledText>
                </StyledListModalItem>))}
        </StyledModalList>
    </>)
}

export default withNamespaces('tickets , translation')(NewUserComponent)
