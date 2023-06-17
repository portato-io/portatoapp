import React, { createContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface TranslationContextProps {
  children: ReactNode;
}

// Create the translation context
export const TranslationContext = createContext<any>(null);

// Create a provider component that wraps the translation context and provides the translation values
export const TranslationProvider: React.FC<TranslationContextProps> = ({
  children,
}) => {
  const { t, i18n } = useTranslation(['home', 'main']);

  return (
    <TranslationContext.Provider value={{ t, i18n }}>
      {children}
    </TranslationContext.Provider>
  );
};
