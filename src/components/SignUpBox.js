import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { useHistory } from 'react-router-dom'

export default function SignUpBox(props) {

    const {
        BASE_URL,
        setUserToken,
        setIsLoggedIn,
        setUsername,
        setpfpname,
        setUserhandle
    } = props

    const [userhandle, setUserhandleInput] = useState('')
    const [username, setUsernameInput] = useState('')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState('defaultPFP')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState('')

    const history = useHistory()

    async function attemptSignup(username, _userhandle, password, profilePic) {
        const userhandle = _userhandle.toLowerCase()
        try {

            const response = await fetch(`${BASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    userhandle,
                    password,
                    profilePic
                })
            })
    
            const data = await response.json()
    
            return data

        } catch (error) {
            console.error(error)
        }

    }

    async function handleSignUp(e) {
        e.preventDefault()

        setError('')
        if(!userhandle) return setError("Must have userhandle")

        if(userhandle.includes(' ')) return setError("Userhandle cannot contain spaces")

        if(!username) return setError("Must have username")

        if(!password) return setError("Must have a password")

        if(password !== confirmPassword) return setError("Passwords must match")

        if(password.length < 8) return setError("Password must be atleast 8 characters")

        const response = await attemptSignup(username, userhandle, password, profilePic)

        if(response.error) return setError(response.error)

        localStorage.setItem("username", response.userInfo.username)
        localStorage.setItem("pfpname", response.userInfo.PFPname)
        localStorage.setItem("userToken", response.token)
        localStorage.setItem("isLoggedIn", true)
        localStorage.setItem("userhandle", response.userInfo.userhandle)

        setUserhandle(response.userInfo.userhandle)
        setUsername(response.userInfo.username)
        setpfpname(response.userInfo.PFPname)
        setUserToken(response.token)
        setIsLoggedIn(true)

        const success = false

        if(success) history.push("/home")
        return;
    }

    return (
        <Card bg='dark' style={{width: "18rem",color: "#00acee", alignItems: "center", justifyContent: "center"}}>
            <form onSubmit={handleSignUp}>
            <Card.Body>

                <Card.Title>Sign Up Below!</Card.Title>
                { error ? <p style={{ color: "red"}}>{error}</p> : <br />}
                <FormControl 
                    type="text" 
                    placeholder="User Handle" 
                    onChange={e => setUserhandleInput(e.target.value)} 
                    style={{ color: "#00acee", backgroundColor: "#131313", border: "0", marginTop: "1rem" }}
                />

                <Card.Subtitle className="mt-0 mb-3 text-muted">(You cannot change this later)</Card.Subtitle>

                <FormControl 
                    type="text" 
                    placeholder="Username" 
                    onChange={e => setUsernameInput(e.target.value)} 
                    style={{ color: "#00acee", backgroundColor: "#131313", border: "0", marginTop: "1rem" }}
                />

                <FormControl 
                    type="password" 
                    placeholder="Password" 
                    onChange={e => setPassword(e.target.value)} 
                    style={{ color: "#00acee", backgroundColor: "#131313", border: "0", marginTop: "1rem" }}
                />

                <FormControl 
                    type="password" 
                    placeholder="Confirm Password" 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    style={{ color: "#00acee", backgroundColor: "#131313", border: "0", marginTop: "1rem" }}
                />
                <label style={{ marginTop: "1rem", marginBottom: "0.5rem"}}>Profile Picture</label>
                <Form.Select value={profilePic} onChange={e => setProfilePic(e.target.value)} style={{ backgroundColor: "#121212", color: "white"}}>
                    <option value="defaultPFP">Default (Black)</option>
                    <option value="whitePFP">White</option>
                    <option value="yellowPFP">Yellow</option>
                    <option value="redPFP">Red</option>
                    <option value="greenPFP">Green</option>
                    <option value="brownPFP">Brown</option>
                </Form.Select>

                



            </Card.Body>
            <button 
            type="submit"
            style={{width: "9rem", marginBottom: "1rem", backgroundColor: "#00acee", color: "#131313"}} 
            >Sign up</button>

            </form>
        </Card>
    )
}
