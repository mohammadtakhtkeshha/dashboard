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
        },
        '& .se-toolbar-sticky': {
            position:'static!important',
        },
        '& .se-toolbar-sticky-dummy': {
            height:'0!important',
        },
        '& .se-wrapper-wysiwyg': {
            textAlign: props => props.align,
        }
    }
}
