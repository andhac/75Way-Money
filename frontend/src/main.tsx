// import {ThemeProvider} from "@mui/material";
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";

import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {store} from "./store/store.ts";
import React from 'react';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ToastContainer/>
            <Provider store={store}>
                <App/>
            </Provider> ̰
        </BrowserRouter>
    </React.StrictMode>
)
