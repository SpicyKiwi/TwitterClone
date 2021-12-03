import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

export default function Home() {
    return (
        <div style={{backgroundColor: "#131313", height: "100vmin", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>

            <div style={{width: "96vmin", height: "100vmin", display: "flex"}}>

                
                <div className="LeftSideNavigator">
                    <Link to="/">Go back</Link>

                    <Card>Nav</Card>
                </div>

                <div className="MiddleTweets">
                    <Card>Tweets</Card>
                </div>

                <div className="RightSideSearchAndSuggestedAccounts">
                    <Card>Search and suggestions</Card>
                </div>

            </div>
            



        </div>
    )
}
//15 unit across screen

//1 left 

//9.5 middle

//5.5 right 

//16 total

// nn 2

//nn nn nn nn nn nn nn nn nn n 19

//nn nn nn nn nn n 11

// in total 32 FR
//left gets 2 FR
//middle gets 19 FR
//right gets 11 FR