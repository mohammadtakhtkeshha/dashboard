import {white, green,grey,black} from "../../../components/partials/Colors";
import styled from "styled-components";

export const useStyles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
                backgroundColor: green[1],
                '& .button': {
                    background: 'transparent',
                    cursor: 'pointer',
                    border: 0,
                    '&:focus': {
                        outline: '0!important',
                    },
                    '& svg': {
                        color: white,
                        margin: '9px 9px',
                    }
                },
                '& .title': {
                    margin: '9px 13px',
                    color: white
                }
            },
            '& .footer': {
                border: '1px solid red',
                backgroundColor: green[1],
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
};

export const StyledFooterRegisterContent = styled.div`
                background-color:${white};
                position:absolute;
                bottom:0;
                width:100%;
                z-index:50;
                height:11vh;
                border-top:1px solid ${grey[1]};
               
`

export const ModalBody = styled.div`
                border:1px solid ${grey[1]}!important;
                border-radius:15px;
                overflow:hidden;
                box-shadow: 0 2px 10px rgba(31,45,61,0.16);
                background-color:white;
                width:100%;
                position: relative;
                height: fit-content;
                width: 100%;
                height:auto;
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
