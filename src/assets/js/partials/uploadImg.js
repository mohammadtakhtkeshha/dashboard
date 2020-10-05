import styled from "styled-components";
import {grey,black,white,green} from "components/partials/Colors";

export const InputBlock = styled.div`
        position: relative;
        min-height: 120px;
        text-align: center;
        & input{
            height: 100%;
            cursor: pointer;
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            opacity: 0;
            left:0;
        }
    `

export const StyledUploadHereBlock = styled.div`
          border: 2px dashed ${grey[0]};
          padding:2rem;
            &:hover{
               border: 2px dashed ${grey[8]};
            }
          & svg {
                width: 50px;
                height: 50px;
                & path,& circle{
                    fill : ${grey[8]}
                }
            }
            & button{
                color:${white};
                padding: 10px 45px;
                font-size:16px;
                cursor:pointer;
                border-radius: 5px;
                border: 0!important;
                background-color:${green[0]};
                &:hover{
                    background-color : ${green[1]};
                }
            }
            & p{
                font-size : 16px;
                color:${black[2]};
            }
`

export const StyledAfterUploadHere = styled.div`
                background-color:${white};
                position:relative;
                border: 2px dashed ${grey[0]};
                z-index: 50;
                cursor:pointer;
                &:hover{
                   border: 2px dashed ${grey[8]};
                }
                display: flex;
                border-radius:5px;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 13rem;
                height: 13rem;
                font-size: 15px;
                margin: 15px;
                & svg {
                width: 50px;
                height: 50px;
                & path,& circle{
                    fill : ${grey[8]}
                }
                & input{
                    position:absolute;
                }
            }
`

export const StyledAfterUploadBlock = styled.div`
            display:flex;
            margin-top: 2rem;
            background-color:${grey[9]};
            &>svg{
                width: 30px;
                height: 58px;
            }
            &>p{
                position : absolute;
                top : -40px;
                font-size : 14px;
            }
`

export const UploadedImgHoverBlock = styled.div`
            display:none;
            border-radius:5px;
            background-color:red;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            background-color: ${black[3]};
            bottom: 0;
            opacity: 0.7;
            & svg{
                cursor:pointer;
                position:absolute;
                top:5px;
                right:5px;
                color: white;
                font-size: 34px;
                opacity: 30;
            }
`

export const StyledUploadedImgBlock = styled.div`
            position:relative;
            width:13rem;
            height:13rem;
            margin: 15px;
            border-radius:5px;
            overflow: hidden;
            &:hover{
                ${UploadedImgHoverBlock}{
                    display:block;
                }
            }
            & img{
                width:100%;
                height:100%;
            }
            & svg{
                position:absolute;
            }
`