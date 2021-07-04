/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import Request from './Request';
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';
import Header from './../HeaderFooter/Header';
import { Container } from "react-bootstrap";
import Footer from './../HeaderFooter/Footer';

function Requests() {
    const {currentUser} = useAuth();
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        db.collection("users").doc(currentUser.uid).collection("connectionRequests")
        .onSnapshot((snapshot) => 
            setConnections(snapshot.docs.map((doc) => ({
                requestId: doc.id,
                request: doc.data()
            })))
        );
    // eslint-disable-next-line
    }, [])

    return (
    <div>
        <Header/>
        <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }} style={{ maxWidth: "400px" }}>
        <div className="w-100">
            <h2>Connection Requests</h2>
            {connections.map(({ requestId, request }) => (
                <Request 
                    key = {requestId}
                    id = {requestId}
                    emailid = {request.requestEmail}
                />
            ))}
        </div>
        </Container>
        <Footer />
    </div>
  );
}

export default Requests;