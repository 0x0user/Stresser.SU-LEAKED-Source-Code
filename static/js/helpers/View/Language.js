import Cookies from "js-cookie";

export const ALL_LANGUAGES = {
  English: "en",
  Chinese: "zh",
  German: "de",
  Spanish: "es",
  Japanese: "ja",
  Korean: "ko",
  Russian: "ru",
};

export const getCurrentLang = () => {
  let langFromCookie = Cookies.get("language");
  let allowedLang = Object.values(ALL_LANGUAGES);
  return allowedLang.includes(langFromCookie) ? langFromCookie : "en";
};

export default function Language({ i18n, ...props }) {
  return (
    <select
      id="language"
      className="form-control"
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      value={getCurrentLang()}
      {...props}
    >
      {Object.keys(ALL_LANGUAGES).map((key, i) => (
        <option key={i} value={ALL_LANGUAGES[key]}>
          {key}
        </option>
      ))}
    </select>
  );
}
