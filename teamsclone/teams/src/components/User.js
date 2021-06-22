import React from 'react'
import db from '../firebase'

function User(props) {
    function addUserInGroup() {
        db.collection(props.groupName).add({
            userid: props.id,
            userEmail: props.email
        })
    }
    return (
            <div onClick={addUserInGroup}>
            {props.email} 
            </div> 
    )
}

export default User
