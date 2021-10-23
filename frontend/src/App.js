

import axios from 'axios'
import { Tab, Tabs, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Me from './components/Me'
import Items from './components/Items'
import Txs from './components/Txs'
import Chart from './components/Chart'
import Selling from './components/Selling'
import Sold from './components/Sold'
import Msg from './components/Msg'

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
    const [txs, setTxs] = useState([]);
    const [sells, setSells] = useState([])
    const [sold, setSold] = useState([])
    const [msg, setMsg] = useState([])
    const [chart, setChart] = useState([])
    const [profit, setProfit] = useState(0)
    // console.log(Date.now())
    /*
    useEffect(() => {
        axios.post('http://localhost:3005/api/user', { "user_account": me.user_account })
            .then(response => {
                console.log(response.data)
                setUser(response.data)
            })
    }, [])
    */
    const refreshall = () => {

        axios.post('http://localhost:3005/api/user', { "user_account": me.user_account })
            .then(response => {
                console.log(response.data)
                setUser(response.data)
            })

        axios
            .get('http://localhost:3005/api/items')
            .then(response => {
                if (response.data != null) {
                    setItems(response.data)
                }

            });

        axios
            .post('http://localhost:3005/user/getMyTxs', { user_account: me.user_account })
            .then(response => {
                //console.log('promise fulfilled', response.data)
                setTxs(response.data.Txs)
            })
        axios
            .post('http://localhost:3005/user/mysell', { user_account: me.user_account })
            .then(response => {
                //console.log('promise fulfilled', response.data)
                setSold(response.data.items)
            })
        axios
            .post('http://localhost:3005/api/userItems', { user_account: me.user_account })
            .then(response => {
                //console.log('promise fulfilled', response.data)
                setSells(response.data)
            })
        axios
            .post('http://localhost:3005/user/getAllMsg', { user_account: me.user_account })
            .then(response => {
                console.log(response.data.msgs)
                //console.log('promise fulfilled', response.data)
                setMsg(response.data.msgs)
            })
        axios
            .post('http://localhost:3005/user/myChart', { user_account: me.user_account })
            .then(response => {
                console.log(response.data)
                //console.log('promise fulfilled', response.data)
                setChart(response.data.items)
            })

    }

    return (
        <div>
            <div className="d-grid gap-2">
                <h1 >Salty Fish     ---       Hitsz marketplace</h1>
                <Button variant="primary" size="lg" onClick={refreshall}>
                    Refresh here
                        </Button>
            </div>

            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="Signup" title="Signup">
                    <Signup setUser={setUser} />
                </Tab>

                <Tab eventKey="Login" title="Login">
                    <Login setUser={setUser} />
                </Tab>

                <Tab eventKey="Me" title="Me">
                    <Me info={me} profit={profit} />
                </Tab>
                <Tab eventKey="Chart" title="Chart">
                    <Chart balance={me.balance} charts={chart} user_account={me.user_account} />
                </Tab>
                <Tab eventKey="Items" title="Items">
                    <Items balance={me.balance} itms={items} user_account={me.user_account} />
                </Tab>
                <Tab eventKey="Txs" title="Bought"  >
                    <Txs txs={txs} />
                </Tab>
                <Tab eventKey="Selling" title=" My Selling" >
                    <Selling user_account={me.user_account} itms={sells} />
                </Tab>
                <Tab eventKey="sold" title="Sold" >
                    <Sold txs={sold} />
                </Tab>
                <Tab eventKey="Msg" title="Msg" >
                    <Msg msgs={msg} />
                </Tab>
            </Tabs>
        </div >

    )
};



export default App 