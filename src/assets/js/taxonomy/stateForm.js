import styled from "styled-components";
import {grey, black, green} from "components/partials/Colors"

export const StyledMarginTop = styled.div`
        margin-top:30px;
`
export const styledGridParent = () => ({
    root: {
        display: props => props.length > 0 ? "block" : "none"
    }
})

export const styledGridActive = () => ({
    root: {
        marginTop:'30px'
    }
})

export const StyledRegisterButton = styled.button`
             color:${props => props.status === false ? grey[0] : black[1]};
             &:hover{
               color:${props => props.status === false ? grey[0] : green[0]};
             }
             font-size:21px;
             font-weight:bold;
`
