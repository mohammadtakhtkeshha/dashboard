import styled from "styled-components";
import {blue,green} from "components/partials/Colors";

export const StyledPaper = styled.div`
        background-image: linear-gradient(to right,${blue[9]}, ${green[6]});
        height:100vh;
        & h6{
            height:64px;
            & img{
                text-align:center;
                margin:auto;
                padding-top:20px;
            }
        }
        
`;