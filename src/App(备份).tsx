import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'

// import store from './store'
import { useAppSelector, useAppDispatch, ShallowEqualApp } from './store'
import { changeMessageAction } from './store/modules/counter'
import Demo02 from './views/demo/demo02'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'

function App() {
  // const { count, message } = useSelector(
  //   (state: IRootState) => ({
  //     count: state.counter.count,
  //     message: state.counter.message
  //   }),
  //   shallowEqual
  // )
  const { count, message } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message,
      direction: state.counter.direction,
      names: state.counter.names
    }),
    ShallowEqualApp
  )

  // 事件处理函数
  const dispatch = useAppDispatch()
  function handleChangeMessage() {
    dispatch(changeMessageAction('gagagaghahah'))
  }

  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />

      <Demo02 name="gmy" age={18} />
      <h2>count:{count}</h2>
      <h2>count:{message}</h2>
      <button onClick={handleChangeMessage}>修改Messgae</button>
    </div>
  )
}

export default App
