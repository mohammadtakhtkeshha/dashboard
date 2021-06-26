import styled from "styled-components"
import {StyledAddButton,StyledEditButton} from "assets/js/library/components/buttons"

export const StyledActiveButton=styled(StyledAddButton)`
             display:${({showAndPermission})=>showAndPermission ? 'block':'none'};
`
export const StyledDeActiveButton=styled(StyledEditButton)`
             display:${({showAndPermission})=>showAndPermission ? 'block':'none'};
`
