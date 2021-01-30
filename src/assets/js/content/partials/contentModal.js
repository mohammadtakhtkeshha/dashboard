import {white, green,grey} from "components/partials/Colors";
import styled from "styled-components";

export const useStyles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:'50!important',
        '& .MuiBackdrop-root': {
            backgroundColor: 'white!important',
        },
        '& #modal': {
            width: '100%',
            minWidth: '100px',
            marginTop: '5rem 5rem',
            maxWidth: '1000px',
            '& .header': {
                display: 'flex',
                justifyContent: 'space-between',
                position: 'absolute',
                top: '0',
                left: 0,
                right: 0,
                height: '40px',
                zIndex: '50',
                backgroundColor: green[0],
                '& .button': {
                    background: 'transparent',
                    cursor: 'pointer',
                    border: 0,
                    '&:focus': {
                        outline: '0!important',
                    },
                    '& svg': {
                        color: white[0],
                        margin: '9px 9px',
                    }
                },
                '& .title': {
                    margin: '9px 13px',
                    color: white[0]
                }
            },
            '& .footer': {
                border: '1px solid red',
                backgroundColor: green[0],
            },
            '& .flexDirL': {
                flexDirection: 'row-reverse'
            },
            '& .flexDirR': {
                flexDirection: 'row'

            }
        },
        '& #modalContentList' :{
            width: '24%',
            height:'auto',
            '&:focus':{
                outline:'0!important'
            }
        }
    }
}

export const StyledFooterRegisterContent = styled.div`
                background-color:${white[0]};
                position:absolute;
                bottom:0;
                width:100%;
                z-index:50;
                height:11vh;
                border-top:1px solid ${grey[1]};
`

export const StyledCancelButton = styled.button`
                position:absolute;
                top:1rem;
                right:1rem;
                background-color:transparent;
                border: 0!important;
                &:focus{
                    outline: 0!important;
                }
`


