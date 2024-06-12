import React, { useEffect, useRef, useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Form } from 'antd';
import { IRouteInfo } from '../../type';
import { setDetour } from '../../Store/actions/routeActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from 'antd-mobile';
import AddressAutocomplete from '../../Components/AutoComplete';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';
import Map from '../../Components/Map';

const PROGRESS = 0;
const NEXT_SCREEN = '/deliver/enterDrivingTime';
const MARKS = {
  5: '5 km',
  10: '10 km',
  15: '15 km',
  20: '20 km',
  25: '25 km',
};

const EnterRoute: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const routeInfo = useSelector((state: { route: IRouteInfo }) => state.route);

  console.log('Redux state routeInfo: ', routeInfo); // Log the routeInfo from Redux state

  const [isFormFilled, setIsFormFilled] = useState(false);
  const [departureFilled, setDepartureFilled] = useState(false);
  const [destinationFilled, setDestinationFilled] = useState(false);

  useEffect(() => {
    // Check if both pickup and delivery addresses are filled
    const isBothAddressesFilled = departureFilled && destinationFilled;
    console.log(isBothAddressesFilled);
    setIsFormFilled(isBothAddressesFilled);
  }, [departureFilled, destinationFilled]);

  const handleFormFilledState = (
    addressType: string,
    filledStatus: boolean
  ) => {
    if (addressType === 'departure') {
      setDepartureFilled(filledStatus);
    } else if (addressType === 'destination') {
      setDestinationFilled(filledStatus);
    }
  };

  const [routes, setValues] = useState({
    departure_adress: routeInfo.departure_adress,
    destination_adress: routeInfo.destination_adress,
    acceptable_detour: routeInfo.acceptable_detour || 5, // Set to 5 if routeInfo.acceptable_detour is undefined
  });

  console.log('Local state routes: ', routes); // Log the local state routes

  React.useEffect(() => {
    console.log('Effect triggered with routes change: ', routes); // Log whenever routes state changes
    dispatch(setDetour(routes.acceptable_detour));
  }, [routes]);

  const dispatch = useDispatch();

  type InputEvent = React.ChangeEvent<HTMLInputElement>;
  type SliderValue = number | [number, number];
  type InputValue = SliderValue | InputEvent;

  const handleFormInputChanges = (inputValue: InputValue) => {
    // For a numerical input.
    if (typeof inputValue === 'number') {
      setValues((prevState) => ({
        ...prevState,
        acceptable_detour: inputValue,
      }));
    }
    // For a range slider.
    else if (Array.isArray(inputValue)) {
      // Handle the array case here.
      // For simplicity, I'm just taking the first value as the detour.
      setValues((prevState) => ({
        ...prevState,
        acceptable_detour: inputValue[0],
      }));
    }
    // For a standard input field.
    else if ('target' in inputValue) {
      const { name, value } = inputValue.target;
      setValues((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <PageLayout>
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <h2>{t('driveAddresses.createNewRouteTitle')}</h2>
          <Form.Item
            className="input-wrapper"
            label={t('driveAddresses.departureAddress')}
          >
            <AddressAutocomplete
              type={'departure'}
              savedAddress={routeInfo.departure_adress}
              handleFormFilledState={handleFormFilledState}
            />
          </Form.Item>
          <Form.Item
            className="input-wrapper"
            label={t('driveAddresses.destinationAddress')}
          >
            <AddressAutocomplete
              type={'destination'}
              savedAddress={routeInfo.destination_adress}
              handleFormFilledState={handleFormFilledState}
            />
          </Form.Item>
          <Form.Item
            className="input-wrapper"
            label={t('driveAddresses.acceptableDetour')}
          >
            <Slider
              marks={MARKS}
              ticks
              value={routes.acceptable_detour}
              onChange={handleFormInputChanges}
              max={parseInt(MARKS[25])} // Fix for now, will make it more generic in the future
              min={parseInt(MARKS[5])}
            />
          </Form.Item>
        </Form>

        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton
            onClick={() => {
              logEvent(analytics, 'drive_1_route_back_button_click');
            }}
          />
          <NextButton
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'drive_1_route_next_button_click');
            }}
            disabled={!isFormFilled}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EnterRoute;
