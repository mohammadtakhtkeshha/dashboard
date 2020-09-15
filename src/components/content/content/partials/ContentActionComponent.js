import React, {useContext, useState} from "react";
import {withNamespaces} from "react-i18next";
import axios from 'axios';

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
import ContentsContext from "contexts/ContentsContext";
import {aacaauthHeader} from "utils/headers";


const useStyles=makeStyles(styles);

function ContentActionComponent({t,selectedCheckBoxes}) {
    const classes=useStyles();
    const contentsContext = useContext(ContentsContext);
    const [action, setAction] = useState('delete');
    const handleActionChange = (event) => {debugger
        setAction(event.target.value);
    };
    const actions = [
        {value: 'delete', label: t('translation:delete')},
        {value: 'block', label: t('translation:unpublished')},
        {value: 'noBlock', label: t('translation:published')}
    ];

    let doAction = () => {
        const url='http://dash.webrbp.ir/api/rest/nodes/status?_format=json';
        const body=[];
        if(action === 'delete'){
            for(let item of selectedCheckBoxes){
                 body.push({
                     id: item,
                     setdelete: "deleted"
                 })
            }
            axios.post(url,body,aacaauthHeader).then((response) => {
                const currentContents=contentsContext.contents;
                for(let selected of selectedCheckBoxes){
                    let currentContent = currentContents.filter(item=>item.nid===selected);
                    let index=currentContents.indexOf(currentContent[0]);
                    currentContents.splice(index,1);
                }
                const currentLength=currentContents.length;
                contentsContext.afterUpdateHandler(currentContents,currentLength,'deletedSuccessfully');
            }).catch((error)=>{
                debugger
            });
        }else if(action==='block'){
            for(let item of selectedCheckBoxes){
                body.push(  {
                    id: item,
                    setPublished: false
                })
            }
            axios.post(url,body,aacaauthHeader).then((response) => {
                const currentContents=contentsContext.contents;
                for(let selected of selectedCheckBoxes){
                    let currentContent = currentContents.filter(item=>item.nid===selected);
                    let index=currentContents.indexOf(currentContent[0]);
                    currentContents[index].status='false';
                }
                const currentLength=currentContents.length;
                contentsContext.afterUpdateHandler(currentContents,currentLength,'successDone');
            }).catch((error)=>{
                debugger
            });
        }else {debugger
            for(let item of selectedCheckBoxes){
                body.push(  {
                    id: item,
                    setPublished: true
                })
            }
            axios.post(url,body,aacaauthHeader).then((response) => {
                const currentContents=contentsContext.contents;
                for(let selected of selectedCheckBoxes){
                    let currentContent = currentContents.filter(item=>item.nid===selected);
                    let index=currentContents.indexOf(currentContent[0]);
                    currentContents[index].status='true';
                }
                const currentLength=currentContents.length;
                contentsContext.afterUpdateHandler(currentContents,currentLength,'successDone');
            }).catch((error)=>{
                debugger
            });

        }
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
                                     clicked={doAction}/>
                </Box>
            </ExpansionPanelDetails>
        </ExpansionPanel>

    );
}

export default withNamespaces('contents')(ContentActionComponent);
