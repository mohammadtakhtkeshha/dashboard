import React from 'react';
import {NavLink} from 'react-router-dom';
import {withNamespaces} from 'react-i18next';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, withStyles} from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {AccordionSummary, Accordion, AccordionDetails} from '@material-ui/core';

import {
    StyledSidebar,
    active,
    styledAccordionSummary,
    styledExpansionPanelDetails,
    styledList,
    LiStyles,
    styledExpansionPanel,
    StyledUl,
    StyledLi,
} from 'assets/js/SidebarContent';
import i18next from 'i18next';
import {get} from "../../../libraries/local-storage";

// import dashboardImg from 'assets/svg/sidebarIcons/dashboard.png';
// import dashboardImgHover from 'assets/svg/sidebarIcons/dashboard-hover.png';
// import contentImg from 'assets/svg/sidebarIcons/content.png';
// import contentImgHover from 'assets/svg/sidebarIcons/content-hover.png';
//
// import menuImg from 'assets/svg/sidebarIcons/menu.png';
// import menuImgHover from 'assets/svg/sidebarIcons/menu-hover.png';
// import categoryImg from 'assets/svg/sidebarIcons/category.png';
// import categoryImgHover from 'assets/svg/sidebarIcons/category-hover.png';
// import commentsImg from 'assets/svg/sidebarIcons/comments.png';
// import commentsImgHover from 'assets/svg/sidebarIcons/comments-hover.png';
// import usersImg from 'assets/svg/sidebarIcons/users.png';
// import usersImgHover from 'assets/svg/sidebarIcons/users-hover.png';
// import reportsImg from 'assets/svg/sidebarIcons/reports.png';
// import reportsImgHover from 'assets/svg/sidebarIcons/reports-hover.png';
// import settingsImg from 'assets/svg/sidebarIcons/settings.png';
// import settingsImgHover from 'assets/svg/sidebarIcons/settings-hover.png';
// import supportImg from 'assets/svg/sidebarIcons/support.png';
// import supportImgHover from 'assets/svg/sidebarIcons/support-hover.png';

const styles = makeStyles(active);
const StyledListItem = withStyles(LiStyles)(ListItem);
const StyledExpansionPanelSummary = withStyles(styledAccordionSummary)(AccordionSummary);
const StyledExpansionPanelDetails = withStyles(styledExpansionPanelDetails)(AccordionDetails);
const StyledExpansionPanel = withStyles(styledExpansionPanel)(Accordion);
const StyledList = withStyles(styledList)(List);

function SimpleTabs({t}) {
    const classes = styles();
    const lang = i18next.language;
    const {permissions}=JSON.parse(get(process.env.REACT_APP_USER))

    const mouseEnter = (e) => {
        let SpanClassName = e.currentTarget.children[0].children[0].classList.value
        e.currentTarget.children[0].children[0].classList.value = `${SpanClassName}-hover`
    }

    const mouseLeave = (e) => {
        let SpanClassName=e.currentTarget.children[0].children[0].classList.value
        const SpanClassNameWithOutHover=SpanClassName.replace('-hover',"");
        e.currentTarget.children[0].children[0].classList.value=SpanClassNameWithOutHover
    }

    return (
        <StyledSidebar lang={lang}>
            <StyledList lang={lang}>
                <StyledListItem  display='true' lang={lang} onMouseLeave={mouseLeave}
                                onMouseEnter={mouseEnter}>
                    <NavLink to="/dashboard" activeClassName={classes.active}>
                        <span className="icon-dashboard-sidebar"></span>
                        <ListItemText primary={t('sidebar:dashboard')}/>
                    </NavLink>
                </StyledListItem>
                <StyledListItem display={`${permissions['restful get webform_list_rest_resource'].access}`}   lang={lang} onMouseLeave={mouseLeave}
                                onMouseEnter={mouseEnter}>
                    <NavLink to="/forms" activeClassName={classes.active}>
                        <span className="icon-form-sidebar"></span>
                        <ListItemText primary={t('sidebar:forms')}/>
                    </NavLink>
                </StyledListItem>
                <StyledListItem display="true"  lang={lang} onMouseLeave={mouseLeave}
                                onMouseEnter={mouseEnter}>
                    <NavLink to="/contents" activeClassName={classes.active}>
                        <span className="icon-content-sidebar"></span>
                        <ListItemText primary={t('sidebar:contentManager')}/>
                    </NavLink>
                </StyledListItem>
                <StyledListItem display={`${permissions['access comments'].access}`}  lang={lang} onMouseLeave={mouseLeave}
                                onMouseEnter={mouseEnter}>
                    <NavLink to="/comments" activeClassName={classes.active}>
                        <span className="icon-comment-sidebar"></span>
                        <ListItemText primary={t('sidebar:commentsManager')}/>
                    </NavLink>
                </StyledListItem>
                <StyledListItem display={`${permissions['access reports'].access}`}  lang={lang} onMouseLeave={mouseLeave}
                                onMouseEnter={mouseEnter}>
                    <NavLink to="/taxonomy" activeClassName={classes.active}>
                        <span className="icon-category-sidebar"></span>
                        <ListItemText primary={t('sidebar:categories')}/>
                    </NavLink>
                </StyledListItem>
                <StyledListItem display={`${permissions['administer menu'].access}`} lang={lang} onMouseLeave={mouseLeave}
                                onMouseEnter={mouseEnter}>
                    <NavLink to="/menu" activeClassName={classes.active}>
                        <span className="icon-menu-sidebar"></span>
                        <ListItemText primary={t('sidebar:menu')}/>
                    </NavLink>
                </StyledListItem>
                <StyledListItem display={`${permissions['administer users'].access}`} >
                    {/*_____________________________________________________________________________*/}
                    <StyledExpansionPanel lang={lang}>
                        <NavLink to="/users" activeClassName={classes.active} lang={lang} >
                            <StyledExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" onMouseLeave={mouseLeave}
                                                         onMouseEnter={mouseEnter}>
                                <span className="icon-user-sidebar"></span>
                                <ListItemText primary={t('sidebar:usersManager')}/>
                            </StyledExpansionPanelSummary>
                        </NavLink>
                        <StyledExpansionPanelDetails>
                            <StyledUl>
                                <StyledLi>
                                    <NavLink to="/users/roles" activeClassName={classes.active}>
                                        <ListItemText primary={t('sidebar:roles')}/>
                                    </NavLink>
                                </StyledLi>
                            </StyledUl>
                        </StyledExpansionPanelDetails>
                    </StyledExpansionPanel>
                    {/*_____________________________________________________________________________*/}
                </StyledListItem>
                <StyledListItem display={`${permissions['access reports'].access}`} lang={lang} >
                    {/*_____________________________________________________________________________*/}
                    <StyledExpansionPanel lang={lang}>
                        <NavLink to="/report" activeClassName={classes.active}>
                            <StyledExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content"  onMouseLeave={mouseLeave}
                                                         onMouseEnter={mouseEnter}>
                                <span className="icon-report-sidebar"></span>
                                <ListItemText primary={t('sidebar:reports')}/>
                            </StyledExpansionPanelSummary>
                        </NavLink>
                        <StyledExpansionPanelDetails>
                            <StyledUl>
                                <StyledLi>
                                    <NavLink to="/report/devices" activeClassName={classes.active}>
                                        {/*<span className="icon"></span>*/}
                                        <ListItemText primary={t('sidebar:devices')}/>
                                    </NavLink>
                                </StyledLi>
                                <StyledLi>
                                    <NavLink to="/report/most-seen" activeClassName={classes.active}>
                                        {/*<span className="icon"></span>*/}
                                        <ListItemText primary={t('sidebar:mostSeen')}/>
                                    </NavLink>
                                </StyledLi>
                                <StyledLi>
                                    <NavLink to="/report/keywords" activeClassName={classes.active}>
                                        {/*<span className="icon"></span>*/}
                                        <ListItemText primary={t('sidebar:keywords')}/>
                                    </NavLink>
                                </StyledLi>
                                <StyledLi>
                                    <NavLink to="/report/last-visit" activeClassName={classes.active}>
                                        {/*<span className="icon"></span>*/}
                                        <ListItemText primary={t('sidebar:lastVisit')}/>
                                    </NavLink>
                                </StyledLi>
                                <StyledLi>
                                    <NavLink to="/report/real-time-visit" activeClassName={classes.active}>
                                        {/*<span className="icon"></span>*/}
                                        <ListItemText primary={t('sidebar:realTime')}/>
                                    </NavLink>
                                </StyledLi>
                            </StyledUl>
                        </StyledExpansionPanelDetails>
                    </StyledExpansionPanel>
                    {/*_____________________________________________________________________________*/}
                </StyledListItem>
                <StyledListItem display={`${permissions['restful get get_setting_rest_resource'].access}`} lang={lang} onMouseLeave={mouseLeave}
                                onMouseEnter={mouseEnter}>
                    <NavLink to="/settings" activeClassName={classes.active}>
                        <span className="icon-setting-sidebar"></span>
                        <ListItemText primary={t('sidebar:settings')}/>
                    </NavLink>
                </StyledListItem>
                {/*<StyledListItem lang={lang} img={settingsImg} imghover={settingsImgHover}>*/}
                {/*    <NavLink to='/platform-settings' activeClassName={classes.active}>*/}
                {/*        <span className="icon"></span>*/}
                {/*        <ListItemText primary={t('sidebar:platformSettings')}/>*/}
                {/*    </NavLink>*/}
                {/*</StyledListItem>*/}
                {/*<StyledListItem lang={lang} img={activitiesImg} imghover={activitiesImgHover}>*/}
                {/*    <NavLink to='/activities' activeClassName={classes.active}>*/}
                {/*        <span className="icon"></span>*/}
                {/*        <ListItemText primary={t('sidebar:activities')}/>*/}
                {/*    </NavLink>*/}
                {/*</StyledListItem>*/}
                <StyledListItem lang={lang} display={`${permissions['access tickets'].access}`}>
                    <StyledExpansionPanel lang={lang}>
                        <NavLink to="/ticket" activeClassName={classes.active}>
                            <StyledExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" onMouseLeave={mouseLeave}
                                                         onMouseEnter={mouseEnter}>
                                <span className="icon-support-sidebar"></span>
                                <ListItemText primary={t('sidebar:support')}/>
                            </StyledExpansionPanelSummary>
                        </NavLink>
                        <StyledExpansionPanelDetails>
                            <StyledUl>
                                <StyledLi>
                                    <NavLink to="/ticket/factors" activeClassName={classes.active}>
                                        <ListItemText primary={t('sidebar:factors')}/>
                                    </NavLink>
                                </StyledLi>
                            </StyledUl>
                        </StyledExpansionPanelDetails>
                    </StyledExpansionPanel>
                </StyledListItem>
            </StyledList>
        </StyledSidebar>
    );
}

export default withNamespaces('sidebar,translation,users')(SimpleTabs);
