import {makeStyles} from "@material-ui/styles";
import * as colors from './../../../components/partials/Colors';

export const useStyles = makeStyles((theme) => (
    {
        content: {
            display: 'block',
            justifyContent: 'space-around',
            width: '100%',
            overflowX: 'scroll',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none',  /* IE 10+ */
            '&::-webkit-scrollbar': {
                display: "none",
            },
            '& .block': {
                display: 'inline-block',
                border: '1px solid #dee2e6!important',
                borderRadius: '5px',
                backgroundColor: 'white',
                width: '380px',
                padding: '20px',
                boxSizing: 'border-box',
                margin: '5px',
                '&::-webkit-scrollbar': {
                    width: '0px',
                    background: 'transparent',
                },
                '& .text': {
                    display: 'flex',
                    justifyContent: 'space-between',
                },
                '& .chart': {
                    width: '100%',
                    '& .number': {},
                    '& .graphic': {
                        backgroundColor: colors.grey.base,
                        height: '10px',
                        borderRadius: '5px',
                        position: 'relative',
                        overflow: 'hidden',

                        '& .after': {
                            position: 'absolute',
                            border: `1px solid ${colors.primary}`,
                            height: '10px',
                            top: '0',
                            backgroundColor: colors.primary,
                            content: "''",

                        }
                    },
                },

            }
        },
        title: {
            marginBottom: '10px',
            fontSize: '14px',
            fontWeight: '500'
        },
        myPaper: {
            margin: theme.spacing(2),
            padding: theme.spacing(2),
            '@media(max-width:992px)': {
                margin: `${theme.spacing(2)}px 0`,
            }
        }
    }
));