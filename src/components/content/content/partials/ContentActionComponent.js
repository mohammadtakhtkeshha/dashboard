import React from "react";
import {withNamespaces} from "react-i18next";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Box, Typography} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";

import ButtonComponent from "components/partials/ButtonComponent";
import {primary} from "components/partials/Colors";
import {styles} from "assets/js/content/contentAction";

const useStyles=makeStyles(styles);

function ContentActionComponent({t}) {
    const classes=useStyles();
    const [action, setAction] = React.useState('EUR');
    const handleActionChange = (event) => {
        setAction(event.target.value);
    };

    const actions = [
        {value: 'delete', label: t('translation:delete')},
        {value: 'block', label: t('translation:published')},
        {value: 'noBlock', label: t('translation:unpublished')}
    ];

    let doFilterHandler = () => {
        console.log('hellow');
    }
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{t('translation:operator')}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.action}>
                <TextField
                    className="inputBlock"
                    id="outlined-select-role-native"
                    select
                    value={action}
                    onChange={handleActionChange}
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                >
                    {actions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <Box>
                    <ButtonComponent text={t('translation:do')}
                                     color="primary"
                                     background={primary}
                                     clicked={() => doFilterHandler()}/>
                </Box>
            </ExpansionPanelDetails>
        </ExpansionPanel>

    );
}

export default withNamespaces('contents')(ContentActionComponent);
