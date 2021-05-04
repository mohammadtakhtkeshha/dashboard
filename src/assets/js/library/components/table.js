import styled from "styled-components";
import {blue, green, grey} from "assets/js/library/abstracts/colors";

export const StyledTablePaper = styled.div`
            &>h4{//title
               font-size: 19px;
               font-weight: 200;
               text-align:center;
               padding:.6rem;
               color:white;
               background-image: ${props => props.lang === 'en' ? ` linear-gradient(to left,${blue[5]}, ${green[4]}) ` : `linear-gradient(to right,${blue[5]}, ${green[4]})`};
            }   
`

export const StyledTableBody = styled.div`
            background-color:#f3f4f6; 
`

export const StyledTableBodyRow = styled.div`
             display:flex;
             border-radius:4px;
             margin:20px;
             cursor:pointer;
             justify-content:space-between;
             background-color:#ffffff;
             font-size:13px;
             padding:10px 10px;
             display: flex;
             align-items: center;
             transition:box-shadow .3s;
             &:hover{
                 box-shadow:0 2px 8px #d3d3d5;
             }
`

export const StyledTableParent = styled.div`
            background-color:${grey[17]};
            border-radius: 4px;
            margin: 1.5rem 0;
            // overflow:hidden;
            display:${props => props.length === 0 ? 'none' : 'block'};
`

export const StyledTableHeadRow = styled.div`
                display:flex;
                align-items:center;
                flex-direction:row;
                padding: 1rem 2rem;
                justify-content:space-between;
                color:white;
                background-image: ${props => props.lang === 'en' ? ` linear-gradient(to left,${blue[6]}, ${green[0]}) ` : `linear-gradient(to right,${blue[6]}, ${green[0]})`};
               
`

export const StyledTableMultiCell = styled.div`
                display:flex;
                width:${props=>props.width};
                align-items:center;
`

export const StyledCheckboxImgInTable = styled.div`
              display:flex;
              min-height:32px;
              align-items:center;
              min-width:${props=>props.minWidth}px;
`

export const StyledTableHeadTr = styled.div`
           display:flex;
           align-items:center;
           margin-bottom:11px;
           flex-direction:row;
           padding: 1rem 2rem;
           justify-content:space-between;
           color:white;
           border-radius: 4px 4px 0 0;
           background-image: ${props => props.lang === 'en' ? ` linear-gradient(to left,${blue[6]}, ${green[0]}) ` : `linear-gradient(to right,${blue[6]}, ${green[0]})`};
`

export const StyledTr = styled.div`
             display:flex;
             border-radius:4px;
             margin:11px 22px;
             cursor:pointer;
             justify-content:space-between;
             background-color:#ffffff;
             font-size:13px;
             padding:10px 10px;
             display: flex;
             align-items: center;
             transition:box-shadow .3s;
             &:hover{
                 box-shadow:0 2px 8px #d3d3d5;
             }
              &:last-child{
                margin-bottom:22px;
             }
`

export const StyledTable = styled.div`
                width:100%;
                display:flex;
                flex-direction:column;
                border-radius: 4px;
                // background-color:#f3f4f6;
                background-color:${grey[17]};
                box-shadow: rgb(192 192 199 / 65%) 0px 6px 20px 0px;
                margin-bottom:10px;
                overflow:hidden;
`

export const StyledTableCell = styled.div`
                text-align:${props=>props.align};
                min-width:${props=>props.minWidth}px;
                width:${props=>props.width}%;
                // border:1px solid red;
                overflow:hidden;
`

export const StyledTableImg = styled.span`
                width:50px;
                height:50px;
                border-radius:100%;
                overflow:hidden;
                 & img{
                        width:100%;
                        height:100%;
                        object-fit:cover;
                    }
`
