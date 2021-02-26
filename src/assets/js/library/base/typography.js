import styled from "styled-components";
import {red} from "components/partials/Colors";

export const StyledHeadTypography = styled.div`
       font-size: 14px;
       font-weight: 600;
       padding:16px;
`

export const StyledLabel = styled.div`
        font-size:.75rem;
        margin-bottom:.75rem;
        display:inline-block;
`

export const StyledTypographyError = styled.p`
        color:${red[1]};
        font-size:13px;
        // margin:0 0 14px 0;
        text-align : ${props => props.lang === "en" ? "left" : "right"}
`

export const StyledAlignTypography = styled.p`
              text-align : ${props => props.lang === 'en' ? 'left' : 'right'};
              font-size : 13px;
              margin-bottom:1rem;
`


