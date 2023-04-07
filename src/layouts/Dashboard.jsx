import React from 'react'
import { Container } from 'semantic-ui-react';
import Report from './Report';
import Navi from './Navi';

export default function Dashboard() {
    return (
        <div>
            <Navi />
            <Container className="main">
                <Report />
            </Container>
        </div>
    )
}