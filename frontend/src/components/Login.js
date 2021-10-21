import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import React, { useState } from 'react'

let user = 0, passwd = "";

const Login = ({ setUser }) => {
    const [state, setState] = useState(0);
    let onFormSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        let u = { "account": user, "passwd": passwd };
        console.log(u)
        axios.post('http://localhost:3005/log/login', u)
            .then(response => {
                console.log(response.data);
                setUser(response.data.user);
                setState(response.data.state + 1)
            });

    }
    if (state === 0) {
        return (
            <Form onSubmit={onFormSubmit}>
                <label>
                    Account:
                    <br />
                    <input type="number" onChange={(e) => {
                        user = e.target.value
                        console.log(user)
                    }} />
                </label>
                <br />
                <label>
                    Password:
                    <br />
                    <input type="password" onChange={(e) => {
                        passwd = e.target.value
                        console.log(passwd)
                    }} />
                </label>
                <br />
                <Button variant="primary" type="submit" >
                    Login
  </Button>
            </Form>
        )
    } else if (state === 2) {
        return (
            <h2>login success</h2>
        )
    } else {
        return (
            <h2>login fail</h2>
        )
    }

}

export default Login