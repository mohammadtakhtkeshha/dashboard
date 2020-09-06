import React from "react";
import {withNamespaces} from "react-i18next";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Box, Typography} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";

import Input from "components/partials/inputComponent";
import ButtonComponent from "components/partials/ButtonComponent";
import {primary} from "components/partials/Colors";

function ContentSearchExpansion({t}) {
    const [role, setRole] = React.useState('EUR');
    const contentTypes = [{
        value: 'published',
        label: t('translation:unpublished'),
    }, {
        value: 'unpublished',
        label: t('translation:published'),
    }];
    const statuses = [{
        value: 'published',
        label: t('translation:unpublished'),
    }, {
        value: 'unpublished',
        label: t('translation:published'),
    }];

    let handleClickSearch = () => {
        console.log('negar');
    }

    const handleFilterChange = (event) => {
        setRole(event.target.value);
    }

    const doFilterHandler = () => {
        console.log('negar');
    }

    return (<ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{t('translation:filter')}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails id="details">
                <Box className="inputBlock">
                    <Input placeholder={t('translation:title')} handleClick={handleClickSearch}/>
                    <TextField
                        id="outlined-select-role-native"
                        select
                        value={role}
                        onChange={handleFilterChange}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                    >
                        {statuses ? statuses.map((option, index) => (
                            <option key={index} value={option.value}>
                                {t('contents:contentType')}
                            </option>
                        )) : ''}
                    </TextField>
                    <TextField
                        id="outlined-select-role-native"
                        select
                        value={role}
                        onChange={handleFilterChange}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                    >
                        {contentTypes ? contentTypes.map((option, index) => (
                            <option key={index} value={option.value}>
                                {t('translation:status')}
                            </option>
                        )) : ''}
                    </TextField>
                    <Box className="buttonBlock">
                        <ButtonComponent text={t('translation:do')}
                                         color="primary"
                                         background={primary}
                                         clicked={() => doFilterHandler()}/>
                    </Box>
                </Box>

            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default withNamespaces('contents,translation')(ContentSearchExpansion);
