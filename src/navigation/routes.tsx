import Register from "@pages/Register"
import Login from "@pages/Login"
import Dashboard from "@pages/Dashboard"
import SetGoals from "@/pages/SetGoals"
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
        path: '/set-goals',
        element: <SetGoals />,
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
