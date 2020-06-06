import loadable from '@loadable/component'


const HeaderWebComponent = loadable(() => import('../../components/header/HeaderWebComponent'));
const HeaderMobileComponent = loadable(() => import('../../components/header/HeaderMobileComponent'));
const ContentComponent = loadable(() => import('../../components/content/ContentComponent'));
const SidebarComponent = loadable(() => import('../../components/sidebar/SidebarComponent'));
const TestComponent = loadable(() => import('../../components/TestComponent'));
export {HeaderWebComponent,HeaderMobileComponent,ContentComponent,SidebarComponent,TestComponent}