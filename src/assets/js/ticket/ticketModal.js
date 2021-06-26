import {white} from "assets/js/library/abstracts/colors"
import styled from "styled-components"
// import {isNum} from "react-toastify/dist/utils";

export const useStyles =(theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:'50!important',
        '& .MuiBackdrop-root': {
            backgroundColor: "white!important",
        },
        '& #modal': {
            height: 'calc(100vh - 100px)',
            border: '0!important',
            maxWidth:({chosen}) => chosen === "" ?'600px':'800px',
            width:({chosen}) => chosen === "" ?'600px':'800px',
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
})

export const StyledText = styled.div`
                padding:0 36px;
`


