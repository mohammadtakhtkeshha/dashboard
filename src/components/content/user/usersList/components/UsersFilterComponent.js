import React, {useContext, useState} from "react";
import {withNamespaces} from "react-i18next";
import clsx from "clsx";

import EditIcon from "@material-ui/icons/Edit";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Box, Typography} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";

import Input from "components/partials/inputComponent";
import ButtonComponent from "components/partials/ButtonComponent";
import {primary} from "components/partials/Colors";
import UserContext from "contexts/UserContext";

function UsersFilterComponent({t, chunckUser, changeChunckUserList}) {
    const [role, setRole] = useState('');
    const userContext = useContext(UserContext);
    const [searchedUser, setSearcheUser] = useState({
        field_name: "",
        field_last_name: "",
        name: "",
        mail: "",
        role: ""
    });

    let changeRole = (e) => {
        let currentValue = e.currentTarget.value;
        setRole(currentValue);
    };

    let doFilterHandler = () => {
        let fieldName = searchedUser.field_name;
        let fieldLastName = searchedUser.field_last_name;
        let name = searchedUser.name;
        let mail = searchedUser.mail;
        let filteredUser;

        filteredUser = userContext.users.filter((user) => {
            let newUser = user['field_name'].includes(fieldName) &&
                user['field_last_name'].includes(fieldLastName) &&
                user['name'].includes(name) &&
                user['mail'].includes(mail) &&
                user['roles_target_id'].includes(role)
            return newUser;
        });
        let currentTotalNumber = filteredUser.length;
        let currentTotalPage = Math.ceil(currentTotalNumber / userContext.perPage);
        let chunckedUsers = chunckUser(filteredUser, userContext.perPage);
        changeChunckUserList(chunckedUsers, currentTotalPage);
    }

    let filterBy = (e, key) => {
        let keyValue = e.currentTarget.value;
        setSearcheUser(prevState => {
            return {
                ...prevState, [key]: keyValue
            }
        });
    }

    return (<>
            <Box className={clsx("filter", "box")}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{t('translation:filter')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails id="details">
                        <Box className="inputBlock">
                            <Input placeholder={t('translation:name')} handleClick={e => filterBy(e, 'field_name')}/>
                            <Input placeholder={t('users:family')} handleClick={e => filterBy(e, 'field_last_name')}/>
                            <Input placeholder={t('users:username')} handleClick={e => filterBy(e, 'name')}/>
                            <Input placeholder={t('users:email')} handleClick={e => filterBy(e, 'mail')}/>

                            {userContext.valueRoles ? <TextField
                                id="outlined-select-role-native"
                                select
                                value={role}
                                onChange={e => changeRole(e)}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                            >
                                <option value="">{t('translation:none')}</option>
                                {userContext.valueRoles.map((current, index) => (
                                    <option key={userContext.keyRoles[index]} value={current}>
                                        {current}
                                    </option>
                                ))}
                            </TextField> : ''}

                        </Box>
                        <Box className="buttonBlock">
                            <ButtonComponent text={t('translation:do')}
                                             color="primary"
                                             background={primary}
                                             clicked={() => doFilterHandler()}/>
                        </Box>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Box>
        </>
    );
}

export default withNamespaces('users', 'translation')(UsersFilterComponent);
