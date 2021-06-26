import React, { useState, useEffect } from 'react'
import db from '../../firebase'
import User from './User'
import { Button} from "react-bootstrap"

function Users(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => 
          setUsers(snapshot.docs.map(doc => ({
              userId: doc.id,
              user: doc.data()
          })))
      )}, [])
    return (
        <div>            
            {users.map(({ userId, user }) => (
                <Button className="w-100 mt-4 mt-4">
                    <User 
                    key = {userId}
                    id = {userId}
                    email = {user.emailid}
                    />
                </Button> 
            ))}
        </div>
    )
}

export default Users




