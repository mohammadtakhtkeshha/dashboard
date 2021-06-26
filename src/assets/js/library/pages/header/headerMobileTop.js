import styled from 'styled-components';
import {blue,green} from "assets/js/library/abstracts/colors";
import {StyledPowerBox} from "assets/js/header/leftWebHeader";
import {StyledBoxItem} from "assets/js/header/leftWebHeader";

export const StyledMobileHeader= styled.div`
             position:fixed;
             top:0;
             right:0;
             left:0;
             height:50px;
             background-image: ${props => props.lang ==='en'?`linear-gradient(to left,${blue[7]}, ${green[5]})`: `linear-gradient(to right,${blue[7]}, ${green[5]})`};
             display:flex;
             align-items:center;
             justify-content:space-between;
             padding:5px 13px;
             z-index:100;
`

export const StyledLeftMobile= styled(StyledPowerBox)`
             width:34px;
             padding:.3rem .2rem;
             display:flex;
             justify-content:center;
             width:25px;
             & button{
                 display:flex;
                 & svg{
                    font-size:1.2rem;
                 }
             }
`

export const StyledRightMobile= styled.div`
             display:flex;
`

export const StyledIconBlock= styled(StyledBoxItem)`
             & button{
                display:flex;
                padding:.3rem;
             }
`


