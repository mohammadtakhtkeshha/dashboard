import React, {useContext, useState} from "react"
import {withNamespaces} from "react-i18next"

import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import {Box, Typography, withStyles} from "@material-ui/core"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import TextField from "@material-ui/core/TextField"

import {StyledFilterBlock} from "assets/js/user/users"
import {StyledRegisterButton, StyledInput, styledTextField} from "assets/js/App"

const StyledTextField = withStyles(styledTextField)(TextField)

function UsersFilterComponent({t, users, handlePagination, valueRoles, keyRoles, expandedFilter,setExpandedFilter}) {
    const [role, setRole] = useState('')
    const [searchedUser, setSearcheUser] = useState({
        firs_name: "",
        last_name: "",
        user_name: "",
        mail: "",
        roles: ""
    })

    let changeRole = (e) => {
        let currentValue = e.currentTarget.value
        setRole(currentValue)
    }

    let doFilterHandler = () => {
        let fieldName = searchedUser.firs_name
        let fieldLastName = searchedUser.last_name
        let name = searchedUser.user_name
        let mail = searchedUser.mail
        let filteredUser

        filteredUser = users.filter((user) => {
            let newUser = user['firs_name'].includes(fieldName) &&
                user['last_name'].includes(fieldLastName) &&
                user['user_name'].includes(name) &&
                user['mail'].includes(mail) &&
                user['roles'].includes(role)
            return newUser
        })
        handlePagination(filteredUser, false)
    }

    let filterBy = (e, key) => {
        let keyValue = e.currentTarget.value
        setSearcheUser(prevState => {
            return {
                ...prevState, [key]: keyValue
            }
        })
    }

    const changeExpanding = (e,checked) => {
        setExpandedFilter(checked)
    }

    return (<>
            <Box>
                <ExpansionPanel expanded={expandedFilter} onChange={changeExpanding}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content">
                        <Typography>{t('translation:filter')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <StyledFilterBlock>
                            <Box>
                                <StyledInput className="filter-first-name"
                                             placeholder={t('translation:name')}
                                             onChange={e => filterBy(e, 'firs_name')}/>
                                <StyledInput className="filter-last-name"
                                             placeholder={t('users:family')}
                                             onChange={e => filterBy(e, 'last_name')}/>
                                <StyledInput className="filter-username"
                                             placeholder={t('users:username')}
                                             onChange={e => filterBy(e, 'user_name')}/>
                                <StyledInput className="filter-email"
                                             placeholder={t('users:email')}
                                             onChange={e => filterBy(e, 'mail')}/>
                                {valueRoles ? <StyledTextField id="outlined-select-role-native"
                                                               select
                                                               className="user-filter-role"
                                                               value={role}
                                                               onChange={e => changeRole(e)}
                                                               SelectProps={{native: true}}
                                                               variant="outlined">
                                    <option value="">{t('translation:none')}</option>
                                    {valueRoles.map((current, index) => (
                                        <option key={keyRoles[index]} value={current}>
                                            {current}
                                        </option>
                                    ))}
                                </StyledTextField> : ''}
                            </Box>
                            <StyledRegisterButton onClick={doFilterHandler}>
                                {t('translation:do')}
                            </StyledRegisterButton>
                        </StyledFilterBlock>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Box>
        </>
    )
}

export default withNamespaces('users,translation')(UsersFilterComponent)
