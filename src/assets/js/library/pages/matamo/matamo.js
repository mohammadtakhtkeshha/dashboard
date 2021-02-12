import styled from "styled-components";
import {StyledTableCell} from "assets/js/App"

export const StyledIconMatamo = styled.img`
                width:19px;
                height:19px;
                margin:0 5px;
`

export const StyledFlexColumn = styled.div`
                display:flex;
                flex-direction:column;

`

export const StyledDate = styled.div`
                white-space:nowrap;

`

export const StyledIconAndLabel=styled.div`
                width:100%;
                display: flex;
                align-items: center;
                & img{
                    width:20px;
                    height:20px;
                }
                & span{
                    padding: 0 10px;
                }
`


export const StyledBoxMargin = styled.div`
                margin:10px;
`

export const StyledMatamoLeftHead = styled.div`
                display:flex;
                & span{
                    text-align:center;
                }
`



export const StyledTableCellActivity = styled(StyledTableCell)`
               display:flex;
               align-items:center;
               flex-wrap:wrap;
`
export const StyledBoxRefer=styled.div`
                width:17%;
                display:flex;
                align-items:center;
                & img{
                    width:16px;
                    height:16px;
                }
`

export const StyledTableCellRealtime=styled.div`
                width:83%;
                display:flex;
                align-items:center;
`


