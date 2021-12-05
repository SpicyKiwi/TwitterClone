import React from 'react'
import Card from 'react-bootstrap/Card'
import './LeftNav.css'
import LeftNav from './LeftNav'

export default function Home() {


    return (
        <div className="homepage background" style={{ position: "relative", backgroundColor: "#131313", height: "100vmin", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>

            <div className="homepage main-screen" style={{width: "78%", height: "100vh", display: "grid", gridTemplateColumns: "2fr 19fr 11fr"}}>

                
                <div className="LeftSideNavigator">

                <LeftNav />

                </div>

                <div className="MiddleTweets">
                    <Card style={{ height: "300vmin"}}>Tweets</Card>
                   
                </div>

                <div className="RightSideSearchAndSuggestedAccounts">
                    <Card>Search and suggestions</Card>
                </div>
                
            </div>
            


        </div>
    )
}