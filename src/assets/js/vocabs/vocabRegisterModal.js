import * as colors from "../../../components/partials/Colors";

export const currentStyles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& #modal': {
            border: '0!important',
            '&:focus': {
                outline: '0!important',
            },
            position: 'relative',
            '& .header': {
                position: 'absolute',
                top: '0',
                left: 0,
                right: 0,
                height: '40px',
                backgroundColor: colors.primary,
                '& button': {
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
                }
            },
            '& .body': {
                backgroundColor: colors.white,
                marginTop: '2rem',
            }
        }
    }
}

export default {currentStyles};
