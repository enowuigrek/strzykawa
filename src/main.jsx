import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";

// Entry point for the React application.  We wrap the entire app in a
// BrowserRouter to enable client-side routing.  The root element is
// defined in index.html.
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <App/>
            </DevSupport>
        </BrowserRouter>
    </React.StrictMode>
);