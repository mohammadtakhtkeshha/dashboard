import styled from "styled-components";
import {blue,grey,white} from "components/partials/Colors";

export const StyledPowerBox = styled.div`
            background-color:${blue[8]};
            padding: .4rem .5rem .1rem;
            border-radius: 0 100% 100% 100%;
`

export const StyledBoxItem = styled.div`
            cursor:pointer;
            margin-left:6px;
            margin-right:6px;
            & button{
                border-radius:5px;
                padding: .4rem .5rem .1rem;
                cursor:pointer;
                background-color:white;
                border:0!important;
                color:${grey[10]}
                &:focus{
                    outline:0!important;
                }
            }
`
