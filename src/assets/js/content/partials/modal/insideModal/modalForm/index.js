import styled from "styled-components";
import {green} from "assets/js/library/abstracts/colors";

export const StyledTourButton = styled.button`
              display:${props=>props.show==='true' ? 'flex':'none'};
              position:absolute;
              left:1rem;
              top:1rem;
              border-radius:100%;
              border:0!important;
              background-color:transparent;
              width:50px;
              height:50px;
              padding:0!important;
              cursor:pointer;
              z-index:10;
              &:focus{
                outline:0!important;
              }
              & svg{
                width:100%;
                height:100%;
                color:${green[0]};
              }
`
