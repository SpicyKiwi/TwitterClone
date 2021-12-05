import React from 'react'
import Card from 'react-bootstrap/Card'
import LeftNav from './LeftNav'

export default function Settings() {
    return (
        <div className="homepage background" style={{ position: "relative", backgroundColor: "#131313", height: "100vmin", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>

            <div className="homepage main-screen" style={{width: "78%", height: "100vh", display: "grid", gridTemplateColumns: "1fr 15fr"}}>

                
                <div className="LeftSideNavigator">

                <LeftNav />

                </div>

                <div className="MiddleTweets">
                    <Card style={{ height: "300vmin"}}>settings and stuff</Card>
                   
                </div>
                
            </div>
            


        </div>
    )
}
