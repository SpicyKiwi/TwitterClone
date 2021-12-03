import React from 'react'
import Card from 'react-bootstrap/Card'
import { useHistory } from 'react-router-dom'

export default function LoginBox() {

    const history = useHistory()

    async function handleLogIn() {
        //attempt to log in
        
        const success = true

        if(success) history.push("/home")
        return
    }

    return (
        <Card bg='dark' style={{width: "18rem", color: "#00acee", alignItems: "center", justifyContent: "center"}}>
            
            <Card.Body>

                <Card.Title>Log In Below!</Card.Title>

                <input 
                type="text" 
                placeholder="User Handle" 
                className="mt-2" 
                style={{color: "#00acee", backgroundColor: "#131313"}}
                />

                <input 
                type="password" 
                placeholder="Password" 
                className="mt-2" 
                style={{color: "#00acee", backgroundColor: "#131313"}}
                />

            </Card.Body>
            <button 
            onClick={handleLogIn}
            style={{width: "9rem", marginBottom: "1rem", backgroundColor: "#00acee", color: "#131313"}}
            >Log In</button>
        </Card>
    )
}
