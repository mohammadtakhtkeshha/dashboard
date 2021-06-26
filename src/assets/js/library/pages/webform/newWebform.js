import {StyledStatusButtonBlock,StyledStatusButtons} from "assets/js/library/components/buttons";
import styled from "styled-components";
import {grey} from "assets/js/library/abstracts/colors";

export const styledGrid = () => ({
    root: {
        padding: '0 10px',
        boxSizing:'border-box'
    }
})

export const styledGridFormId = () => ({
    root: {
        display: props => props.display ? 'block' : 'none',
    }
})

export const stylesGridOptions = () => ({
    root: {
        display:props => props.display !== undefined ? 'block' : 'none'
    }
})

export const StyledStatusButtonBox = styled(StyledStatusButtonBlock)`
            height: 2.8rem!important;
            padding:.3rem .3rem!important;
            width:100%!important;
`
export const StyledStatusButton = styled(StyledStatusButtons)`
            width:50%!important;
`

export const StyledElementTypeItem = styled.span`
`
export const StyledElementTypeLi = styled.li`
              display:flex;
              align-items:center;
              padding:20px;
              &:first-child{
                margin-top:10px;
                background-color:${grey[9]};
              }
              &:not(:last-child){
                border-bottom:1px solid ${grey[1]};
              }
              & span:first-child{
                flex:2;
              }
              & span:nth-child(2){
                flex:10;
              }
               & span:nth-child(3){
                flex:3;
                text-align:${({lang})=>lang === 'en' ? 'right' : 'left'}
                @media only screen and (max-width: 485px){
                    & {
                      flex:5;
                    }
                }
              }
              
`
