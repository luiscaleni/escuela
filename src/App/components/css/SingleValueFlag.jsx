import { components } from "react-select"
import styles from "./css/LanguageSelector.module.css"

const SingleValueFlag = (props) => {
  const flag = props.data.flag
  return (
    <components.SingleValue {...props}>
      <img
        src={`/flags/${flag}.png`}
        className={styles.flagSingle}
      />
    </components.SingleValue>
  )
}

export default SingleValueFlag
