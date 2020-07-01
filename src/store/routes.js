import BaseFormComponent from "../components/content/partials/BaseFormComponent";
import CustomizedForm from "../components/content/partials/CustomizedForm";
import BreadcrumbsComponent from './../components/header/BreadcrumbsComponent';
import UsersComponent from '../components/content/user/UsersComponent';
import NewUserComponent from '../components/content/user/forms/NewUserComponent';
import EditUserComponent from '../components/content/user/forms/EditUserComponent';
import ContentsComponent from '../components/content/content/ContentsComponent';
import CommentsComponent from '../components/content/comment/CommentsComponent';
import DashboardComponent from '../components/content/dashboard/DashboardComponent';
import NewContentComponent from '../components/content/content/forms/NewContentComponent';

import React from "react";

export const routes = [
    {
        path: '/',
        exact: true,
        breadcrumbs: () => <BreadcrumbsComponent bread="صفحه اصلی"/>,
        component: () => <BaseFormComponent/>
    },
    {
        path: '/custom',
        breadcrumbs: () => <BreadcrumbsComponent bread="فرم های سفارشی"/>,
        component: () => <CustomizedForm/>
    },
    {
        path: '/users',
        breadcrumbs: () => <BreadcrumbsComponent bread="کاربران"/>,
        component: () => <UsersComponent/>
    },
    {
        path: '/new-user',
        breadcrumbs: () => <BreadcrumbsComponent bread="ایجاد کاربر جدید"/>,
        component: () => <NewUserComponent/>
    },
    {
        path: '/edit-user/:id',
        breadcrumbs: () => <BreadcrumbsComponent bread="ویرایش پروفایل"/>,
        // component: (props) => <EditUserComponent {...props}/>
        component: () => <EditUserComponent/>
    },
    {
        path: '/comments',
        breadcrumbs: () => <BreadcrumbsComponent bread="کامنت ها"/>,
        component: () => <CommentsComponent/>
    },
    {
        path: '/contents',
        breadcrumbs: () => <BreadcrumbsComponent bread="محتواها"/>,
        component: () => <ContentsComponent/>
    },
    {
        path: '/new-content',
        breadcrumbs: () => <BreadcrumbsComponent bread="محتواها"/>,
        component: () => <NewContentComponent/>
    },
    {
        path: '/dashboard',
        breadcrumbs: () => <BreadcrumbsComponent bread="داشبورد"/>,
        component: () => <DashboardComponent/>
    }
];