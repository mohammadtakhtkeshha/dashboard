import styled from "styled-components";
import {black, blue, green, grey, red, white} from "assets/js/library/abstracts/colors";

export const StyledDeleteButton = styled.button`
            color: ${white[0]};
            border: 0;
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 5px;
            background-color: ${red[0]};
            width:fit-content;
            &:focus{
                outline:0!important;
            }
`

const button = styled.button`
           border: 0;
           cursor: pointer;
           line-height: 14px;
           background-color: transparent!important;
           &:focus{
                outline:0!important;
            }
            & div{
                width:19px;
                height:19px;
            }
`

export const StyledEditIcon = styled(button)`
          
`

export const StyledDeleteIcon = styled(button)`
          
`

export const StyledActionIcons = styled.div`
                display:flex;
                padding: 0;
`

export const StyledActionsBlock = styled.div`
                padding:0;
                display:flex;
                justify-content:center;
                align-items:center;
`

export const StyledActionButtons = styled.button`
                border: 0;
                cursor: pointer;
                line-height: 14px;
                border-radius: 5px;
                background-color: white;
                &:focus{
                    outline:0!important;
                }
                    display:flex;
                    & img{
                        width:18px;
                        height:18px;
                    }
`

export const StyledActionButtonBlock = styled.div`
            display:flex;
            & button{
               cursor:pointer;
               border:0 solid red;
               margin: 3px;;
               display:flex;
               flex-direction:row;
               color:${white[0]};
                width: 70px;
                height: 41px;
               font-size :14px;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
                // box-shadow: 0px 4px 8px ${grey[1]}!important;
               &:focus{
                outline:0!important;
                }
            }
            & button:nth-child(1){
               background-color:${blue[0]}
            };
            & button:nth-child(2){
               background-color:${red[0]};
            };
`

export const StyledDefaultButton = styled.button`
            border: 0;
            cursor: pointer;
            line-height: 14px;
            border-radius: 5px;
            background-color: white;
            white-space:nowrap;
            &:focus{
                outline:0!important;
            }
`

export const StyledButton = styled.button`
            color: ${white[0]};
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

export const StyledAddButton = styled.button`
            color: ${white[0]};
            background-color: ${green[0]};
            border: 0;
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 4px;
            width:fit-content;
            &:focus{
                outline:0!important;
            }
`

export const StyledEditButton = styled.button`
            color: ${white[0]};
            border: 0;
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 5px;
            background-color: ${blue[0]};
            width:fit-content;
            &:focus{
                outline:0!important;
            }
`

export const StyledMultiButtonsBlock = styled.div`
    display:flex;
        & button{
            cursor:pointer;
            margin: ${props => props.lang === 'fa' ? '5px 0 5px 5px' : '5px 5px 5px 0'};
        }
`

export const StyledRadioButton = styled.div`
             & label{
                margin:0;
                &>span:first-child{
                    padding:9px 5px!important;
                }
             }
             & .MuiFormGroup-root{
                   flex-direction:row;
             }
             & .MuiRadio-colorSecondary.Mui-checked{
                color:${blue[15]};
             }
`

export const StyledBtn = styled.button`
             border: 0;
             cursor: pointer;
             background-color: transparent;
             position:relative;
             &:focus{
                outline:0!important;
             }
`

export const StyledStatusButtonBlock = styled.div`
                border: 1px solid ${grey[1]};
                height: 50px;
                padding : 3px;
                border-radius : 5px;
                border-box: box-sizing;
                display : flex;
                box-sizing : border-box;
                width : fit-content!important;
`

export const StyledStatusButtons = styled.button`
                height : 100%;
                border-radius: 5px;
                height: 100%;
                border: 0;
                padding: 0 20px;
                cursor:pointer;
                &:focus{
                    outline:0!important;
                }
                &:first-child{
                    box-shadow:${props => props.status === false ? white : `0 0 10px ${green[0]}`};
                    background-color: ${props => props.status === false ? white[0] : green[0]};
                    color:${props => props.status === true ? white[0] : black[1]};

                }
                &:last-child{
                    box-shadow:${props => props.status === false ? `0 0 10px ${red[0]}` : white[0]};
                    background-color: ${props => props.status === false ? red[0] : white[0]};
                    color:${props => props.status === false ? white[0] : black[1]};

                }
`

export const StyledStatusButton = styled(StyledDefaultButton)`
                background-color:red;
                color:${white[0]};
                padding:10px 7px;
                min-width:93px;
                background-color:${props=>props.status !== "false" ? green[0] : red[0]}
`

export const StyledRegisterButton=styled.button`
             color:${props => props.status === false ? grey[0] : black[1]};
             &:hover{
               color:${props => props.status === false ? grey[0] : green[0]};
             }
             font-size:21px;
             font-weight:bold;
`
