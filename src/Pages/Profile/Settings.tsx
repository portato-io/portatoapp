import React, { useState, useEffect } from 'react';
import ProfilePageLayout from '../Layouts/ProfilePagesLayout';
import { Cascader, Form, Button } from 'antd-mobile';
import i18next from 'i18next';
import { getConstants } from '../../constant';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';
import { Selector } from 'antd-mobile';
import BackButton from '../../Components/Buttons/BackButton';

const Settings: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const { DAYS, TIME, CAPACITY_OPTIONS, LANGUAGE_OPTIONS } = getConstants(t);
  const { Title } = Typography;
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState<string>();
  const changeLanguage = (language: string) => {
    i18next.changeLanguage(language);
  };

  const onSelectLanguage = (value: any) => {
    const languageOption = LANGUAGE_OPTIONS.find(
      (option) => option.value == value
    );
    if (languageOption) {
      setLanguage(languageOption.label);
      changeLanguage(value);
    }
  };

  useEffect(() => {
    const languageOption = LANGUAGE_OPTIONS.find(
      (option) => option.value == i18next.language
    );
    setLanguage(languageOption?.label);
  }, []);

  return (
    <ProfilePageLayout>
      <div className="section">
        <h4 className="title title-h4">{t('settings.title')}</h4>
        <div className="spacer-regular"></div>
        <Form className="portato-form">
          <div className="input-wrapper">
            <label>{t('settings.languageLabel')}</label>
            <Selector
              options={LANGUAGE_OPTIONS}
              multiple={false}
              onChange={onSelectLanguage}
            />
          </div>
        </Form>
        <div className="spacer-big"></div>
        <BackButton />
      </div>
    </ProfilePageLayout>
  );
};

export default Settings;
