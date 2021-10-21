
import axios from 'axios'
import { Button, ListGroup, Badge } from 'react-bootstrap'
import React from 'react'

const Chart = ({ user_account, balance, charts }) => {
    const handleBuy = (item_id, price) => {
        axios.post('http://localhost:3005/user/buyItem', {
            "user_account": user_account,
            "balance": balance,
            "item_id": item_id,
            "item_price": price,
            "provider_id": 0,
            "gas": 10
        }
        )
            .then(response => {
                console.log(balance, price)
                if (response.data.state === 0) {
                    alert("no money")
                } else {
                    alert("Success!")
                }
            });
    }
    const handleDel = (item_id) => {
        axios.post('http://localhost:3005/user/DelOnChart', {
            "user_account": user_account,
            "item_id": item_id
        }
        )
            .then(response => {
                if (response.data.state === 0) {
                    alert("Del chart error")
                } else {
                    alert("Success!")
                }
            });
    }
    return (
        <ListGroup>
            {charts.map((ct, i) => {
                return (
                    <ListGroup.Item>
                        <div>
                            {ct.item_name}
                            <br />
                            <Button variant="danger" onClick={() => { handleDel(ct.item_id) }}>Delete</Button>
                            <Button variant="primary" onClick={() => { handleBuy(ct.item_id, 200) }}>Buy</Button>
                        </div>

                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}
export default Chart 