import styled from "styled-components"


export const StyledFooter = styled.div`
             position:absolute;
             left:0;
             right:0;
             bottom:0;
             padding: 12px;
             

`

export const styledGrid = () => ({
    root:{
        // marginBottom:'120px'
    }
})

export const StyledMarginBottom = styled.div`
        margin-bottom:120px;
`

export const styledGridFromReply = () => ({
    root:{
        display:props=>props.fromreply === "true" ? "block" : "none"
    }
})
