import {primary} from "components/partials/Colors";

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
                backgroundColor: primary,
            }
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: `${primary}!important`,
            }
        },
        MuiButton: {
            label: {
                color:primary
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
                backgroundColor: primary,
            }
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: `${primary}!important`,
            }
        },
        MuiButton: {
            label: {
                color:primary
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
