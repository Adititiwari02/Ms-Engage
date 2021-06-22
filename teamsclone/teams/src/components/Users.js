import React, { useState, useEffect } from 'react'
import db from '../firebase'
import User from './User'
import { Button, Modal} from "react-bootstrap"

function Users(){
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [groupName, setGroupName] = useState("");
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
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Who would you like to add</Modal.Title>
                </Modal.Header>
                <label>
                    Enter Group Name <br />
                    <input 
                        onChange={(e) => {
                            setGroupName(e.target.value)
                        }} 
                        type="text" value={groupName} 
                        placeholder="Group Name"/>
                </label>
                
                {users.map(({ userId, user }) => (
                    <Modal.Body>
                        <Button className="w-100">
                            <User 
                            key = {userId}
                            id = {userId}
                            email = {user.emailid}
                            groupName = {groupName}
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




