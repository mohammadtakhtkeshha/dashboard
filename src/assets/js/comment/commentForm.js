import styled from "styled-components";
import {green, grey, red, white} from "assets/js/library/abstracts/colors";
import {StyledDefaultButton, StyledStatusButtons} from "../library/components/buttons";

export const StyledHeader = styled.div`
        padding:15px;
        text-align:center;
        border-bottom:1px solid ${grey[1]};
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
`

export const StyledFooter = styled.div`
        border-top:1px solid ${grey[1]};
        position:absolute;
        left:0;
        right:0;
        bottom:0;
        z-index: 100;
        background-color: white;
        & button{
            border: 0;
            background-color: transparent;
            width: 50%;
            cursor:pointer;
            padding:15px;
            z-index:1000;
            &:first-child{
                ${props => props.lang === "fa" ? `border-left:1px solid ${grey[1]}` : `border-right:1px solid ${grey[1]}`}
            }
        }
`

export const styledGrid = () => ({
    root: {
        '& div': {
            margin: 'auto',
        }
    }
})

export const StyledTextArea = styled.textarea`
             border:1px solid ${grey[0]};
             border-radius:4px;
             width:100%;
             padding:10px;
             box-sizing:border-box;
             &:focus-visible{
                outline:0!important;
                outline-offset:0!important;
             }
`

export const StyledButtonStatus = styled(StyledDefaultButton)`
             background-color:${({status})=> status ? green[0] : red[0]};
             color:${white[0]};
             height:44px;
             width:100%;
`
export const styledGridStatus = () => ({
    root: {
        padding:props => props.lang === 'en' ? '0 0 0 10px' : '0 10px 0 0 ' ,
        boxSizing:'border-box'
    }
})
