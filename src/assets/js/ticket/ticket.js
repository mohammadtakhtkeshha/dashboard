import styled from "styled-components"
import {grey} from "components/partials/Colors";

export const StyledUrlBlock = styled.div`
        display:flex;
        align-items:center;
        a{
            color:${grey[20]};
        }
        img{
            width:24px;
            cursor:pointer;
            height:19px;
            margin:0 11px;
        }
`
