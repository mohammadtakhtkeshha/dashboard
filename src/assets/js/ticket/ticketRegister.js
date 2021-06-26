import styled from "styled-components"


export const StyledFooter = styled.div`
             position:absolute;
             left:0;
             right:0;
             bottom:0;
             padding: 12px;
             

`

export const styledGridFromReply = () => ({
    root:{
        display:props=>props.fromreply === "true" ? "block" : "none",
    }
})

export const styledGridIfReply = () => ({
    root:{
        margin:props=>props.fromreply === "true" ? "0 10px" : "20px",
    }
})
