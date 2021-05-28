import styled from "styled-components";
import {white, red, green,grey} from "assets/js/library/abstracts/colors";
import {StyledAddButton} from 'assets/js/library/components/buttons';

export const StyledSettings = styled.div`
            background-color:${white[0]};
            padding:21px 18px;
            border-radius:5px;
`

export const StyledPadding = styled.div`
             padding: 5px 10px;
`

export const StyledSettingsButton = styled(StyledAddButton)`
            font-size: 13px!important;
            font-weight:500;
            padding: 13px 30px;
            border-radius: 4px!important;
            color: ${white[0]};
            background-color: ${({error}) => error === "true" ? `${red[0]}!important` : `${green[0]}!important`};
`

export const StyledButtonBlock = styled(StyledPadding)`
             direction:ltr!important;
`

export const StyledStatusButton = styled.button`
             width: 47px;
             height: 24px;
             border: 0;
             background: ${({status}) => status ?green[0]: grey[24]};
             border-radius: 13px;
             position:relative;
             cursor:pointer;
             &::after{
                content:'';
                transition: transform .5s;
                background-color:white;
                padding: 10px;
                position: absolute;
                border-radius:100%;
                top: 50%;
                transform: translate(${({status}) => status ? `100%` : `-2%`},-50%);
             }
`
export const StyledStatusSettingBlock = styled.div`
             display:flex;
             margin:4px 10px;
             align-items:center;
             & span{
                margin : 0 10px; 
             }
`

