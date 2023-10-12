import { Router, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import ButtonToTop from "./components/ButtonToTop"
import ScrollToTop from "./components/ScrollToTop"
import UserLayout from "./layouts/User/UserLayout"
import routersUser from "./routers/userRouter"
import "./style/styles.scss"

import history from "./untils/history"

function App() {
  const showRouterUser = (routers) => {
    return routers.map((router) => {
      return (
        <UserLayout
          key={router.path}
          path={router.path}
          component={router.main}
          exact={router.exact}
        />
      )
    })
  }

  return (
    <Router history={history}>
      <Switch>{showRouterUser(routersUser)}</Switch>
      <ScrollToTop />
      <ToastContainer />
      <ButtonToTop />
    </Router>
  )
}

export default App
