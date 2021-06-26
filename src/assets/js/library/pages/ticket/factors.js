import styled from "styled-components"
import {red,green,white} from "assets/js/library/abstracts/colors";

export const StyledStatusBtn = styled.button`
        border: 0;
        padding: 5px 7px;
        min-width: 57px;
        cursor: pointer;
        border-radius: 3px;
        color:${white[0]};
        background-color:${props=>props.status !== "false" ? green[0] : red[0]}
        &:focus{
            outline:0;
        }
`
