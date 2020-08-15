import React, {useState,useEffect} from "react";
import {Box, Paper} from '@material-ui/core/index';
import ButtonComponent from './../../../../components/partials/ButtonComponent'
import Input from "../../../partials/inputComponent";
import Grid from '@material-ui/core/Grid/index';
import tagService from './../../../../core/services/tag.service';
import * as newUser from './../../../../assets/js/user/NewUser';
import {withNamespaces} from "react-i18next";
import {primary, white} from './../../../partials/Colors'

function NewTagsCompnent({t,getRegisteredTag,currentTag,type}) {
    const classes = newUser.useStyles();
    const [errors, setErrors] = useState({});
    const [tag, setTag] = useState({
        "vid": {
            "target_id": "tags"
          }
    });

    let handleChange = (e, field) => {
        let currentName = e.currentTarget.value;
        if (currentName === "") {
            delete tag[field];
        }
        setTag(prevState => {
            return {
                ...prevState, [field]: currentName
            }
        });
    };

    useEffect(()=>{
        if(currentTag){
            setTag(prevState=>{
                return {...prevState,name:currentTag.name}
            });
        }
    },[currentTag]);

    let register = () => {
        if(type==='addTag'){
        tagService.addTag(tag).then((response)=>{
            getRegisteredTag(response.data);
        }).catch((error)=>{
            console.log(error);
        });
    }else{
        tagService.editTag(currentTag.tid,tag).then((response)=>{
            getRegisteredTag(response.data);
        }).catch((error)=>{
            console.log(error);
        });
    }
}
    return (<>
        <Box>
            <Paper className={classes.paper}>
                <Grid container>
                    <Box className={classes.block}>
                        <Input value={tag.name}
                            type="text" placeholder={t('translation:name')}
                               error={errors.name ? errors.name : ''}
                               small='' handleClick={e => handleChange(e, "name")}/>
                    
                        <ButtonComponent background={primary} color={white} clicked={register} text={t('translation:register')}/>
                    </Box>
                </Grid>
            </Paper>
        </Box>
    </>);
}

export default withNamespaces('tags','translation')(NewTagsCompnent);