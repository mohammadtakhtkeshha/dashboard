import styled from "styled-components";
import {red, white} from "components/partials/Colors";

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
                padding: 0 25px;
`
