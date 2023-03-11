import {lazy} from "react";

// other
import {FC} from "react";
// pages
const About = lazy(() => import('./Pages/About'));
const Home = lazy(() => import('./Pages/Home'));
const Profile = lazy(() => import('./Pages/Profile'))



// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'about-route',
        title: 'About',
        path: '/about',
        enabled: true,
        component: About
    },
    {
        key: 'profile-route',
        title: 'Profile',
        path: '/profile',
        enabled: true,
        component: Profile
    }
]
