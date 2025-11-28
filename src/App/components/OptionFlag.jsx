import { components } from "react-select"

const OptionFlag = (props) => {
  const { data } = props

  return (
    <components.Option {...props}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "black",
      }}>
        <img 
          src={data.flag} 
          alt={data.label}
          style={{ width: "24px", height: "24px" }} 
        />
        <span style={{ color: "black" }}>{data.label}</span>
      </div>
    </components.Option>
  )
}

export default OptionFlag
