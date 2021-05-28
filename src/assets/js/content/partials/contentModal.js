import {white, grey} from "assets/js/library/abstracts/colors";
import styled from "styled-components";


export const useStyles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '50!important',
        '& .MuiBackdrop-root': {
            backgroundColor: 'white!important',
        },
        '& #modal': {
            // height: 'calc(100vh - 100px)',
            border: '0!important',
            maxWidth: props=>props.maxWidth,
            width: props=>props.width,
            display: 'flex',
            alignItems: 'center',
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            msOverflowStyle: 'none',  /* IE and Edge */
            scrollbarWidth: 'none',  /* Firefox */
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
                zIndex: '50',
                '& button': {
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
            '& .flexDirL': {
                flexDirection: 'row-reverse'
            },
            '& .flexDirR': {
                flexDirection: 'row'
            },
            '& .body': {
                marginTop: '16px',
            }
        }
    }
}


export const StyledFooterRegisterContent = styled.div`
                background-color:${grey[9]};
                position:absolute;
                bottom:0;
                width:100%;
                z-index:50;
                height:11vh;
                border-top:1px solid ${grey[1]};
`




