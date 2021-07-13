import styled from "styled-components"
import {StyledHead} from "assets/js/library/base/all";

export const StyledHeadComment = styled(StyledHead)`
          &>button:nth-child(2){
             margin:${props=>props.lang === 'fa' ? '0 auto 0 0':'0 0 0 auto'};
          };
`
