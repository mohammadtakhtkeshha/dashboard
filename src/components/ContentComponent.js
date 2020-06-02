import React from 'react';
import Grid from '@material-ui/core/Grid';
import './../App.css'

function HeaderComponent() {
    return (
        <>
            <Grid container>
                <Grid item className="card" xs={6} sm={6}>
                    one
                </Grid>
                <Grid item className="card" xs={6} sm={6}>
                    two
                </Grid>
            </Grid>
        </>
    );
}

export default HeaderComponent;