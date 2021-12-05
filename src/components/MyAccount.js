import React from 'react'
import Card from 'react-bootstrap/Card'
import LeftNav from './LeftNav'

export default function MyAccount() {
    return (
        <div className="homepage background" style={{ position: "relative", backgroundColor: "#131313", height: "100vmin", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>

            <div className="homepage main-screen" style={{width: "78%", height: "100vh", display: "grid", gridTemplateColumns: "1fr 15fr"}}>

                
                <div className="LeftSideNavigator">

                <LeftNav />

                </div>

                <div className="MiddleTweets">
                    <Card style={{ height: "300vmin"}}>Profile pic and username/@userhandle and show all tweets/show all tweets and comments</Card>
                   
                </div>
                
            </div>
            


        </div>
    )
}
