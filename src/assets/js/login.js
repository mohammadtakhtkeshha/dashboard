import loginImg from "../media/image/login.png";
import {primary, white,danger,darkBlue,light} from "../../components/partials/Colors";
import styled from "styled-components"

export const LoginBlock = styled.div`
                width: 100%;
                height: 100vh;
                background: url(${loginImg});
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
                position: relative;
                justify-content: center;
                width: 430px;
                box-sizing: border-box;
                border-radius:4px;
                background-color:${white};
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

export const LoginError=styled.p`
             background-color:${danger.light};
             padding:.25rem 1.25rem;
             border-radius: 0.25rem;
             color: ${danger.dark};
             font-size: 14px;
             line-height:2;
             margin-bottom:10px;           
`

export const InputBlock=styled.div`
                       position: relative;
                       margin-bottom:1.5rem;
                        & div{
                            position: relative;
                            top: -11px;
                            text-align: right;
                            color: red;
                        }
`

export const RememberBlock=styled.div`
                       display:flex;
                       justify-content:space-between;
                       div:first-child{
                        display: flex;
                        & .MuiButtonBase-root{
                            padding-right: 0!important;
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
                            color: ${primary};
                        }
                    }
                    div:nth-child(2){
                        padding: 6px;
                        & a{
                            text-decoration: none;
                            display: inline-block;
                            color: ${primary};
                            font-size: 14px;
                            font-weight: 400;
                            &:hover{
                                color: ${darkBlue};
                            }
                        }
                    }
`

export const LoginButton = styled.div`
            padding-top: 1rem;
             & button{
                width: 100%!important;
               &:hover:{
                    background-color:${primary}
               }
            }       
`

export const RegisterBlock=styled.div`
               text-align: center;
                    & p {
                        color: colors.grey.light;
                        margin-bottom: 1rem;
                    }
                    & a {
                        box-shadow: 0 0 0 0;
                        font-size: 13px;
                        border: 1px solid ${light};
                        text-decoration: none;
                        color: colors.black[0];
                        padding: 5px 10px;
                        &:hover {
                            background-color: ${light};
                        }
                    }
`





