export const styledGridSoundFile = ()=>({
    root:{
        display:props => props.contentype === 'sounds' || 'none'
    }
})

export const styledGridVideoFile = ()=>({
    root:{
        display:props => props.contentype === 'videos' || 'none'
    }
})
