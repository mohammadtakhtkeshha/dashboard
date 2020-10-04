import styled from "styled-components";
import {grey,black} from "components/partials/Colors";

export const InputBlock = styled.div`
        border:1px solid red;
        position: relative;
        min-height: 120px;
        text-align: center;
        border: 2px dashed ${grey[0]};
        &:hover{
           border: 2px dashed ${grey[8]};
        }
        & svg {
            width: 50px;
            height: 50px;
            margin-top: 2rem;
            & path,& circle{
                fill : ${grey[8]}
            }
        }
        & input{
            height: 100%;
            cursor: pointer;
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            opacity: 0;
            left:0;
        }
    `

export const StyledTypography = styled.p`
            font-size : 16px;
            color:${black[2]};
`