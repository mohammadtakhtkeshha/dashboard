import React from "react";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import * as components from "../../assets/js/AppImports";
import {makeStyles} from "@material-ui/core/styles";
import UseWindowDimensions from "../../configs/useWindowDimensions";
const useStyle = makeStyles((theme) => ({
    sidebar: {
        position: 'fixed',
        width: '300px'
    },
    content: {
        marginRight: 'auto',
        width: 'calc(100% - 300px)',
        '@media (max-width: 992px)': {
            width: '100%'
        },
        padding: theme.spacing(2),
    }
}));
const styles = {
    sidebar: {
        height: '100vh',
        flexGrow: 1
    },
    content: {
        flexGrow: 5
    }
};
export default function AuthorizedComponent() {
    const classes = useStyle();
    const {width} = UseWindowDimensions();

    return (
        <Grid container>
            <Grid item className={classes.sidebar}>
                {width > 992 ? <Box style={styles.sidebar}>
                    <components.SidebarComponent/>
                </Box> : ''}
            </Grid>
            <Grid item className={classes.content}>
                <Box style={styles.content}>
                    {width > 992 ? <components.HeaderWebComponent/> :
                        <components.HeaderMobileComponent/>}
                    <components.ContentComponent/>
                </Box>
            </Grid>
        </Grid>)
}