import styled from "styled-components";

export const styledGrid = styled.div`
             // border:1px solid red;
             width:100%;
`

export const StyledDragSvg = styled.span`
             cursor: move;
             z-index:10000;
`

export const StyledFlexContainer = styled.div`
             // border:1px solid red;
             display:flex;
`

export const StyledFlexItems = styled.div`
             border:1px solid blue;
`

export const StyledTabeBodyRowCustomized = styled.div`
             display:flex;
             direction:${props => props.lang === 'en' ? 'ltr':'rtl'};
             border-radius:4px;
             margin:20px;
             cursor:pointer;
             background-color:#ffffff;
             font-size:13px;
             padding:10px 10px;
             display: flex;
             align-items: center;
             &:hover{
                 box-shadow:0 14px 11px #d3d3d5;
             }
             &>div{
                width:100%;
             }
`

export const StyledVisibilityIcon = styled.div`
                width:22px;
                height:22px;
                // margin-right:auto;
                // margin-left: 25px;
                margin:${props=>props.lang === "en" ? "0 25px 0 auto":"0 auto 0 25px"};
                & img {
                    width:100%;
                    height:100%;
                }
`

