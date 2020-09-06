import * as colors from "components/partials/Colors";

export const useStyles =(theme) => ({
   paper:{
       display:'flex',
       justifyContent:'space-between',
       alignItems:'space-between',
       padding: theme.spacing(2),
       margin: theme.spacing(2),
       '& .block': {
           width: '48%',
           '& .inputBlock': {
               position: 'relative',
               '& .error': {
                   position: 'relative',
                   top: '-25px',
                   textAlign: 'right',
                   color: 'red'
               }
           },
           '& .upload': {
               position: 'relative',
               border: `1px solid ${colors.primary}`,
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
                   width: '100%',
                   height: '100%',
                   top: 0,
               }
           },
           '& .role': {
               '& label': {
                   display: 'block'
               }
           },


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
            cursor: 'pointer',
            width: '120px',
            height: '120px',
        }

    },

});
