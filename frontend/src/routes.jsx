import { Link, Navigate } from 'react-router-dom'
import { Result, Button } from 'antd'
import Main from './pages/Main'
import Home from './pages/Home'
import Login from './pages/Login'
import Search from './pages/Search'
import Space from './pages/Space'
import Me from './pages/Me'
import Profile from './pages/Me/Profile'
import Applies from './pages/Me/Applies'
import Posts from './pages/Me/Posts'
import Messages from './pages/Me/Messages'
import Settings from './pages/Me/Settings'
import User from './pages/User'
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
                path: 'search/:keyword',
                element: <Search />,
                children: []
            },
            {
                path: 'search',
                element: <Search />,
                children: []
            },
            {
                path: 'space',
                element: <Space />,
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
                        element: <Profile/>,
                        children: []
                    },
                    {
                        path: 'applies',
                        element: <Applies></Applies>,
                        children: []
                    },
                    {
                        path: 'posts',
                        element: <Posts></Posts>,
                        children: []
                    },
                    {
                        path: 'messages',
                        element: <Messages></Messages>,
                        children: []
                    },
                    {
                        path: 'settings',
                        element: <Settings></Settings>,
                        children: []
                    }
                ]
            },
            {
                path: 'post/:id',
                element: <PostDetailed/>,
                children: []
            },
            {
                path: 'user/:email',
                element: <User/>,
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