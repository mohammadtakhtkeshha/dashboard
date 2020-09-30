import styled from "styled-components";
import {grey,green,red,white,black} from "components/partials/Colors";

export const StyledStatusButtonBlock = styled.div`
                border: 1px solid ${grey[1]};
                height: 50px;
                padding:3px;
                border-radius : 5px;
                border-box: box-sizing;
                display : flex;
                box-sizing:border-box;

`

export const StyledStatusButton = styled.button`
                height : 100%;
                border-radius: 5px;
                height: 100%;
                border: 0;
                padding: 0 20px;
                cursor:pointer;
                &:focus{
                    outline:0!important;
                }
                &:first-child{
                    box-shadow:${props=>props.status === false ? white: `0 0 10px ${green[0]}`};
                    background-color: ${props=>props.status === false ? white : green[0]};
                    color:${props=>props.status === true ? white: black[1]};

                }
                &:last-child{
                    box-shadow:${props=>props.status === false ? `0 0 10px ${red[0]}` : white};
                    background-color: ${props=>props.status === false ? red[0] : white};
                    color:${props=>props.status === false ? white: black[1]};

                }
`

export const StyledFlexBox = styled.div`
            display:flex;
            flex-direction:column;
`

export const StyledFlexItem = styled.div`
            display:flex;
            justify-content:space-between;
            &>div{
                width:49%;
            }
`

export default {StyledStatusButton,StyledStatusButtonBlock,StyledFlexBox,StyledFlexItem};