
export const badgeStyles=(theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
});
export const avatarStyles= (theme) => ({
    root: props=>({
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        '& .MuiAvatar-root':{
            width: props.width,
            height: props.height,
        }
    }),
})
export default {badgeStyles,avatarStyles};
