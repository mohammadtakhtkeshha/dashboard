import {makeStyles} from '@material-ui/core/styles';
import * as  colors from './../../components/partials/Colors'

export const styles = makeStyles((theme) => ({
    active: {
        color: `${colors.primary}!important`,
    },
    root: {
        '& a': {
            textDecoration: 'none',
            color: 'black',
        },
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        '& .MuiTabs-flexContainer': {
            flexDirection: 'column',
            alignItems: 'center',
            height: 'calc(100vh - 75px)',
            '& button:nth-of-type(6)': {
                marginTop: 'auto'
            },
            '& .Mui-selected': {
                '&::after': {
                    display: 'block',
                    content: "''",
                    marginTop: '10px',
                    borderRadius: '21%',
                    position: 'absolute',
                    top: '1px',
                    left: '-13px',
                    backgroundColor: 'white',
                    width: '21px',
                    height: '20px',
                    transform: 'rotateZ(46deg)',
                    border: '0'
                }
            },
            '&~span:last-child': {
                display: 'none',
            }
        },

        '& .tabcontent': {
            display: 'none',
        },
        '& .tab': {
            '& .tablinks': {
                '&.active': {
                    backgroundColor: 'red'
                }
            },
        },
        '&#myheader': {
            display: 'flex',
            flexDirection: 'row',
            height: 'calc(100% - 75px)',
            '& header': {//header
                marginRight: '26px',
                borderRadius: '10px',
                marginBottom: '1px',

                '& ~ div': {
                    width: '100%'
                },
                backgroundColor: '#5867dd',
                width: '61px',
                '& .MuiTab-wrapper': {
                    width: '41%',
                },
                '& .MuiTab-root': {
                    minWidth: '0',
                    width: '100%'
                }
            },
            '& .MuiBox-root': {
                paddingTop: '0',
                '& span': {
                    '& li': {
                        padding: 0
                    }
                },
                '@media(min-width : 992px)': {
                    '& .MuiListItem-gutters': {
                        paddingRight: 0,
                        paddingLeft: 0,
                    },
                    '& .MuiExpansionPanelSummary-root': {
                        padding: '0 0!important',
                    }
                }
            },
        }
    },
    list: {
        '& .MuiListItem-button': {
            textAlign: 'right'
        }
    },
    collapsible: {
        width: '100%',
        '& .MuiListItem-button:hover': {
            border: '0'
        },
        '& .MuiPaper-root:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
        },
        '& .MuiPaper-root': {
            backgroundColor: 'white',
            '& li': {
                '& a': {
                    textDecoration: 'none',
                    color: 'inherit'
                }
            }

        },
        '& .MuiPaper-elevation1': {
            boxShadow: '0 0 0 0'
        },
        '& .MuiCollapse-container': {
            backgroundColor: 'white',
        },
        '& .Mui-expanded': {
            margin: '0',
            minHeight: 0
        },
    },
}));