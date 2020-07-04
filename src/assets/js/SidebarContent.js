import {makeStyles} from '@material-ui/core/styles';
import * as  colors from './../../components/partials/Colors';


export const styles = makeStyles((theme) => ({
    marginLeft: {
        marginLeft: '16px',
    },
    marginRight: {
        marginLeft: '16px'
    },
    tab: {
        '& .MuiBox-root': {
            padding: '0',
            '& .list': { //sidebar content lists
                '& .collapsible': {
                    width: '100%',
                    padding: '0!important',
                    backgroundColor: 'transparent',
                    '& .MuiExpansionPanel-root': {
                        width: '100%',
                        marginBottom: '0',
                        '& .summary': {
                            '&:hover': {
                                backgroundColor: colors.grey.sidebarHover,
                            }
                        },
                        '& .details': {
                            padding:'0!important',
                            '& .MuiList-padding':{
                                padding:'0!important',
                                width:'100%',
                                '& a':{
                                    width: '100%',
                                    margin: '-8px -16px',
                                    padding: '8px 33px',
                                    // textAlign:'right'
                                }
                            }
                        },

                        '& .MuiListItem-button': {},

                    }
                },
                '& .navLink': {},
                '& .items': {
                    borderRadius: '5px',
                    overflow: 'hidden',
                    '&:hover': {
                        backgroundColor: colors.grey.sidebarHover,
                    }
                }
            },

        }
    },
    active: {//when link is active
        color: `${colors.primary}!important`,
        // width: '100%',
        // margin: '-8px -16px',
        // padding: '8px 16px',
        // textAlign: 'right',
        backgroundColor: colors.grey.sidebarActive,
    },
    sidebar: {//whole part of sidebar
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'row',
        height: 'calc(100% - 75px)',
        '& a': {
            color: 'black',
        },
        '& header': {//header ==============================================================
            margin: '0 19px',
            borderRadius: '10px',
            marginBottom: '1px',
            backgroundColor: '#5867dd',
            width: '61px',
            border: '1px solid blue',
            '& ~ div': {
                width: '100%'
            },
            '& .MuiTab-wrapper': {
                width: '41%',
            },
            '& .MuiTab-root': {
                minWidth: '0',
                width: '100%'
            },
            '& .MuiTabs-flexContainer': { //purple part of sidebar
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
        },
        // *************************************************************************

        // **************************************************************************
        // '& .MuiBox-root': {
        //     padding: '0',
        //     '& span': {
        //         '& li': {
        //             padding: 0,
        //         },
        //     },
        //     '@media(min-width : 992px)': {
        //         '& .MuiListItem-gutters': {
        //             border: '1px solid green',
        //             paddingRight: 0,
        //             paddingLeft: 0,
        //         },
        //         '& .MuiExpansionPanelSummary-root': {
        //             padding: '0 0!important',
        //         }
        //     }
        // },
    },


}));