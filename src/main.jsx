import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Registration from './Pages/Registration/Registration.jsx';
import Login from './Pages/Login/Login.jsx';
import firebaseConfig from './Authentication/firebaseConfig.jsx';
import store from './store'
import { Provider } from 'react-redux'
import Home from './Pages/Home/Home.jsx';
import Profile from './Pages/Home/Profile.jsx';
import Fnf from './Pages/Fnf/Fnf.jsx';
import Cover from './Pages/Home/Cover.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/reg",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/fnf",
    element: <Fnf />,
  },
  {
    path: "/cvr",
    element: <Cover/>,
  },
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
          
          <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
