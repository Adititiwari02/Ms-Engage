import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Header from './../HeaderFooter/Header';
import Footer from './../HeaderFooter/Footer';
import db from '../../firebase';

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
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
  const styleBtn = {
    textAlign: "center",
    position: "relative",
    marginLeft: "19px", 
    marginBottom: "20px"
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <Header/> 
      <h2 className="text-center mb-4">Update Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            ref={emailRef}
            required
            defaultValue={currentUser.email}
          />
        </Form.Group>
        <Form.Group id="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder="Leave blank to keep the same"
          />
        </Form.Group>
        <Form.Group id="password-confirm">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            ref={passwordConfirmRef}
            placeholder="Leave blank to keep the same"
          />
        </Form.Group>
        <Button disabled={loading} style={styleBtn} variant={themeName} className="w-100" type="submit">
          Update
        </Button>
      </Form>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
      <Footer />
    </div>
  )
}