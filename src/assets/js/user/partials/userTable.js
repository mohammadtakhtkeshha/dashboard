import styled from "styled-components";
import {grey} from "components/partials/Colors";

export const StyledDetailBlock =  styled.div`
               position:absolute;
               top:100%;
               left:50%;
               transform:translate(-50%,0);
               background-color:#fafafa;
               z-index:2;
               border:2px solid ${grey[6]};
               border-radius:5px;
               // border: 2px solid #dddddd;
               border-radius: 5px;
               box-shadow: 10px 10px 10px #dddddd;
`

export const StyledMoreIconBlock = styled.div`
            & svg{
                z-index:1;
            }
`

export const DetailTable = styled.div`
            display:flex;
            flex-direction:column;
            width:fit-content;
`

export const DetailTableRow = styled.div`
            display:flex;
            border-bottom:1px solid ${grey[7]};
`

export const DetailTableCell = styled.div`
            display:flex;
            white-space:nowrap;
            width:100%;
            padding: 8px 9px;
`

