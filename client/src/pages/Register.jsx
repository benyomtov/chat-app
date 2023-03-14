import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRoutes';


export default function Register() {

    const [formData, setFormData] = useState({ 
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()) {
            const { username, email, password } = formData;
            const { data } = await axios.post(registerRoute, {
                username, 
                email, 
                password,
            });
        };
    };

    const handleValidation = () => {

        console.log("in validation", registerRoute);
        const { password, confirmPassword, username, email } = formData;
        if (password !== confirmPassword) {
            toast.error("Passwords do not match",
            toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username must be at least 3 characters",
            toastOptions);
            return false;
        } else if (email.length < 3) {
            toast.error("Email must be at least 3 characters",
            toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password must be at least 8 characters",
            toastOptions);
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    return (
        <div>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                        <h1>CavyChat</h1>

                    </div>
                    <input type="text" 
                    placeholder="Username"
                    name="username"
                    onChange={(event) => handleChange(event)}
                    />
                    <input type="email" 
                    placeholder="Email"
                    name="email"
                    onChange={(event) => handleChange(event)}
                    />
                    <input type="password" 
                    placeholder="Password"
                    name="password"
                    onChange={(event) => handleChange(event)}
                    />
                    <input type="password" 
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(event) => handleChange(event)}
                    />
                    <button type="submit">Register</button>
                    <span>already have an account ? <Link to="/login">Login</Link> </span>
                </form>

            </FormContainer>
            <ToastContainer />
        </div>
    );
}


    const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    background-color: #131324;
    .logo {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }    
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {     
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }    
        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }       
    }       

    `;