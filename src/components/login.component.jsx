import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';

import FloatingLabel from "react-bootstrap/FloatingLabel";

import '../App.css';

function Login() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [returnedData, setReturnedData] = useState({
        _id: "", 
        username: "", 
        password: "", 
        email: "", 
        firstname: "", 
        lastname: ""
    });


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

    const handleChange = (event) => {
        const {name, value} = event.target;

        setCredentials(prev => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    const logIn = async (event) => {
        event.preventDefault();
        console.log(credentials);

        const userData = await fetch('http://localhost:3001/loginUser', {
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


        console.log("does this run?", userData);
        if (userData.firstName != null) {
            console.log("user found matching the credentials")
            setReturnedData(userData);

            getJWT(userData);
        } else {
            console.log("No user found with those credentials")
        }
        
        
    }

    const cookies = new Cookies();
    
    async function getJWT(userData) {
        //add check to see if username and password match
        console.log(userData);
        console.log(credentials);
        var JWT = "";

        if ((userData.username = credentials.username) && (userData.password = credentials.password)){
            JWT = await fetch('http://localhost:3001/JWT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userID: userData._id,
                    username: userData.username,
                    email: userData.email,
                    password: userData.password, //will be hashed and salted before production
                    firstname: userData.firstname,
                    lastname: userData.lastname
                })
            })
            .then(res => res.text());
            console.log(JWT);
            cookies.set("user-authentication", JWT);
            navigate("/Messages");
        } else {
            console.log("Username and Password Mismatch!");
        }
        console.log(JWT);
    }

    return (
        <>
            <div id='bodyTest' style={{width:"100%", margin:"auto auto", textAlign:"center"}}>
                <h2>Login</h2>
                
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
                    </Form.Group>
                    <Button variant="outline-dark" style={{width:"100%", marginBottom:'1rem'}} onClick={logIn}>Login</Button>
                </Form>
            </div>
        </>
    )

}

export default Login