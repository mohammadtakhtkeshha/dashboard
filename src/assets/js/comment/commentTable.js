import styled from "styled-components";
import {grey,green} from "assets/js/library/abstracts/colors";
import {StyledDefaultButton} from "assets/js/App";

export const StyledBackgroundColor= styled.div`
             background-color:${grey[17]};
`
export const StyledConfirmButton= styled(StyledDefaultButton)`
             display:${props => props.commentStatus === "published" ? "none!important" : "flex!important"};
             background-color:${green[0]};
             color: white;
             border: 0;
             align-items: center;
             justify-content: center;
             padding: 7px 15px;
             margin:0 2px;
`
