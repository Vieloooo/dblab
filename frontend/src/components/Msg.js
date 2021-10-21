import { ListGroup } from 'react-bootstrap'
import React from 'react'

const Msg = ({ msgs }) => {

    return (
        <ListGroup>
            {msgs.map((m, i) => (
                <ListGroup.Item>
                    From:{m.user_account}--To:{m.send_to}--{m.Msg_stamp}
                    <br />
                    {m.msg_content}
                </ListGroup.Item>
            )
            )}
        </ListGroup>
    )
}
export default Msg