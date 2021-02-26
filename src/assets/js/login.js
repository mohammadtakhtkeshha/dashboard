import loginImg from "../media/image/login.png";
import {green, white, danger, darkBlue, light} from "../../components/partials/Colors";
import styled from "styled-components"
import {StyledInput} from "./App";

export const LoginBlock = styled.div`
                width: 100%;
                height: 100vh;
                // background: url(${loginImg});
                background-image:radial-gradient(circle,#f0f5f2, #d4dce2);
                justify-content: center;
                display: flex;
                align-items: center; 
`

export const StyledGridLogin = styled.div`
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 50px auto;
            width: 90%;
            &>div{
                box-shadow: 0 2px 25px rgb(0 0 0 / 6%);
                position: relative;
                justify-content: center;
                width: 430px;
                box-sizing: border-box;
                border-radius:4px;
                background-color:${white[0]};
                padding:3rem;
                @media (max-width: 414px) {
                    padding-right: 1.5rem;
                    padding-left: 1.5rem;
                }
                @media (max-width: 767px) {
                    width: 90%;
                    margin: 30px auto;
                }  
                &>hr{
                    margin: 2rem 0;
                    border: 0;
                    border-top: 1px solid rgba(0,0,0,.1);
                } 
                &>div{//login part
                   text-align:center;
                   &:first-child{//logo img
                      position: absolute;
                      top: 0;
                      background-color: white;
                      border-radius: 100%;
                      width: 100px;
                      height: 100px;
                      left: 50%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      transform: translate(-50%,-50%); 
                   }
                   &:nth-child(2){//input and title block
                        & h5{
                            font-size: 17px;
                            font-weight: bold;
                            margin-bottom: 2rem;
                            margin-top: 2rem;
                        }
                   }
                }
            }   
`

export const LoginError = styled.p`
             background-color:${danger.light};
             padding:.25rem 1.25rem;
             border-radius: 0.25rem;
             color: ${danger.dark};
             font-size: 13px;
             line-height:2;
             margin-bottom:10px;           
`

export const InputBlock = styled.div`
                       position: relative;
                       margin-bottom:1.5rem;
                        // & div{
                        //     position: relative;
                        //     top: -11px;
                        //     text-align: right;
                        //     color: red;
                        // }
`

export const StyledPasswordEye = styled.img`
                       position: absolute;
                       width:20px;
                       height:20px;
                       left:10px;
                       top:0;
                       bottom:0;
                       margin:auto;
                       cursor:pointer;
`

export const RememberBlock = styled.div`
                       display:flex;
                       justify-content:space-between;
                       div:first-child{
                        display: flex;
                        & .MuiButtonBase-root{
                            & .MuiIconButton-label{
                                & svg{
                                    width: 21px;
                                    height: 21px;
                                }
                            }
                        }
                        & p{
                            padding-top: 9px;
                        }
                        & .MuiCheckbox-root{
                            color: #adb5bd;
                        }
                        & .MuiCheckbox-colorSecondary.Mui-checked{
                            color: ${green[0]};
                        }
                    }
                    div:nth-child(2){
                        padding: 6px;
                        & a{
                            text-decoration: none;
                            display: inline-block;
                            color: ${green[0]};
                            font-size: 14px;
                            font-weight: 400;
                            transition:all .3s;
                            &:hover{
                                color: ${green[9]};
                            }
                        }
                    }
`

export const RememberBlockTest = styled.div`
              display:flex;
                       justify-content:space-between;
                       div:first-child{
                        display: flex;
                        & .MuiButtonBase-root{
                            // padding-right: 0!important;
                            // & .MuiIconButton-label{
                                // & svg{
                                    // width: 21px;
                                    // height: 21px;
                                // }
                            // }
                        }
                        & p{
                            padding-top: 9px;
                        }
                        & .MuiCheckbox-root{
                            color: #adb5bd;
                        }
                        & .MuiCheckbox-colorSecondary.Mui-checked{
                            color: ${green[0]};
                        }
                    }
                    div:nth-child(2){
                        padding: 6px;
                        & a{
                            text-decoration: none;
                            display: inline-block;
                            color: ${green[0]};
                            font-size: 14px;
                            font-weight: 400;
                            &:hover{
                                color: ${green[9]};
                            }
                        }
                    }
`

export const LoginButton = styled.div`
            padding-top: 1rem;
             & button{
                width: 100%!important;
               &:hover:{
                    background-color:${green[0]}
               }
            } 
                
`

export const StyledRegisterLoginButton = styled.button`
            color: ${white[0]};
            border: 0;
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 4px;
            background-color: ${green[0]};
            width:fit-content;
            // --------------------------------------------
             position: relative;
              display: inline-block;
              padding: 15px 70px;
              color: white;
              border:1px solid ${green[0]};
              font-family: arial;
              background-image: linear-gradient(white, white);
              background-position: 50% 50%;
              background-repeat: no-repeat;
              background-size: 0% 100%;
              transition: background-size .5s, color .5s;
            // --------------------------------------------
            &:focus{
                outline:0!important;
            }
            &:hover{
               background-size: 100% 100%;
               color: ${green[0]};
            }
`








