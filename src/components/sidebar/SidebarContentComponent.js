import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PieChartIcon from '@material-ui/icons/PieChart';
import BrushIcon from '@material-ui/icons/Brush';
import LayersIcon from '@material-ui/icons/Layers';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonIcon from '@material-ui/icons/Person';
import {Paper, Typography, Link} from '@material-ui/core';
import {CardMedia} from '@material-ui/core';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
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
        </div>
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
        '&::after': {
            content: 'neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeg'
        },
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
            '&~span:last-child':{
                display: 'none'
            }
        },

        '&#myheader': {
            display: 'flex',
            flexDirection: 'row',
            height: 'calc(100% - 75px)',
            '& .MuiPaper-root': {//header
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
            }

        }
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className={classes.root} id="myheader">

                <AppBar position="static">
                    <Tabs value={value} id="taaaaaaaaaab" onChange={handleChange} aria-label="simple tabs example">
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
                    Item One
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
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={5} className={classes.tab}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={6} className={classes.tab}>
                    Item Three
                </TabPanel>
            </div>
        </>
    );
}