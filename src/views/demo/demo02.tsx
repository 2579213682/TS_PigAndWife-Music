import React, { PureComponent } from 'react'

/**
 * state
 *props
 */

interface IProps {
  name: string
  age?: number
}

interface IState {
  message: string
  counter: number
}
// interface ISnapshot {
//   address: string
// }
class Demo02 extends PureComponent<IProps, IState> {
  name = 'aaaa'
  state = {
    message: 'hello world',
    counter: 99
  }

  // getSnapshotBeforeUpdate() {
  //   return { address: '庐山' }
  // }
  // componentDidUpdate(
  //   prevProps: Readonly<IProps>,
  //   prevState: Readonly<IState>,
  //   snapshot?: ISnapshot | undefined
  // ): void {}
  // constructor(props: IProps) {
  //   super(props)

  //   this.state = {
  //     message: 'Hello World',
  //     counter: 100
  //   }
  // }
  render(): React.ReactNode {
    return (
      <div>
        <div>name:{this.props.name}</div>
        <div>age:{this.props.age}</div>
        <div>message:{this.state.message}</div>
        <div>counter:{this.state.counter}</div>
      </div>
    )
  }
}

export default Demo02
