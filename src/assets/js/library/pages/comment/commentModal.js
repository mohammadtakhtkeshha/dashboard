import {green, white,grey} from "assets/js/library/abstracts/colors";
import styled from "styled-components";
import {ModalBody} from "../../../App";
// export const commentModal = () => ({
//     root:{
//         display:'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         '& .MuiBackdrop-root': {
//             backgroundColor: 'white!important',
//         },
//         '& #modal': {
//             backgroundColor:`${white[0]}!important`,
//             height: 'auto',
//             // border: '0!important',
//             maxWidth: '700px!important',
//             display:'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//         }
//     }
// })

export const commentModal =(theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:'50!important',
        '& .MuiBackdrop-root': {
            backgroundColor: 'white!important',
        },
        '& #modal': {
            height: 'calc(100vh - 100px)!important',
            border: '0!important',
            maxWidth: '700px!important',
            display:'flex',
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
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
});

export const StyledModalBody = styled(ModalBody)`
                height:calc(100vh - 176px)!important;
`
