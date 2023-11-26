import React, { useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { AutoComplete } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  setReqDeliveryAddress,
  setReqPickupAddress,
} from '../Store/actions/requestActionCreators';
import {
  setRouteDepartureAddress,
  setRouteDestinationAddress,
} from '../Store/actions/routeActionCreators';

import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from 'react-geocode';

if (process.env.REACT_APP_GOOGLE_MAP_API_KEY)
  setKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFuemF6ZmlhIiwiYSI6ImNsaWFxcHcyNDA2NWIzanAzYndnNmp2bWgifQ.gybdLCNw_Wmysr5s9Ww51Q';

interface Address {
  place_name: string;
  center: [number, number];
}

const handleAddress = async (address: string) => {
  try {
    const { results } = await fromAddress(address);
    if (
      results &&
      results.length > 0 &&
      results[0].geometry &&
      results[0].geometry.location
    ) {
      const { lat, lng } = results[0].geometry.location;
      return [lat, lng];
    }
  } catch (error) {
    console.error(`Error geocoding address: ${address}`, error);
    return [];
  }
};

const AddressAutocomplete: React.FC<{
  type: string;
  savedAddress: string;
  handleFormFilledState?: (type: string, adressfilled: boolean) => void;
}> = ({ type, savedAddress, handleFormFilledState }) => {
  if (savedAddress == '') {
    if (handleFormFilledState) {
      handleFormFilledState(type, false);
    }
  } else {
    if (handleFormFilledState) {
      handleFormFilledState(type, true);
    }
  }
  const { t } = useTranslation<string>();
  const [inputValue, setInputValue] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [lat_lng, setLatLng] = useState<any[]>();

  const dispatch = useDispatch();

  const onChange = (value: string) => {
    //setSelectedAddress(value || null);
    handleAddress(value).then((coordinates) => {
      if (coordinates) {
        const lat_lng = coordinates;
        console.log(lat_lng);
        setLatLng(lat_lng);
      }
    });
    if (lat_lng) {
      console.log('dans le switch', lat_lng);
      switch (type) {
        case 'pickup':
          dispatch(setReqPickupAddress(value, lat_lng));
          break;
        case 'delivery':
          dispatch(setReqDeliveryAddress(value, lat_lng));
          break;
        case 'departure':
          dispatch(setRouteDepartureAddress(value));
          break;
        case 'destination':
          dispatch(setRouteDestinationAddress(value));
          break;
        default:
      }
    }
    console.log(`selected ${value}`);
  };

  const handleAddressSelect = (value: string) => {
    const selected = addresses.find((address) => address.place_name === value);
    setSelectedAddress(selected?.place_name || null);
    setInputValue(value);
    setAddresses([]);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
    setInputValue(value);

    // Call Mapbox Geocoding API for autocomplete suggestions (add europe)
    if (value.trim() !== '') {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?autocomplete=true&types=address,place&country=CH&access_token=${mapboxgl.accessToken}`
        )
        .then((response) => {
          setAddresses(response.data.features);
        })
        .catch((error) => {
          console.error('Error fetching addresses:', error);
        });
    } else {
      setAddresses([]);
    }
  };
  return (
    <div>
      <AutoComplete
        showSearch
        placeholder={t('addressField.placeholder')}
        value={savedAddress}
        className="form-input-wrapper"
        options={addresses.map((address) => ({
          value: address.place_name,
          label: address.place_name,
        }))}
        onChange={onChange}
        onSelect={handleAddressSelect}
        onSearch={onSearch}
      />
    </div>
  );
};

export default AddressAutocomplete;
