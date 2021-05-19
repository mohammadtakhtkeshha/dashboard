import styled from "styled-components"
import {grey} from "assets/js/library/abstracts/colors";

export const StyledMultiSelect = styled.div`
             display: flex;
             justify-content: space-between;
             height:1.95rem;
             border:1px solid ${grey[0]};
             border-radius:4px;
             padding:.3rem .75rem;
             & input{
                 width:${({hasArr}) => hasArr === 'false' ? '100%' : 'auto'};
                 color:${grey[23]};
                 min-width:90px;
                 border:0;
                 &:focus{
                     outline:0!important;
                 }
             }
`

export const StyledInputValue = styled.div`
             color: white;
             background-color: #9d9d9d;
             border-radius: 5px;
             padding: 0 3px;
             margin: 1px 3px;
             position:relative;
             & span{
                width: 10px;
                height: 10px;
                position: absolute;
                left: -4px;
                top: -4px;
                display: flex;
                background: grey;
                border-radius: 100%;
                align-items: center;
                justify-content: center;
                cursor:pointer;
                & svg{
                    font-size:18px;
                }
             }
`

export const StyledValueBlock = styled.div`
             display:flex;
             flex-wrap:wrap;
             justify-content: flex-end;
             width:auto;
`

export const StyledPaddingRelative = styled.div`
             padding: 5px 10px;
             position:relative;
             &>span {
                position:absolute;
                top:100%;
                font-size:13px;
             }
`
