import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';

import FloatingLabel from "react-bootstrap/FloatingLabel";

import '../App.css';
import '../stylesheets/skilltree.css';

function Skilltree() {
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
            decodeJWT(loggedInUser);
        } else {
            console.log("No user is logged in");
            navigate("/LogIn", {relative: "path"})
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

    const cookies = new Cookies();
    
    const decodeJWT = async (token) => {
        console.log("token: ", token)
        const tokenData = await fetch('http://localhost:3001/decodeJWT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Token: token
            })
        })
        .then(res => res.json());

        console.log(tokenData);
    }

    return (
        <>
            <div id='stBody'>
                <h1>Skill Tree</h1>
                <div className='stBackground'>
                    <h2>Skill 1</h2>
                    <div className='stContainer'>
                        <div className='stBox'>Step 1</div>
                        <div className='stBox'>Step 2</div>
                        <div className='stBox'>Step 3</div>
                        <div className='stBox'>Step 4</div>
                        <div className='stBox'>Step 5</div>
                    </div>                   
                </div>

                <div className='stBackground'>
                    <h2>Skill 2</h2>
                    <div className='stContainer'>
                        <div className='stBox'>Step 1</div>
                        <div className='stBox'>Step 2</div>
                        <div className='stBox'>Step 3</div>
                    </div>                   
                </div>

                <div className='stBackground'>
                    <h2>Skill 3</h2>
                    <div className='stContainer'>
                        <div className='stBox'>Step 1</div>
                        <div className='stBox'>Step 2</div>
                        <div className='stBox'>Step 3</div>
                        <div className='stBox'>Step 4</div>
                        <div className='stBox'>Step 5</div>
                        <div className='stBox'>Step 6</div>
                        <div className='stBox'>Step 7</div>
                        <div className='stBox'>Step 8</div>
                        <div className='stBox'>Step 9</div>
                        <div className='stBox'>Step 10</div>
                    </div>                   
                </div>
            </div>
        </>
    )

}

export default Skilltree