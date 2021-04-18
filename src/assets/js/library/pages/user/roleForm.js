import styled from "styled-components"
import {grey} from "assets/js/library/abstracts/colors"

export const StyledChoosePermission = styled.div`
            border-top:1px solid ${grey[0]};
            width:100%;
            box-sizing:border-box;
            font-size:.8rem;
            color:${grey[16]};
            display:${props=>props.show || 'none'};
`
export const StyledPermissionsList = styled.div`
            &:not(:first-child){
             border-top:1px solid ${grey[0]};
            }
            padding:10px;
            width:100%;
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            box-sizing:border-box;
             &>div {
                display:flex;
                flex-direction:row;
                & > div {
                    margin: 0 10px;
                }
            }
            &>span {
                display:flex;
                flex-direction:row;
            }
`
