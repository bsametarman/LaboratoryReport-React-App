import React from 'react'

export default function Home() {

    const objStyle = {
        fontSize: 24,
        textAlign: "center",
        paddingTop: "100px",
    }
    return (
        <div class="ui one column stackable center aligned page grid">
            <div class="column twelve wide">
                <div style={objStyle}>
                    Welcome to the our laboratory report system. <br/> <br/>
                    Track report and laborants easly.
                </div>
            </div>
        </div>
    )
}