import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  name: string
  age: number
  heigth?: number
}

//直接props进行类型约束
// FC=FunctionComponent
const Download: FC<IProps> = (props) => {
  return (
    <div>
      <div>name:{props.name}</div>
      <div>age:{props.age}</div>
      <div>heigth:{props.heigth}</div>
      <div>{props.children}</div>
    </div>
  )
}

// Download.defaultProps = {
//   name: 'zh',
//   heigth: 1.88
// }
// Download.displayName = 'download'

// const Download = (props: IProps) => {
//   return (
//     <div>
//       <div>name:{props.name}</div>
//       <div>age:{props.age}</div>
//       <div>heigth:{props.heigth}</div>
//     </div>
//   )
// }

export default memo(Download)
