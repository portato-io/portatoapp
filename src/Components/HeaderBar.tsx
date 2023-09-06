import React, { useContext } from 'react';
import { TabBar } from 'antd-mobile';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { analytics } from '../firebaseConfig';
import { logEvent } from 'firebase/analytics';
import {
  AppOutline,
  SendOutline,
  AppstoreOutline,
  TruckOutline,
} from 'antd-mobile-icons';
import { useTranslation } from 'react-i18next';

function HeaderBar({ isInline = false, setOpenMenu }: any) {
  const { t } = useTranslation<string>(); // Setting the generic type to string

  const tabs = [
    {
      key: '/profile',
      title: t('navBar.profile'),
      icon: <i className="icon icon-big icon-profile" />,
    },
  ];

  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const setRouteActive = (value: string) => {
    navigate(value);
  };

  return (
    <header className="layout-header mod-display-flex mod-flex-space-between">
      <Link
        className="mod-nomargin text-color-green icon icon-logo icon-big logo-slogan"
        to="/"
        onClick={() => logEvent(analytics, 'header_menu_logo_button_click')}
      >
        <span>portato</span>
      </Link>
      <nav className="header-navigation-bar">
        <Link
          className="text-color-black"
          to="/profile"
          onClick={() =>
            logEvent(analytics, 'header_menu_profile_button_click')
          }
        >
          <i className="icon icon-profile" />
        </Link>
      </nav>
    </header>
  );
}

export default HeaderBar;
