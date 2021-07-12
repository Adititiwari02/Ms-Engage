import React, { useRef, useState } from "react"
import { Form, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Footer from './../HeaderFooter/Footer';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
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

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch (err){
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <div>
      <Container
      className="d-flex align-items-center justify-content-center"
      // eslint-disable-next-line react/jsx-no-duplicate-props
      style={{ minHeight: "100vh" }} style={{ maxWidth: "400px" }}>
      <div className="w-100">
      <h2 className="text-center mb-4">Log In</h2>
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
        <div className="w-100 text-center mt-2">
            <Button disabled={loading} className="w-100" style={styleBtn} type="submit">
            Log In
            </Button>
        </div> 
      </Form>
      <div className="w-100 text-center mt-3">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      <Footer />
      </div>
      </Container>
    </div>
  )
}