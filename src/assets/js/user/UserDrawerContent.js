import * as colors from "components/partials/Colors";

const styles=(theme) => ({
    content: {
        color: 'black',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        overflow: 'scroll',
        alignItems: 'center',
        '& .avatar': {
            borderBottom: `1px solid ${colors.grey[2]}`,
            '& > :first-child': {
                justifyContent: 'center!important',
            },
            textAlign: 'center',
            '& #name': {
                color: colors.green[0],
                fontSize: '20px',
                paddingTop: theme.spacing(3),
            },
            '& #email': {
                color: colors.green[0],
                fontSize: '14px',
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(2),
            },
            '& #username': {
                color: colors.green[0],
                fontSize: '20px',
                paddingTop: theme.spacing(1),
            },
            '& #roleBlock': {
                '& .role': {
                    color: colors.grey[0],
                    fontSize: '14px',
                    paddingLeft: '5px',
                },
            },

            '& #nameBlock': {
                display: 'flex',
                justifyContent: 'center',
                paddingTop: theme.spacing(2),
                '& .role': {
                    color: colors.grey[0],
                    fontSize: '14px',
                    paddingLeft: '5px',
                },
                '& #setting': {
                    color: colors.darkBlue,
                    fontSize: '14px',
                    paddingTop: '2px',
                    height: '20px',
                },
            },

        },

        '& .buttons': {
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            '& .link': {
                margin: theme.spacing(1),
                textDecoration: 'none',
                display: 'block',
                '& button': {
                    margin: theme.spacing(1),
                    width: '100%',
                },
            },


        },
    }

});

export default styles;
