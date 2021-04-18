import styled from "styled-components"

export const StyledFigure = styled.figure`
        margin:0!important;
        & .highcharts-container{
            width:100%;
            & svg {
                & .highcharts-credits{
                        display:none;
                }
            }
         }
`
