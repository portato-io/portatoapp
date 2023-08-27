import { lazy } from 'react';

// other
import { FC } from 'react';
import MyAccount from './Pages/Profile/MyAccount';

// pages
const About = lazy(() => import('./Pages/About'));
const Home = lazy(() => import('./Pages/Home'));
const TermsAndConditions = lazy(() => import('./Pages/TermsAndConditions'));
const FAQ = lazy(() => import('./Pages/FAQ'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
const Imprint = lazy(() => import('./Pages/Imprint'));
const Profile = lazy(() => import('./Pages/Menu'));
const EnterRequestNameDesc = lazy(
  () => import('./Pages/Sender/EnterRequestNameDesc')
);
const EnterRequestSizeWeightImage = lazy(
  () => import('./Pages/Sender/EnterRequestSizeWeightImage')
);
const Deliver = lazy(() => import('./Pages/Driver/Deliver'));
const Chat = lazy(() => import('./Pages/Chat'));
const Shipments = lazy(() => import('./Pages/Shipments'));
const EnterRequestAddress = lazy(
  () => import('./Pages/Sender/EnterRequestAddress')
);
const EnterRequestTime = lazy(() => import('./Pages/Sender/EnterRequestTime'));
const EnterRequestPrice = lazy(
  () => import('./Pages/Sender/EnterRequestPrice')
);
const RequestSummary = lazy(() => import('./Pages/Sender/RequestSummary'));
const UserRequests = lazy(() => import('./Pages/UserRequestsScreen'));
const AdminDashboard = lazy(() => import('./Pages/Admin/AdminDashboard'));
const AllRequests = lazy(() => import('./Pages/Admin/AllRequests'));
const AllRoutesAdmin = lazy(() => import('./Pages/Admin/AllRoutes'));
const AllRoutes = lazy(() => import('./Pages/Sender/AllRoutes'));
const ContactSupport = lazy(
  () => import('./Pages/Profile/Support/ContactSupport')
);
const CreateSendRequest = lazy(
  () => import('./Pages/Sender/CreateSendRequest')
);
const EnterRoute = lazy(() => import('./Pages/Driver/enterRoute'));
const EnterDrivingTime = lazy(() => import('./Pages/Driver/enterDrivingTime'));
const EnterDeliveryCapacity = lazy(
  () => import('./Pages/Driver/enterDeliveryCapacity')
);
const RouteSummary = lazy(() => import('./Pages/Driver/RouteSummary'));
const DealSuggester = lazy(() => import('./Pages/Admin/DealSuggester'));
const ContactDriver = lazy(
  () => import('./Pages/Profile/Support/ContactDriver')
);

import Settings from './Pages/Profile/Settings';

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
    key: 'FAQ-route',
    title: 'FAQ',
    path: '/FAQ',
    enabled: true,
    component: FAQ,
  },
  {
    key: 'termsAndConditions-route',
    title: 'TermsAndConditions',
    path: '/termsAndConditions',
    enabled: true,
    component: TermsAndConditions,
  },
  {
    key: 'privacyPolicy-route',
    title: 'PrivacyPolicy',
    path: '/privacyPolicy',
    enabled: true,
    component: PrivacyPolicy,
  },
  {
    key: 'imprint-route',
    title: 'Imprint',
    path: '/imprint',
    enabled: true,
    component: Imprint,
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
    key: 'EnterRequestNameDesc-route',
    title: 'EnterRequestNameDesc',
    path: '/createSendRequest/enter_request_name_desc',
    enabled: true,
    component: EnterRequestNameDesc,
  },
  {
    key: 'EnterRequestSizeWeightImage-route',
    title: 'EnterRequestSizeWeightImage',
    path: '/createSendRequest/enter_request_size_weight_image',
    enabled: true,
    component: EnterRequestSizeWeightImage,
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
    key: 'enterRequestAddress-route',
    title: 'EnterRequestAddress',
    path: '/createSendRequest/enter_request_address',
    enabled: true,
    component: EnterRequestAddress,
  },
  {
    key: 'enterRequestTime-route',
    title: 'EnterRequestTime',
    path: '/createSendRequest/enter_request_time',
    enabled: true,
    component: EnterRequestTime,
  },
  {
    key: 'enterRequestPrice-route',
    title: 'EnterRequestPrice',
    path: '/createSendRequest/enter_request_price',
    enabled: true,
    component: EnterRequestPrice,
  },
  {
    key: 'summary-request',
    title: 'SummaryRequest',
    path: '/createSendRequest/request-summary',
    enabled: true,
    component: RequestSummary,
  },
  {
    key: 'user-requests',
    title: 'UserRequests',
    path: '/profile/user_requests',
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
    key: 'all-routes-admin',
    title: 'AllRoutesAdmin',
    path: '/admin/all_routes',
    enabled: true,
    component: AllRoutesAdmin,
  },
  {
    key: 'deal-suggester',
    title: 'DealSuggester',
    path: '/admin/deal_suggester/:request_id/:request_uid',
    enabled: true,
    component: DealSuggester,
  },
  {
    key: 'contact-support',
    title: 'ContactSupport',
    path: '/contact_support',
    enabled: true,
    component: ContactSupport,
  },
  {
    key: 'contact-driver',
    title: 'ContactDriver',
    path: '/contact_driver/:route_uid/:request_uid/:request_id',
    enabled: true,
    component: ContactDriver,
  },
  {
    key: 'settings',
    title: 'Settings',
    path: '/profile/settings',
    enabled: true,
    component: Settings,
  },
  {
    key: 'my-account',
    title: 'MyAccount',
    path: '/profile/my-account',
    enabled: true,
    component: MyAccount,
  },
  {
    key: 'all-routes',
    title: 'AllRoutes',
    path: '/sender/all_routes',
    enabled: true,
    component: AllRoutes,
  },
];
