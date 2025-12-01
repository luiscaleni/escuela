import { components } from "react-select"

const SingleValueFlag = (props) => {
  const { data } = props
  return (
    <components.SingleValue {...props}>
      <img
        src={data.flag}
        alt={data.label}
        style={{
          width: "1.75rem",
          height: "1.75rem",
          borderRadius: "50%",
          display: "block",
        }}
      />
    </components.SingleValue>
  )
}

export default SingleValueFlag
