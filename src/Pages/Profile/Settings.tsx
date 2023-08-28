import React, { useState, useEffect } from 'react';
import ProfilePageLayout from '../Layouts/ProfilePagesLayout';
import { Cascader, Form, Button } from 'antd-mobile';
import i18next from 'i18next';
import { getConstants } from '../../constant';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

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
      <Title
        level={2}
        style={{
          display: 'inline',
          position: 'absolute',
          marginTop: '12vh',
          marginLeft: '5vw',
        }}
      >
        {t('settings.title')}
      </Title>
      <Form style={{ position: 'absolute', marginTop: '20vh', width: '100vw' }}>
        <Form.Item label={t('settings.languageLabel')}>
          <Cascader
            placeholder=" "
            cancelText="Cancel"
            confirmText="Confirm"
            options={LANGUAGE_OPTIONS}
            visible={visible}
            onSelect={onSelectLanguage}
            onClose={() => {
              setVisible(false);
            }}
          />
          <Typography
            style={{
              position: 'absolute',
              right: '25vw',
              display: 'inline',
              top: '2vh',
            }}
          >
            {language}
          </Typography>
          <Button
            style={{ position: 'absolute', right: '5vw', top: '0.7vh' }}
            onClick={() => {
              setVisible(true);
            }}
          >
            <ArrowRightOutlined />
          </Button>
        </Form.Item>
      </Form>
    </ProfilePageLayout>
  );
};

export default Settings;
