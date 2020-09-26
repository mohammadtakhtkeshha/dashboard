export const styles = (theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        '& .MuiListItemText-root': {
            textAlign: 'right'
        },
        '&>div': {
            '&>div': {
                border:  props =>`1px solid ${props.color}`,
                textAlign: props => `${props.textAlign}!important`
            }

        }
    }
});

export default {styles};