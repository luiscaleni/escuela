import i18n from "../i18n"
import styles from "./css/LanguageSelector.module.css"
import Select from "react-select"
import OptionFlag from "./OptionFlag"
import SingleValueFlag from "./SingleValueFlag"

function LanguageSelector() {

  const options = [
    { value: "es", label: "Español", flag: "/flags/es.png" },
    { value: "pt", label: "Português", flag: "/flags/pt.png" },
    { value: "en", label: "English", flag: "/flags/en.png" }
  ]

  const current = options.find(
    o => o.value === (localStorage.getItem("lang") || i18n.language)
  ) || options[0]

  const changeLanguage = (opt) => {
    i18n.changeLanguage(opt.value)
    localStorage.setItem("lang", opt.value)
  }

  return (
    <Select
      className={styles.navbarMenu}
      classNamePrefix="lang"

      value={current}
      onChange={changeLanguage}
      options={options}
      isSearchable={false}

      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
        SingleValue: SingleValueFlag,
        Option: OptionFlag
      }}
      
      styles={{
        control: base => ({
          ...base,
          width: 64,
          height: 64,
          minHeight: 64,
          borderRadius: "50%",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color:"black",
          background: "white",
          cursor: "pointer",

          '@media (max-width: 1280px)': {
            width: 36,
            height: 36,
            minHeight: 36,
            borderRadius: "50%",
          },
        }),

        valueContainer: base => ({
          ...base,
          padding: 0,
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }),

        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
        }),

        menu: (base) => ({
            ...base,
            left: "50%",
            transform: "translateX(-50%)",
            cursor:'pointer',
            width: 135,
        }),

        option: (base, state) => ({
            ...base,
            color: "black",
            cursor: "pointer"
        }),

        menuList: (base) => ({
            ...base,
            padding: 0,
            color: "black",
        }),
      }}
    />
  )
}

export default LanguageSelector
