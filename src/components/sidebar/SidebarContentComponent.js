import React from 'react';
import {NavLink} from 'react-router-dom';
import {withNamespaces} from "react-i18next";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from "@material-ui/styles";

import {StyledSidebar,active} from "assets/js/SidebarContent";
import i18next from "i18next";

const styles=makeStyles(active);

function SimpleTabs({t}) {
    const classes = styles();
    const lang=i18next.language;

    return (
            <StyledSidebar lang={lang}>
                    <List aria-label="main mailbox folders">
                        <ListItem>
                            <NavLink to='/dashboard' activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:home')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/contents" activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:contentManager')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to='/comments' activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:commentsManager')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/vocabs" activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:categories')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to='/users' activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:usersManager')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to='/reports' activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:reports')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to='/settings' activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:settings')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to='/platform-settings' activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:platformSettings')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to='/activities' activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:activities')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to='/supprot' activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:support')}/>
                            </NavLink>
                        </ListItem>
                    </List>
            </StyledSidebar>
    );
}

export default withNamespaces('sidebar,translation,users')(SimpleTabs);
