import React from 'react'
import {Outlet} from "react-router-dom";
import Navi from './Navi';

export default function Layout() {
    return (
        <div>
            <Navi />
            <Outlet />
        </div>
    )
}