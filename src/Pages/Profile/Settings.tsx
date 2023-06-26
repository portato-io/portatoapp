import React, { useState, useEffect } from 'react';
import ProfilePageLayout from '../Layouts/ProfilePagesLayout';
import { Cascader, Form, Button, Switch } from 'antd-mobile';
import i18next from 'i18next';
import { LANGUAGE_OPTIONS } from '../../constant';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const Settings: React.FC = () => {
  const { Title } = Typography;
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState<string>();
  const changeLanguage = (language: string) => {
    i18next.changeLanguage(language);
  };

  const onSelectLanguage = (value: any) => {
    const languageOption = LANGUAGE_OPTIONS.find(
      (option) => option.value === value
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
        Settings
      </Title>
      <Form style={{ position: 'absolute', marginTop: '20vh', width: '100vw' }}>
        <Form.Item label="Language">
          {/* <Typography style={{ display: 'inline' }}>Language</Typography> */}
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
        <Form.Item label="Notifications">
          <Switch style={{ position: 'absolute', right: '5vw', top: '1vh' }} />
        </Form.Item>
        <Form.Item label="Dark Mode">
          <Switch style={{ position: 'absolute', right: '5vw', top: '1vh' }} />
        </Form.Item>
      </Form>
    </ProfilePageLayout>
  );
};

export default Settings;
