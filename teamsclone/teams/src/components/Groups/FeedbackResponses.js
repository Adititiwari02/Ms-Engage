/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Header from "./../HeaderFooter/Header";
import db from "../../firebase";
import { Container } from "react-bootstrap";
import ResponseToFeedback from "./ResponseToFeedback";

function FeedbackResponses() {
    const pathname = window.location.pathname;
    const groupIdWithSlash = pathname.split(":")[1];
    const groupId = groupIdWithSlash.slice(0, -1);
    const formId = pathname.split(":")[2];
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        db.collection("groups")
            .doc(groupId)
            .collection("feedbackResults")
            .doc(formId)
            .collection("response")
            .onSnapshot((snapshot) =>
                setResponses(
                    snapshot.docs.map((doc) => ({
                        responseId: doc.id,
                        response: doc.data(),
                    }))
                )
            );
    });
    return (
        <div>
            <Header />
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                style={{ maxwidth: "100%" }}
            >
                <div className="w-80">
                    {responses.map(({ responseId, response }) => (
                        <ResponseToFeedback
                            id={responseId}
                            userId={responseId}
                            response={response}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default FeedbackResponses;
