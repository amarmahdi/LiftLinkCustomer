import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none">
    <Path
      stroke="#70A980"
      strokeWidth={1.5}
      d="M1.667 10.625c0-3.143 0-4.714.976-5.69.976-.977 2.548-.977 5.69-.977h3.334c3.142 0 4.714 0 5.69.977.976.976.976 2.547.976 5.69v1.667c0 3.142 0 4.714-.976 5.69s-2.548.976-5.69.976H8.333c-3.142 0-4.714 0-5.69-.976s-.976-2.548-.976-5.69v-1.667Z"
    />
    <Path
      stroke="#70A980"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M5.833 3.958v-1.25M14.167 3.958v-1.25"
    />
    <Circle
      cx={13.75}
      cy={14.375}
      r={1.25}
      stroke="#70A980"
      strokeWidth={1.5}
    />
    <Path
      stroke="#70A980"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M2.083 8.125h15.834"
    />
  </Svg>
)
export default SvgComponent
