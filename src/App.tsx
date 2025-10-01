// import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { routes } from './navigation/routes'

function App() {

  // useEffect(() => {
  //   if (error === "sessionExpired") {
  //     navigate("/?error=sessionExpired");
  //   }
  // }, [error, navigate]);

  return (
    <div>
      <Routes>
        {
          routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))
        }
      </Routes>
    </div>
  )
}

export default App
