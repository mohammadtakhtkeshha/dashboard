import styled from "styled-components";
import {white,grey} from "assets/js/library/abstracts/colors";
import React from "react";

export const StyledButtonCloseGuide = styled.button`
            color: ${grey[8]};
            border: 1px solid ${grey[8]};
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 5px;
            background-color: ${white[0]};
            width:fit-content;
            border-radius:5px;
            &:focus{
                outline:0!important;
            }
`

export const StyledButtonTourBlock= styled.div`
              display:flex;
              flex-direction:row;
              justify-content:center;
              margin-top:1rem;
              & button{
                margin: 5px;
                font-size:15px;
              }
              & button:nth-child(2){
                 margin-right:auto;               
              }
`

export const StyledTourBlock= styled.div`
              display:flex;
              flex-direction:row;
              justify-content:center;
              align-items:center;
              &>div:first-child{
                flex:auto;
                text-align:${props=>props.lang === "en" ?'left':'right'};
                flex-grid:2;
                }
                &>div:nth-child(2){
                & svg{
                    padding: 10px 10px 0 10px;
                    width:40px;
                    height:40px;
                }
              }
`


export const StyledTourTextBlock = styled.div`
            display:flex;
            flex-direction:column;
            & div:nth-child(2){
                color:${grey[8]}
            }
            
         
`

export const StyledLeftBoxTour = styled.div`
            position: absolute;
            display:flex;
            left: -147px;
            background-color: white;
            padding: 10px 15px; 
            border-radius:5px; 
            top:-15px;  
`

export const StyledTourPointer = styled.div`
                position: absolute;
                left: -28px;
                background-color: white;
                width: 29px;
                top: 20px;
                height: 3px;
                &::after{
                    content: '';
                    border-radius: 100%;
                    width: 13px;
                    height: 13px;
                    background-color: white;
                    position: absolute;
                    top: -4px;
                    left: -10px;
                }
`

export const StyledTour=styled.div`
             // border:1px solid red;
`
