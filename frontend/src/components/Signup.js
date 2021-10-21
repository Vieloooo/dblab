import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import React, { useState } from 'react'

let user = {
    "user_name": "default",
    "addr_zip": 518000,
    "user_detail_addr": "liyuan 81203B",
    "passwd": "123",
    "balance": 1000

}
const Signup = ({ setUser }) => {



    const [state, setState] = useState(0);
    let onFormSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        axios.post('http://localhost:3005/log/signup', user)
            .then(response => {
                console.log(response.data);
                setUser(Object.assign({ "user_account": response.data.id }, user));
                setState(response.data.state + 1)
            });

    }
    if (state === 0) {
        return (
            <Form onSubmit={onFormSubmit}>
                <label>
                    Pick a name:
                    <br />
                    <input type="text" onChange={(e) => {
                        user.user_name = e.target.value
                        console.log(user)
                    }} />
                </label>
                <br />
                <label>
                    Pick a Password:
                    <br />
                    <input type="password" onChange={(e) => {
                        user.passwd = e.target.value
                    }} />
                </label>
                <br />
                <label>
                    Your address zipcode:
                    <br />
                    <input type="number" onChange={(e) => {
                        user.addr_zip = e.target.value
                    }} />
                </label>
                <br />
                <label>
                    Your detail address:
                    <br />
                    <input type="text" onChange={(e) => {
                        user.user_detail_addr = e.target.value
                    }} />
                </label>
                <br />
                <label>
                    Money pop in:
                    <br />
                    <input type="number" onChange={(e) => {
                        user.balance = e.target.value
                    }} />
                </label>
                <br />
                <Button variant="primary" type="submit" >
                    Sign up
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

export default Signup