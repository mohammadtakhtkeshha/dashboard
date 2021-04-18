import styled from "styled-components";

export const styledGridMultiImgBlock = ()=>({
    root:{
        display: props=>(props.contentype === 'video' || props.contentype === 'news' || props.contentype === 'images') || 'none' ,
    }
})

export const styledGridSingleImg = ()=>({
    root:{
        display: props=>props.contentype === "page" && 'none',
    }
})

// export const styledGridVote = ()=>({
//     root:{
//         display: props=>props.contentype === "page" || 'none',
//         padding:'12px',
//     }
// })

export const StyledImgError = styled.div`
             display:${props => props.error || 'none'}
`



export const styledGridTagsBlock = ()=>({
    root:{
        display: props=>props.contentype === "page" && 'none',
        padding:'12px',
        marginBottom:'2rem',
    }
})

export const styledGridNewsCategory = ()=>({
    root:{
        display: props=>props.contentype === "news" || 'none',
        padding:'12px',
    }
})

export const styledGridStates = ()=>({
    root:{
        display: props=>props.contentype === "news" || 'none',
        padding:'12px',
    }
})

export const styledGridSubtitle = ()=>({
    root:{
        display: props=>props.contentype === "news" || 'none',
        padding:'12px',
    }
})

export const styledGridUrgentNews = ()=>({
    root:{
        display: props=>props.contentype === "news" || 'none',
        padding:'12px',
    }
})

export const styledGridSoundsVideosImages = ()=>({
    root:{
        display: props=>(props.contentype === "videos" ||props.contentype === "sounds" ||props.contentype === "images") || 'none',
        padding:'12px',
    }
})

export const StyledCheckboxBody = styled.div`
            padding:10px;
`

export const StyledImgsInputBlock = styled.div`
 display: ${props=>props.showImgInputs ? 'flex' : 'none'}
 justify-content:space-between;
 & input {
    width : 49%!important;
 }
`

export const styledGridImagesCategory =()=>({
    root:{
        display: props=>(props.contentype === "images") || 'none'
    }
})

export const styledGridComment =()=>({
    root:{
        display: props=>(props.contentype === "page") && 'none',
    }
})



