// We use a fully connected mesh network to achieve the motive of group video call
// Each user joined will have an array of all other users in that room
import React, { useEffect, useRef, useState } from "react";
import db from "./../../firebase";
import io from "socket.io-client";
import { useAuth } from "./../../contexts/AuthContext";
import Peer from "simple-peer";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import { Link } from "react-router-dom";
import Header from "./../HeaderFooter/Header";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import CallEndIcon from "@material-ui/icons/CallEnd";
import "./../../css/videoCall.css";

const Video = (props) => {
    const ref = useRef();
    useEffect(() => {
        props.peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <video playsInline autoPlay ref={ref} className="video__card" />;
};

const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
};

const Room = (props) => {
    const { currentUser } = useAuth();
    const [peers, setPeers] = useState([]); //for actually rendering i.e the no of people joined
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]); //array of objects which has the userID given by socket and the peers
    const myPeer = useRef();
    const roomID = props.match.params.roomID;
    const [stream, setStream] = useState(); //using to toggle the audio video
    const [audioMuted, setAudioMuted] = useState(false); //toggles the audio
    const [videoMuted, setVideoMuted] = useState(false); //toggles the video
    const [themeName, setThemeName] = useState("");
    useEffect(() => {
        var docRef = db.collection("users").doc(currentUser.uid);
        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setThemeName(doc.data().themeChoice);
                } else {
                    console.log("NOT FOUND ERROR!!");
                }
            })
            .catch((error) => {
                console.log("Error Fetching Document!");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //when connecting for the first time
    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices
            .getUserMedia({ video: videoConstraints, audio: true })
            .then((stream) => {
                setStream(stream);
                userVideo.current.srcObject = stream; //for own video
                socketRef.current.emit("join room", roomID);
                socketRef.current.on("all users", (users) => {
                    const peers = []; //since just joined has no peers
                    users.forEach((userID) => {
                        const peer = createPeer(
                            userID,
                            socketRef.current.id,
                            stream
                        );
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        });
                        peers.push({
                            peerID: userID,
                            peer,
                        });
                    });
                    setPeers(peers);
                });

                //handle the situation for users already in the room
                socketRef.current.on("user joined", (payload) => {
                    const peer = addPeer(
                        payload.signal,
                        payload.callerID,
                        stream
                    ); //sending our own stream
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    });

                    const peerObj = {
                        peer,
                        peerID: payload.callerID,
                    };
                    //we dont need to push as we already have been added in the peers
                    setPeers((users) => [...users, peerObj]);
                });

                socketRef.current.on("receiving returned signal", (payload) => {
                    const item = peersRef.current.find(
                        (p) => p.peerID === payload.id
                    ); //find the peer who sent signal
                    item.peer.signal(payload.signal); //by searching for payload.id
                });

                socketRef.current.on("user left", (id) => {
                    const peerObj = peersRef.current.find(
                        (p) => p.peerID === id
                    );
                    if (peerObj) {
                        peerObj.peer.destroy();
                    }
                    const peers = peersRef.current.filter(
                        (p) => p.peerID !== id
                    );
                    peersRef.current = peers;
                    setPeers(peers);
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true, // so that others can immediately recieve signal
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socketRef.current.emit("sending signal", {
                userToSignal,
                callerID,
                signal,
            });
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false, //listen when recieve signal
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socketRef.current.emit("returning signal", { signal, callerID });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    function shareScreen() {
        navigator.mediaDevices
            .getDisplayMedia({ cursor: true })
            .then((screenStream) => {
                // eslint-disable-next-line
                peers.map((peer) => {
                    //replace video with shared screen
                    myPeer.current = peer.peer;
                    myPeer.current.replaceTrack(
                        stream.getVideoTracks()[0],
                        screenStream.getVideoTracks()[0],
                        stream
                    );
                    userVideo.current.srcObject = screenStream;
                });
                screenStream.getTracks()[0].onended = () => {
                    // eslint-disable-next-line
                    peers.map((peer) => {
                        //replace shared screen with video
                        myPeer.current = peer.peer;
                        myPeer.current.replaceTrack(
                            screenStream.getVideoTracks()[0],
                            stream.getVideoTracks()[0],
                            stream
                        );
                        userVideo.current.srcObject = stream;
                    });
                };
            });
    }

    function toggleAudio() {
        if (stream) {
            setAudioMuted(!audioMuted);
            stream.getAudioTracks()[0].enabled = audioMuted;
        }
    }

    function toggleVideo() {
        if (stream) {
            setVideoMuted(!videoMuted);
            stream.getVideoTracks()[0].enabled = videoMuted;
        }
    }

    function hangUp() {
        window.close();
    }

    let audioButton;
    if (audioMuted) {
        audioButton = (
            <Link
                onClick={toggleAudio}
                style={{ marginRight: "15px" }}
                className={`btn btn-${themeName}`}
            >
                <MicOffIcon />
            </Link>
        );
    } else {
        audioButton = (
            <Link
                onClick={toggleAudio}
                style={{ marginRight: "15px" }}
                className={`btn btn-${themeName}`}
            >
                <MicIcon fontSize="large" />
            </Link>
        );
    }

    let videoButton;
    if (videoMuted) {
        videoButton = (
            <Link
                onClick={toggleVideo}
                style={{ marginRight: "15px" }}
                className={`btn btn-${themeName}`}
            >
                <VideocamOffIcon />
            </Link>
        );
    } else {
        videoButton = (
            <Link
                onClick={toggleVideo}
                style={{ marginRight: "15px" }}
                className={`btn btn-${themeName}`}
            >
                <VideocamIcon />
            </Link>
        );
    }
    let endCall = (
        <Link
            onClick={hangUp}
            style={{ marginRight: "15px" }}
            className={`btn btn-${themeName}`}
        >
            <CallEndIcon />
        </Link>
    );
    return (
        <div>
            <Header />
            <div className="video__row">
                <video
                    muted
                    ref={userVideo}
                    autoPlay
                    playsInline
                    className="video__card"
                />
                {peers.map((peer) => {
                    return <Video key={peer.peerID} peer={peer.peer} />;
                })}
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "sticky",
                    bottom: "30px",
                }}
            >
                {audioButton}
                {videoButton}
                <Link
                    style={{ marginRight: "15px" }}
                    className={`btn btn-${themeName}`}
                >
                    <ScreenShareIcon fontSize="large" onClick={shareScreen} />
                </Link>
                {endCall}
            </div>
        </div>
    );
};
export default Room;
