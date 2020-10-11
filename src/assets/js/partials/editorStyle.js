export const editorStyle ={
    editorBox: {
        margin: '.5rem 0',
        '& .se-wrapper': {
            '& span': {
                textAlign: props => props.align,
            }
        },
        '& .sun-editor-common': {
            textAlign: props => props.align,
        }
    }
}