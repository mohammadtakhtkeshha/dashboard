import styled from "styled-components";
import {blue, primary, red, white} from "components/partials/Colors";
import * as colors from "../../components/partials/Colors";

export const StyledPaper = styled.div`
        margin: 1rem;
`;

export const StyledBox = styled.div`
            border-radius: 4px;
            margin: 1rem 0;
            background-color: white;
            box-shadow: 0px 2px 4px 0px #999f9d;
`

export const HeadButtonStyled = styled.button`
            color: #fff;
            border: 0;
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 5px;
            background-color: #12a56d;
`;

export const StyledHead = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem ;
`;

export const StyledHeadTypography = styled.div`
       font-size: 14px;
       font-weight: 600;
`;

export const StyledButton = styled.button`
            color: ${white};
            border: 0;
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 5px;
            background-color: ${primary};
            width:fit-content;
            &:focus{
                outline:0!important;
            }
`;

export const StyledActionButtonBlock = styled.div`
            display:flex;
            & button{
               cursor:pointer;
               border:0 solid red;
               margin: 0;
               padding: 0;
               box-shadow: 0 0 0 0 !important;
               display:flex;
               flex-direction:row;
               color:${white};
               fontSize :14px;
               padding:4px;
               &:focus{
                outline:0!important;
                }
               & svg{
               margin-left:1px;
               margin-right:0;
               font-size :20px;
               }
                & span{
                 line-height:14px;
                 padding:2px 0;
                }
            }
            & button:nth-child(1){
               border-radius: 0 4px 4px 0;
               background-color:${blue[0]}
            };
            & button:nth-child(2){
               border-radius:4px 0 0 4px;
               background-color:${red[0]};
            };
`;

export const styledTableCell =(theme) => ({
    head: {
        backgroundColor: primary,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
});

export const styledTableRow = (theme) => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
});
export const modalStyles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& #modal': {
            width:'30%',
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
                marginTop: '2.5rem',
            }
        }
    }
});

export const StyledInput = styled.input`
    margin: .2rem;
    height: 30px;
    width: 99%;
`



export default {styledTableRow,styledTableCell,StyledPaper,StyledActionButtonBlock,
    StyledHead, HeadButtonStyled, StyledHeadTypography,StyledButton,StyledBox,StyledInput,modalStyles};


