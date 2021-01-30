import styled from "styled-components";
import {black, green, grey, white} from "components/partials/Colors";

export const StyledTour = styled.div`
        display:${props => props.open === true ? 'block' : 'none'};
`

const absolute = styled.div`
       position:absolute;
       top:0;
       left:0;
       z-index:100;
`

export const StyledAbsoluteOne = styled(absolute)`
        display:${props => props.currentStep === 1 ? 'block' : 'none'};
`

export const StyledAbsoluteTwo = styled(absolute)`
        display:${props => props.currentStep === 2 ? 'block' : 'none'};
`

export const StyledAbsoluteThree = styled(absolute)`
        display:${props => props.currentStep === 3 ? 'block' : 'none'};
`

export const StyledAbsoluteFour = styled(absolute)`
        display:${props => props.currentStep === 4 ? 'block' : 'none'};
`

export const StyledAbsoluteFive = styled(absolute)`
        display:${props => props.currentStep === 5 ? 'block' : 'none'};
`

export const StyledButtonTour = styled.div`
             background-color: ${white[0]};
             border: 0;
             cursor: pointer;
             padding: 10px 15px;
             line-height: 14px;
             border-radius: 5px;
             color: ${green[0]};
             width:fit-content;
             font-size:13px;
             white-space:nowrap;
             &:focus{
                 outline:0!important;
             }
`

export const StyledButtonCloseGuide = styled.button`
            color: ${grey[8]};
            border: 1px solid ${grey[8]};
            cursor: pointer;
            padding: 10px 15px;
            line-height: 14px;
            border-radius: 5px;
            background-color: ${white[0]};
            width:fit-content;
            border-radius:5px;
            &:focus{
                outline:0!important;
            }
`

export const StyledDescriptionTour = styled.div`
        position:absolute;
        top:7px;
        width:448px;
        color:black;
        border-radius:5px;
        left:${props=>props.currentOffset > props.innerWidth/2 ? '':`calc(${props.tourButtonWidth}px + 50px)`};
        right:${props=>props.currentOffset > props.innerWidth/2 ?`calc(${props.tourButtonWidth}px + 60px)`:''};
        display:flex;
        flex-direction:column;
        padding:20px;
        z-index:100;
        background-color:${white[0]};

`

export const StyledIconAndText = styled.div`
        display:flex;
        flex-direction:row;
`

export const StyledIcon= styled.div`
    margin-top:15px;
    & svg{
        width:40px;
        height:40px;
    }
`

export const StyledTourPointer = styled.div`
            position:absolute;
            right:${props=>props.currentOffset > props.innerWidth/2 ? '':'100%'};
            left:${props=>props.currentOffset > props.innerWidth/2 ? '100%':''};
            background-color:${white[0]};
            top: 13px;
            height: 2px;
            width: 22px;
            ${props=>`&::after{
                content:'';
                width:12px;
                height:12px;
                border-radius:100%;
                background-color:${white[0]};
                top: -4px;
                position: absolute;
                right:${props.currentOffset > props.innerWidth/2 ? '-10px':''};
                left:${props.currentOffset > props.innerWidth/2 ? '':'-10px'};
            }`}
`

export const StyledTextTour = styled.div`
    display:flex;
    flex-direction:column;
    margin:0 10px;
    & p:first-child{
        color:${black[1]};
        font-size:18px;
    }
    & p:nth-child(2){
        color:${grey[8]};
        font-size:16px;

    }
`

export const StyledButtonTourBlock= styled.div`
              display:flex;
              flex-direction:row;
              justify-content:center;
              margin-top:2rem;
              & button{
                margin:0 5px;
                font-size:15px;
                white-space: nowrap;
              }
              & button:nth-child(2){
                 margin-right:auto;
              }
`

export const StyledFixed = styled.div`
        position:fixed;
        background-color:green;
        opacity:.2;
        top:0;
        left:0;
        bottom:0;
        right:0;
        z-index:50;
`
