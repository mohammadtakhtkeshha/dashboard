import styled from "styled-components";
import {black, grey} from "../../../../components/partials/Colors";

export const StyledRelative = styled.div`
            position:relative;
`

export const StyledNotScrollbar = styled.div`
        &::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        & {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
`

export const Center = styled.div`
        text-align:center;
`

export const StyledSvg = styled.div`
            background:${grey[7]};
            fill:${black[1]};
            border-radius:100%;
            cursor:pointer;
            & svg{
                width: 34px;
                height: 21px;
                padding: 9px 4px 3px;
            }
`

export const StyledDirection = styled.div`
               direction:${props => props.lang === 'en' ? 'ltr' : 'rtl'};
`

export const MarginTop1 = styled.div`
       margin-top : 1rem;
`

export const StyledValidError = styled.p`
            color:red;
            text-align : ${props => props.lang === 'en' ? 'left' : 'right'}
`


export const StyledHead = styled.div`
        display: flex;
        align-items: center;
        margin-bottom: 1rem ;
        &>button:nth-child(2){
           margin:${props => props.lang === 'fa' ? '0 auto 0 10px' : '0 10px 0 auto'};
        };
`

