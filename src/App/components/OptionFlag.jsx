import { components } from "react-select"

const OptionFlag = (props) => {
  const { data } = props

  return (
    <components.Option {...props}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "black",
      }}>
        <img 
          src={data.flag} 
          alt={data.label}
          style={{ width: "1.5rem", height: "1.5rem" }} 
        />
        <span style={{ color: "black" }}>{data.label}</span>
      </div>
    </components.Option>
  )
}

export default OptionFlag
