import * as React from "react"
import { SVGProps } from "react"
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={38}

 viewBox="0 0 38 38"
  fill="none"

style={{ verticalAlign: "middle" }}

    {...props}
  >
    <path
      fill="currentColor"
      d="m29.184 13.854 5.075-5.075c.574 2.318.574 5.534.574 10.221 0 7.464 0 11.196-2.319 13.514-2.318 2.32-6.05 2.32-13.514 2.32-7.464 0-11.196 0-13.515-2.32C3.166 30.196 3.166 26.464 3.166 19c0-7.464 0-11.196 2.32-13.515C7.803 3.167 11.535 3.167 19 3.167c4.687 0 7.903 0 10.22.574l-5.074 5.075v-.9a3.563 3.563 0 0 0-7.125 0v9.5a3.563 3.563 0 0 0 3.562 3.563h9.5a3.563 3.563 0 0 0 0-7.125h-.9Z"
    />
    <path
      fill="currentColor"
      d="M30.084 18.604a1.188 1.188 0 0 0 0-2.375H23.45L34.09 5.59a1.187 1.187 0 1 0-1.68-1.679L21.771 14.55V7.917a1.188 1.188 0 0 0-2.375 0v9.5c0 .655.532 1.187 1.188 1.187h9.5Z"
    />
  </svg>
)
export default EditIcon
