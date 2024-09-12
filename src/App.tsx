import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.module.less'
import { ROUTE_CONFIG } from './routes'
import StudentInfo from './components/StudentInfo'

function App() {
  return (
    <BrowserRouter>
      <StudentInfo>
        <Routes>
          {ROUTE_CONFIG.map((item) => {
            return (<Route
              key={item.key}
              path={item.path}
              element={<item.element />}
            />)
          })}
        </Routes>
      </StudentInfo>
    </BrowserRouter>
  )
}

export default App
