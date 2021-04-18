import styled from "styled-components";
import {green,white,red,grey,blue} from "assets/js/library/abstracts/colors";
import leave from "../../../media/image/dashboard/bg-leave.svg";

export const StyledTitle = styled.div`
             background-color:${green[6]};
             border-radius: 4px;
             padding: 12px;
             // margin: 20px;
             position:relative;
`

export const StyledIcon = styled.div`
             position:absolute;
             top:10px;
             left:${props=>props.lang === 'fa' ? '10px':''};
             right:${props=>props.lang === 'fa' ? '':'10px'};
             cursor:pointer;
             & svg{
                fill: ${white[0]};
                background-color: ${red[0]};
                padding: 5px;
                width: 9px;
                border-radius: 0 100% 100%;
                height: 9px;
                box-shadow: 2px 2px 6px ${grey[15]};
             }
`

export const StyledTitleDescription = styled.div`
            font-size: 14px;
            color: ${white[1]};
            display:flex;
            flex-direction:row;
            align-items:center;
`

export const StyledDescriptionIcon = styled.div`
             padding:7px;
             width:1px;
             height:1px;
             background-color:${blue[14]};
             border-radius: 0 100% 100%;
             margin:${props=>props.lang === 'en' ? '0 10px 0 0':'0 0 0 10px'};
             box-shadow: 2px 2px 6px ${grey[15]};
`

 export const StyledPaper = styled.div`
        display:block;
        position:relative;
        background-color:${white[0]};
        border-radius:4px;
        overflow:hidden;
`

