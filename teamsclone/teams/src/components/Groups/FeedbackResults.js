/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import Header from './../HeaderFooter/Header';
import db from '../../firebase';
import { Container } from "react-bootstrap";
import {useAuth} from '../../contexts/AuthContext';
import FeedbackResult from './FeedbackResult';

function FeedbackResults() {
    const pathname = window.location.pathname;
    const groupId = pathname.split(':')[1];
    const {currentUser} = useAuth();
    const [formsCreated, setFormsCreated] = useState([]);
    useEffect(() => {
        db.collection("groups").doc(groupId).collection("feedbackResults").where("creator", "==", currentUser.uid)
        .onSnapshot((snapshot) =>
            setFormsCreated(snapshot.docs.map(doc => ({
                formId: doc.id,
                nameOfFeedback: doc.data().nameOfFeedback
            })))
        );
        console.log(formsCreated)
    }, [])
    return (
        <div>
            <Header />
            <Container
            className="d-flex align-items-center justify-content-center"
            // eslint-disable-next-line react/jsx-no-duplicate-props
            style={{ minHeight: "100vh" }} style={{ maxwidth: "100%" }}>
            <div className="w-80">
                {formsCreated.map(({formId, nameOfFeedback}) => (
                    <FeedbackResult 
                        id = {formId}
                        formId = {formId}
                        formName = {nameOfFeedback}
                        groupId = {groupId}
                    />
                ))}
            </div>
            </Container>
        </div>
    )
}

export default FeedbackResults
