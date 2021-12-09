import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

export default function SearchBox(props) {

    const {
        BASE_URL
    } = props

    const [searchInput, setSearchInput] = useState('')
    const [userArray, setUserArray] = useState([])

    useEffect(() => {
        fetchAllUsers()
    }, [])

    async function fetchAllUsers() {
        try {

            const response = await fetch(`${BASE_URL}/users`)

            const data = await response.json()
            setUserArray(data)

            return data
            
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card style={{ textAlign: "center"}}>

            <Card.Title> Search Users!</Card.Title>

            <Card.Body>
                <div>
                    <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)} />


                </div>

                <div>
                        {userArray.filter((user) => {
                            if(searchInput === "") return null
                            if(user.username.toLowerCase().includes(searchInput.toLowerCase()) || user.userhandle.toLowerCase().includes(searchInput.toLowerCase())) return user
                            
                        }).map((user, index) => (
                            <div style={{ margin: "1.25rem"}}>
                                <Link to={`/${user.userhandle}`} key={index} style={{textDecoration: "none", color: "black", border: "1px solid black", padding: "0.25rem", borderRadius: "0.6rem", boxShadow: "0.3rem 5px 5px #131313"}}> {user.username} @{user.userhandle} </Link>
                                <br />
                            </div>
                        ))}
                </div>

            </Card.Body>

        </Card>
    )
}
