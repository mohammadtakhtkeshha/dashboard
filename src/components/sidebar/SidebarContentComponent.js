import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PieChartIcon from '@material-ui/icons/PieChart';
import BrushIcon from '@material-ui/icons/Brush';
import LayersIcon from '@material-ui/icons/Layers';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonIcon from '@material-ui/icons/Person';
import {Typography, Box} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';
import { Link} from 'react-router-dom';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const useStyles = makeStyles((theme) => ({
    root: {
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
                border: '1px solid red',
            }
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
                // paddingRight: '8px'
                '& nav': {
                    '& li': {
                        padding: 0
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

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [extandedCart, setExtandedCart] = useState(false);
    const [extandedDashboard, setExtandedDashboard] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const toggleCartIcon = () => {
        if (extandedCart) {
            setExtandedCart(false);
        } else {
            setExtandedCart(true)
        }

    };
    const toggleDashboarIcon = () => {
        if (extandedDashboard) {
            setExtandedDashboard(false);
        } else {
            setExtandedDashboard(true)
        }

    };

    return (
        <>
            <Box className={classes.root} id="myheader">
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label={<PieChartIcon/>} {...a11yProps(0)} />
                        <Tab label={<PieChartIcon/>} {...a11yProps(1)} />
                        <Tab label={<BrushIcon/>} {...a11yProps(2)} />
                        <Tab label={<LayersIcon/>} {...a11yProps(3)} />
                        <Tab label={<PersonIcon/>} {...a11yProps(4)} />
                        <Tab label={<SettingsIcon/>} {...a11yProps(5)} />
                        <Tab label={<PowerSettingsNewIcon/>} {...a11yProps(6)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} className={classes.tab}>
                    <Box className={classes.list}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button>
                                <ListItemText primary="داشبورد"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="فروش و مدیریت مشتری"/>
                            </ListItem>
                            <ListItem style={{textAlign: "right"}} onClick={toggleCartIcon}>
                                <Box className={classes.collapsible}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={extandedCart ? <AddIcon/> : <MinimizeIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>داشبورد</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem button>
                                                    <ListItemText primary="ایتم "/>
                                                </ListItem>
                                            </List>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Box>
                            </ListItem>
                            <ListItem style={{textAlign: "right"}} onClick={toggleDashboarIcon}>
                                <Box className={classes.collapsible}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={extandedDashboard ? <AddIcon/> : <MinimizeIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header">
                                            <Typography className={classes.heading}>ساختن کارت</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem button>
                                                    <ListItemText primary="کارت"/>
                                                </ListItem>
                                            </List>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Box>
                            </ListItem>
                            <ListItem style={{textAlign: "right"}} onClick={toggleDashboarIcon}>
                                <Box className={classes.collapsible}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={extandedDashboard ? <AddIcon/> : <MinimizeIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header">
                                            <Typography className={classes.heading}>فرم پایه</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem >
                                                    <Link to="/"> <ListItemText primary="فرم پایه"/></Link>
                                                </ListItem>
                                                <ListItem >
                                                    <Link to="/custom"> <ListItemText primary="فرم سفارشی"/></Link>
                                                </ListItem>
                                            </List>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Box>
                            </ListItem>
                        </List>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tab}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2} className={classes.tab}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3} className={classes.tab}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={4} className={classes.tab}>
                    <Box className={classes.list}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button>
                                <ListItemText primary="داشبورد"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="فروش و مدیریت مشتری"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="پشتیبانی"/>
                            </ListItem>
                        </List>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={5} className={classes.tab}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={6} className={classes.tab}>
                    Item Three
                </TabPanel>
            </Box>

        </>
    );
}