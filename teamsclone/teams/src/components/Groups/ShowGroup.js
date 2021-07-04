import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';

function ShowGroup(props) {
    const {currentUser} = useAuth();
    const [themeName, setThemeName] = useState("");
    useEffect(() => {
        var docRef= db.collection("users").doc(currentUser.uid)
        docRef.get().then((doc) => {
            if(doc.exists) {
                setThemeName(doc.data().themeChoice)
            } else {
                console.log("NOT FOUND ERROR!!")
            }
        }).catch((error) =>{
            console.log("Error Fetching Document!")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <Link variant={themeName} to={`/chat/groups/:${props.groupId}`} 
            className={`btn btn-${themeName} w-100 mt-3`} key={props.groupId}>{props.groupName}</Link>
        </div>
    )
}

export default ShowGroup
