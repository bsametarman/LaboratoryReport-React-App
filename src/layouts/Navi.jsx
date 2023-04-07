import React from 'react'
import { Link } from 'react-router-dom'

export default function Navi() {
    return (
    <div class="ui fixed inverted menu">
        <div class="ui container">
            <Link to="/home" class="item">Home</Link>
            <Link to="/reports" class="item">Reports</Link>
            <Link to="/laborants" class="item">Laborants</Link>
        </div>
    </div>
    )
}