import { useState } from 'react';
import '../CSS/SwitchContainerStyle.css';

enum SwitchOptions {
  OPTION1 = 'Single trip',
  OPTION2 = 'Recurrent',
}

export default function SwitchContainer() {
  const [activeOption, setActiveOption] = useState<SwitchOptions>(
    SwitchOptions.OPTION1
  );

  const handleSwitchClick = (option: SwitchOptions) => {
    setActiveOption(option);
  };

  return (
    <div className="background">
      <div className="SwitchContainer">
        <div
          className="ToggleItem"
          style={{
            backgroundColor:
              activeOption === SwitchOptions.OPTION1 ? 'white' : 'transparent',
          }}
          onClick={() => handleSwitchClick(SwitchOptions.OPTION1)}
        >
          <div className={'Text'}>Single Trip</div>
        </div>
        <div
          className="ToggleItem"
          style={{
            backgroundColor:
              activeOption === SwitchOptions.OPTION2 ? 'white' : 'transparent',
          }}
          onClick={() => handleSwitchClick(SwitchOptions.OPTION2)}
        >
          <div className={'Text'}>Recurrent</div>
        </div>
      </div>
    </div>
  );
}
