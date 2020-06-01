import React from 'react';
import {makeStyles} from '@material-ui/core/styles/index';
import {Typography, Toolbar, AppBar, Link, Box} from '@material-ui/core/index';
import useWindowDimensions from '../../main/useWindowDimensions';
import Breadcrumbs from '@material-ui/core/Breadcrumbs/index';
import Avatar from '@material-ui/core/Avatar/index';
import avatar from '../../assets/media/image/avatar.jpg';
import SearchIcon from '@material-ui/icons/Search';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import MessageIcon from '@material-ui/icons/Message';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({

        root: {
            border:'1px solid red',
            flexGrow: 1,

        },

        appBar: {
            '&.MuiAppBar-colorPrimary': {
                backgroundColor: '#e7ebee',
                boxShadow: '0 0 0 0',

            }
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        leftBlock: {
            flexGrow: 2,
            textAlign: 'left'
        },
        headerInput: {

            position: 'relative',
            '& input': {
                borderRadius: '5px',
                border: 'none',
                padding: '8px',
                backgroundColor: '#fff',
                fontSize: '14px',
                '&:focus': {
                    outline: '0',
                    outlineOffset: '0',
                    border: 'none',
                },
            },
            '& #label': {
                top: '54%',
                left: '4%',
                color: 'blue',
                position: 'absolute',
                transform: 'translateY(-50%)'
            }

        },
        icons: {
            backgroundColor: 'white',
            marginRight: '12px',
            borderRadius: '5px',
            width: '40px',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': {
                color: '#828282'
            },
            '&#message': {
                position: 'relative',
                '& .MuiBox-root': {
                    width: '8px',
                    height: '8px',
                    border: '1px solid red',
                    position: 'absolute',
                    top: '-3px',
                    left: '0',
                    borderRadius: '100%',
                    backgroundColor: '#e04b4b'
                }
            }
        },
        avatar: {
            marginRight: '12px'
        },
        breadcrumbs: {
            '& h3': {
                fontSize: '23px',
                lineHeight: '32px',
                fontWeight: '700',
                color: 'black'
            },
            '& li:nth-of-type(1)': {
                color: 'black',
            },
            '& li:nth-of-type(3)': {
                color: '#5867dd',
            },

        }

    }))
;

function HeaderWebComponent(props) {
    const classes = useStyles();
    const {width} = useWindowDimensions();

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Box display="flex" flexDirection="column" className={classes.breadcrumbs}>
                        <Typography variant="h3" component="h3">داشبورد</Typography>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/" onClick={handleClick}>
                                داشبورد
                            </Link>
                            <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                                فروش و مدیریت مشتری
                            </Link>
                        </Breadcrumbs>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" className={classes.leftBlock}>
                        <Box className={classes.headerInput}>
                            <label htmlFor="" id="label"><SearchIcon fontSize="small"/></label>
                            <input type="text" placeholder="جستجو"/>
                        </Box>
                        <Box className={classes.icons}>
                            <AddIcon/>
                        </Box>
                        <Box className={classes.icons} id="message">
                            <Box></Box>
                            <MessageIcon/>

                        </Box>
                        <Box className={classes.icons}>
                            <NotificationImportantIcon fontSize="small"/>
                        </Box>
                        <Box className={classes.avatar}>
                            <Avatar alt="Remy Sharp" src={avatar}/>
                        </Box>
                    </Box>


                </Toolbar>
            </AppBar>

        </>
    );
}

export default HeaderWebComponent;