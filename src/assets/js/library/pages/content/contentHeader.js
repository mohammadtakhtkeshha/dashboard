import styled from "styled-components";
import {StyledAddButton} from "assets/js/library/components/buttons";

export const StyledHelpButton = styled(StyledAddButton)`
        display:${permission => permission ? 'block' : 'none'};
        // display:${permission => permission ? 'none' : 'block'};
`
