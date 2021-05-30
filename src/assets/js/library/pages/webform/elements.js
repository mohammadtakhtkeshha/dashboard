import styled from "styled-components";

export const StyledLi = styled.li`
        border:1px solid red;
        direction:rtl;
        // &:active{
        //     background-color:blue;
        // }
         &:hover{
            // background-color:red;
        }
        &:focus{
            background-color:blue;
        }
        &:drop{
            background-color:blue;
        }
        &:dragover{
            background-color:red;
        }
`
