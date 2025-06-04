import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar las traducciones de los idiomas
import translationEs from './locales/es/translation.json';
import translationEn from './locales/en/translation.json';

// Configuración de i18next
i18n
  .use(initReactI18next) // pasa i18n a react-i18next
  .init({
    resources: {
      es: {
        translation: translationEs,
      },
      en: {
        translation: translationEn,
      },
    },
    lng: 'es', // idioma predeterminado
    fallbackLng: 'en', // idioma de respaldo
    interpolation: {
      escapeValue: false, // react ya se encarga de escapar los valores
    },
  });

export default i18n;
