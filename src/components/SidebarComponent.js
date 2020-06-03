import React from 'react';
import {Paper, Typography, Link} from '@material-ui/core';
import {CardMedia} from '@material-ui/core';

const styles = {
    img:{
        textAlign:'center',
        margin:'auto',
        paddingTop: '20px'
    },
    nextable: {
        width: 'auto',
        height: '47px',
        marginTop:'30px'
    }
};

function HeaderComponent() {
    return (
        <>
            <Paper>
                <Typography variant="h6" style={styles.img}>
                    <Link>
                        <CardMedia>
                            <img src={require('../assets/media/image/logo.png')} alt="recipe thumbnail"/>
                        </CardMedia>
                    </Link>
                </Typography>
            </Paper>
        </>
    );
}

export default HeaderComponent;