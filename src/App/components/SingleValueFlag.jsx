import { components } from "react-select"

const SingleValueFlag = (props) => {
  const { data } = props
  return (
    <components.SingleValue {...props}>
      <img
        src={data.flag}
        alt={data.label}
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          display: "block",
        }}
      />
    </components.SingleValue>
  )
}

export default SingleValueFlag
