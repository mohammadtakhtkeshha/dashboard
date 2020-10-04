export const styles = (theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        '&>div': {
            '&>div': {
                border:  props =>`1px solid ${props.color}`,
                textAlign: props => `${props.lang === "en" ? 'left':'right'}!important`
            }

        },

    }
});

export const listItemStyles = (theme) => ({
    root: {
        padding: '24px 43px 24px 22px',
        borderBottom: '1px solid #BBC3CE',
        cursor: 'pointer',
        '&:last-child':{
            borderBottom:'0!important'
        },
        '&:first-child':{
            fontWeight:'bold',
            '&>div':{
                fontSize:'18px!important',
                textAlign:'center!important',
                '&>span':{
                    fontSize:'18px',
                }
            }
        }
    },
});

export default {styles,listItemStyles};