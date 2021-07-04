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
import { Container } from "react-bootstrap";

function Chat() {
    const {currentUser} = useAuth();
    const pathname = window.location.pathname;
    const groupId = pathname.split(':')[1];
    const [groupName, setGroupName] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const id = uuid();
    const scrollDiv = {
        height: "400px", 
        width: "400px",
        backgroundColor: "#C0FEFC",
        overflowX: "hidden",
        overflowY: "auto"
    }
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
                    <Link to="/Notes">
                        <SpeakerNotesIcon fontSize="large"/>
                    </Link>         
                    <h3 className="mr-20">{groupName}</h3> 
                    <Link to={`/room/${id}`} onClick={createMsg}>
                        <VideoCallIcon fontSize="large" />
                    </Link>
                </div>
                <div style={scrollDiv}>
                    {messages.map(messageInfo => (
                        <p className={`chat__message ${messageInfo.senderId === currentUser.uid && "chat__receiver"}`}>
                            <span className="chat__name">{messageInfo.senderEmail}</span>
                            <div className="chat__boxmessage">
                                <span>{messageInfo.message}</span>
                            </div>
                        </p>                                    
                    ))}
                </div>
                <form style={{top: "2%"}}>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a msg (refresh if changes not visible)"/>
                    <button type="submit" onClick={sendMessage}>Send</button>
                </form>
            </div>
            </Container>
        </div>
    )
}

export default Chat
