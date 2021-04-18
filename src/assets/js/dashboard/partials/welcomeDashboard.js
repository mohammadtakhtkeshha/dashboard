import styled from "styled-components";
import {grey, black, white} from "assets/js/library/abstracts/colors";
import leave from "assets/media/image/dashboard/bg-leave.svg";

export const StyledPaper = styled.div`
        display:flex;
        &:hover{
          cursor:pointer;
          & img:nth-child(2){
            width: 48px;
            height: 48px;
            }
        }
        position:relative;
        background-color:${white[0]};
        border-radius:4px;
        overflow:hidden;
        align-items:center;
        height:120px;
        &::before {
            display:flex;
            align-items:center;
            content:'';
            position:absolute;
            top:0;
            left:${lang => lang === "en" && 0};
            right:${lang => lang === "en" && 0};
            width:100%;
            height:100%;
            background: url(${leave}) no-repeat -25px -30px;
            background-size: 257px 164px;
            transform:${props => props.lang === 'en' ? 'scaleX(-1)' : ''};
        }
`

export const StyledTitle = styled.div`
     color:${black[4]};
     font-size:14px;
`

export const StyledDescription = styled.div`
     color:${grey[16]};
     font-size:14px;
     display: flex;
     flex-direction: column;
     height: 60%;
     justify-content: flex-end;
`

export const StyledFile = styled.div`
         position:relative;
         width:12%;
         margin: 15px;
         height: 83%;
         & img:first-child{
           width:100%!important;
           height:100%!important; 
           border-radius:12px!important;
           overflow:hidden;
           position:absolute;
           top:0;
           left:0;
           right:0;
         }
         & img:nth-child(2){
            cursor:pointer;
            width: 41px;
            height: 41px;
            z-index: 1;
            display: flex;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
            transition:all .2s;
         }
`

export const videoStyles = () => ({
    'video': {
        // border: '1px solid red',
    }

})
