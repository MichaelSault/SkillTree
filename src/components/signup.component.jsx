import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import FloatingLabel from "react-bootstrap/FloatingLabel";

import '../App.css';

function SignUp() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;

        setCredentials(prev => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    useEffect(() => {
        const loggedInUser = document.cookie.split('=')[1];
        console.log(loggedInUser);
        if (loggedInUser) {
            console.log("User is logged in");
            navigate("/Messages", {relative: "path"})
        } else {
            console.log("No user is logged in");
        }
        console.log(loggedInUser);
    }, []);

    const handleClick = async (event) => {
        event.preventDefault();
        console.log(credentials);

        const userData = await fetch('http://localhost:3001/signUpUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...credentials
            })
        })
        .then(res => res.json());
        console.log(userData);
    }

    return (
        <>
            <div id='bodyTest' style={{width:"100%", margin:"auto auto", textAlign:"center"}}>
                <h2>Sign Up</h2>
                
                <Form>
                    <Form.Group>
                        <FloatingLabel
                            controlId="username"
                            name="userName"
                            label="User Name"
                            className="mb-3"
                        >
                        <Form.Control
                            name='username'
                            value={credentials.username} 
                            placeholder='User Name' 
                            style={{marginBottom: '1rem'}} 
                            onChange={handleChange}
                        />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="email"
                            name="email"
                            label="Email"
                            className="mb-3"
                        >
                        <Form.Control
                            name='email'
                            value={credentials.email} 
                            placeholder='Email' 
                            style={{marginBottom: '1rem'}} 
                            onChange={handleChange}
                        />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="firstName"
                            name="firstName"
                            label="First Name"
                            className="mb-3"
                        >
                        <Form.Control
                            name='firstName'
                            value={credentials.firstName} 
                            placeholder='First Name' 
                            style={{marginBottom: '1rem'}} 
                            onChange={handleChange}
                        />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="lastName"
                            name="lastName"
                            label="Last Name"
                            className="mb-3"
                        >
                        <Form.Control
                            name='lastName'
                            value={credentials.lastName} 
                            placeholder='Last Name' 
                            style={{marginBottom: '1rem'}} 
                            onChange={handleChange}
                        />
                        </FloatingLabel>
                        
                        <FloatingLabel
                            controlId="password"
                            name="password"
                            label="Password"
                            className="mb-3"
                        >
                        <Form.Control
                            name="password"
                            type='password'
                            value={credentials.password} 
                            placeholder='Password' 
                            onChange={handleChange}
                            className="mb-3"
                        />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            className="mb-3"
                        >
                        <Form.Control
                            name="confirmPassword"
                            type='password'
                            value={credentials.confirmPassword} 
                            placeholder='Password' 
                            onChange={handleChange}
                            className="mb-3"
                        />
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="outline-dark" style={{width:"100%", marginBottom:'1rem'}} onClick={handleClick}>Sign Up</Button>
                </Form>
            </div>
        </>
    )

}

export default SignUp