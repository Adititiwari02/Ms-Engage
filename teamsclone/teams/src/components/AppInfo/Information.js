import React, {useState, useEffect} from 'react'
import db from '../../firebase';
// import Carousel from 'react-bootstrap/Carousel'
import Header from './../HeaderFooter/Header';
import { Container} from "react-bootstrap";
import {useAuth} from '../../contexts/AuthContext';
import firebaselogo from "./../../Images/firebaselogo.png";
import reactlogo from "./../../Images/reactlogo.png";
import webrtclogo from "./../../Images/webrtclogo.png";

function Information() {
    const {currentUser} = useAuth();
    const [themeNum, setThemeNum] = useState(-1);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    useEffect(() => {
        var docRef= db.collection("users").doc(currentUser.uid)
        docRef.get().then((doc) => {
            if(doc.exists) {
                setThemeNum(doc.data().themeNo)
            } else {
                console.log("NOT FOUND ERROR!!")
            }
        }).catch((error) =>{
            console.log("Error Fetching Document!")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const bgColor = ["#0D6EFD", "#198754", "#212529", "#DC3545", "#FFC107", "#6C757D"];
    const styleObj = {
        backgroundColor: bgColor[themeNum], 
        color:"white",
        borderRadius: "15px",
        textAlign: "center",
        marginRight: "10px",
        marginBottom: "10px"
    }

    return (
        <div>
            <Header />
            <Container
            className="d-flex align-items-center justify-content-center"
            // eslint-disable-next-line react/jsx-no-duplicate-props
            style={{ maxHeight: "100vh" }} style={{ maxwidth: "100%" }}>
            <div className="w-100">
            <h1 style={{color: bgColor[themeNum], textAlign: "center", marginTop: "60px", marginBottom:"60px"}}>
                Few features of the app!
            </h1>
                <div className="container">
                    <div className="row" style={{textAlign: "center"}}>
                        <div className="col-sm" style={styleObj}>
                            <div>
                                <h3>Group Video Call Feature</h3>
                                <p>Fully functional video call with audio and video controlls as well as share screen option</p>
                                <p>There is an option to have group video call without creating groups as well</p>
                            </div>
                        </div>
                        <div className="col-sm" style={styleObj}>
                            <div>
                                <h3>Send and Accept Connection Requests</h3>
                                <p>You can see all the users of the app and send/accept connection requests, later on with these connected users you can form groups</p>
                            </div>
                        </div>
                        <div className="col-sm" style={styleObj}>
                            <div>
                                <h3>Create Groups and Chat</h3>
                                <p>A group chat feature where you can have conversations before, during and after the meeting</p>
                                <p>The video call link is also sent in the chat</p>
                            </div>
                        </div>
                        <div className="col-sm" style={styleObj}>
                            <div>
                                <h3>Survey Forms and Notes</h3>
                                <p>Create survey forms, respond to the and see the responses to them as well.</p>
                                <p>The Notes section lets you store important information!</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h1 style={{color: bgColor[themeNum], textAlign: "center", marginTop: "60px", marginBottom:"60px"}}>
                    So what was used to build the app?
                </h1>
                <div className="container" style={{marginBottom: "200px"}}>
                    <div className="row" style={{textAlign: "center"}}>
                        <div className="col-sm">
                            <img height="200px" width="200px" src={reactlogo} alt="firebase logo"/>
                        </div>
                        <div className="col-sm">
                            <img height="200px" width="200px" src={firebaselogo} alt="firebase logo"/>
                        </div>
                        <div className="col-sm">
                            <img height="200px" width="200px" src={webrtclogo} alt="firebase logo"/>   
                        </div>
                    </div>
                </div>
                <div className="container" style={{color: bgColor[themeNum], textAlign: "center"}}>
                    <div className="row" style={{textAlign: "center"}}>
                        <div className="col-sm">
                            <h4>4 Weeks</h4>
                        </div>
                        <div className="col-sm">
                            <h4>2500+ lines of code</h4>
                        </div>
                        <div className="col-sm">
                            <h4>1 adopt phase</h4>   
                        </div>
                    </div>
                </div>
                <h1 style={{color: bgColor[themeNum], textAlign: "center", marginTop: "60px", marginBottom:"60px"}}>
                    What are you waiting for? Go Ahead and try out the app!!
                </h1>
            </div>
            </Container>
            <p style={{textAlign: "center"}}>Copyright Aditi Tiwari © {year}</p>
        </div>
    )
}

export default Information
