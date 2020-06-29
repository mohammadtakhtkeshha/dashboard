import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
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
import {NavLink} from 'react-router-dom';
import * as useStyles from './../../assets/js/SidebarContent';
import AppContext from './../../contexts/AppContext'
//multi lang
import {withNamespaces} from "react-i18next";
import i18n from './../../configs/locales/locales';
// import { withTranslation } from 'react-i18next';
// import { useTranslation } from 'react-i18next';


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
                    <Typography variant="inherit">{children}</Typography>
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

function SimpleTabs({t}) {
    // const {t} = useTranslation(['translation', 'users']);
    const classes = useStyles.styles();
    const [value, setValue] = useState(0);
    const [extandedCart, setExtandedCart] = useState(false);
    const [extandedDashboard, setExtandedDashboard] = useState(false);
    const [extandedForm, setExtandedForm] = useState(false);
    const appContext = useContext(AppContext);
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
    const toggleFormIcon = () => {
        if (extandedForm) {
            setExtandedForm(false);
        } else {
            setExtandedForm(true)
        }

    };
    let logOut = () => {
        appContext.setTokenHandler('');
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
                        <Tab label={<PowerSettingsNewIcon/>} {...a11yProps(6)} onClick={logOut}/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} className={classes.tab} variant="div">
                    <Box className={classes.list}>
                        <List aria-label="main mailbox folders">
                            <ListItem button>
                                <NavLink to='/dashboard' activeClassName={classes.active}>
                                    <ListItemText primary={t('sidebar:dashboard')}/>
                                </NavLink>
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="فروش و مدیریت مشتری"/>
                            </ListItem>
                            <ListItem style={{textAlign: "right"}}>
                                <Box className={classes.collapsible}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary onClick={toggleCartIcon}
                                                               expandIcon={extandedCart ? <AddIcon/> : <MinimizeIcon/>}
                                                               aria-controls="panel1a-content"
                                                               id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>{t('dashboard')}</Typography>
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
                            <ListItem style={{textAlign: "right"}}>
                                <Box className={classes.collapsible}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary onClick={toggleDashboarIcon}
                                                               expandIcon={extandedDashboard ? <AddIcon/> :
                                                                   <MinimizeIcon/>}
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
                            <ListItem style={{textAlign: "right"}}>
                                <Box className={classes.collapsible}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary onClick={toggleFormIcon}
                                                               expandIcon={extandedForm ? <AddIcon/> : <MinimizeIcon/>}
                                                               aria-controls="panel1a-content"
                                                               id="panel1a-header">
                                            <Typography className={classes.heading}>فرم پایه اصلی</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem>
                                                    <NavLink to="/" activeClassName={classes.active} exact>
                                                        <ListItemText primary="فرم پایه"/>
                                                    </NavLink>
                                                </ListItem>
                                                <ListItem>
                                                    {/*<Link to="/custom">*/}
                                                    <NavLink to="/custom" activeClassName={classes.active}>
                                                        <ListItemText primary="فرم سفارشی"/>
                                                    </NavLink>
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
                    <Box className={classes.list}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button>
                                <ListItemText primary="داشبورد"/>
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="فروش و مدیریت مشتری"/>
                            </ListItem>
                            <ListItem style={{textAlign: "right"}}>
                                <Box className={classes.collapsible}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary onClick={toggleCartIcon}
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
                            <ListItem style={{textAlign: "right"}}>
                                <Box className={classes.collapsible}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary onClick={toggleDashboarIcon}
                                                               expandIcon={extandedDashboard ? <AddIcon/> :
                                                                   <MinimizeIcon/>}
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
                            <ListItem style={{textAlign: "right"}}>
                                <Box className={classes.collapsible}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary onClick={toggleFormIcon}
                                                               expandIcon={extandedForm ? <AddIcon/> : <MinimizeIcon/>}
                                                               aria-controls="panel1a-content"
                                                               id="panel1a-header">
                                            <Typography className={classes.heading}>فرم پایه</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <List component="nav" aria-label="main mailbox folders">
                                                <ListItem>
                                                    <NavLink to="/" activeClassName={classes.active}>
                                                        <ListItemText primary="فرم پایه"/>
                                                    </NavLink>
                                                </ListItem>
                                                <ListItem>
                                                    <NavLink to="/custom"
                                                             activeClassName={classes.active}>
                                                        <ListItemText primary="فرم سفارشی"/>
                                                    </NavLink>
                                                </ListItem>
                                            </List>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Box>
                            </ListItem>
                        </List>
                    </Box>
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
                                <NavLink to='/users' activeClassName={classes.active}>
                                    <ListItemText primary={t('users')}/>
                                </NavLink>
                            </ListItem>
                            <ListItem button>
                                <NavLink to='/new-user' activeClassName={classes.active}>
                                    <ListItemText primary="افزودن کاربر جدید"/>
                                </NavLink>
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

export default withNamespaces('sidebar')(SimpleTabs);