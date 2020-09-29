import {green} from "components/partials/Colors";

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
                backgroundColor: green[1],
            }
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: `${green[1]}!important`,
            }
        },
        MuiButton: {
            label: {
                color:green[1]
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
                backgroundColor: green[1],
            }
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: `${green[1]}!important`,
            }
        },
        MuiButton: {
            label: {
                color:green[1]
            }
        },
    },
}
export const myStyles={
    width:'100%',
    dateFa: {
        '& input': {
            fontFamily: 'primary-font!important'
        }
    },
    dateEn: {
        '& input': {
            fontFamily: 'byekan!important'
        }
    }
}

export default {themeEnn,themeFaa,myStyles};
