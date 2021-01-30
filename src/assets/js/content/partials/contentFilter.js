import styled from "styled-components";

export const StyledFilterBlock = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    &>div{
        display:flex;
        justify-content:space-between;
        &>div{
        // border:1px solid red;
            width:31%;
            & input{
               height: 30px;
            }
        }
   }
`

export const StyledInsideGrid = styled.div`
    padding :${props=>props.lang === 'en'?'0 10px 0 0':'0 0 0 10px'};
`

export default {StyledFilterBlock,StyledInsideGrid}
