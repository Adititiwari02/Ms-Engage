// We use a fully connected mesh network to achieve the motive of group video call
// Each user joined will have an array of all other users in that room

import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import Peer from "simple-peer"
import styled from "styled-components"

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`

const Video = (props) => {
    const ref = useRef()

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream
        })
    }, [])

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    )
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
}

const Room = (props) => {
    const [peers, setPeers] = useState([])          //for actually rendering i.e the no of people joined
    const socketRef = useRef()
    const userVideo = useRef()
    const peersRef = useRef([])                    //array of objects which has the userID given by socket and the peers
    const roomID = props.match.params.roomID


    //when connecting for the first time
    useEffect(() => {
        socketRef.current = io.connect("/")
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream            //for own video
            socketRef.current.emit("join room", roomID)
            socketRef.current.on("all users", users => {
                const peers = []                            //since just joined has no peers
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream)
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer)
                })
                setPeers(peers)
            })
            //handle the situation for users already in the room
            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream)          //sending our own stream
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })
                //we dont need to push as we already have been added in the peers
                setPeers(users => [...users, peer])
            })

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id)        //find the peer who sent signal
                item.peer.signal(payload.signal)                                        //by searching for payload.id
            })
        })
    }, [])

    // create a new peer 
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

    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                )
            })}
        </Container>
    )
}

export default Room
