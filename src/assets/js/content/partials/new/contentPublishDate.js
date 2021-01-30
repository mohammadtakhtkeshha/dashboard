import styled from "styled-components";
import {grey,green,red,white,black} from "components/partials/Colors";

export const StyledGridBlock = styled.div`
                padding:.3rem;
`

export const StyledTypography = styled.p`
             color:${black[1]};
             font-size:15px;
`

export const styledGridHomeSlider= () => ({
    root:{
        marginTop:'1rem',
        display:props => props.contentype === 'news' || 'none'
    }
});

export const styledGridSidebarSlider= () => ({
    root:{
        marginTop:'1rem',
        display:props => (props.contentype === 'article' || props.contentype === 'page') && 'none'
    }
});

export const styledGrid= () => ({
    root:{
        marginTop:'1rem',
    }
});

export const styledGridPublishOnAndUnpublish= () => ({
    root:{
        display:props=>(props.contentype === 'news' || props.contentype === 'article') || 'none',
    }
});

