import { useContext } from "react";

import { LanguageContext } from "./LanguageProvider";
import { LangStrings } from "./Strings";

export default function useTranslation() {
  const [locale] = useContext(LanguageContext);

  function t(key: string) {
    if (!LangStrings[locale][key]) {
      console.warn(`No string '${key}' for locale '${locale}'`);
    }

    return LangStrings[locale][key] || "";
  }

  return { t, locale };
}
