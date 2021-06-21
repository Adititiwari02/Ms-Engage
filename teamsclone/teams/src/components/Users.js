import React, { useState, useEffect } from 'react'
import db from '../firebase'
import User from './User'

function Users(){
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // db.collection('users').get().then((snapshot) =>{
        //     snapshot.docs.forEach(doc => {
        //         console.log(doc.data());
        //         setUsers([...users, doc.data().emailid])
        //     })
        // })
        db.collection("users").onSnapshot((snapshot) => 
          setUsers(snapshot.docs.map(doc => ({
              userId: doc.id,
              user: doc.data()
          })))
      )}, [])
    return (
        <div>
            <h1>The users are:</h1>
            {users.map(({userId, user}) => (
                <User 
                key = {userId}
                email= {user.emailid}
                />
            ))}
        </div>
    )
}

export default Users
