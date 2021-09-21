import React from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export default function PrivateRoute({ component: Component, ...rest }) {

    const { isAuth } = useSelector(state => state.logReducer);

    return (
        <Route {...rest}>
            {isAuth ? <Component /> : <Redirect to="/" />}
        </Route>
    );
};

