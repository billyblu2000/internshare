import { Link, Navigate } from 'react-router-dom'
import { Result, Button } from 'antd'
import Main from './components/Main'
import Home from './components/Home'
import Login from './components/Login'
import Search from './components/Search'

const error404 = (
    <>
    <Result
        title="Sorry, the page you visited does not exist!"
        subTitle="Please check the URL you entered is correct or not."
        extra={<Link to='/main/home/'><Button type="primary" shape='round'>Back Home</Button></Link>}
        icon={<><div style={{marginTop:'100px'}}></div><img src='/logo/1.png' alt='logo' height='120px'></img></>}
    />
    </>
);

const routes = [
    {
        path: '/main',
        element: <Main></Main>,
        children: [
            {
                path: 'home',
                element: <Home />,
                children: []
            },
            {
                path: 'search',
                element: <Search />,
                children: []
            },
            {
                path: 'space',
                element: <Search />,
                children: []
            },
            {
                path: '',
                element: error404,
                children: []
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
        children: []
    },
    {
        path: '/',
        element: <Navigate to='/main/home'></Navigate>,
        children: []
    },
    {
        path: '*',
        element: <Navigate to='/main/'></Navigate>,
        children: []
    }
]
export default routes