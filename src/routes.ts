import { lazy } from 'react';

// other
import { FC } from 'react';

// pages
const About = lazy(() => import('./Pages/About'));
const Home = lazy(() => import('./Pages/Home'));
const Profile = lazy(() => import('./Pages/Profile'));
const EnterObjInfo = lazy(() => import('./Pages/Sender/EnterObjInfo'));
const Deliver = lazy(() => import('./Pages/Deliver'));
const Chat = lazy(() => import('./Pages/Chat'));
const Shipments = lazy(() => import('./Pages/Shipments'));
const EnterAddress = lazy(() => import('./Pages/Sender/EnterAddress'));
const EnterTime = lazy(() => import('./Pages/Sender/EnterTime'));
const EnterPrice = lazy(() => import('./Pages/Sender/EnterPrice'));
const Summary = lazy(() => import('./Pages/Sender/Summary'));
const UserRequests = lazy(() => import('./Pages/UserRequestsScreen'));
const AdminDashboard = lazy(() => import('./Pages/Admin/AdminDashboard'));
const AllRequests = lazy(() => import('./Pages/Admin/AllRequests'));
const AllRoutes = lazy(() => import('./Pages/Admin/AllRoutes'));
const CreateSendRequest = lazy(
  () => import('./Pages/Sender/CreateSendRequest')
);

// interface
interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<object>;
}

export const routes: Array<Route> = [
  {
    key: 'home-route',
    title: 'Home',
    path: '/',
    enabled: true,
    component: Home,
  },
  {
    key: 'about-route',
    title: 'About',
    path: '/about',
    enabled: true,
    component: About,
  },
  {
    key: 'profile-route',
    title: 'Profile',
    path: '/profile',
    enabled: true,
    component: Profile,
  },
  {
    key: 'createSendRequest-route',
    title: 'CreateSendRequest',
    path: '/createSendRequest',
    enabled: true,
    component: CreateSendRequest,
  },
  {
    key: 'enterObjInfo-route',
    title: 'EnterObjInfo',
    path: '/createSendRequest/enterObjInfo',
    enabled: true,
    component: EnterObjInfo,
  },
  {
    key: 'deliver-route',
    title: 'Deliver',
    path: '/deliver',
    enabled: true,
    component: Deliver,
  },
  {
    key: 'chat-route',
    title: 'Chat',
    path: '/chat',
    enabled: true,
    component: Chat,
  },
  {
    key: 'shipments-route',
    title: 'Shipments',
    path: '/shipments',
    enabled: true,
    component: Shipments,
  },
  {
    key: 'enterAddress-route',
    title: 'EnterAddress',
    path: '/createSendRequest/enter_address',
    enabled: true,
    component: EnterAddress,
  },
  {
    key: 'enterTime-route',
    title: 'EnterTime',
    path: '/createSendRequest/enter_time',
    enabled: true,
    component: EnterTime,
  },
  {
    key: 'enterPrice-route',
    title: 'EnterPrice',
    path: '/createSendRequest/enter_price',
    enabled: true,
    component: EnterPrice,
  },
  {
    key: 'summary-route',
    title: 'Summary',
    path: '/createSendRequest/summary',
    enabled: true,
    component: Summary,
  },
  {
    key: 'user-requests',
    title: 'UserRequests',
    path: '/profile/user_requests',
    enabled: true,
    component: UserRequests,
  },
  {
    key: 'all-requests',
    title: 'AllRequests',
    path: '/admin/all_requests',
    enabled: true,
    component: AllRequests,
  },
  {
    key: 'admin-dashboard',
    title: 'AdminDashboard',
    path: '/admin/admin_dashboard',
    enabled: true,
    component: AdminDashboard,
  },
  {
    key: 'all-routes',
    title: 'AllRoutes',
    path: '/admin/all_routes',
    enabled: true,
    component: AllRoutes,
  },
];
