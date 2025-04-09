import 'react-i18next';
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    // Define the structure of your translations
    resources: {
      translation: typeof en;
    };
  }
}