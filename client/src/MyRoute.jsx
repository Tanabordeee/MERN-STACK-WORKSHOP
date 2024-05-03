import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navigate } from "react-router-dom";
import App from "./App";
import FormComponent from './components/formComponent';
import SingleComponent from './components/SingleComponent';
import UpdateComponent from "./components/UpdateComponent";
import LoginComponent from './components/LoginComponent';
import { getUser } from "./services/authorize"

const MyRoute = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/create" element={getUser() ? <FormComponent /> : <Navigate to="/login" replace />} />
                <Route path="/blog/:slug" element={<SingleComponent />} />
                <Route path="/blog/update/:slug" element={getUser() ? <UpdateComponent /> : <Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginComponent />} />
            </Routes>
        </Router>
    );
};

export default MyRoute;