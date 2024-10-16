import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.module.less'
import { ROUTE_COMPONENT } from './routes'
import StudentInfo from './components/StudentInfo'
import { routes } from './routes/menus'
import Login from './containers/Login'
import Register from './containers/Register'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <StudentInfo>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
          {routes.map((item) => {
               const Component = ROUTE_COMPONENT[item.key];
               return (
                 <Route
                   path={item.path}
                   key={item.key}
                   element={<Component />}
                 />
               );
             })}
          </Route>
        </Routes>
      </StudentInfo>
    </BrowserRouter>
  )
}

export default App
