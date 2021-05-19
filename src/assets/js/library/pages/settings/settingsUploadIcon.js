import styled from "styled-components";
import {grey,black,green,white} from "assets/js/library/abstracts/colors"

export const StyledFieldSet=styled.fieldset`
             border:1px dashed ${grey[0]};
             display: flex;
             font-size:12px;
            justify-content: space-between;
            align-items: center;
             color:${black[0]};
             text-align:${({lang})=> lang === 'en' ? 'left' : 'right'};
             & img {
                width: 50px;
                height: 50px;
                border-radius: 100px;
             }
`

export const StyledInput=styled.div`
             position:relative;
             display:flex;
             align-items:center;
             & span{
                font-size:23px;
                padding:4px;
             }
              & input{
                height: 100%;
                cursor: pointer;
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100%;
                opacity: 0;
                left:0;
                &::-webkit-file-upload-button{
                  cursor: pointer;
                }
              }
               & button {
                    cursor: pointer;
                    background-color:${green[0]};
                    border-radius:10px;
                    border:0;
                    padding: 5px 39px;
                    color:${white[0]};
                    font-size: 13px!important;
                    font-weight: 500;
              }
`

export const StyledImgBlock=styled.div`
             display:flex;
             align-items:center;
             & span{
                padding:0 10px;
             }
`
