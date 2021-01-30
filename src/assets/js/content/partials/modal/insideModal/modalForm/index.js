import styled from "styled-components";
import {grey, white, blue} from "components/partials/Colors";

export const StyledTourButton = styled.button`
              display:flex;
              position:absolute;
              left:73px;
              border-radius:100%;
              top:50px;
              border:0!important;
              background-color:transparent;
              width:50px;
              height:50px;
              padding:0!important;
              cursor:pointer;
              &:focus{
                outline:0!important;
              }
              & svg{
                width:100%;
                height:100%;
                color:${blue[16]};
              }
`
