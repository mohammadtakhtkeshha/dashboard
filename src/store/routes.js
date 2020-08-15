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
import TermsComponent from "../components/content/content/TermsComponent";
import VocabsComponent from "../components/content/content/VocabsComponent";
import TagsComponent from "../components/content/content/TagsComponent";
import ForgetPasswordComponent from "../components/content/user/forms/ForgetPasswordComponent";


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
    // {
    //     path: '/new-user',
    //     breadcrumbs: () => <BreadcrumbsComponent bread="new user"/>,
    //     component: () => <NewUserComponent/>
    // },
    {
        path: '/edit-user/:id',
        breadcrumbs: () => <BreadcrumbsComponent bread="editProfile"/>,
        // component: (props) => <EditUserComponent {...props}/>
        component: () => <EditUserComponent/>
    },
    {
        path: '/comments',
        breadcrumbs: () => <BreadcrumbsComponent bread="comments"/>,
        component: () => <CommentsComponent/>
    },
    {
        path: '/contents',
        breadcrumbs: () => <BreadcrumbsComponent bread="contents"/>,
        component: () => <ContentsComponent/>
    },
    {
        path: '/new-content',
        breadcrumbs: () => <BreadcrumbsComponent bread="new content"/>,
        component: () => <NewContentComponent/>
    },

    {
        path: '/terms',
        breadcrumbs: () => <BreadcrumbsComponent bread="terms"/>,
        component: () => <TermsComponent/>
    },{
        path: '/vocabs',
        breadcrumbs: () => <BreadcrumbsComponent bread="vocabs"/>,
        component: () => <VocabsComponent/>
    },{
        path: '/tags',
        breadcrumbs: () => <BreadcrumbsComponent bread="vocabs"/>,
        component: () => <TagsComponent/>
    },
    {
        path: '/',
        breadcrumbs: () => <BreadcrumbsComponent bread="dashboard" />,
        component: () => <DashboardComponent isLoginSuccess={false}/>
    },
    // ,{
    //     path: '/forget-password',
    //     // breadcrumbs: () => <BreadcrumbsComponent bread="forgetPass"/>,
    //     component: () => <ForgetPasswordComponent/>
    // }
];