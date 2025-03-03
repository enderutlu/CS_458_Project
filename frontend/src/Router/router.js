import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from '../pages/login';
import AfterPage from '../pages/afterpage';

const Router = () => {
    return <RouterProvider router={router}/>;
};

const router = createBrowserRouter([
    {path: '', element: <Login/>},
    {path: '/success', element: <AfterPage/>},
]);

export default Router;