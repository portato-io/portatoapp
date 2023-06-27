import React, { ReactNode } from 'react';
import { Selector, SelectorProps } from 'antd-mobile';
import styled from 'styled-components';

declare type SelectorValue = string | number;

type CustomSelectorProps<V extends SelectorValue> = SelectorProps<V> & {
  prefixIcons?: ReactNode[];
};

const CustomSelector = <V extends SelectorValue>({
  prefixIcons,
  children,
  ...rest
}: React.PropsWithChildren<CustomSelectorProps<V>>) => {
  return (
    <div>
      {prefixIcons && (
        <div className="prefix-icons-wrapper">
          {prefixIcons.map((icon, index) => (
            <div key={index} className="prefix-icon-wrapper">
              {icon}
            </div>
          ))}
        </div>
      )}
      <Selector<V> {...rest}>{children}</Selector>
    </div>
  );
};

export default CustomSelector;
