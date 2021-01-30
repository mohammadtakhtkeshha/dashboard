import styled from "styled-components";
import {green,grey,orange,blue} from "components/partials/Colors";

export const StyledStatusButton = styled.button`
        background-color:${props => props.status === "Open" ? green[0] : (props.status === "Answered" ? blue[0]:(props.status === "Closed" ? grey[15] : orange[0]))};
        color:white;
        padding: 6px 10px;
        width: 60%;
        border: 0;
        border-radius: 5px;
        &:focus{
            outline:0;
        }
        cursor:pointer;
`

export const StyledTitle = styled.div`
                color:${orange[1]};
                font-weight:700;
`

export const StyledTid = styled.div`
                color:${blue[17]};
                font-size:1.2em;
                line-height:2;
`
