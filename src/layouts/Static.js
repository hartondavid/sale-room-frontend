import React, { useEffect } from "react";
import './../i18n';
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "./../routes.js";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Static = (props) => {
    const navigate = useNavigate();

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/static") {
                return (
                    <Route path={prop.path} element={prop.component} key={key} exact />
                );
            } else {
                return null;
            }
        });
    };

    React.useEffect(() => {
        document.body.classList.add("bg-gray-300");
        return () => {
            document.body.classList.remove("bg-gray-300");
        };
    }, []);

    return (
        <>
            <div className="font-sans w-full h-[100dvh] flex items-center justify-center">
                <Card className="w-[500px] max-w-[350px] sm:max-w-[500px] h-fit">
                    <CardContent>
                        <Routes>
                            {getRoutes(routes)}
                        </Routes>
                    </CardContent>
                </Card>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000} // Adjust the duration for which the toast should be visible
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Static;