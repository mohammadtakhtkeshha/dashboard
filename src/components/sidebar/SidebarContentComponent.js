import React from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import {withNamespaces} from "react-i18next";
import clsx from 'clsx';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from "@material-ui/styles";

import authSevice from 'core/services/auth.service';
import {StyledSidebar,active} from "assets/js/SidebarContent";

const styles=makeStyles(active);

function SimpleTabs({t}) {
    let history = useHistory();
    const classes = styles();

    return (
            <StyledSidebar>
                    <List aria-label="main mailbox folders">
                        <ListItem>
                            <NavLink to='/dashboard' activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:dashboard')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to='/comments' activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:comments')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/contents" activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:contents')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/vocabs" activeClassName={classes.active}>
                                <ListItemText primary={t('sidebar:vocabs')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to='/users' activeClassName={classes.active}>
                                <ListItemText primary={t('users:users')}/>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <button onClick={() => authSevice.logout(history)}>
                                خروج
                            </button>
                        </ListItem>
                    </List>
            </StyledSidebar>
    );
}

export default withNamespaces('sidebar,translation,users')(SimpleTabs);
