import axios from 'axios'
import { Button, Card, ButtonGroup, Col, Row, OverlayTrigger, Form } from 'react-bootstrap'
import React, { useState } from 'react'



const Selling = ({ user_account, itms }) => {
    let item_name = "", item_info = "", item_price = 0;
    const handlePost = (item_name, item_info, item_price, user_account) => {
        console.log(item_name, item_info, item_price, user_account)
        axios.post('http://localhost:3005/user/postItem', {
            "item_name": item_name,
            "type_id": 0,
            "user_account": user_account,
            "item_info": item_info,
            "item_price": item_price
        })
            .then(response => {
                if (response.data.state === 0) {
                    alert("post err")
                } else {
                    alert("Success!")
                }
            });
    }
    return (
        <div>
            <div >
                <label>
                    Item name:
                    <input type="text" onChange={(e) => {
                        item_name = e.target.value
                    }} />
                </label>
                <br />
                <label>
                    Item info:
                    <input type="text" onChange={(e) => {
                        item_info = e.target.value
                    }} />
                </label>
                <br />
                <label>
                    Item Price:
                    <input type="number" onChange={(e) => {
                        item_price = e.target.value
                    }} />
                </label>
                <br />
                <Button variant="warning" onClick={() => { handlePost(item_name, item_info, item_price, user_account) }}>
                    Post
            </Button>
            </div>
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
                                    >
                                        Delete</Button>
                                    <Button variant="primary"> Update
                                    </Button>
                                </ButtonGroup>
                            </Card>
                        </Col>

                    )
                })}
            </Row>
        </div>
    )
}


export default Selling