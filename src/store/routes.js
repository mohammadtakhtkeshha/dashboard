import BaseFormComponent from "../components/content/partials/BaseFormComponent";
import CustomizedForm from "../components/content/partials/CustomizedForm";
import BreadcrumbsComponent from './../components/header/BreadcrumbsComponent';
import UsersComponent from '../components/content/user/index.jsx';
import ContentsComponent from '../components/content/content/Index.jsx';
import CommentsComponent from '../components/content/comment/Index.jsx';
import DashboardComponent from '../components/content/dashboard/DashboardComponent';
import TicketsComponent from '../components/content/ticket/Index.jsx';
import TestComponent from '../components/content/test/Index.jsx';
import TicketComponent from '../components/content/ticket/partials/TicketComponent.jsx';
import MenuTypeComponent from '../components/content/menu/partials/MenuTypeComponent.jsx';
import MenuComponent from '../components/content/menu/Index.jsx';
import MatamoComponent from '../components/content/matamo/main/Index.jsx';
import DevicesComponent from '../components/content/matamo/devices/Index.jsx';
import MostSeenContent from '../components/content/matamo/mostSeen/Index.jsx';
import Keywords from '../components/content/matamo/keywords/Index.jsx';
import LastVisitDetail from '../components/content/matamo/lastVisitDetail/Index.jsx';
import RealTime from '../components/content/matamo/realTime/Index.jsx';
import VocabsComponent from "../components/content/taxonomy/Index.jsx";
import TermsComponent from "../components/content/taxonomy/partials/partials/Index.jsx";
import PermissionComponent from "components/content/permissions/Index.jsx";

import React from "react";

export const routes = [
    {
        path: '/base',
        exact: true,
        breadcrumbs: () => <BreadcrumbsComponent bread="main-page"/>,
        component: () => <BaseFormComponent/>
    },
    {
        path: '/custom',
        breadcrumbs: () => <BreadcrumbsComponent bread="فرم های سفارشی"/>,
        component: () => <CustomizedForm/>
    },
    {
        path: '/users',
        breadcrumbs: () => <BreadcrumbsComponent bread="users"/>,
        component: () => <UsersComponent/>
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
    }, {
        path: '/ticket/:id',
        breadcrumbs: () => <BreadcrumbsComponent bread="support"/>,
        component: () => <TicketComponent/>
    }, {
        path: '/ticket',
        breadcrumbs: () => <BreadcrumbsComponent bread="support"/>,
        component: () => <TicketsComponent/>
    }, {
        path: '/test',
        breadcrumbs: () => <BreadcrumbsComponent bread="support"/>,
        component: () => <TestComponent/>
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
        component: () => <DashboardComponent isLoginSuccess={false}/>
    },
    {
        path: '/platform-settings',
        breadcrumbs: () => <BreadcrumbsComponent bread="platformSettings"/>,
        component: () => <DashboardComponent isLoginSuccess={false}/>
    },
    {
        path: '/activities',
        breadcrumbs: () => <BreadcrumbsComponent bread="activities"/>,
        component: () => <DashboardComponent isLoginSuccess={false}/>
    },
    {
        path: '/permissions',
        breadcrumbs: () => <BreadcrumbsComponent bread="home"/>,
        component: () => <PermissionComponent isLoginSuccess={false}/>
    },
    {
        path: '/',
        breadcrumbs: () => <BreadcrumbsComponent bread="home"/>,
        component: () => <DashboardComponent isLoginSuccess={false}/>
    }


];
