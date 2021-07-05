/* eslint-disable react/jsx-no-duplicate-props */
import React, {useState, useEffect} from 'react'
import db from '../../firebase';
import firebase from "firebase";
import "../../css/groupChat.css"
import {useAuth} from '../../contexts/AuthContext';
import {Link} from "react-router-dom";
import { v1 as uuid } from "uuid"
import Header from './../HeaderFooter/Header';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import { Container, Button} from "react-bootstrap";

function Chat() {
    const {currentUser} = useAuth();
    const pathname = window.location.pathname;
    const groupId = pathname.split(':')[1];
    const [groupName, setGroupName] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const id = uuid();
    const [themeName, setThemeName] = useState("");
    useEffect(() => {
        var docRef= db.collection("users").doc(currentUser.uid)
        docRef.get().then((doc) => {
            if(doc.exists) {
                setThemeName(doc.data().themeChoice)
            } else {
                console.log("NOT FOUND ERROR!!")
            }
        }).catch((error) =>{
            console.log("Error Fetching Document!")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        var docRef = db.collection("groups").doc(groupId);
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setGroupName(doc.data().groupName)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        db.collection("groups").doc(groupId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => (
            setMessages(snapshot.docs.map(doc =>doc.data()))
        ))
    })
    let scrollDiv = {}
    let chatReciever = {}
    let chatMsg = {}
    if(themeName === "primary") {
        scrollDiv = {
            height: "400px", 
            width: "400px",
            backgroundColor: "#ccccff",
            overflowX: "hidden",
            overflowY: "auto"
        }
        chatReciever = {
            marginLeft: "auto",
            backgroundColor: "#0D6EFD",
            color: "white",
        }
        chatMsg = {
            position: "relative",
            fontSize: "16px",
            padding: "10px",
            width: "fit-content",
            borderRadius: "10px",
            backgroundColor: "#80b3ff",
            marginTop: "20px",
        }
    } else if(themeName === "success") {
        scrollDiv = {
            height: "400px", 
            width: "400px",
            backgroundColor: "#ccffcc",
            overflowX: "hidden",
            overflowY: "auto"
        }
        chatReciever = {
            marginLeft: "auto",
            backgroundColor: "#198754",
            color: "white",
        }
        chatMsg = {
            position: "relative",
            fontSize: "16px",
            padding: "10px",
            width: "fit-content",
            borderRadius: "10px",
            backgroundColor: "#53c68c",
            marginTop: "20px",
        }
    } else if(themeName === "dark") {
        scrollDiv = {
            height: "400px", 
            width: "400px",
            backgroundColor: "#8c8c8c",
            overflowX: "hidden",
            overflowY: "auto"
        }
        chatReciever = {
            marginLeft: "auto",
            backgroundColor: "#212529",
            color: "white",
        }
        chatMsg = {
            position: "relative",
            fontSize: "16px",
            padding: "10px",
            width: "fit-content",
            borderRadius: "10px",
            backgroundColor: "#404040",
            marginTop: "20px",
        }
    } else if(themeName === "danger") {
        scrollDiv = {
            height: "400px", 
            width: "400px",
            backgroundColor: "#ffb3b3",
            overflowX: "hidden",
            overflowY: "auto"
        }
        chatReciever = {
            marginLeft: "auto",
            backgroundColor: "#DC3545",
            color: "white",
        }
        chatMsg = {
            position: "relative",
            fontSize: "16px",
            padding: "10px",
            width: "fit-content",
            borderRadius: "10px",
            backgroundColor: "#ff4d4d",
            marginTop: "20px",
        }
    } else if(themeName === "warning") {
        scrollDiv = {
            height: "400px", 
            width: "400px",
            backgroundColor: "#ffffb3",
            overflowX: "hidden",
            overflowY: "auto"
        }
        chatReciever = {
            marginLeft: "auto",
            backgroundColor: "#FFC107",
            color: "black",
        }
        chatMsg = {
            position: "relative",
            fontSize: "16px",
            padding: "10px",
            width: "fit-content",
            borderRadius: "10px",
            backgroundColor: "#ffe066",
            marginTop: "20px",
            color: "black"
        }

    } else if(themeName === "secondary") {
        scrollDiv = {
            height: "400px", 
            width: "400px",
            backgroundColor: "#e6e6e6",
            overflowX: "hidden",
            overflowY: "auto",
            color: "black"
        }
        chatReciever = {
            marginLeft: "auto",
            backgroundColor: "#6C757D",
            color: "white",
        }
        chatMsg = {
            position: "relative",
            fontSize: "16px",
            padding: "10px",
            width: "fit-content",
            borderRadius: "10px",
            backgroundColor: "#c2bcbc",
            marginTop: "20px",
        }
    }
    function sendMessage(e) {
        e.preventDefault()
        db.collection("groups").doc(groupId).collection("messages").add({
            senderId: currentUser.uid,
            senderEmail: currentUser.email,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }
    function createMsg() {
        const meetingLink = `/room/${id}`
        const msg = currentUser.email + " is inviting you to the meet: " + meetingLink
        //e.preventDefault()
        db.collection("groups").doc(groupId).collection("messages").add({
            senderId: currentUser.uid,
            senderEmail: currentUser.email,
            message: msg,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
    return (
        <div>
            <Header />
            <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }} style={{ maxWidth: "400px" }}>
            <div className="w-100">
                <div className="chat__header">
                    <Link className={`btn btn-${themeName} mb-2`} to="/Notes">
                        <SpeakerNotesIcon fontSize="large"/>
                    </Link>         
                    <h3 className="mr-20">{groupName}</h3> 
                    <Link className={`btn btn-${themeName} mb-2`} to={`/room/${id}`} onClick={createMsg}>
                        <VideoCallIcon fontSize="large" />
                    </Link>
                </div>
                <div style={scrollDiv}>
                    {messages.map(messageInfo => (
                        <p style={messageInfo.senderId !== currentUser.uid ? chatMsg : {...chatMsg, ...chatReciever}}>
                            <span className="chat__name">{messageInfo.senderEmail}</span>
                            <div className="chat__boxmessage">
                                <span>{messageInfo.message}</span>
                            </div>
                        </p>                                    
                    ))}
                </div>
                <form style={{top: "2%"}}>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a msg (refresh if changes not visible)"/>
                    <Button variant={themeName} type="submit" onClick={sendMessage}>Send</Button>
                </form>
            </div>
            </Container>
        </div>
    )
}

export default Chat
