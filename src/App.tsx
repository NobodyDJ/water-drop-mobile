import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.module.less'
import { ROUTE_CONFIG } from './routes'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTE_CONFIG.map((item) => {
          return (<Route
            key={item.key}
            path={item.path}
            element={<item.element />}
          />)
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
