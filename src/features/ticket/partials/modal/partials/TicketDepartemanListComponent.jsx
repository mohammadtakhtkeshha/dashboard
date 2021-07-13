import React from "react"
import {withNamespaces} from 'react-i18next'
import i18next from "i18next"

import { withStyles} from "@material-ui/core";
import {StyledText} from "assets/js/ticket/ticketModal";

import {
    listModalStyles,
    listItemModalStyles,
    StyledModalHeader
} from "assets/js/library/pages/modalList"
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";


const StyledListModalItem = withStyles(listItemModalStyles)(ListItem);
const StyledModalList = withStyles(listModalStyles)(List);

function NewUserComponent({t, departemanList, setChosenDepartment, setTicket}) {
    const lang = i18next.language

    const departmentClicked = (e) => {
        const departmentId=e.currentTarget.value
        setChosenDepartment(departmentId)
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
                <StyledListModalItem permission="true" value={department.id} key={index} xs={12} onClick={departmentClicked}>
                    <StyledText>
                        {department.name}
                    </StyledText>
                </StyledListModalItem>))}
        </StyledModalList>
    </>)
}

export default withNamespaces('tickets , translation')(NewUserComponent)
