import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PieChartIcon from '@material-ui/icons/PieChart';
import BrushIcon from '@material-ui/icons/Brush';
import LayersIcon from '@material-ui/icons/Layers';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonIcon from '@material-ui/icons/Person';
import {Typography, Box} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {NavLink} from 'react-router-dom';
import * as useStyles from './../../assets/js/SidebarContent';
import {globalCss} from '../../assets/js/globalCss';
import authSevice from './../../core/services/auth.service';
import {useHistory} from "react-router-dom";
//local storage
import storage from './../../libraries/local-storage'
//multi lang
import {withNamespaces} from "react-i18next";
import AppContext from "../../contexts/AppContext";

//for two classess in className
import clsx from 'clsx';
import i18next from "i18next";
import {makeStyles} from "@material-ui/styles";


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

const gClass = makeStyles(globalCss);

function SimpleTabs({t}) {
    const gClasses = gClass();
    let history = useHistory();
    const classes = useStyles.styles();
    const [value, setValue] = useState(0);
    const [extandedCart, setExtandedCart] = useState(false);
    const [extandedDashboard, setExtandedDashboard] = useState(false);
    const [extandedForm, setExtandedForm] = useState(false);
    const lang = i18next.language;
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
    }

    return (
        <>
            <Box className={classes.sidebar}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label={<PieChartIcon/>} {...a11yProps(0)} />
                        <Tab label={<PersonIcon/>} {...a11yProps(1)} />
                        <Tab label={<PowerSettingsNewIcon/>} {...a11yProps(2)}
                             onClick={() => authSevice.logout(history)}/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}
                          className={clsx(classes.tab, lang === 'fa' ? classes.marginLeft : classes.marginRight)}
                          variant="div">
                    <List aria-label="main mailbox folders" className="list">
                        <ListItem className={clsx('navLink', 'items')}>
                            <NavLink to='/dashboard' id="test" activeClassName={classes.active}
                                     className={currrentAlign()}>
                                <ListItemText primary={t('sidebar:dashboard')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem className={clsx('navLink', 'items')}>
                            <NavLink to='/comments' activeClassName={classes.active}
                                     className={currrentAlign()}>
                                <ListItemText primary={t('sidebar:comments')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem className={clsx('navLink', 'items')}>
                            <NavLink to="/contents" activeClassName={classes.active}
                                     className={currrentAlign()}>
                                <ListItemText primary={t('sidebar:contents')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem button className={clsx("navLink", "items")}>
                            <NavLink to="/vocabs" activeClassName={classes.active} className={currrentAlign()}>
                                <ListItemText primary={t('sidebar:vocabs')}/>
                            </NavLink>
                        </ListItem>
                        {/*<ListItem className={clsx('collapsible', 'items')}>*/}
                        {/*    <ExpansionPanel>*/}
                        {/*        <ExpansionPanelSummary className="summary" onClick={toggleCartIcon}*/}
                        {/*                               expandIcon={extandedCart ? <AddIcon/> : <MinimizeIcon/>}*/}
                        {/*                               aria-controls="panel1a-content"*/}
                        {/*                               id="panel1a-header"*/}
                        {/*        >*/}
                        {/*            <Typography className={classes.heading}>{t('dashboard')}</Typography>*/}
                        {/*        </ExpansionPanelSummary>*/}
                        {/*        <ExpansionPanelDetails id="detaaaaaaaaaaaaaaaaaaaaaaaaaaaails" className="details">*/}
                        {/*            <List component="nav" aria-label="main mailbox folders">*/}
                        {/*                <ListItem>*/}
                        {/*                    <NavLink to='/comments' activeClassName={classes.active}*/}
                        {/*                             className={currrentAlign()}>*/}
                        {/*                        <ListItemText primary={t('sidebar:comments')}/>*/}
                        {/*                    </NavLink>*/}
                        {/*                </ListItem>*/}
                        {/*            </List>*/}
                        {/*        </ExpansionPanelDetails>*/}
                        {/*    </ExpansionPanel>*/}
                        {/*</ListItem>*/}

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
                          className={clsx(classes.tab, lang === 'fa' ? classes.marginLeft : classes.marginRight)}>
                    <List className="list" aria-label="main mailbox folders">
                        <ListItem button className={clsx("navLink", "items")}>
                            <NavLink to='/users' activeClassName={classes.active} className={currrentAlign()}>
                                <ListItemText primary={t('users')}/>
                            </NavLink>
                        </ListItem>
                    </List>

                </TabPanel>

            </Box>

        </>
    );
}

export default withNamespaces(['sidebar', 'translation'])(SimpleTabs);
