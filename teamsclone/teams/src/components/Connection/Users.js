/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from "react";
import db from "../../firebase";
import User from "./User";
import Header from "./../HeaderFooter/Header";
import { Container } from "react-bootstrap";

function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) =>
            setUsers(
                snapshot.docs.map((doc) => ({
                    userId: doc.id,
                    user: doc.data(),
                }))
            )
        );
    }, []);
    return (
        <div>
            <Header />
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
                style={{ maxWidth: "400px" }}
            >
                <div className="w-100">
                    {users.map(({ userId, user }) => (
                        <User key={userId} id={userId} email={user.emailid} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Users;
