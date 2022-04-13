import { Link, Navigate } from 'react-router-dom'
import { Result, Button } from 'antd'
import Main from './pages/Main'
import Home from './pages/Home'
import Login from './pages/Login'
import Search from './pages/Search'
import Me from './pages/Me'
import PostDetailed from './components/PostDetailed'

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
            },
            {
                path: 'me',
                element: <Me></Me>,
                children: [
                    {
                        path: 'profile',
                        element: 'profile',
                        children: []
                    },
                    {
                        path: 'applies',
                        element: 'app',
                        children: []
                    },
                    {
                        path: 'posts',
                        element: 'post',
                        children: []
                    },
                    {
                        path: 'messages',
                        element: 'mes',
                        children: []
                    },
                    {
                        path: 'settings',
                        element: 'set',
                        children: []
                    }
                ]
            },
            {
                path: 'post/:id',
                element: <PostDetailed/>,
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
        element: <Navigate to='/main/' replace={true}></Navigate>,
        children: []
    }
]
export default routes