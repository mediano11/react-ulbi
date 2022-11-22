import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import Error from "../pages/Error";

const AppRouter = () => {
    const isAuth = false;
    return (
        isAuth
            ?
        <Routes>
            {privateRoutes.map((route, i)=>
                    <Route key={i} element={<route.element/>} path={route.path}/>
            )}
            <Route
                path="/error"
                element={<Error/>}
            />
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
            :
        <Routes>
            {publicRoutes.map((route, i)=>
                <Route key={i} element={<route.element/>} path={route.path}/>
            )}
            <Route
                path="/error"
                element={<Error/>}
            />
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    );
};

export default AppRouter;