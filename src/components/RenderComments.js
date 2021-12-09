import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'


export default function RenderComments(props) {

    const {
        comment, 
        tweetsId,
        showComments,
        userhandle,
        fetchAllComments,
        BASE_URL,
        userToken
    } = props

    const {
        id, userName, commentAuthorHandle, commentContent, createdAt
    } = comment

    const day = createdAt.slice(8, 10)
    const month = createdAt.slice(5, 7)
    const year = createdAt.slice(0, 4)
    const time = createdAt.slice(11, 16)

    async function deleteComment() {
        try {

            const response = await fetch(`${BASE_URL}/comments/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    userhandle
                })
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error(error)
        }
    }

    async function deleteTheComment() {
        await deleteComment()
        await fetchAllComments()
    }

    return (
        <div key={`comment${id}`}>

            {showComments.includes(tweetsId) ?
                <>
                <div style={{border: "1px solid #131313", height: "2rem", width: "0rem"}}></div>
                <Card style={{ backgroundColor: "#d4d4d4", maxWidth: "75%"}}>
                    <Card.Body>
                        <Card.Title>{userhandle === commentAuthorHandle ? "I " : <Link to={`/${commentAuthorHandle}`} style={{textDecoration: "none", color: "black"}}>{userName} <span style={{opacity: "50%"}}>@{commentAuthorHandle}</span> <br /> </Link>}said:</Card.Title>
    
    
                        <Card.Text >{commentContent}</Card.Text>

                        <Card.Subtitle style={{opacity: "100%", fontSize: "0.75rem"}}>commented {month}/{day}/{year} at {time} UTC {commentAuthorHandle === userhandle && <button onClick={deleteTheComment} style={{ backgroundColor: "#b81414", color: "white", borderRadius: "1rem", border: "1px solid #131313" }}>Delete Comment</button>} </Card.Subtitle>

                    </Card.Body>
                </Card>
                </>
            :
            <div>
            </div>
            
            } 
        </div>
    )
}
