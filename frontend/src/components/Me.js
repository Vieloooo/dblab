
import { Card, Button, ListGroup } from 'react-bootstrap'
import React from 'react'

const Me = ({ info, profit }) => {

    return (
        <Card style={{ width: '60rem' }}>
            <Card.Body>
                <Card.Title>Dear {info.user_name}</Card.Title>
                <Card.Text>
                    Welcome to our platform !!!
                </Card.Text>
                <ListGroup variant="flush">
                    <ListGroup.Item>Id: {info.user_account}</ListGroup.Item>
                    <ListGroup.Item>Zipcode: {info.addr_zip}</ListGroup.Item>
                    <ListGroup.Item>Detail address: {info.user_detail_addr}</ListGroup.Item>
                    <ListGroup.Item>Balance: {info.balance}</ListGroup.Item>
                    <ListGroup.Item>Profit: {profit}</ListGroup.Item>

                </ListGroup>
                <Button variant="primary">Update Info</Button>
            </Card.Body>
        </Card>
    )
}

export default Me 
