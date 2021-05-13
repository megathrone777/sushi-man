import { createContext, useEffect, useState } from "react";

export const locales = ["cz", "ru"];
export const LanguageContext = createContext([]);

export const LanguageProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useState("cz");

  const checkCookie = (): void => {
    if (
      document.cookie
        .split(";")
        .filter((item) => item.trim().startsWith("locale=")).length
    ) {
      setLocale(
        document.cookie.replace(
          /(?:(?:^|.*;\s*)locale\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        )
      );
    }
  };

  useEffect((): void => {
    checkCookie();
  }, []);

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  );
};
