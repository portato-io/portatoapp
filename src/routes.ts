import { lazy } from 'react';

// other
import { FC } from 'react';

// pages
const About = lazy(() => import('./Pages/About'));
const Home = lazy(() => import('./Pages/Home'));
const Profile = lazy(() => import('./Pages/Profile'));
const EnterObjInfo = lazy(() => import('./Pages/Sender/EnterObjInfo'));
const Deliver = lazy(() => import('./Pages/Driver/Deliver'));
const Chat = lazy(() => import('./Pages/Chat'));
const Shipments = lazy(() => import('./Pages/Shipments'));
const EnterAddress = lazy(() => import('./Pages/Sender/EnterAddress'));
const EnterTime = lazy(() => import('./Pages/Sender/EnterTime'));
const EnterPrice = lazy(() => import('./Pages/Sender/EnterPrice'));
const Summary = lazy(() => import('./Pages/Sender/Summary'));
const UserRequests = lazy(() => import('./Pages/UserRequestsScreen'));
const CreateSendRequest = lazy(
  () => import('./Pages/Sender/CreateSendRequest')
);
const EnterRoute = lazy(() => import('./Pages/Driver/enterRoute'));
const EnterDrivingTime = lazy(() => import('./Pages/Driver/enterDrivingTime'));
const EnterDeliveryCapacity = lazy(
  () => import('./Pages/Driver/enterDeliveryCapacity')
);
const RouteSummary = lazy(() => import('./Pages/Driver/RouteSummary'));

// interface
interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
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
    path: '/enterObjInfo',
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
    path: '/enter_address',
    enabled: true,
    component: EnterAddress,
  },
  {
    key: 'enterTime-route',
    title: 'EnterTime',
    path: '/enter_time',
    enabled: true,
    component: EnterTime,
  },
  {
    key: 'enterPrice-route',
    title: 'EnterPrice',
    path: '/enter_price',
    enabled: true,
    component: EnterPrice,
  },
  {
    key: 'summary-route',
    title: 'Summary',
    path: '/summary',
    enabled: true,
    component: Summary,
  },
  {
    key: 'user-requests',
    title: 'UserRequests',
    path: '/user_requests',
    enabled: true,
    component: UserRequests,
  },
  {
    key: 'enterRoute-route',
    title: 'EnterRoute',
    path: '/deliver/enterRoute',
    enabled: true,
    component: EnterRoute,
  },
  {
    key: 'enterDrivingTime-route',
    title: 'EnterDrivingTime',
    path: '/deliver/enterDrivingTime',
    enabled: true,
    component: EnterDrivingTime,
  },
  {
    key: 'enterDeliveryCapacity-route',
    title: 'EnterDeliveryCapacity',
    path: '/deliver/enterDeliveryCapacity',
    enabled: true,
    component: EnterDeliveryCapacity,
  },
  {
    key: 'routeSummary-route',
    title: 'RouteSummary',
    path: '/deliver/routeSummary',
    enabled: true,
    component: RouteSummary,
  },
];
