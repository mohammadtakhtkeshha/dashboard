import styled from "styled-components";
import {StyledNotScrollbar} from "../base/all";
import {grey, white} from "assets/js/library/abstracts/colors";

export const StyledModalBody = styled(StyledNotScrollbar)`
             padding:57px 34px;
             height:100%;
             overflow-y:scroll;
             box-sizing:border-box;
`

export const StyledModalHeader = styled.div`
              height:30px
              border-bottom:1px solid ${grey[1]};
              text-align:center;
              padding:12px;
              position:absolute;
              left:0;
              right:0;
              z-index:10;
              background-color:white;
`

export const StyledModalFooter = styled.div`
             position:absolute;
             left:0;
             right:0;
             bottom:0;
             border-radius: 0 0 10px 10px;
             z-index:100;
             padding: 0;
             margin: 0;
             height: 45px;
             background-color: white;
             border-top:1px solid ${grey[0]};
             & button {
                cursor:pointer;
                width:100%;
                background-color:white;
                border:0;
                height:100%;
                &:focus{
                    outline:0;
                }
             }
`

export const ModalBody = styled.div`
                border:1px solid ${grey[1]}!important;
                border-radius:15px;
                overflow-y:hidden;
                box-shadow: 0 2px 10px rgba(31,45,61,0.16);
                background-color:white;
                width:100%;
                position: relative;
                height: ${props => props.height ? props.height : 'calc(100vh - 50px)'};
                width: 100%;
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

export const modalClasses = {
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
            maxWidth: props => props.maxWidth,
            width: '100%',
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

