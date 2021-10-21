import axios from 'axios'
import { Button, ListGroup, Badge } from 'react-bootstrap'
import React, { } from 'react'

const Sold = ({ txs }) => {
    console.log(txs, typeof (txs))
    const handleShiping = (tx_id) => {
        axios.post('http://localhost:3005/user/ShippingTx', {
            "tx_id": tx_id
        })
            .then(response => {
                if (response.data.state === 0) {
                    alert("Confirm error")
                } else {
                    alert("Success!")
                }
            });
    }
    return (
        <ListGroup as="ul">
            {txs.map((tx, i) => {
                if (tx.tx_state === 2) {
                    return (
                        <ListGroup.Item>
                            <div>
                                Tx_id:{tx.tx_id}, shipping fee: {tx.tx_gas} time: {tx.tx_stamp}
                                <br />
                                Item:{tx.item_name}
                                <br />
                            Price:{tx.item_price}
                                <br />
                                Total cost:{tx.item_price + tx.tx_gas}
                                <br />
                                <Badge bg="success">Done</Badge>
                            </div>

                        </ListGroup.Item>
                    )
                }
                if (tx.tx_state === 1) {
                    return (
                        <ListGroup.Item>
                            <div>
                                Tx_id:{tx.tx_id}, shipping fee: {tx.tx_gas} time: {tx.tx_stamp}
                                <br />
                                Item:{tx.item_name}
                                <br />
                            Price:{tx.item_price}
                                <br />
                                Total cost:{tx.item_price + tx.tx_gas}
                                <br />
                                <Badge bg="info">Shipping</Badge>


                            </div>

                        </ListGroup.Item>
                    )
                }
                return (
                    <ListGroup.Item>
                        <div>
                            Tx_id:{tx.tx_id}, shipping fee: {tx.tx_gas} time: {tx.tx_stamp}
                            <br />
                                Item:{tx.item_name}
                            <br />
                            Price:{tx.item_price}
                            <br />
                                Total cost:{tx.item_price + tx.tx_gas}
                            <br />
                            <Badge bg="secondary">wait for shipping</Badge>
                            <div>
                                <Button variant="danger" onClick={() => { handleShiping(tx.tx_id) }}>Shipping</Button>
                            </div>
                        </div>


                    </ListGroup.Item>
                )

            }
            )}
        </ ListGroup>
    )
}
export default Sold