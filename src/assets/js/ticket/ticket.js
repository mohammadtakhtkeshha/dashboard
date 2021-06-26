import styled from "styled-components"
import {grey} from "assets/js/library/abstracts/colors";

export const StyledUrlBlock = styled.div`
        display:flex;
        align-items:center;
        cursor:pointer;
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
