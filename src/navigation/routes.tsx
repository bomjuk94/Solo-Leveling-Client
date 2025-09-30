// routes.ts
// import SplashPage from '@features/Splash/pages/Splash'
import Register from "@pages/Register"
import Login from "@pages/Login"
import Dashboard from "@pages/Dashboard"
import GoalSetter from "@pages/GoalSetter"
import History from "@pages/History"
import Profile from "@pages/Profile"
import Store from "@pages/Store"

export const routes = [
    {
        path: '/',
        element: <Dashboard />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/goal-setter',
        element: <GoalSetter />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/store',
        element: <Store />,
    },
    {
        path: '/history',
        element: <History />,
    },
]
