import styled from "styled-components"
import {StyledNotScrollbar} from "assets/js/library/base/all";
import {blue, green, white} from "assets/js/library/abstracts/colors";

const White = styled.div`
      color:${white[0]};
`

export const StyledFlex=styled.div`
            display:flex;
            flex-direction:column;
            margin:20px 45px;
            align-items: center;
`

export const StyledFlexRow=styled(White)`
            display:flex;
            flex-direction:row-reverse;
            justify-content:space-between;
            align-items:center;
            width:200px;
`

export const StyledFlexBlock=styled(White)`
            display:flex;
            flex-direction:row;
            justify-content:space-around;
            align-items:center;
            width:100%;
            height:100%;
            margin:auto;
`

export const StyledIcon=styled.div`
             width: 22px;
             height: 22px;
             border-radius: 100%;
             padding: 12px;
             background-color: white;
`

export const StyledFlexColumn=styled.div`
            display:flex;
            flex-direction:column;
`

export const StyledFlexColumnNum=styled.div`
            display:flex;
            flex-direction:column;
            width:200px;
`

export const ContentChartBlock = styled(StyledNotScrollbar)`
            background-image: linear-gradient(to right, ${blue[6]} , ${green[0]});
            display:flex;
            overflow-x:scroll;
            &:last-child::after{//bcs of overflow ignoring
              content:'';
              flex: 0 0 15px;
            }
`

export const StyledPercentLine=styled.div`
             width: 100%;
             height: 6px;
             background-color:white;
             border-radius:7px;
             overflow:hidden;
             & div{
                width: ${props=>props.length}%;
                background-color:orange;
                height:100%;
             }
`

export const PercentageNumber= styled(White)`
             margin:${props=>props.lang === 'fa' ? `0 0 0 ${props.length-8}% `:`0 0 0 ${props.length-8}%`}
`


export const StyledFlexBox =styled.div`
        display:flex;
        justify-content:space-around;
`
