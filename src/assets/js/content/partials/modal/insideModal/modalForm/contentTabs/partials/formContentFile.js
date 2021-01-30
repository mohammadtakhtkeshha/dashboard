import styled from "styled-components";

export const StyledBoxImages = styled.div`
               display:${props => (props.contentype === "news" || props.contentype === "videos" || props.contentype ===  "images") || 'none'}
`
