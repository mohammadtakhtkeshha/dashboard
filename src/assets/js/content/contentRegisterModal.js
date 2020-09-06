import * as colors from "../../../components/partials/Colors";

export const useStyles={
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& #modal': {
            border: '0!important',
            minWidth:'100px',
            marginTop: '5rem 5rem',
            maxWidth: '650px',
            '&:focus': {
                outline: '0!important',
            },
            position: 'relative',
            '& .header': {
                display:'flex',
                justifyContent:'space-between',
                position: 'absolute',
                top: '0',
                left: 0,
                right: 0,
                height: '40px',
                zIndex:'100',
                backgroundColor: colors.primary,
                '& .button': {
                    background: 'transparent',
                    cursor: 'pointer',
                    border: 0,
                    '&:focus': {
                        outline: '0!important',
                    },
                    '& svg': {
                        color: colors.white,
                        margin: '9px 9px',
                    }
                },
                '& .title': {
                    margin: '9px 13px',
                    color:colors.white
                }
            },
            '& .flexDirL':{
                flexDirection:'row-reverse'
            },
            '& .flexDirR':{
                flexDirection:'row'

            },
            '& .body': {
                marginTop: '40px',
                height: 'calc(100vh - 5rem)',
                overflow: 'scroll',
                scrollbar: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                }
            }
        }
    }
};

