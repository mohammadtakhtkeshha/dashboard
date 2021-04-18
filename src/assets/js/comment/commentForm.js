import styled from "styled-components";
import {grey} from "assets/js/library/abstracts/colors";
import {StyledNotScrollbar} from "../App";

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
                ${props=>props.lang==="fa"?`border-left:1px solid ${grey[1]}`:`border-right:1px solid ${grey[1]}`}
            }
        }
`

export const StyledForm = styled(StyledNotScrollbar)`
           margin-bottom:120px;
`

export const styledGrid = () => ({
    root:{
        '& div':{
            margin: 'auto',
        }
    }
})

export const StyledTextArea = styled.div`
       margin-top:1rem;
       & .se-toolbar{
            display:none!important;
       }
        & .sun-editor-common{
            display:none!important;
       }
        & .sun-editor{
            border:0;
       }
        
        & .se-wrapper{
            border-radius:10px;
            border:1px solid ${grey[0]};
       }
`
