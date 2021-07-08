/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import Header from './../HeaderFooter/Header';
import db from '../../firebase';
import { Container, Button} from "react-bootstrap";
import {useAuth} from '../../contexts/AuthContext';

function FillForm() {
    const {currentUser} = useAuth();
    const [themeName, setThemeName] = useState("");
    const pathname = window.location.pathname;
    const groupIdWithSlash = pathname.split(':')[1];
    const groupId = groupIdWithSlash.slice(0, -1);
    const formId = pathname.split(':')[2];
    const [formCreator, setFormCreator] = useState("");
    const [formName, setFormName] = useState("");
    const [response1, setResponse1] = useState("");
    const [response2, setResponse2] = useState("");
    const [response3, setResponse3] = useState("");
    const [response4, setResponse4] = useState("");
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
    }, [])
    useEffect(() => {
        var docRef = db.collection("groups").doc(groupId).collection("feedbackForms").doc(formId)
        docRef.get().then((doc) => {
            if(doc.exists) {
                setFormCreator(doc.data().creator)
                setFormName(doc.data().nameOfFeedback)
            } else {
                console.log("NOT FOUND ERROR!!")
            }
        }).catch((error) =>{
            console.log("Error Fetching Document!")
        })
        db.collection("groups").doc(groupId).collection("feedbackResults").doc(formId).set({
            nameOfFeedback: formName,
            creator: formCreator
        })
    }, [])
    function submitFeedback() {
        console.log(response1);
        console.log(response2);
        console.log(response3);
        console.log(response4);
        db.collection("groups").doc(groupId).collection("feedbackResults").doc(formId)
        .collection("response").doc(currentUser.uid).set({
            answer1: response1,
            answer2: response2,
            answer3: response3,
            answer4: response4
        })
        setResponse1("");
        setResponse2("");
        setResponse3("");
        setResponse4("");
        window.close()
    }
    function cancelFeedback() {
        setResponse1("");
        setResponse2("");
        setResponse3("");
        setResponse4("");
    }

    return (
        <div>
            <Header />
            <Container
            className="d-flex align-items-center justify-content-center"
            // eslint-disable-next-line react/jsx-no-duplicate-props
            style={{ minHeight: "100vh" }} style={{ maxwidth: "100%" }}>
            <div className="w-80">
                <h2 style={{textAlign: "center", marginBottom: "30px"}}>Kindly fill the form</h2>
                <div>
                    <h5>How do you think about the content of the meeting ?</h5>
                    <label>
                        <input 
                            onChange={(e) => {
                                setResponse1(e.target.value)
                            }} 
                            type="text" value={response1} 
                            placeholder="type your answer"/>
                    </label>
                </div>
                <div>
                    <h5>What was the most important outcome of the meeting ?</h5>
                    <label>
                        <input 
                            onChange={(e) => {
                                setResponse2(e.target.value)
                            }} 
                            type="text" value={response2} 
                            placeholder="type your answer"/>
                    </label>
                </div>
                <div>
                    <h5>What would you look forward to discussing in the next meet ?</h5>
                    <label>
                        <input 
                            onChange={(e) => {
                                setResponse3(e.target.value)
                            }} 
                            type="text" value={response3} 
                            placeholder="type your answer"/>
                    </label>
                </div>
                <div>
                    <h5>Any questions or suggestions?</h5>
                    <label>
                        <input 
                            onChange={(e) => {
                                setResponse4(e.target.value)
                            }} 
                            type="text" value={response4} 
                            placeholder="type your answer"/>
                    </label>
                </div>
                <Button variant={themeName} className="btn w-100 mt-3" onClick={submitFeedback}>Submit</Button>
                <Button variant={themeName} className="btn w-100 mt-3" onClick={cancelFeedback}>Cancel</Button>                
            </div>
            </Container>
        </div>
    )
}

export default FillForm
