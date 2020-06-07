import BaseFormComponent from "../components/content/partials/BaseFormComponent";
import CustomizedForm from "../components/content/partials/CustomizedForm";
import BreadcrumbsComponent from './../components/header/BreadcrumbsComponent'
import UsersComponent from './../components/content/partials/UsersComponent'
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
    }
];