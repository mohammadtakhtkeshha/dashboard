import * as colors from "../../../components/partials/Colors";

export const editUserStyels =(theme) => ({
    paper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        '& .flexBox': {
            width: '48%',
        },
        '& .upload': {
            position: 'relative',
            border: `1px solid ${colors.green[0]}`,
            '& #label': {
                minHeight: '150px',
                background: '#fff',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',

            },
            '& input': {
                border: '1px solid green',
                opacity: 0,
                position: 'absolute!important',
                top: 0,
            }
        },
        '& .role': {
            '& label': {
                display: 'block'
            }
        },
        '& .inputBlock':{
            position: 'relative',
            '& .error': {
                position: 'relative',
                top: '-25px',
                textAlign: 'right',
                color: 'red'
            }
        }

    },

    uploadedImgBlock: {
        position: 'relative',
        borderRadius: '20px',
        width: '120px',
        height: '120px',
        '& img': {
            border: '1px solid green',
            width: '100%',
            height: '100%',
            borderRadius: '20px',

        },
        '& .removeImgIcon': {
            position: 'absolute',
            top: '0',
            left: '0',
            color: 'rgba(255,255,255,.4)',
            // backgroundColor: 'red',
            cursor: 'pointer',
            width: '120px',
            height: '120px',
            // '&:hover':{
            //     backgroundColor:'rgba(255,255,255,.8)'
            // },
            // '& svg':{
            //     width:'100%!important',
            //     height:'100%!important',
            // }
        }

    }
})

export default editUserStyels;
