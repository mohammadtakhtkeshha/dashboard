import React, {useContext, useState} from "react";
import {Box, Paper} from '@material-ui/core/index';
import ButtonComponent from './../../../../components/partials/ButtonComponent'
import Input from "../../../partials/inputComponent";
import Grid from '@material-ui/core/Grid/index';
import axios from 'axios';
import storage from './../../../../libraries/local-storage'

//styles
import * as newUser from './../../../../assets/js/user/NewUser';


import {withNamespaces} from "react-i18next";


function NewTermsComponent({t}) {
    const classes = newUser.useStyles();
    const [errors, setErrors] = useState({});
    const [term, setTerm] = useState({});
    let handleChange = (e, field) => {
        let currentName = e.currentTarget.value;
        if (currentName === "") {
            delete term[field];
        }
        setTerm(prevState => {
            return {
                ...prevState, [field]: {value: currentName}
            }
        });
    };
    let register = () => {
        let url = 'http://dash.webrbp.ir/taxonomy/term?_format=hal_json';
        let config = {
            'Content-Type': 'application/hal+json',
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE0YjY5ZTE3OGEyMmYzMjlhMmRhYzMwYjJhZGEyY2Q4OWEyNThkN2MwNGM5MjM3NmE2ZTBkMjMyYWY2MDgxODk4MDVkMDI0YTNjZGUxYzMyIn0.eyJhdWQiOiI0YzdmZDZkZC03YzZjLTRiNGQtYjYzNi01YjM1NTAwMzdiN2UiLCJqdGkiOiIxNGI2OWUxNzhhMjJmMzI5YTJkYWMzMGIyYWRhMmNkODlhMjU4ZDdjMDRjOTIzNzZhNmUwZDIzMmFmNjA4MTg5ODA1ZDAyNGEzY2RlMWMzMiIsImlhdCI6MTU5NDc4MzQ2NSwibmJmIjoxNTk0NzgzNDY1LCJleHAiOjE1OTQ3ODM3NjUsInN1YiI6IjEiLCJzY29wZXMiOlsiYXV0aGVudGljYXRlZCIsInJlc3QiXX0.LtKoX8rVLPkW-iMt-vUsDWlcEAzR4clljWZnUWpvGYywUZEsPtGE8sOOzee1VEUVmX9J92u8YLTqjNkv8ogb8-_gnsczo9R1cxF1i9O113O74VHuiudj7UgJBOjNkC7IGjPLJvAW-wkGDzrQVahfxRiTxoLMY-b7lyY4oMR7ET8Le0ueqGBtYJqYX_Jkn3gbFpvKdAkMpYL2q7Z2QgqOFOsmhv_1dqKQ968FZJI8y7x2JHtUcDrbBkRMseHEC1XqPepTsdLallzF0yxdacRW1BXQOzoGonjiOb4YD0U2SqwlKP9jhfjX9MWkZR8TgSG_-RLic6A3YbPVtihUmQfEOA',
            'Accept': 'application/hal+json',
        };
        let body = {
            "_links": {
                "type": {
                    "href": "http://dash.webrbp.ir/rest/type/taxonomy_term/tags"
                }
            },
            "name": [{"value": "برچسب"}]
        }

    axios.post(url, body, config).then((response)=>{
    }).catch((error)=>{
    });
}
return (<>
    <Box>
        <Paper className={classes.paper}>
            <Grid container>
                <Box className={classes.block}>
                    <Input type="text" placeholder={t('translation:name')}
                           error={errors.name ? errors.name : ''}
                           small='' handleClick={e => handleChange(e, "field_name")}/>
                    <Input type="text" placeholder={t('translation:description')}
                           error={errors.description}
                           small='' handleClick={e => handleChange(e, "field_last_name")}/>
                    <ButtonComponent color="primary" clicked={register} text="ثبت"/>
                </Box>
            </Grid>
        </Paper>
    </Box>
</>);
}

export default withNamespaces('terms')(NewTermsComponent);
