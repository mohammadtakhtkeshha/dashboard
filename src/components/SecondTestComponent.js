import React from 'react';
import useWindowDimenion from './../main/useWindowDimensions'
import {Link} from "react-router-dom";

export default function SecondTestComponent() {
    const {width,height} = useWindowDimenion();
    return (<>
        {/*<Box className={classes.root} id="myheader">*/}
        {/*    <AppBar position="static">*/}
        {/*        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">*/}
        {/*            <Tab label={<PieChartIcon/>} {...a11yProps(0)} />*/}
        {/*            <Tab label={<PieChartIcon/>} {...a11yProps(1)} />*/}
        {/*            <Tab label={<BrushIcon/>} {...a11yProps(2)} />*/}
        {/*            <Tab label={<LayersIcon/>} {...a11yProps(3)} />*/}
        {/*            <Tab label={<PersonIcon/>} {...a11yProps(4)} />*/}
        {/*            <Tab label={<SettingsIcon/>} {...a11yProps(5)} />*/}
        {/*            <Tab label={<PowerSettingsNewIcon/>} {...a11yProps(6)} />*/}
        {/*        </Tabs>*/}
        {/*    </AppBar>*/}
        {/*    <TabPanel value={value} index={0} className={classes.tab}>*/}
        {/*        <Box className={classes.list}>*/}
        {/*            <List component="nav" aria-label="main mailbox folders">*/}
        {/*                <ListItem button>*/}
        {/*                    <ListItemText primary="داشبورد"/>*/}
        {/*                </ListItem>*/}
        {/*                <ListItem button>*/}
        {/*                    <ListItemText primary="فروش و مدیریت مشتری"/>*/}
        {/*                </ListItem>*/}
        {/*                <ListItem style={{textAlign: "right"}}>*/}
        {/*                    <Box className={classes.collapsible}>*/}
        {/*                        <ExpansionPanel>*/}
        {/*                            <ExpansionPanelSummary onClick={toggleCartIcon}*/}
        {/*                                                   expandIcon={extandedCart ? <AddIcon/> : <MinimizeIcon/>}*/}
        {/*                                                   aria-controls="panel1a-content"*/}
        {/*                                                   id="panel1a-header"*/}
        {/*                            >*/}
        {/*                                <Typography className={classes.heading}>داشبورد</Typography>*/}
        {/*                            </ExpansionPanelSummary>*/}
        {/*                            <ExpansionPanelDetails>*/}
        {/*                                <List component="nav" aria-label="main mailbox folders">*/}
        {/*                                    <ListItem button>*/}
        {/*                                        <ListItemText primary="ایتم "/>*/}
        {/*                                    </ListItem>*/}
        {/*                                </List>*/}
        {/*                            </ExpansionPanelDetails>*/}
        {/*                        </ExpansionPanel>*/}
        {/*                    </Box>*/}
        {/*                </ListItem>*/}
        {/*                <ListItem style={{textAlign: "right"}}>*/}
        {/*                    <Box className={classes.collapsible}>*/}
        {/*                        <ExpansionPanel>*/}
        {/*                            <ExpansionPanelSummary onClick={toggleDashboarIcon}*/}
        {/*                                                   expandIcon={extandedDashboard ? <AddIcon/> :*/}
        {/*                                                       <MinimizeIcon/>}*/}
        {/*                                                   aria-controls="panel1a-content"*/}
        {/*                                                   id="panel1a-header">*/}
        {/*                                <Typography className={classes.heading}>ساختن کارت</Typography>*/}
        {/*                            </ExpansionPanelSummary>*/}
        {/*                            <ExpansionPanelDetails>*/}
        {/*                                <List component="nav" aria-label="main mailbox folders">*/}
        {/*                                    <ListItem button>*/}
        {/*                                        <ListItemText primary="کارت"/>*/}
        {/*                                    </ListItem>*/}
        {/*                                </List>*/}
        {/*                            </ExpansionPanelDetails>*/}
        {/*                        </ExpansionPanel>*/}
        {/*                    </Box>*/}
        {/*                </ListItem>*/}
        {/*                <ListItem style={{textAlign: "right"}}>*/}
        {/*                    <Box className={classes.collapsible}>*/}
        {/*                        <ExpansionPanel>*/}
        {/*                            <ExpansionPanelSummary onClick={toggleFormIcon}*/}
        {/*                                                   expandIcon={extandedForm ? <AddIcon/> : <MinimizeIcon/>}*/}
        {/*                                                   aria-controls="panel1a-content"*/}
        {/*                                                   id="panel1a-header">*/}
        {/*                                <Typography className={classes.heading}>فرم پایه</Typography>*/}
        {/*                            </ExpansionPanelSummary>*/}
        {/*                            <ExpansionPanelDetails>*/}
        {/*                                <List component="nav" aria-label="main mailbox folders">*/}
        {/*                                    <ListItem>*/}
        {/*                                        <Link to="/">*/}
        {/*                                            <ListItemText primary="فرم پایه"/>*/}
        {/*                                        </Link>*/}
        {/*                                    </ListItem>*/}
        {/*                                    <ListItem>*/}
        {/*                                        <Link to="/custom">*/}
        {/*                                            <ListItemText primary="فرم سفارشی"/>*/}
        {/*                                        </Link>*/}
        {/*                                    </ListItem>*/}
        {/*                                </List>*/}
        {/*                            </ExpansionPanelDetails>*/}
        {/*                        </ExpansionPanel>*/}
        {/*                    </Box>*/}
        {/*                </ListItem>*/}
        {/*            </List>*/}
        {/*        </Box>*/}
        {/*    </TabPanel>*/}
        {/*    <TabPanel value={value} index={1} className={classes.tab}>*/}
        {/*        <Box className={classes.list}>*/}
        {/*            <List component="nav" aria-label="main mailbox folders">*/}
        {/*                <ListItem button>*/}
        {/*                    <ListItemText primary="داشبورد"/>*/}
        {/*                </ListItem>*/}
        {/*                <ListItem button>*/}
        {/*                    <ListItemText primary="فروش و مدیریت مشتری"/>*/}
        {/*                </ListItem>*/}
        {/*                <ListItem style={{textAlign: "right"}}>*/}
        {/*                    <Box className={classes.collapsible}>*/}
        {/*                        <ExpansionPanel>*/}
        {/*                            <ExpansionPanelSummary onClick={toggleCartIcon}*/}
        {/*                                                   expandIcon={extandedCart ? <AddIcon/> : <MinimizeIcon/>}*/}
        {/*                                                   aria-controls="panel1a-content"*/}
        {/*                                                   id="panel1a-header"*/}
        {/*                            >*/}
        {/*                                <Typography className={classes.heading}>داشبورد</Typography>*/}
        {/*                            </ExpansionPanelSummary>*/}
        {/*                            <ExpansionPanelDetails>*/}
        {/*                                <List component="nav" aria-label="main mailbox folders">*/}
        {/*                                    <ListItem button>*/}
        {/*                                        <ListItemText primary="ایتم "/>*/}
        {/*                                    </ListItem>*/}
        {/*                                </List>*/}
        {/*                            </ExpansionPanelDetails>*/}
        {/*                        </ExpansionPanel>*/}
        {/*                    </Box>*/}
        {/*                </ListItem>*/}
        {/*                <ListItem style={{textAlign: "right"}}>*/}
        {/*                    <Box className={classes.collapsible}>*/}
        {/*                        <ExpansionPanel>*/}
        {/*                            <ExpansionPanelSummary onClick={toggleDashboarIcon}*/}
        {/*                                                   expandIcon={extandedDashboard ? <AddIcon/> :*/}
        {/*                                                       <MinimizeIcon/>}*/}
        {/*                                                   aria-controls="panel1a-content"*/}
        {/*                                                   id="panel1a-header">*/}
        {/*                                <Typography className={classes.heading}>ساختن کارت</Typography>*/}
        {/*                            </ExpansionPanelSummary>*/}
        {/*                            <ExpansionPanelDetails>*/}
        {/*                                <List component="nav" aria-label="main mailbox folders">*/}
        {/*                                    <ListItem button>*/}
        {/*                                        <ListItemText primary="کارت"/>*/}
        {/*                                    </ListItem>*/}
        {/*                                </List>*/}
        {/*                            </ExpansionPanelDetails>*/}
        {/*                        </ExpansionPanel>*/}
        {/*                    </Box>*/}
        {/*                </ListItem>*/}
        {/*                <ListItem style={{textAlign: "right"}}>*/}
        {/*                    <Box className={classes.collapsible}>*/}
        {/*                        <ExpansionPanel>*/}
        {/*                            <ExpansionPanelSummary onClick={toggleFormIcon}*/}
        {/*                                                   expandIcon={extandedForm ? <AddIcon/> : <MinimizeIcon/>}*/}
        {/*                                                   aria-controls="panel1a-content"*/}
        {/*                                                   id="panel1a-header">*/}
        {/*                                <Typography className={classes.heading}>فرم پایه</Typography>*/}
        {/*                            </ExpansionPanelSummary>*/}
        {/*                            <ExpansionPanelDetails>*/}
        {/*                                <List component="nav" aria-label="main mailbox folders">*/}
        {/*                                    <ListItem>*/}
        {/*                                        <Link to="/">*/}
        {/*                                            <ListItemText primary="فرم پایه"/>*/}
        {/*                                        </Link>*/}
        {/*                                    </ListItem>*/}
        {/*                                    <ListItem>*/}
        {/*                                        <Link to="/custom">*/}
        {/*                                            <ListItemText primary="فرم سفارشی"/>*/}
        {/*                                        </Link>*/}
        {/*                                    </ListItem>*/}
        {/*                                </List>*/}
        {/*                            </ExpansionPanelDetails>*/}
        {/*                        </ExpansionPanel>*/}
        {/*                    </Box>*/}
        {/*                </ListItem>*/}
        {/*            </List>*/}
        {/*        </Box>*/}
        {/*    </TabPanel>*/}
        {/*    <TabPanel value={value} index={2} className={classes.tab}>*/}
        {/*        Item Three*/}
        {/*    </TabPanel>*/}
        {/*    <TabPanel value={value} index={3} className={classes.tab}>*/}
        {/*        Item Three*/}
        {/*    </TabPanel>*/}
        {/*    <TabPanel value={value} index={4} className={classes.tab}>*/}
        {/*        <Box className={classes.list}>*/}
        {/*            <List component="nav" aria-label="main mailbox folders">*/}
        {/*                <ListItem button>*/}
        {/*                    <Link to='/users'>*/}
        {/*                        <ListItemText primary="کاربران"/>*/}
        {/*                    </Link>*/}
        {/*                </ListItem>*/}
        {/*                <ListItem button>*/}
        {/*                    <Link to='/new-user'>*/}
        {/*                        <ListItemText primary="افزودن کاربر جدید"/>*/}
        {/*                    </Link>*/}
        {/*                </ListItem>*/}

        {/*            </List>*/}
        {/*        </Box>*/}
        {/*    </TabPanel>*/}
        {/*    <TabPanel value={value} index={5} className={classes.tab}>*/}
        {/*        Item Three*/}
        {/*    </TabPanel>*/}
        {/*    <TabPanel value={value} index={6} className={classes.tab}>*/}
        {/*        Item Three*/}
        {/*    </TabPanel>*/}
        {/*</Box>*/}
    </>);
}