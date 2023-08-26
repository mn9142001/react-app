import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './screens/App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import "./index.css";
import ProtectedComponent from './components/protected_route';
import LogIn from './screens/register/login';
import SignUp from './screens/register/signup';

const router = createBrowserRouter([
        {
            path: "/",
            element: <ProtectedComponent component={App} />
        },
        {
            path : "/login/",
            element: <LogIn />
        },
        {
            path : "/signup/",
            element : <SignUp />
        }
    ]
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
