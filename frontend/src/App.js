

import axios from 'axios'
import { Tab, Tabs, } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
//save all data here 
//user info 

//items 
//my msgs 
//mytxs
//my sellings
//export the function 
const App = () => {
    const [items, setItems] = useState([]);
    const [me, setUser] = useState({ "user_account": 0 });
    const [txs, setTxs] = useState({});
    // console.log(Date.now())
    useEffect(() => {
        axios.post('http://localhost:3005/api/user', { "user_account": me.user_account })
            .then(response => {
                console.log(response.data)
                setUser(response.data)
            })
    }, [])
    setTimeout(() => {
        axios
            .get('http://localhost:3005/api/items')
            .then(response => {
                setItems(response.data)
            })
    }, 3000);

    setTimeout(() => {
        axios
            .post('http://localhost:3005/user/getMyTxs', { user_account: me.user_account })
            .then(response => {
                console.log('promise fulfilled', response.data)
                setTxs(response.data.Txs)
            })
    }, 5000);
    setTimeout(() => {
        axios
            .post('http://localhost:3005/user/mysell', { user_account: me.user_account })
            .then(response => {
                console.log('promise fulfilled', response.data)
                setSells(response.data.)
            })
    }, 5000);
    return (
        <div>
            <h1 className="mb-2">Salty Phish</h1>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="Me" title="Me">
                    <p>{JSON.stringify(me)}</p>
                </Tab>
                <Tab eventKey="Login" title="Login">
                    <Login setUser={setUser} />
                </Tab>
                <Tab eventKey="Signup" title="Signup">
                    <Signup setUser={setUser} />
                </Tab>
                <Tab eventKey="Items" title="Items">
                    <p>{JSON.stringify(items)}</p>
                </Tab>
                <Tab eventKey="Txs" title="Txs"  >
                    <p>{JSON.stringify(txs)}</p>
                </Tab>
                <Tab eventKey="Selling" title="Selling" >
                </Tab>
            </Tabs>
        </div >

    )
};



export default App 