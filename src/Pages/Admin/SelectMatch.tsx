import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { database } from '../../firebaseConfig';
import { ref, get } from 'firebase/database';

interface SelectMatchProps {
  route_id: string;
}

const SelectMatch: React.FC<SelectMatchProps> = ({ route_id }) => {
  const [inputValue, setInputValue] = useState('');

  const suggestRequest = (value: string) => {
    // implement your function here
    console.log('Value submitted: ', value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    suggestRequest(inputValue);
  };

  return (
    <PageLayout>
      <h1>Input matching request for {route_id}</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your text here"
      />
      <button onClick={handleSubmit}>Validate</button>
    </PageLayout>
  );
};

export default SelectMatch;
