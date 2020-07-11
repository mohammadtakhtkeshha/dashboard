import React, {useState} from "react";
import {Box, Paper} from '@material-ui/core/index';
import ButtonComponent from './../../../../components/partials/ButtonComponent'
import Input from "../../../partials/inputComponent";
import Grid from '@material-ui/core/Grid/index';

//styles
import * as newUser from './../../../../assets/js/user/NewUser';


import {withNamespaces} from "react-i18next";


function NewVocabsComponent({t}) {
    const classes = newUser.useStyles();
    const [errors, setErrors] = useState({});
    const [vocab, setVocab] = useState({});
    let handleChange = (e, field) => {
        let currentName = e.currentTarget.value;
        if (currentName === "") {
            delete vocab[field];
        }
        setVocab(prevState => {
            return {
                ...prevState, [field]: {value: currentName}
            }
        });
    };
    let register = () => {
        alert('register');
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

export default withNamespaces('vocabs')(NewVocabsComponent);