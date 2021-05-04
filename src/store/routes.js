import CustomizedForm from "features/partials/CustomizedForm";
import BreadcrumbsComponent from 'infrastructure/authorized/header/BreadcrumbsComponent';
import UsersComponent from 'features/user/index.jsx';
import EditProfileComponent from 'features/user/partials/userDrawer/partials/editProfile/Index.jsx';
import ContentsComponent from 'features/content/Index.jsx';
import CommentsComponent from 'features/comment/Index.jsx';
import DashboardComponent from 'features/dashboard/DashboardComponent';
import TicketsComponent from 'features/ticket/Index.jsx';
import TicketComponent from 'features/ticket/partials/TicketComponent.jsx';
import FactorComponent from 'features/ticket/partials/factor/Index.jsx';
import MenuTypeComponent from 'features/menu/partials/MenuTypeComponent.jsx';
import MenuComponent from 'features/menu/Index.jsx';
import MatamoComponent from 'features/matamo/main/Index.jsx';
import DevicesComponent from 'features/matamo/devices/Index.jsx';
import MostSeenContent from 'features/matamo/mostSeen/Index.jsx';
import Keywords from 'features/matamo/keywords/Index.jsx';
import LastVisitDetail from 'features/matamo/lastVisitDetail/Index.jsx';
import RealTime from 'features/matamo/realTime/Index.jsx';
import VocabsComponent from "features/taxonomy/Index.jsx";
import TermsComponent from "features/taxonomy/partials/partials/Index.jsx";
import RoleComponent from "features/user/partials/roles/Index.jsx";
import SettingsComponent from "features/settings/Index.jsx";

import React from "react";

export const routes = [
    {
        path: '/custom',
        breadcrumbs: () => <BreadcrumbsComponent bread="فرم های سفارشی"/>,
        component: () => <CustomizedForm/>
    },
    {
        path: '/comments',
        breadcrumbs: () => <BreadcrumbsComponent bread="commentsManager"/>,
        component: () => <CommentsComponent/>
    },
    {
        path: '/contents',
        breadcrumbs: () => <BreadcrumbsComponent bread="contentManager"/>,
        component: () => <ContentsComponent/>
    },
    // {
    //     path: '/new-content',
    //     breadcrumbs: () => <BreadcrumbsComponent bread="new content"/>,
    //     component: () => <NewContentComponent/>
    // },
    {
        path: '/menu/:type',
        breadcrumbs: () => <BreadcrumbsComponent bread="menu"/>,
        component: () => <MenuComponent/>
    }, {
        path: '/menu',
        breadcrumbs: () => <BreadcrumbsComponent bread="menu"/>,
        component: () => <MenuTypeComponent/>
    },{
        path: '/ticket/factors',
        breadcrumbs: () => <BreadcrumbsComponent bread="factors"/>,
        component: () => <FactorComponent/>
    }, {
        path: '/ticket/:id',
        breadcrumbs: () => <BreadcrumbsComponent bread="support"/>,
        component: () => <TicketComponent/>
    },
    {
        path: '/ticket',
        breadcrumbs: () => <BreadcrumbsComponent bread="support"/>,
        component: () => <TicketsComponent/>
    },
    {
        path: '/taxonomy/:type',
        breadcrumbs: () => <BreadcrumbsComponent bread="categories"/>,
        component: () => <TermsComponent/>
    },
    {
        path: '/taxonomy',
        breadcrumbs: () => <BreadcrumbsComponent bread="categories"/>,
        component: () => <VocabsComponent/>
    },

    {
        path: '/report/devices',
        breadcrumbs: () => <BreadcrumbsComponent bread="devices"/>,
        component: () => <DevicesComponent isLoginSuccess={false}/>
    },
    {
        path: '/report/most-seen',
        breadcrumbs: () => <BreadcrumbsComponent bread="mostSeen"/>,
        component: () => <MostSeenContent isLoginSuccess={false}/>
    },
    {
        path: '/report/keywords',
        breadcrumbs: () => <BreadcrumbsComponent bread="keywords"/>,
        component: () => <Keywords isLoginSuccess={false}/>
    },
    {
        path: '/report/last-visit',
        breadcrumbs: () => <BreadcrumbsComponent bread="lastVisit"/>,
        component: () => <LastVisitDetail isLoginSuccess={false}/>
    },
    {
        path: '/report/real-time-visit',
        breadcrumbs: () => <BreadcrumbsComponent bread="realTime"/>,
        component: () => <RealTime isLoginSuccess={false}/>
    },
    {
        path: '/report',
        breadcrumbs: () => <BreadcrumbsComponent bread="reports"/>,
        component: () => <MatamoComponent isLoginSuccess={false}/>
    },
    {
        path: '/settings',
        breadcrumbs: () => <BreadcrumbsComponent bread="settings"/>,
        component: () => <SettingsComponent isLoginSuccess={false}/>
    },
    // {
    //     path: '/platform-settings',
    //     breadcrumbs: () => <BreadcrumbsComponent bread="platformSettings"/>,
    //     component: () => <DashboardComponent isLoginSuccess={false}/>
    // },
    {
        path: '/activities',
        breadcrumbs: () => <BreadcrumbsComponent bread="activities"/>,
        component: () => <DashboardComponent isLoginSuccess={false}/>
    },
    {
        path: '/users/roles',
        breadcrumbs: () => <BreadcrumbsComponent bread="roles"/>,
        component: () => <RoleComponent isLoginSuccess={false}/>
    },
    {
        path: '/users',
        breadcrumbs: () => <BreadcrumbsComponent bread="users"/>,
        component: () => <UsersComponent/>
    },{
        path: '/edit-profile',
        breadcrumbs: () => <BreadcrumbsComponent bread="editProfile"/>,
        component: () => <EditProfileComponent/>
    },
    {
        path: '/',
        breadcrumbs: () => <BreadcrumbsComponent bread="home"/>,
        component: () => <DashboardComponent isLoginSuccess={false}/>
    }


];
