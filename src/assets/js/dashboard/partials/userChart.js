import styled from "styled-components";
import {white,blue,green} from "components/partials/Colors";
import {StyledFigure} from "assets/js/library/abstracts/hicharts"

export const StyledUserChartTitle=styled.div`
        text-align:center;
        color:${white[0]};
        padding:20px;
        background-image: ${props=>props.lang === 'en' ?` linear-gradient(to left,${blue[5]}, ${green[4]}) `:`linear-gradient(to right,${blue[5]}, ${green[4]})`};
`

export const StyledFigureUser = styled(StyledFigure)`
                #userchart{
                    margin: 35px 0;
                }
`
