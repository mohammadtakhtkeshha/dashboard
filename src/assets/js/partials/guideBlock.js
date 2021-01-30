import styled from "styled-components";
import {grey, black, orange, blue,white} from "components/partials/Colors"

export const StyledFlexRow = styled.div`
             display:flex;
             flex-direction:column;
`

export const StyledFlexColumn = styled.div`
             display:flex;
             flex-direction:${props => props.lang === 'en' ? 'row' : 'row-reverse'};
`

export const StyledCloseGuideButton = styled.span`
             background-color:white;
             padding:10px;
             border:1px solid ${grey[8]}!important;
             color:${grey[8]};
             border-radius:5px;
             padding: 8px 28px;
`

const prevAndNext = styled.span`
             padding:10px;
             border:0!important;
             color: white;
             padding: 8px 15px;
             border-radius: 5px;
             cursor:pointer;
             margin:0!important;
`

export const StyledNextButton = styled(prevAndNext)`
             background-color:${blue[16]};
             & span {
                background-color:${white[0]};
                color:${blue[0]};
                padding: 3px;
                border-radius: 5px;
                display: inline-block;
                width: 24px;
                font-size: 14px;
             } 
             
`

export const StyledPrevButton = styled(prevAndNext)`
             background-color:${orange[0]};
`

export const StyledTitle = styled.div`
             padding:10px;
             color: ${black[1]};
             font-size: 18px;
             padding-bottom: 10px;
             font-weight: bold;
`

export const StyledDescription = styled.div`
             color:${grey[8]};
             font-size:16px;
`

export const IconBlock = styled.div`
            width: 55px;
            height: 55px;
            line-height: 55px;
            font-size: 20px;
            text-align: center;
            background: #606CEC;
            color: #fff;
            border-radius: 15px;
            padding: 0px 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: ${props => props.lang === 'en' ? '15px 15px 0 0' : '15px 0 0 15px'};
            
`

export const TextBlock = styled.div`
             text-align:${props => props.lang === 'en' ? 'left' : 'right'};
            
`


