import React from 'react';
import {Typography,Button} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme  } from '@material-ui/core';
import { red  } from '@material-ui/core/colors';
// import RalewayWoff2 from './fonts/Raleway-Regular.woff2';
import Iransans from './../assets/fonts/iran-sans-400.ttf';
import Iranyekan from './../assets/fonts/iran-yekan-300.ttf';
// import Iranyekan from './../assets/fonts/vazir-300.woff2';

// import Iranyekan from './../assets/fonts/iran-yekan-300.ttf';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Iranyekan',
        ].join(','),
        src: `url(${Iranyekan}) format('ttf')`,
    }

});
export default function CenteredGrid() {
console.log(theme);
    return (
        <div>
            <MuiThemeProvider theme={theme}>
            <Typography style={{fontSize:'13px',fontWeight:700}}>
                        داشبورد
            </Typography>
        </MuiThemeProvider>
        </div>
    );
}




