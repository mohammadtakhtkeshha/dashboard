import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PieChartIcon from '@material-ui/icons/PieChart';

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
        border: '1px solid red',
        '&::after': {
            content: 'neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeg'
        },
        '& .MuiTabs-flexContainer': {
            flexDirection: 'column',
            alignItems: 'center',
            '& .Mui-selected': {
                border: '1px solid red',
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
                    transform: 'rotateZ(46deg)'
                }
            }
        },

        '&.makeStyles-root-32': {
            display: 'flex',
            flexDirection: 'row',
            '& .MuiPaper-root': {//header
                marginRight: '26px',
                borderRadius: '5px',
                '& ~ div': {
                    width: '100%'
                },
                backgroundColor: '#5867dd',
                width: '18%',
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
        <div className={classes.root} id="rodddddddddddddddot">
            <AppBar position="static">
                <Tabs value={value} id="taaaaaaaaaab" onChange={handleChange} aria-label="simple tabs example">
                    <Tab label={<PieChartIcon/>} {...a11yProps(0)} />
                    <Tab label={<PieChartIcon/>} {...a11yProps(1)} />
                    <Tab label={<PieChartIcon/>} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} class={classes.tab}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1} class={classes.tab}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2} class={classes.tab}>
                Item Three
            </TabPanel>
        </div>
    );
}