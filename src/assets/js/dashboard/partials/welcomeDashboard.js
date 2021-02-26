import styled from "styled-components";
import {grey,black,white} from "components/partials/Colors";
import  leave from "../../../media/image/dashboard/bg-leave.svg";

export const StyledPaper = styled.div`
        display:flex;
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
            left:0;
            width:100%;
            height:100%;
            background: url(${leave}) no-repeat -25px -30px;
            background-size: 257px 164px;
            transform:${props=>props.lang === 'en' ? 'scaleX(-1)' : ''};
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
& ul{
          // border:1px solid red;
       }
        & li{
          // border:1px solid red;
       }
       
       & span{
          // border:1px solid red;
       }
     & div{
       width:122px!important;
       height:70px!important; 
       border-radius:12px!important;
       overflow:hidden;
       margin:0 20px;
        // border:1px solid red;
       & div{
          // border:1px solid red;
       }
       & span{
          // border:1px solid red;
       }
       & ul{
          // border:1px solid red;
       }
        & li{
          // border:1px solid red;
       }
     }
`

export const videoStyles = () => ({
    'video':{
        // border: '1px solid red',
    }

})
