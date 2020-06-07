import React from 'react';
import {Typography,Button} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme  } from '@material-ui/core';
import { red  } from '@material-ui/core/colors';
// import RalewayWoff2 from './fonts/Raleway-Regular.woff2';
import Iransans from './../assets/fonts/iran-sans-400.ttf';
// import Iranyekan from './../assets/fonts/iran-yekan-300.ttf';
// import Iranyekan from './../assets/fonts/iran-yekan-300.ttf';
import Iranyekan from './../assets/fonts/vazir-300.woff2';


const theme = createMuiTheme({
    typography: {
        fontWeight : 700,
        fontSize: 16,
        color : '#00e676'
    }
});
export default function CenteredGrid() {
console.log(theme);
    return (
        <div>
            نگار هستم
            <MuiThemeProvider theme={theme}>
            <Typography>
                        نگار هستم
            </Typography>
                <Button color='primary'>negar</Button>
        </MuiThemeProvider>
        </div>
    );
}




