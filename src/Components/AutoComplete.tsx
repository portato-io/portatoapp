import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { Input } from 'antd';
import { Select } from 'antd';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFuemF6ZmlhIiwiYSI6ImNsaWFxcHcyNDA2NWIzanAzYndnNmp2bWgifQ.gybdLCNw_Wmysr5s9Ww51Q';

interface Address {
  place_name: string;
  center: [number, number];
}
interface Option {
  value: string;
  label: string;
}

const AddressAutocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleAddressSelect = (value: string) => {
    const selected = addresses.find((address) => address.place_name === value);
    setSelectedAddress(selected || null);
    setInputValue(value);
    setAddresses([]);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
    setInputValue(value);

    // Call Mapbox Geocoding API for autocomplete suggestions
    if (value.trim() !== '') {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?autocomplete=true&types=address&country=CH&access_token=${mapboxgl.accessToken}`
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
      <Select
        showSearch
        placeholder="Enter an address"
        style={{ width: '80vw' }}
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
