import { Routes, Route, useNavigate } from 'react-router-dom'
import { routes } from './navigation/routes'
import { ToastContainer } from 'react-toastify'

function App() {

  // useEffect(() => {
  //   if (error === "sessionExpired") {
  //     navigate("/?error=sessionExpired");
  //   }
  // }, [error, navigate]);

  return (
    <>
        <div>
      <Routes>
        {
          routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))
        }
      </Routes>
    </div>

          <ToastContainer
        position={"top-right"}
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </>
  )
}

export default App
