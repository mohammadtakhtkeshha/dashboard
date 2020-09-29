import styled from "styled-components";
import {blue,grey, green, red, white,black} from "components/partials/Colors";

//z-index{loading:100,modal:50,userDrawer:50}
export const StyledPaper = styled.div`
        margin: 1rem;
`

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
`

export const StyledHead = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem ;
`

export const StyledHeadTypography = styled.div`
       font-size: 14px;
       font-weight: 600;
`

export const StyledButton = styled.button`
            color: ${white};
            border: 0;
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 5px;
            background-color: ${props => props.bg};
            width:fit-content;
            &:focus{
                outline:0!important;
            }
`

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
               background-color:${blue[1]}
            };
            & button:nth-child(2){
               border-radius:4px 0 0 4px;
               background-color:${red[1]};
            };
`

export const styledTableCell =(theme) => ({
    head: {
        backgroundColor: green[1],
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
})

export const styledTableRow = (theme) => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
})

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
                backgroundColor: green[1],
                '& button': {
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
                }
            },
            '& .body': {
                backgroundColor: white,
                marginTop: '2.5rem',
            }
        }
    }
})

export const StyledInput = styled.input`
            display: block;
            width:100%;
            height: 1.75rem;
            padding: 1.3rem .75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            box-sizing:border-box;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            margin-bottom: .5rem;
            &:focus{
                border-color: #ced4da;
                outline: 0;
            }
`

export const StyledMultiButtonsBlock = styled.div`
    display:flex;
        & button{
            cursor:pointer;
            margin: ${props=>props.lang ==='fa'?'5px 0 5px 5px':'5px 5px 5px 0'};
        }
`

export const StyledLabel=styled.div`
        font-size:.75rem;
        margin-bottom:.75rem;
        display:inline-block;
       
`
export const StyledBoxMt1=styled.div`
        margin-top:1rem;
`

export const StyledTypographyError =  styled.p`
        color:${red[1]};
        font-size:14px;
        text-align : ${props=>props.align}
`

export const StyledSvg = styled.div`
    background:${grey[7]};
    fill:${black[1]};
    border-radius:100%;
    cursor:pointer;
    & svg{
        width: 34px;
        height: 21px;
        padding: 9px 4px 3px;
    }
`

