import React, { useRef, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Alert } from 'react-bootstrap';
import {useAuth} from "../../contexts/authContext"


const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const fnameRef = useRef()
  const lnameRef = useRef()
  const passwordCheckRef = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  // destructure
  const{currentUser, signup} = useAuth()

  async function handleSubmit(e){
    e.preventDefault()
    if(passwordRef.current.value !== passwordCheckRef.current.value) {
      setError("Password do not match")
    } else {
    try{
    setLoading(true)
    const result = await signup(emailRef.current.value, passwordRef.current.value)
    console.log(result)
    const verified = await result.user.sendEmailVerification()
    console.log(verified)
    } catch {
      setError("Failed to create an account. Password must be at least 6 characters or username already exists")
      
    } 
    setLoading(false)
  }
}

  return (
    <div>
      {error && <Alert variant="danger">{error} </Alert>}
      <h1>Sign Up</h1>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email">
          {/* <Form.Label>Email</Form.Label> */}
          <Form.Control type="text" ref={fnameRef} placeholder="First Name" required></Form.Control>
        </Form.Group>
        <Form.Group id="email">
          {/* <Form.Label>Email</Form.Label> */}
          <Form.Control type="text" ref={lnameRef} placeholder="Last Name" required></Form.Control>
        </Form.Group>
        <Form.Group id="email">
          {/* <Form.Label>Email</Form.Label> */}
          <Form.Control type="email" ref={emailRef} placeholder="Email address" required></Form.Control>
        </Form.Group>

        <Form.Group id="password">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control type="password" ref={passwordRef} placeholder="Password" required></Form.Control>
        </Form.Group>

        <Form.Group id="password">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control type="password" ref={passwordCheckRef} placeholder="Confrim Password" required></Form.Control>
        </Form.Group>

        <Button variant="primary" disabled={loading} className="w-100" type="submit">
          Register
          </Button>
      </Form>
      <div>
        <Link to="/"> Have an account? Log in here</Link>
      </div>

    </div>
  )
}

export default Signup