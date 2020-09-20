import loadable from '@loadable/component'

const HeaderWebComponent = loadable(() => import('components/header/HeaderWebComponent'));
const HeaderMobileComponent = loadable(() => import('components/header/HeaderMobileComponent'));
const ContentComponent = loadable(() => import('components/content'));
const SidebarComponent = loadable(() => import('components/sidebar/SidebarComponent'));
const LoginComponent = loadable(() => import('components/content/user/usersList/forms/LoginComponent.jsx'));
const ForgetPasswordComponent = loadable(() => import('components/content/user/usersList/forms/ForgetPasswordComponent'));
const AuthorizedComponent = loadable(() => import('structure/authorized/authorized.jsx'));
export {HeaderWebComponent,
    HeaderMobileComponent,ContentComponent,
    SidebarComponent,LoginComponent,
    AuthorizedComponent,ForgetPasswordComponent}
