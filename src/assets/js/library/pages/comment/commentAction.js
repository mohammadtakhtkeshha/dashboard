import styled from "styled-components"
import {StyledAddButton,StyledEditButton} from "assets/js/library/components/buttons"

export const StyledActiveButton=styled(StyledAddButton)`
             display:${({show})=>show ? 'none':'block'};
`
export const StyledDeActiveButton=styled(StyledEditButton)`
             display:${({show})=>show ? 'block':'none'};

`
