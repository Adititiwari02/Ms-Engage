import React, { useState, useEffect } from 'react'
import db from '../firebase'
import User from './User'
import { Button, Modal} from "react-bootstrap"

function Users(){
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => 
          setUsers(snapshot.docs.map(doc => ({
              userId: doc.id,
              user: doc.data()
          })))
      )}, [])
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Create Group
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Who would you like to add?</Modal.Title>
                </Modal.Header>
                
                    {users.map(({userId, user}) => (
                        <Modal.Body>
                        <Button>
                            <User 
                            key = {userId}
                            email= {user.emailid}
                            />
                        </Button>
                        </Modal.Body>                        
                    ))}
                
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Users
