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
