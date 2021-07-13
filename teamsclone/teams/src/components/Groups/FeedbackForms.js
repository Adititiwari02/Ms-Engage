/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from "react";
import db from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import Header from "./../HeaderFooter/Header";
import { Container } from "react-bootstrap";
import FeedbackForm from "./FeedbackForm";

function FeedbackForms() {
    const [forms, setForms] = useState([]);
    const { currentUser } = useAuth();
    const pathname = window.location.pathname;
    const groupId = pathname.split(":")[1];
    useEffect(() => {
        db.collection("groups")
            .doc(groupId)
            .collection("feedbackForms")
            .where("eligiblePeople", "array-contains", currentUser.uid)
            .onSnapshot((snapshot) =>
                setForms(
                    snapshot.docs.map((doc) => ({
                        formId: doc.id,
                        formName: doc.data().nameOfFeedback,
                    }))
                )
            );
        // eslint-disable-next-line
    }, []);
    console.log(forms);
    return (
        <div>
            <Header />
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
                style={{ maxwidth: "100%" }}
            >
                <div className="w-60">
                    <h2 className="text-center mb-4">
                        {" "}
                        Feedback forms to fill{" "}
                    </h2>
                    {forms.map(({ formId, formName }) => (
                        <FeedbackForm
                            id={formId}
                            groupId={groupId}
                            formId={formId}
                            formName={formName}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default FeedbackForms;
