/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from "react";
import db from "../../firebase";
import firebase from "firebase";
import "../../css/groupChat.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { v1 as uuid } from "uuid";
import Header from "./../HeaderFooter/Header";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import { Container, Button } from "react-bootstrap";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CreateIcon from "@material-ui/icons/Create";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Modal from "react-bootstrap/Modal";
import { Tooltip } from "reactstrap";

function Chat() {
    const { currentUser } = useAuth();
    const id = uuid();
    const pathname = window.location.pathname;
    const groupId = pathname.split(":")[1];
    const [groupName, setGroupName] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [themeName, setThemeName] = useState("");
    const [themeNum, setThemeNum] = useState(-1);
    const [show, setShow] = useState(false);
    const [feedbackName, setFeedbackName] = useState("");
    const [tooltipOpenNotes, setTooltipOpenNotes] = useState(false);
    const [tooltipOpenVideocall, setTooltipOpenVideocall] = useState(false);
    const [tooltipOpenFillFeedback, setTooltipOpenFillFeedback] =
        useState(false);
    const [tooltipOpenResultFeedback, setTooltipOpenResultFeedback] =
        useState(false);
    const [tooltipOpenCreateFeedback, setTooltipOpenCreateFeedback] =
        useState(false);

    const toggleNote = () => setTooltipOpenNotes(!tooltipOpenNotes);

    const toggleVideocall = () =>
        setTooltipOpenVideocall(!tooltipOpenVideocall);

    const toggleFillFeedback = () =>
        setTooltipOpenFillFeedback(!tooltipOpenFillFeedback);

    const toggleResultFeedback = () =>
        setTooltipOpenResultFeedback(!tooltipOpenResultFeedback);

    const toggleCreateFeedback = () =>
        setTooltipOpenCreateFeedback(!tooltipOpenCreateFeedback);

    useEffect(() => {
        var docRef = db.collection("users").doc(currentUser.uid);
        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setThemeName(doc.data().themeChoice);
                    setThemeNum(doc.data().themeNo);
                } else {
                    console.log("NOT FOUND ERROR!!");
                }
            })
            .catch((error) => {
                console.log("Error Fetching Document!");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        var docRef = db.collection("groups").doc(groupId);
        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setGroupName(doc.data().groupName);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        db.collection("groups")
            .doc(groupId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => doc.data()))
            );
    });
    const chatBackground = [
        "#ccccff",
        "#ccffcc",
        "#8c8c8c",
        "#ffb3b3",
        "#ffffb3",
        "#e6e6e6",
    ];

    const senderMsg = [
        "#80b3ff",
        "#53c68c",
        "#404040",
        "#ff4d4d",
        "#ffe066",
        "#c2bcbc",
    ];

    const recieverMsg = [
        "#0D6EFD",
        "#198754",
        "#212529",
        "#DC3545",
        "#FFC107",
        "#6C757D",
    ];
    let scrollDiv = {
        height: "400px",
        width: "100%",
        backgroundColor: chatBackground[themeNum],
        overflowX: "hidden",
        overflowY: "auto",
        color: "black",
    };
    let chatReciever = {
        marginLeft: "auto",
        backgroundColor: recieverMsg[themeNum],
        color: "white",
    };
    let chatMsg = {
        position: "relative",
        fontSize: "16px",
        padding: "10px",
        width: "fit-content",
        borderRadius: "10px",
        backgroundColor: senderMsg[themeNum],
        marginTop: "20px",
    };
    function sendMessage(e) {
        e.preventDefault();
        db.collection("groups").doc(groupId).collection("messages").add({
            senderId: currentUser.uid,
            senderEmail: currentUser.email,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            isVideoCallLink: "",
        });
        setInput("");
    }
    function createMsg() {
        const meetingLink = `/call/:${groupId}/:${id}`;
        const msg =
            currentUser.email +
            " is inviting you to a meet! Click this msg to join! ";
        //e.preventDefault()
        db.collection("groups").doc(groupId).collection("messages").add({
            senderId: currentUser.uid,
            senderEmail: currentUser.email,
            message: msg,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            isVideoCallLink: meetingLink,
        });
    }
    const handleShow = () => setShow(true);
    function handleClose() {
        setShow(false);
        setFeedbackName("");
    }
    function handleSaveClose() {
        if (feedbackName !== "") {
            let groupDoc = db.collection("groups").doc(groupId);
            groupDoc
                .get()
                .then((doc) => {
                    let eligibleGroupMembers = doc.data().groupMembers;
                    for (let i = 0; i < eligibleGroupMembers.length; i++) {
                        if (eligibleGroupMembers[i] === currentUser.uid) {
                            eligibleGroupMembers.splice(i, 1);
                        }
                    }
                    db.collection("groups")
                        .doc(groupId)
                        .collection("feedbackForms")
                        .add({
                            nameOfFeedback: feedbackName,
                            creator: currentUser.uid,
                            eligiblePeople: eligibleGroupMembers,
                        });
                })
                .catch((error) => {
                    console.log("Error getting cached document:", error);
                });
        } else {
            alert(
                "Please provide a name of the meeting for which feedback is required!"
            );
        }
        setFeedbackName("");
        setShow(false);
    }
    return (
        <div>
            <Header />
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
                style={{ maxwidth: "100%" }}
            >
                <div className="w-100">
                    <div className="chat__header">
                        <h3 style={{ textAlign: "left", marginBottom: "10px" }}>
                            {groupName}
                        </h3>
                        <Link
                            id="note"
                            className={`btn btn-${themeName} mb-2`}
                            to={`/Notes/:${groupId}`}
                        >
                            <SpeakerNotesIcon fontSize="medium" />
                        </Link>
                        <Tooltip
                            placement="bottom"
                            isOpen={tooltipOpenNotes}
                            target="note"
                            toggle={toggleNote}
                        >
                            <p>Notes Section</p>
                            <span>
                                This is a place to store all the notes and
                                important points of the meeting!
                            </span>
                        </Tooltip>
                        <Link
                            id="videoCall"
                            className={`btn btn-${themeName} mb-2`}
                            to={`/call/:${groupId}/:${id}`}
                            onClick={createMsg}
                            target="_blank"
                        >
                            <VideoCallIcon fontSize="medium" />
                        </Link>
                        <Tooltip
                            placement="bottom"
                            isOpen={tooltipOpenVideocall}
                            target="videoCall"
                            toggle={toggleVideocall}
                        >
                            <p>Video Call</p>
                            <span>
                                Click on this button to start an instant video
                                call! The link to the video call automatically
                                gets sent to the chat. Users can click and join
                                the call.
                            </span>
                        </Tooltip>
                        <Link
                            id="fillFeedback"
                            className={`btn btn-${themeName} mb-2`}
                            to={`/chat/feedback/:${groupId}`}
                            target="_blank"
                        >
                            <CreateIcon fontSize="medium" />
                        </Link>
                        <Tooltip
                            placement="bottom"
                            isOpen={tooltipOpenFillFeedback}
                            target="fillFeedback"
                            toggle={toggleFillFeedback}
                        >
                            <p>Fill Feedback</p>
                            <span>
                                This is an area to fill all the feedback forms
                                created for different meetings!
                            </span>
                        </Tooltip>
                        <Link
                            id="resultFeedback"
                            className={`btn btn-${themeName} mb-2`}
                            to={`/chat/feedbackResults/:${groupId}`}
                            target="_blank"
                        >
                            <CheckCircleIcon fontSize="medium" />
                        </Link>
                        <Tooltip
                            placement="bottom"
                            isOpen={tooltipOpenResultFeedback}
                            target="resultFeedback"
                            toggle={toggleResultFeedback}
                        >
                            <p>Feedback Results</p>
                            <span>
                                Over here you can see all the responses to the
                                feedback froms created by you!
                            </span>
                        </Tooltip>
                        <Button
                            id="createFeedback"
                            variant={themeName}
                            className={`btn btn-${themeName} mb-2`}
                            onClick={handleShow}
                        >
                            <ListAltIcon fontSize="medium" />
                        </Button>
                        <Tooltip
                            placement="bottom"
                            isOpen={tooltipOpenCreateFeedback}
                            target="createFeedback"
                            toggle={toggleCreateFeedback}
                        >
                            <p>Create Survey Form</p>
                            <span>
                                Lets you create a survey form, that gets shared
                                with users of the group and you can see the
                                responses as well.
                            </span>
                        </Tooltip>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title>Feedback</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Enter the name of the meeting for which feedback
                                is required
                                <br />
                                <label>
                                    <input
                                        onChange={(e) => {
                                            setFeedbackName(e.target.value);
                                        }}
                                        type="text"
                                        value={feedbackName}
                                        placeholder="Name of the meeting"
                                    />
                                </label>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    className={`btn btn-${themeName} mb-2`}
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    className={`btn btn-${themeName} mb-2`}
                                    onClick={handleSaveClose}
                                >
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div style={scrollDiv}>
                        {messages.map((messageInfo) => (
                            <p
                                style={
                                    messageInfo.senderId !== currentUser.uid
                                        ? chatMsg
                                        : { ...chatMsg, ...chatReciever }
                                }
                            >
                                <span className="chat__name">
                                    {messageInfo.senderEmail}
                                </span>
                                <div className="chat__boxmessage">
                                    {messageInfo.isVideoCallLink !== "" ? (
                                        <div>
                                            <Link
                                                to={messageInfo.isVideoCallLink}
                                                target="_blank"
                                            >
                                                {messageInfo.message}
                                            </Link>
                                        </div>
                                    ) : (
                                        <span>{messageInfo.message}</span>
                                    )}
                                </div>
                                <span className="chat__timestamp">
                                    {new Date(
                                        messageInfo.timestamp?.toDate()
                                    ).toUTCString()}
                                </span>
                            </p>
                        ))}
                    </div>
                    <form style={{ top: "2%" }}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            placeholder="Type a msg (refresh if changes not visible & use 'send' button for better experience!)"
                        />
                        <Button
                            variant={themeName}
                            type="submit"
                            onClick={sendMessage}
                        >
                            Send
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default Chat;
