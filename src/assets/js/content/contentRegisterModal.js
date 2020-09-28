import {white, primary,grey,black} from "../../../components/partials/Colors";
import styled from "styled-components"

export const useStyles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiBackdrop-root': {
            backgroundColor: 'white!important',
        },
        '& #modal': {
            width: '75%',
            minWidth: '100px',
            marginTop: '5rem 5rem',
            maxWidth: '650px',
            '&>button':{
                position:'absolute',
                top:'1rem',
                right:'1rem',
                backgroundColor:'transparent',
                // borderRadius:'100%',
                border: '1px solid red',
                '& svg':{
                    // border: '1px solid red',
                    backgroundColor:grey[7],
                    color:black[1]
                }
            },
            '&:focus': {
                outline: '0!important',
            },
            '& .header': {
                display: 'flex',
                justifyContent: 'space-between',
                position: 'absolute',
                top: '0',
                left: 0,
                right: 0,
                height: '40px',
                zIndex: '100',
                backgroundColor: primary,
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
                backgroundColor: primary,
            },
            '& .flexDirL': {
                flexDirection: 'row-reverse'
            },
            '& .flexDirR': {
                flexDirection: 'row'

            },
            '& .body': {
                position: 'relative',
                height: 'calc(100vh - 50rem)',
                overflow: 'scroll',
                scrollbar: 'none',
                width: '100%',
                '&::-webkit-scrollbar': {
                    display: 'none',
                }
            }
        }
    }
};

export const StyledFooterRegisterContent = styled.div`
                background-color:${primary};
                position:absolute;
                bottom:0;
                width:100%;
                z-index:100;
`
export const ModalBox = styled.div`
                background-color:white;
                width:100%;
`

export const ModalAround = styled.div`
                border:1px solid ${grey[1]}!important;
                border-radius:15px;
                overflow:hidden;
                box-shadow: 0 2px 10px rgba(31,45,61,0.16);
`

export const ModalBody = styled.div`
                position: relative;
                height: fit-content;
                overflow: scroll;
                scrollbar: none;
                width: 100%;
                &::-webkit-scrollbar{
                    display: none;
                }
`
