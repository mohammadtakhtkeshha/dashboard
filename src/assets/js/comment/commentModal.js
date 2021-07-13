import styled from "styled-components";
import {ModalBody} from "assets/js/library/components/modal";

export const StyledModal = styled.div`
        position: absolute;
        width: 70%;
        background-color: white;
        border: 2px solid #000;
        box-shadow: 1px 1px grey;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        direction:${props=>props.lang === 'en' ? 'ltr' : 'rtl'};
        border:0!important;
        &:focus{
           outline:0!important;
        }
        border-radius:15px;
        
`

export const StyledModalBody = styled(ModalBody)`
        height:400px!important;
`
