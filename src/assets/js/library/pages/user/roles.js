import styled from "styled-components";
import {black, blue,orange, grey, red, white} from "assets/js/library/abstracts/colors";
import {StyledDefaultButton} from "assets/js/library/components/buttons"

export const StyledPermissionButtonsBlock = styled.div`
             border:1px solid ${grey[0]};
             border-radius:4px;
             display:flex;
             padding:1px;
             width:fit-content;
             margin:10px;
`

export const StyledPermissionBlock = styled.div`
             border:1px solid ${grey[0]};
             overflow:hidden;
             display:flex;
             border-radius:4px;
             flex-direction:column;
             padding:1px;
             justify-content:space-between;
             align-items:center;
             width:100%;
             margin:13px 0!important;
             box-sizing: border-box;
`

const StyledButton=styled(StyledDefaultButton)`
        padding:15px;
        margin:5px;
        width:120px;
        transition:all .5s;
        font-size:16px;

`
export const StyledCompleteButton = styled(StyledButton)`
             box-shadow:${props => props.status === true ?`0 0 10px rgb(96 108 236 / 70%)`: white[0] };
             background-color: ${props => props.status === true ?  blue[16] : white[0]};
             color:${props => props.status === true ?  white[0] : black[1]};
             &:active{
                background-color: ${props => props.status === true ?  blue[19] : white[0]};
             }
             &:hover{
                background-color: ${props => props.status === true ?  blue[20] : white[0]};
             }
`

export const StyledStrictButton = styled(StyledButton)`
             box-shadow:${props => props.status === true ? `0 0 10px rgb(236 152 96 / 70%)` : white[0]};
             background-color: ${props => props.status === true ?  orange[2] : white[0]};
             color:${props => props.status === true ?  white[0] : black[1]};
             &:active{
                background-color: ${props => props.status === true ?  orange[4] : white[0]};
             }
             &:hover{
                background-color: ${props => props.status === true ?  orange[3] : white[0]};
             }
`
export const StyledDisactiveButton = styled(StyledButton)`
             box-shadow:${props => props.status === true ? `0 0 10px rgb(236 96 96 / 70%)` : white[0]};
             background-color: ${props => props.status === true ?  red[3] : white[0]};
             color:${props => props.status === true ?  white[0] : black[1]};
             &:active{
                background-color: ${props => props.status === true ?  red[5] : white[0]};
             }
             &:hover{
                background-color: ${props => props.status === true ?  red[4] : white[0]};
             }
`

export const StyledInsideModal = styled.div`
            margin-bottom: 120px;
            margin-top: 22px;
`
export const StyledPermissionName = styled.div`
            margin:10px;
            font-weight:bold;
            font-size:14px;
            color:${black[1]};
`
export const StyledFirstRowPermission = styled.div`
            display:flex;
            flex-direction:row;
            align-items:center;
            width:100%;
            justify-content:space-between;
           
`
