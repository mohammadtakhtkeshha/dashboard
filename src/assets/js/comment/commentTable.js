import styled from "styled-components";
import {grey,green} from "components/partials/Colors";
import {StyledDefaultButton} from "assets/js/App";

export const StyledBackgroundColor= styled.div`
             background-color:${grey[17]};
`
export const StyledConfirmButton= styled(StyledDefaultButton)`
             display:${props => props.commentStatus === "published" ? "none!important" : "flex!important"};
             border:1px solid red;
             background-color:${green[0]}
`
