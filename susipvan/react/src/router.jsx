import {createBrowserRouter} from 'react-router-dom';
import Login from './views/Login/Login.jsx';
import Register from './views/Register/Register.jsx';
import Users from './views/User/User.jsx'
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import UserForm from './views/UserForm/UserForm.jsx'


const router= createBrowserRouter([

    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path: '/user',
                element:<Users/>
            },
            {
                path: '/user/new',
                element:<UserForm key="UserCreate"/>
            },
            {
                path: '/user/:id',
                element:<UserForm key="UserUpdate"/>
            },
        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path: '/login',
                element:<Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
        ]
    }
]);

export default router;