// We use a fully connected mesh network to achieve the motive of group video call
// Each user joined will have an array of all other users in that room

import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import Peer from "simple-peer"
import ScreenShareIcon from '@material-ui/icons/ScreenShare'
import { Link} from "react-router-dom"

const Video = (props) => {
    const ref = useRef()

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream
        })
    }, [])

    return (
        <video playsInline autoPlay ref={ref} className="video__card"/>
    )
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
}

const Room = (props) => {
    const [peers, setPeers] = useState([])                 //for actually rendering i.e the no of people joined
    const socketRef = useRef()
    const userVideo = useRef()
    const peersRef = useRef([])                            //array of objects which has the userID given by socket and the peers
    const myPeer = useRef()
    const roomID = props.match.params.roomID
    const [stream, setStream] = useState()                      //using to toggle the audio video
    const [audioMuted, setAudioMuted] = useState(false)         //toggles the audio
    const [videoMuted, setVideoMuted] = useState(false)         //toggles the video

    //when connecting for the first time
    useEffect(() => {
        socketRef.current = io.connect("/")
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            setStream(stream)
            userVideo.current.srcObject = stream               //for own video
            socketRef.current.emit("join room", roomID)
            socketRef.current.on("all users", users => {
                const peers = []                               //since just joined has no peers
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream)
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push({
                        peerID: userID,
                        peer,
                    })
                })
                setPeers(peers)
            })

            //handle the situation for users already in the room
            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream)         //sending our own stream
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                const peerObj = {
                    peer,
                    peerID : payload.callerID
                }
                //we dont need to push as we already have been added in the peers
                setPeers(users => [...users, peerObj])
            })

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id) //find the peer who sent signal
                item.peer.signal(payload.signal)                                        //by searching for payload.id
            })

            socketRef.current.on('user left', id => {
                const peerObj = peersRef.current.find(p => p.peerID === id)
                if (peerObj) {
                    peerObj.peer.destroy()
                }
                const peers = peersRef.current.filter(p => p.peerID !== id)
                peersRef.current = peers
                setPeers(peers)
            })
        })
    }, [])

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,            // so that others can immediately recieve signal
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,           //listen when recieve signal
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal)

        return peer
    }

    function shareScreen(){
        navigator.mediaDevices.getDisplayMedia({cursor: true})
        .then(screenStream => {
            // eslint-disable-next-line
            peers.map(peer => {
                myPeer.current = peer.peer
                myPeer.current.replaceTrack(stream.getVideoTracks()[0], screenStream.getVideoTracks()[0], stream)
                userVideo.current.srcObject = screenStream
            })
            screenStream.getTracks()[0].onended = () => {
                // eslint-disable-next-line
                peers.map(peer => {
                    myPeer.current = peer.peer
                    myPeer.current.replaceTrack(screenStream.getVideoTracks()[0], stream.getVideoTracks()[0], stream)
                    userVideo.current.srcObject = stream
                })
            }
        })
    }

    function toggleAudio(){
        if(stream) {
            setAudioMuted(!audioMuted)
            stream.getAudioTracks()[0].enabled = audioMuted
        }
    }
    
    function toggleVideo(){
        if(stream) {
            setVideoMuted(!videoMuted)
            stream.getVideoTracks()[0].enabled = videoMuted
        }
    }

    
    let audioButton
    if(audioMuted){
        audioButton=<Link onClick={toggleAudio} className="btn btn-primary w-100 mt-3">
            mute/unmute audio
        </Link>

    } else {
        audioButton=<Link onClick={toggleAudio} className="btn btn-primary w-100 mt-3">
            mute/unmute audio
        </Link>
    }

    let videoButton
    if(videoMuted){
        videoButton=<Link onClick={toggleVideo} className="btn btn-primary w-100 mt-3">
            mute/unmute video
        </Link>
    } else {
        videoButton=<Link onClick={toggleVideo} className="btn btn-primary w-100 mt-3">
            mute/unmute video
        </Link>
    }

    return (
        <div>
            <div className="video__row">
                <video muted ref={userVideo} autoPlay playsInline className="video__card"/>
                {peers.map((peer) => {
                    return (
                        <Video key={peer.peerID} peer={peer.peer} />
                    )
                })}
            </div>
            <div style={{display:"flex", justifyContent:"center", position: "sticky", bottom: "30px"}}>
                    {audioButton}
                    {videoButton}

                    <div className="options-div">
                        <ScreenShareIcon fontSize="large" className="video-options" onClick={shareScreen}></ScreenShareIcon>
                    </div>
            </div>
        </div>
    )
}
export default Room
