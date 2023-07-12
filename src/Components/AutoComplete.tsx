import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { AutoComplete, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { IRequestInfo, IRouteInfo } from '../type';
import {
  setReqDeliveryAddress,
  setReqPickupAddress,
} from '../Store/actions/requestActionCreators';
import {
  setRouteDepartureAddress,
  setRouteDestinationAddress,
} from '../Store/actions/routeActionCreators';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFuemF6ZmlhIiwiYSI6ImNsaWFxcHcyNDA2NWIzanAzYndnNmp2bWgifQ.gybdLCNw_Wmysr5s9Ww51Q';

interface Address {
  place_name: string;
  center: [number, number];
}

const AddressAutocomplete: React.FC<{ type: string; savedAddress: string }> = ({
  type,
  savedAddress,
}) => {
  const { t } = useTranslation<string>();
  const [inputValue, setInputValue] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const dispatch = useDispatch();

  const onChange = (value: string) => {
    //setSelectedAddress(value || null);
    switch (type) {
      case 'pickup':
        dispatch(setReqPickupAddress(value));
        break;
      case 'delivery':
        dispatch(setReqDeliveryAddress(value));
        break;
      case 'departure':
        dispatch(setRouteDepartureAddress(value));
        break;
      case 'destination':
        dispatch(setRouteDestinationAddress(value));
        break;
      default:
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
