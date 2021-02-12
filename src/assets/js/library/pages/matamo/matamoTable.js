import styled from "styled-components"
import {grey,white,green} from "components/partials/Colors"

export const StyledMatamoTable=styled.div`
                display:flex;
                margin:1rem;
                flex-direction:column;
                border-radius:15px;
                overflow:hidden;
                font-size:12px;
`

export const StyledMatamoTableRow=styled.div`
                display:flex;
                justify-content:space-between;
                background-color:${white[0]};
                padding: 10px 20px;
                margin-bottom: 2px;
                &:hover{
                    background-color:${grey[22]}
                }
                
`

export const StyledMatamoTableRowGrey=styled.div`
                display:flex;
                justify-content:space-between;
                background-color:${white[0]};
                padding: 10px 20px;
                margin-bottom: 2px;
                &:hover{
                    background-color:${grey[22]}
                }
                                    background-color:${grey[22]}

                
`

export const StyledMatamoTableHeadRow=styled(StyledMatamoTableRow)`
                    background-color:${grey[21]}
                    padding: 10px 20px;
                    font-size:11px;
`

export const StyledMatamoTableCell=styled.div`

`

export const StyledMatamoTabelFooter=styled.div`
                background-color:${green[0]};
                color: white;
                padding: 5px 10px;
                text-align:${props => props.lang === "en" ? "left" : "right"};
`

export const StyledMatamoTableHead=styled.div`
                width:100%;
                background-color:${grey[22]};

`

