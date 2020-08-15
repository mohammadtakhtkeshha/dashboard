import {primary} from "./../../components/partials/Colors";

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
    makeSwalButtonCenter:{
        '& .swal-footer':{
            textAlign:'center'
        }
    },
    confirmSwalButton:{
        backgroundColor:primary
    }
};
