import React, {useState, useEffect} from 'react'
import db from '../../firebase';
import firebase from "firebase";
import {useAuth} from '../../contexts/AuthContext';
import {Link} from "react-router-dom";
import { v1 as uuid } from "uuid"

function Chat() {
    const {currentUser} = useAuth();
    const pathname = window.location.pathname;
    const groupId = pathname.split(':')[1];
    const [groupName, setGroupName] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const id = uuid();
    const styleObj = {
        position: "relative",
        right: "40%",
        height: "600px",
        width: "700px",
        backgroundColor: "#E8F6EF",
        textAlign: "center",
    }
    const scrollDiv = {
        position: "relative", 
        top:"5%", left:"5%", 
        height: "400px", 
        width: "630px",
        backgroundColor: "#B8DFD8",
        overflowX: "hidden",
        overflowY: "auto"
    }
    const ownMessage = {
        height: "30px",
        position: "relative",
        left: "30%",
        backgroundColor: "#133df5",
        color: "white",
    }
    const othersMessage = {
        height: "30px",
        position: "relative",
        right: "30%",
        backgroundColor: "white",
        color: "black",
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
        <div style={styleObj}>
            <h3>{groupName}</h3>
            <div style={{display: 'inline-block'}}>
                <Link to={`/groups`} 
                className="btn btn-primary mt-3" style={{position: "absolute",right:"90%"}}>
                    Back
                </Link>
                <Link to="/Notes" className="btn btn-primary mt-3">
                    Notes
                </Link>
                <Link to={`/room/${id}`} onClick={createMsg}
                className="btn btn-primary mt-3" style={{position: "absolute",left:"85%"}}>
                    Video Call
                </Link>
            </div>
            
            <div style={scrollDiv}>
                {messages.map(messageInfo => (
                    <div style={{marginTop: "3%"}}>
                        {messageInfo.senderId === currentUser.uid?
                            <span style={ownMessage}>{messageInfo.senderEmail}</span> :
                            <span style={othersMessage}>{messageInfo.senderEmail}</span> 
                        }
                        <div>
                        {messageInfo.senderId === currentUser.uid?
                            <span style={ownMessage}>{messageInfo.message}</span> :
                            <span style={othersMessage}>{messageInfo.message}</span> 
                        }
                        </div>
                        
                    </div>                                        
                ))}
            </div>
            <form style={{top: "2%"}}>
                <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                <button type="submit" onClick={sendMessage}>Send</button>
            </form>
        </div>
    )
}

export default Chat
