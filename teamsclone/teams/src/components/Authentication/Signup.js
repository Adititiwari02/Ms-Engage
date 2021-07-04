import React, { useRef, useState} from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import db from '../../firebase';
import Header from './../HeaderFooter/Header';
import Footer from './../HeaderFooter/Footer';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const styleBtn = {
    textAlign: "center",
    position: "relative",
    marginLeft: "19px", 
    marginBottom: "20px"
  }
  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError("");
      setLoading(true);
      
      const auth = await signup(emailRef.current.value, passwordRef.current.value);
      if (auth.user) {
          db.collection('users').doc(auth.user.uid).set({
              emailid: emailRef.current.value
          })
          .then((s) => {
              history.push("/");
          })
      }
    } catch (err){
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <div>
      <Header />
      <h2 className="text-center mb-4">Sign Up</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Form.Group id="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
        </Form.Group>
        <Form.Group id="password-confirm">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" ref={passwordConfirmRef} required />
        </Form.Group>
        <Button disabled={loading} style={styleBtn} className="w-100" type="submit">
          Sign Up
        </Button>
      </Form>
        
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      <Footer />
    </div>
  )
}