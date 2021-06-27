import React, { useState, useEffect } from 'react'
import db from '../../firebase'
import User from './User'

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
                <User 
                    key = {userId}
                    id = {userId}
                    email = {user.emailid}
                />
            ))}
        </div>
    )
}

export default Users




