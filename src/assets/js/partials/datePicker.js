import {green,grey} from "components/partials/Colors";

export const themeEnn={
    overrides: {
        MuiTypography: {
            root: {
                fontFamily: 'byekan!important'
            }
        },
        MuiPickersToolbarText: {
            toolbarTxt: {
                fontFamily: 'byekan!important'

            }
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: green[0],
            }
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: `${green[0]}!important`,
            }
        },
        MuiButton: {
            label: {
                color:green[0]
            }
        },
    },
}

export const themeFaa={
    overrides: {
        MuiTypography: {
            root: {
                fontFamily: 'primary-font!important'

            }
        },
        MuiPickersToolbarText: {
            toolbarTxt: {
                fontFamily: 'primary-font!important'

            }
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: green[0],
            }
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: `${green[0]}!important`,
            }
        },
        MuiButton: {
            label: {
                color:green[0]
            }
        },
    },
}

export const myStyles={
    dateFa: {
        width:'100%',
        '&>div':{
            '&:before,&:after':{
                borderBottom: '0!important',
            }
        },
        '& input': {
            fontFamily: 'primary-font!important',
            border: `1px solid ${grey[1]}`,
            padding:'13px',
            borderRadius:'5px',
            height : '32px',
        }
    },
    dateEn: {
        width:'100%',
        '&>div':{
            '&:before,&:after':{
                borderBottom: '0!important',
            }
        },
        '& input': {
            fontFamily: 'byekan!important',
            border: `1px solid ${grey[1]}`,
            padding:'13px',
            borderRadius:'5px',
            height : '32px',
        }
    }
}

export default {themeEnn,themeFaa,myStyles};
