import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'

export default function LoginBox(props) {

    const {
        BASE_URL,
        setUserToken,
        setIsLoggedIn,
        setUsername,
        setpfpname,
        setUserhandle
    } = props

    const [userhandle, setUserhandleInput] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')




    async function attemptLogIn(_userhandle, password) {
        try {

            const userhandle = _userhandle.toLowerCase()

            const response = await fetch(`${BASE_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userhandle,
                    password
                })
            })
    
            const data = await response.json()
    
            return data

        } catch (error) {
            console.error(error)
        }

    }

    async function handleLogIn(e) {
        //attempt to log in
        e.preventDefault()

        if(!userhandle) return setError("Userhandle is missing")

        if(!password) return setError("Password is missing")

        const response = await attemptLogIn(userhandle, password)

        if(response.error) return setError(response.error)

        console.log("theResponse", response)

        localStorage.setItem("userToken", response.token)
        localStorage.setItem("username", response.userInfo.username)
        localStorage.setItem("isLoggedIn", true)
        localStorage.setItem("pfpname", response.userInfo.PFPname)
        localStorage.setItem("userhandle", response.userInfo.userhandle)

        setUserhandle(response.userInfo.userhandle)
        setIsLoggedIn(true)
        setUserToken(response.token)
        setUsername(response.userInfo.username)
        setpfpname(response.userInfo.PFPname)

        return
    }

    return (
        <Card bg='dark' style={{width: "18rem", color: "#00acee", alignItems: "center", justifyContent: "center"}}>
            <form onSubmit={handleLogIn}>
            <Card.Body>

                <Card.Title>Log In Below!</Card.Title>
                {error ? <p style={{ color: "red" }}>{error}</p> : <br />}
                <FormControl 
                    type="text" 
                    placeholder="Userhandle" 
                    onChange={e => setUserhandleInput(e.target.value)} 
                    style={{ color: "#00acee", backgroundColor: "#131313", border: "0", marginTop: "1rem" }}
                />

                <FormControl 
                    type="password" 
                    placeholder="Password" 
                    onChange={e => setPassword(e.target.value)} 
                    style={{ color: "#00acee", backgroundColor: "#131313", border: "0", marginTop: "1rem" }}
                />

            </Card.Body>
            <button 
            onClick={handleLogIn}
            style={{width: "9rem", marginBottom: "1rem", backgroundColor: "#00acee", color: "#131313"}}
            >Log In</button>
            </form >
        </Card>
    )
}
