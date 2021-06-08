import styled from "styled-components";
import {green, grey} from "../../abstracts/colors";

export const StyledLi = styled.li`
            border:1px solid red;
`

export const StyledUl = styled.ul`
            list-style-type:none;
            padding:0;
`

export const StyledTitle = styled.div`
            display: flex;
            flex-direction: row-reverse;
            justify-content:flex-end;
            & span:nth-child(2){
                font-size:18px;
                padding:${({lang}) => lang === 'en' ? '0 5px 0 0' : '0 0 0 5px'};
            }
`

export const styledTabs = (theme) => ({
    root: {
        height: '1vh',
        marginBottom: '20px',
        backgroundColor: props => props.color ,
        zIndex: '50',
        padding: '20px',
        '& .MuiTabs-fixed': {
            overflow: 'visible!important',
            overflowX: 'visible!important',
            borderBottom: `1px solid ${grey[0]}`,
        },
        '& .MuiTabs-flexContainer': {
            height: '100%'
        }, '& .MuiTabs-indicator': {
            backgroundColor: 'transparent',
            borderBottom: `1px solid ${grey[17]}`,
            borderTop: `3px solid ${green[1]}`,
            height: '44px',
            border: `1px solid ${grey[0]}`,
            top: 0,
        },
    }
})

export const StyledElementList = styled.div`
             background-color:${grey[17]};
             padding: 32px 33px;
`

export const StyledRequiredBlock = styled.div`
              display:flex;
              min-height:32px;
              align-items:center;
              max-width:23px;
              margin:auto;
`
