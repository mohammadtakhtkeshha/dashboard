import styled from "styled-components";

export const StyledPaper = styled.div`
        display:flex;
        flex-direction:column;
         & h3{
            font-size: 23px;
            line-height: 32px;
            font-weight: 700;
            color: white[0];
        }
        & li:nth-of-type(1): {
            color: black;
        }
        & li:nth-of-type(3): {
            color: #5867dd;
        }
`;