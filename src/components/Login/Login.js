import React, { useRef, useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Form, Alert } from 'react-bootstrap';
import {useAuth} from "../../contexts/authContext"
import './Login.css';

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const[loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const{currentUser, login} = useAuth()
    const history = useHistory()


    async function handleSubmit(e){
        e.preventDefault()
        try{
        setLoading(true)
        setError("")
        const result = await login(emailRef.current.value, passwordRef.current.value)
        console.log(result)
        emailRef.current.value= "";
        passwordRef.current.value = "";
        history.push("/movie")
        }
        catch(error) {
        setError("Error signing in with password and email!");
        console.error("Error signing in with password and email", error);
      };
      setLoading(false)
      

    };
    
    return (
        <div>
            {error && <Alert variant="danger">{error} </Alert>}
            <h1>Log in</h1>
    
            <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control type="email" ref={emailRef} placeholder ="Email address" required></Form.Control>
            </Form.Group>

            <Form.Group id="password">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control type="password" ref={passwordRef} placeholder = "Password" required></Form.Control>
            </Form.Group>
            
            <Button variant="primary" disabled={loading} className="w-100" type="submit">
              Log in
          </Button>
        </Form>
        <div>
            <Link to = "/signup"> Not yet registered? Sign up here</Link>
            </div>
            {/* <div> 
            <video width="100%" height="100%" controls>
            <source src="https://firebasestorage.googleapis.com/v0/b/todoapp-12386.appspot.com/o/y2mate.com%20-%20The%20English%20Teacher%202020%20%20Short%20Film%20%20Drama_1080p.mp4?alt=media&token=661e2cd3-f905-41ee-a55f-28f710f10d50" type="video/mp4"/>
            </video>
            </div> */}
        </div>
    )
}

export default Login
