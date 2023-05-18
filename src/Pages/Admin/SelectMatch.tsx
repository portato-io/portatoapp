import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { database } from '../../firebaseConfig';
import { ref, get } from 'firebase/database';

const SelectMatch: React.FC<{
  route_id: string;
}> = () => {
  const [inputValue, setInputValue] = useState('');

  const suggestRequest = (value: string) => {
    // implement your function here
    console.log('Value submitted: ', value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    suggestRequest(inputValue);
  };

  return (
    <PageLayout>
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
