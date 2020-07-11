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
import * as global from './../../assets/js/CssGlobal';
import authSevice from './../../core/services/auth.service';
import {useHistory} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
//local storage
import storage from './../../libraries/local-storage'
//multi lang
import {withNamespaces} from "react-i18next";
import AppContext from "../../contexts/AppContext";


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
    let history = useHistory();
    const classes = useStyles.styles();
    const gClasses = global.styles();
    const [value, setValue] = useState(0);
    const [extandedCart, setExtandedCart] = useState(false);
    const [extandedDashboard, setExtandedDashboard] = useState(false);
    const [extandedForm, setExtandedForm] = useState(false);
    const lang = storage.get('lang');
    let isFa = (lang) => {
        if (lang === 'fa') {
            return true;
        }
        return false;
    }
    let currrentAlign = () => {
        return isFa(lang) ? gClasses.textRight : gClasses.textLeft;
    };
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
    let clearLocal = () => {
        storage.remove(process.env.REACT_APP_TOKEN_KEY);
        console.log('remover');
    }
    console.log(storage.get(process.env.REACT_APP_TOKEN_KEY));

    return (
        <>
            <Box className={classes.sidebar}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tooltip title={t('sidebar:dashboard')}>
                            <Tab label={<PieChartIcon/>} {...a11yProps(0)} />
                        </Tooltip>
                        <Tooltip title={t('sidebar:contents')}>
                            <Tab label={<LayersIcon/>} {...a11yProps(1)} />
                        </Tooltip>
                        <Tooltip title={t('sidebar:users')}>
                        <Tab label={<PersonIcon/>} {...a11yProps(2)} />
                        </Tooltip>
                        <Tab label={<LayersIcon/>} {...a11yProps(3)} />
                        <Tab label={<BrushIcon/>} {...a11yProps(4)} />
                        <Tab label={<SettingsIcon/>} {...a11yProps(5)}
                             onClick={() => clearLocal()}
                        />
                        <Tab label={<PowerSettingsNewIcon/>} {...a11yProps(6)}
                             onClick={() => authSevice.logout(history)}/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} id="fiiiiiiiiiiiiiiiiiiiiiiiiiiiirst"
                          className={[classes.tab, lang === 'fa' ? classes.marginLeft : classes.marginRight]}
                          variant="div">
                    <List aria-label="main mailbox folders" className="list">
                        <ListItem className={["navLink", "items"]}>
                            <NavLink to='/dashboard' id="test" activeClassName={classes.active}
                                     className={currrentAlign()}>
                                <ListItemText primary={t('sidebar:dashboard')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem className={["collapsible", "items"]}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary className="summary" onClick={toggleCartIcon}
                                                       expandIcon={extandedCart ? <AddIcon/> : <MinimizeIcon/>}
                                                       aria-controls="panel1a-content"
                                                       id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>{t('dashboard')}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="detaaaaaaaaaaaaaaaaaaaaaaaaaaaails" className="details">
                                    <List component="nav" aria-label="main mailbox folders">
                                        <ListItem>
                                            <NavLink to='/comments' activeClassName={classes.active}
                                                     className={currrentAlign()}>
                                                <ListItemText primary={t('sidebar:comments')}/>
                                            </NavLink>
                                        </ListItem>
                                    </List>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </ListItem>
                        <ListItem button className={["collapsible", "items"]}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary className="summary"
                                                       onClick={toggleDashboarIcon}
                                                       expandIcon={extandedDashboard ? <AddIcon/> :
                                                           <MinimizeIcon/>}
                                                       aria-controls="panel1a-content"
                                                       id="panel1a-header">
                                    <Typography className={classes.heading}>{t('sidebar:dashboard')}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className="details">
                                    <List component="nav" aria-label="main mailbox folders">
                                        <ListItem button>
                                            <NavLink to="/contents" activeClassName={classes.active}
                                                     className={currrentAlign()}>
                                                <ListItemText primary={t('sidebar:contents')}/>
                                            </NavLink>
                                        </ListItem>
                                        <ListItem button>
                                            <NavLink to="/comments" activeClassName={classes.active}
                                                     className={currrentAlign()}>
                                                <ListItemText primary={t('sidebar:comments')}/>
                                            </NavLink>
                                        </ListItem>
                                    </List>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </ListItem>
                        {/*<ListItem button className={["collapsible", "items"]}*/}
                        {/*          style={{textAlign: "right"}}>*/}
                        {/*    <ExpansionPanel>*/}
                        {/*        <ExpansionPanelSummary className="summary"*/}
                        {/*                               onClick={toggleFormIcon}*/}
                        {/*                               expandIcon={extandedForm ? <AddIcon/> : <MinimizeIcon/>}*/}
                        {/*                               aria-controls="panel1a-content"*/}
                        {/*                               id="panel1a-header">*/}
                        {/*            <Typography className={classes.heading}>فرم پایه اصلی</Typography>*/}
                        {/*        </ExpansionPanelSummary>*/}
                        {/*        <ExpansionPanelDetails className="details">*/}
                        {/*            <List component="nav" aria-label="main mailbox folders">*/}
                        {/*                <ListItem className={["collapsible", "items"]}>*/}
                        {/*                    <NavLink to="/" activeClassName={classes.active} exact>*/}
                        {/*                        <ListItemText primary="فرم پایه"/>*/}
                        {/*                    </NavLink>*/}
                        {/*                </ListItem>*/}
                        {/*                <ListItem>*/}
                        {/*                    <NavLink to="/custom" activeClassName={classes.active}>*/}
                        {/*                        <ListItemText primary="فرم سفارشی"/>*/}
                        {/*                    </NavLink>*/}
                        {/*                </ListItem>*/}
                        {/*            </List>*/}
                        {/*        </ExpansionPanelDetails>*/}
                        {/*    </ExpansionPanel>*/}
                        {/*</ListItem>*/}
                    </List>

                </TabPanel>


                <TabPanel value={value} index={1}
                          className={[classes.tab, lang === 'fa' ? classes.marginLeft : classes.marginRight]}
                          id="secooooooooooooooooooooooond">
                    <List className="list" aria-label="main mailbox folders">
                        <ListItem button className={["navLink", "items"]}>
                            <NavLink to="/contents" activeClassName={classes.active} className={currrentAlign()}>
                                <ListItemText primary={t('sidebar:content')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem button className={["navLink", "items"]}>
                            <NavLink to="/new-content" activeClassName={classes.active} className={currrentAlign()}>
                                <ListItemText primary={t('sidebar:newContent')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem button className={["navLink", "items"]}>
                            <NavLink to="/terms" activeClassName={classes.active} className={currrentAlign()}>
                                <ListItemText primary={t('sidebar:terms')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem button className={["navLink", "items"]}>
                            <NavLink to="/vocabs" activeClassName={classes.active} className={currrentAlign()}>
                                <ListItemText primary={t('sidebar:vocabs')}/>
                            </NavLink>
                        </ListItem>
                    </List>
                </TabPanel>


                <TabPanel value={value} index={2}
                          className={[classes.tab, lang === 'fa' ? classes.marginLeft : classes.marginRight]}>
                        <List className="list" aria-label="main mailbox folders">
                            <ListItem button className={["navLink", "items"]}>
                                <NavLink to='/users' activeClassName={classes.active} className={currrentAlign()}>
                                    <ListItemText primary={t('users')}/>
                                </NavLink>
                            </ListItem>
                            <ListItem button className={["navLink", "items"]}>
                                <NavLink to='/new-user' activeClassName={classes.active} className={currrentAlign()}>
                                    <ListItemText primary="افزودن کاربر جدید"/>
                                </NavLink>
                            </ListItem>

                        </List>

                </TabPanel>

                <TabPanel value={value} index={3} className={classes.tab}>
                    <Box>
                        item three
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={4} className={classes.tab}>
                    <Box>
                        item four
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={5} className={classes.tab}>
                    <Box>
                        item
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={6} className={classes.tab}>
                    <Box>
                        Item Three
                    </Box>
                </TabPanel>
            </Box>

        </>
    );
}

export default withNamespaces(['sidebar', 'translation'])(SimpleTabs);