/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from "react"
import { Card, Button, Alert} from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Header from './../HeaderFooter/Header';
import { Container } from "react-bootstrap"
import Footer from './../HeaderFooter/Footer';
import db from '../../firebase';

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [themeName, setThemeName] = useState("");
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  async function handleLogout() {
    setError("")
    try {
      await logout();
      history.push("/login")
    } catch (err){
      setError("Failed to log out")
    }
  }

  return (
    
    <div>
      <Header />
      <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }} style={{ maxWidth: "400px" }}>
      <div className="w-100">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          
          <div className="text-center mt-2">
            <Link to="/update-profile" className={`btn btn-${themeName} w-100 mt-3`}>
              Update Profile
            </Link>
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
            <Link to="/connections" className={`btn btn-${themeName} w-100 mt-3`}>
              Connections
            </Link>
            <Link to="/groups" className={`btn btn-${themeName} w-100 mt-3`}>
              Groups
            </Link>
            <Link to="/users" className={`btn btn-${themeName} w-100 mt-3`}>
              Users
            </Link>
            <Link to="/requests" className={`btn btn-${themeName} w-100 mt-3`}>
              Requests
            </Link>
          </div>
        </Card.Body>
      </Card>
      </div>
    </Container>
    <Footer/>
    </div>
  )
}