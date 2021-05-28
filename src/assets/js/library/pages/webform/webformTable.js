import styled from "styled-components"
import {blue, white, black} from "assets/js/library/abstracts/colors"

export const StyledActionBtnForm = styled.button`
            position:relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor:pointer;
            border: 1px solid ${blue[1]};
            width: 7rem;
            border-radius: 4px;
            padding: .5rem 1rem;
            background-color: #fff;
            color: ${blue[1]};
            & span:first-child{
                font-size:.7rem;
            }
            & span:nth-child(2){//svg
                font-size: 10px;
            }
`

export const StyledUl = styled.ul`
                list-style-type:none;
                display:${({show}) => show ? 'block' : 'none'};
                color:${black[0]};
                position:absolute;
                border-radius:4px;
                top:82%;
                left:0;
                width:100%;
                padding:0;
                box-shadow: 1px 1px 10px black;
                z-index:100;
                background-color:${white[0]};
                & li {
                    padding: 10px 10px;
                    text-align:right;
                    &:hover{
                        background-color:${blue[12]};
                    }
                }
`


