import React,{useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Box,Paper} from "@material-ui/core";
import * as components from "../../assets/js/AppImports";
import {makeStyles} from "@material-ui/core/styles";
import UseWindowDimensions from "../../configs/useWindowDimensions";
import {withNamespaces} from "react-i18next";
import clsx from "clsx";
import Tour from 'reactour';

const useStyle = makeStyles((theme) => ({
    sidebar: {
        position: 'fixed',
        width: '230px',
        zIndex:11,
    },
    content: {
        width: 'calc(100% - 230px)',
        '@media (max-width: 992px)': {
            width: '100%'
        },
        padding: theme.spacing(2),
    },
    marginLeft: {
        marginLeft: 'auto',
    },
    marginRight: {
        marginRight: 'auto',
    },
    paper:{
        backgroundColor:'transparent',
        boxShadow: '0 0 0 0',
        '@media(min-width : 992px)': {
            marginTop: '64px',
        }
    }
}));

const styles = {
    sidebar: {
        height: '100vh',
        flexGrow: 1,
    },
    content: {
        flexGrow: 5,
    }
};

function AuthorizedComponent({t}) {
    const classes = useStyle();
    const {width} = UseWindowDimensions();
    let dir =t('translation:marginDir');
    const [isTourOpen, setIsTourOpen] = useState(true);
    const steps = [
        {
            selector: '.first-step',
            content: 'This is my first Step',
        }
    ];
    return (
        <Grid container>
            <Tour
                steps={steps}
                isOpen={isTourOpen}
                onRequestClose={() => setIsTourOpen(false)}
            />
            <Grid item className={classes.sidebar}>
                {width > 992 ? <Box style={styles.sidebar}>
                    <components.SidebarComponent/>
                </Box> : ''}
            </Grid>
            <Grid item className={clsx(dir==="marginLeft"?classes.marginRight:classes.marginLeft,classes.content)}>
                <Paper className={classes.paper}>
                <Box style={styles.content}>
                    {width > 992 ? <components.HeaderWebComponent/> :
                        <components.HeaderMobileComponent/>}
                    <components.ContentComponent/>
                </Box>
                </Paper>
            </Grid>

        </Grid>)
}

export default withNamespaces(['translation', 'sidebar'])(AuthorizedComponent);
