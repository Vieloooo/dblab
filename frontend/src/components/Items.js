
import axios from 'axios'
import { Button, Card, ButtonGroup, Col, Row, OverlayTrigger, Form } from 'react-bootstrap'
import React, { useState } from 'react'

const Items = ({ balance, user_account, itms }) => {
    console.log(itms)
    const handleLove = (item_id) => {
        axios.post('http://localhost:3005/user/addToChart', {
            "user_account": user_account,
            "item_id": item_id
        })
            .then(response => {
                if (response.data.state === 0) {
                    alert("you already add this item to your chart!")
                } else {
                    alert("Success!")
                }
            });
    }
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

    return (
        <Row xs={1} md={4} className="g-4">
            {itms.map((item, i) => {
                console.log(item, i)
                return (
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.item_name}</Card.Title>
                                <Card.Text>
                                    price: {item.item_price}
                                    <br />
                                    {item.item_info}
                                </Card.Text>
                            </Card.Body>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="danger"
                                    onClick={() => { console.log(item.item_id); handleLove(item.item_id) }}>
                                    Love</Button>
                                <Button variant="primary"
                                    onClick={() => { console.log(item.item_id); handleBuy(item.item_id, item.item_price) }}>
                                    Buy</Button>
                                <OverlayTrigger trigger="click" placement="bottom" overlay={popover(user_account, item.user_account)} >
                                    <Button variant="info">Ask</Button>
                                </OverlayTrigger>
                            </ButtonGroup>
                        </Card>
                    </Col>

                )
            })}
        </Row>
    )
}
let msg = ""
const popover = (from, to) => {
    const handleAsk = () => {
        console.log(from, to, msg)
        axios.post('http://localhost:3005/user/sendMsg', {
            "user_account": from,
            "send_to": to,
            "msg_content": msg
        })
            .then(response => {
                if (response.data.state === 0) {
                    alert("you already add this item to your chart!")
                } else {
                    alert("Success!")
                }
            });
    }
    return (
        <div>

            <label>
                Your Question:
                    <br />
                <input type="text" onChange={(e) => {
                    msg = e.target.value
                }} />
            </label>
            <br />
            <Button variant="primary" onClick={() => { handleAsk(from, to, msg) }}>
                Send
            </Button>

        </div>
    )

}
export default Items