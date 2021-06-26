import {primary} from "assets/js/library/abstracts/colors";

export const globalCss = {
    textLeft:{
        textAlign:'left'
    },
    textRight:{
        textAlign:'right'
    },
    ltr:{
        direction:'ltr'
    },
    rtl:{
        direction:'rtl'
    },
    none:{
        display:'none'
    },
    block:{
        display:'block'
    },
    validation:{
        color:'red',
    },
    doButtonBlock:{
        direction:'rtl',
        '& button': {
            margin: '0',
            padding: '0',
            boxShadow: '0 0 0 0 !important',
            '&:first-child': {
                borderRadius: '0 4px 4px 0',
            },
            '&:nth-child(2)': {
                borderRadius: '4px 0 0 4px',
            },

    }
    }
};
