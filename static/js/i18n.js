import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import { ALL_LANGUAGES } from "./helpers/View/Language";

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    supportedLngs: Object.values(ALL_LANGUAGES),
    fallbackLng: "en",
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      crossDomain: true,
    },
    detection: {
      caches: ["cookie"],
      lookupCookie: "language",
      //lookupLocalStorage: "language",
    },
    saveMissing: true,
    ns: ["header"],
    defaultNS: "header",
  });

export default i18n;
