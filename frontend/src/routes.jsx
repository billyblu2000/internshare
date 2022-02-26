import { Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

const routes = [
    {
        path:'/',
        element: <Navigate to='/home'/>
    },
    {
        path:'/home',
        element: <Home/>,
        children:[]
    },
    {
        path:'/login',
        element: <Login/>,
        children:[]
    },
    
]
export default routes