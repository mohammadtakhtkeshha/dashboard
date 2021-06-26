import styled from "styled-components";
import {blue,green} from "assets/js/library/abstracts/colors";

export const StyledPaper = styled.div`
         background-image: linear-gradient(to bottom right, ${green[8]},${green[9]}, ${blue[10]});
        text-align:center;
        & h6{
            height:64px;
            margin:auto;
            & img{
                padding-top:20px;
            }
        }
`;
