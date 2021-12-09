import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card'
import LeftNav from './LeftNav'
import FormControl from 'react-bootstrap/FormControl'

export default function Settings(props) {

    const {
        setUserToken,
        setUsername,
        setIsLoggedIn,
        pfpname,
        BASE_URL,
        userToken,
        userhandle,
        username,
        onHomePage,
        setOnHomePage,
        setpfpname
    } = props

    const [updatedUsername, setUpdatedUsername] = useState(username)
    const [updatedPFPname, setUpdatedPFPname] = useState(pfpname)

    const [usernameInput, setUsernameInput] = useState('')
    const [PFPname, setPFPname] = useState(pfpname)
    const [error, setError] = useState('')

    useEffect(() => {
        setOnHomePage(false)
        fetchUserData()
    }, [])


    async function fetchUserData() {
        try {

            const response = await fetch(`${BASE_URL}/users/${userhandle}`)

            const data = await response.json()
            setUpdatedUsername(data.username)
            setUpdatedPFPname(data.PFPname)

            localStorage.setItem("username", data.username)
            localStorage.setItem("pfpname", data.PFPname)
            setUsername(data.username)
            setpfpname(data.PFPname)

            return data

        } catch (error) {
            console.error(error)
        }
    }

    async function updateClicked() {

        try {

            const response = await fetch(`${BASE_URL}/users/${userhandle}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    username: usernameInput,
                    PFPname: PFPname
                })
            })

            const data = await response.json()
            if(data.error) return setError(data.error)
            await fetchUserData()
            setError("Update successful!")
            setUsernameInput('')
            return data

        } catch (error) {
            console.error(error)
        }
    }

    function isRadioSelected(radioValue) {
        return radioValue === PFPname
    }

    return (
        <div className="homepage background" style={{ position: "relative", backgroundColor: "#131313", height: "100vmin", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>

            <div className="homepage main-screen" style={{width: "78%", height: "100vh", display: "grid", gridTemplateColumns: "1fr 15fr"}}>

                
                <div className="LeftSideNavigator">

                <LeftNav 
                setUserToken={setUserToken}
                setUsername={setUsername}
                setIsLoggedIn={setIsLoggedIn}
                pfpname={pfpname}
                BASE_URL={BASE_URL}
                userToken={userToken}
                userhandle={userhandle}
                username={username}
                onHomePage={onHomePage}
                setOnHomePage={setOnHomePage}
                />

                </div>

                <div className="MiddleTweets">
                    <Card style={{ height: "100%", backgroundColor: "#ededed"}}>
                        <div style={{textAlign: "center"}}>
                            <Card.Title style={{fontSize: "3rem"}}>Settings</Card.Title>
                            
                        </div>

                        <Card.Body>
                            <div style={{textAlign: "center"}}>
                            {error ? 
                                error === "Update successful!" ? 
                                <p style={{color: "green"}}>{error}</p>
                                : <p style={{color: "red"}}>{error}</p>
                            : <br />  
                            }    
                            </div>
                            
                            <div style={{ display: "flex", justifyContent: "space-evenly", margin: "2rem", height: "5rem"  }}>
                                <div>
                                    <p style={{}}>Change your Username?</p>
                                    <p>Currently: <span style={{fontWeight: "bolder"}}>{updatedUsername}</span></p>
                                </div>
                                <FormControl
                                type="text" 
                                placeholder="Username" 
                                onChange={e => setUsernameInput(e.target.value)}
                                style={{width: "25rem", height: "3rem"}}
                                value={usernameInput}
                                />
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-evenly", margin: "2rem", height: "5rem"  }}>
                                <div>
                                    <p style={{}}>Change your Profile Picture?</p>
                                    <p>Currently: <img src={`images/${updatedPFPname}.jpg`} alt="profile" height="50rem" width="50rem" style={{borderRadius: "3rem"}}/></p>
                                </div>
                                

                                <div>
                                    <div style={{display: "flex", marginBottom: "1rem"}}>
                                    <input type="radio" value="brownPFP" checked={isRadioSelected('brownPFP')} onChange={() => setPFPname("brownPFP")} style={{margin: "auto"}} /><img src={`images/brownPFP.jpg`} alt="profile" height="50rem" width="50rem" style={{borderRadius: "3rem", marginLeft: "0.5rem"}}/>
                                    
                                    </div>

                                    <div style={{display: "flex", marginBottom: "1rem"}}>
                                    <input type="radio" value="defaultPFP" checked={isRadioSelected('defaultPFP')} onChange={() => setPFPname("defaultPFP")} style={{margin: "auto"}} /><img src={`images/defaultPFP.jpg`} alt="profile" height="50rem" width="50rem" style={{borderRadius: "3rem", marginLeft: "0.5rem"}}/>

                                    </div>

                                    <div style={{display: "flex", marginBottom: "1rem"}}>
                                    <input type="radio" value="greenPFP" checked={isRadioSelected('greenPFP')} onChange={() => setPFPname("greenPFP")} style={{margin: "auto"}} /><img src={`images/greenPFP.jpg`} alt="profile" height="50rem" width="50rem" style={{borderRadius: "3rem", marginLeft: "0.5rem"}}/>

                                    </div>
                                    <div style={{display: "flex", marginBottom: "1rem"}}>
                                    <input type="radio" value="redPFP" checked={isRadioSelected('redPFP')} onChange={() => setPFPname("redPFP")} style={{margin: "auto"}} /><img src={`images/redPFP.jpg`} alt="profile" height="50rem" width="50rem" style={{borderRadius: "3rem", marginLeft: "0.5rem"}}/>

                                    </div>
                                    <div style={{display: "flex", marginBottom: "1rem"}}>
                                    <input type="radio" value="whitePFP" checked={isRadioSelected('whitePFP')} onChange={() => setPFPname("whitePFP")} style={{margin: "auto"}} /><img src={`images/whitePFP.jpg`} alt="profile" height="50rem" width="50rem" style={{borderRadius: "3rem", marginLeft: "0.5rem"}}/>

                                    </div>
                                    <div style={{display: "flex"}}>
                                    <input type="radio" value="yellowPFP" checked={isRadioSelected('yellowPFP')} onChange={() => setPFPname("yellowPFP")} style={{margin: "auto"}} /><img src={`images/yellowPFP.jpg`} alt="profile" height="50rem" width="50rem" style={{borderRadius: "3rem", marginLeft: "0.5rem"}}/>

                                    </div>
                                </div>
                            </div>


                            <div style={{textAlign: "center"}}>
                                <button onClick={updateClicked} style={{marginTop: "2rem"}}>Update Information</button>
                            </div>

                        </Card.Body>

                    </Card>
                   
                </div>
                
            </div>
            


        </div>
    )
}
