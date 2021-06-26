import styled from "styled-components";
import bgBox from "assets/svg/BG-box.svg"

export const StyledServiceBox = styled.div`
             margin:5px;
`
export const StyledImgBox = styled.div`
             height:127px;
             border-radius:20px;
             display:flex;
             position:relative;
             align-items:center;
             justify-content:center;
             flex-direction:column;
             background:url(${({status})=>status ? bgBox : ''});
             background-color:${({backgroundColor})=>backgroundColor};
             // opacity:${({soon})=>soon ? `40%`: `100%` };
             background-repeat: no-repeat;
             &>span:first-child{
                font-size:60px;
                margin-bottom:15px;
                color:white;
             }
             &>span:nth-child(2){
                color:white;
             }
`

export const StyledSoon = styled.span`
             color:black;
             position:absolute;
             font-size:100px;
             top:50%;
             transform:translateY(-50%)
`

export const styledGrid = () => ({
    root:{
        marginTop:'20px',
    }
})
