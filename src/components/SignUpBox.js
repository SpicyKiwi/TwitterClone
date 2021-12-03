import React from 'react'
import Card from 'react-bootstrap/Card'
import { useHistory } from 'react-router-dom'

export default function SignUpBox() {

    const history = useHistory()

    async function handleSignUp() {
        //attempt sign up
        const success = true

        if(success) history.push("/home")
        return;
    }

    return (
        <Card bg='dark' style={{width: "18rem",color: "#00acee", alignItems: "center", justifyContent: "center"}}>
            
            <Card.Body>

                <Card.Title>Sign Up Below!</Card.Title>

                <input 
                type="text" 
                placeholder="User Handle" 
                className="mt-2" 
                style={{color: "#00acee", backgroundColor: "#131313"}}
                />

                <Card.Subtitle className="mt-0 mb-3 text-muted">(You cannot change this later)</Card.Subtitle>

                <input 
                type="text" 
                placeholder="Username" 
                className="mb-2" 
                style={{color: "#00acee", backgroundColor: "#131313"}}
                />
                
                <input 
                type="password" 
                placeholder="Password" 
                className="mb-2" 
                style={{color: "#00acee", backgroundColor: "#131313"}}
                />

                <input 
                type="password" 
                placeholder="Confirm Password"  
                style={{color: "#00acee", backgroundColor: "#131313"}}/>

            </Card.Body>
            <button 
            onClick={handleSignUp} 
            style={{width: "9rem", marginBottom: "1rem", backgroundColor: "#00acee", color: "#131313"}} 
            >Sign up</button>
        </Card>
    )
}
