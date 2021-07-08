import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';

function FeedbackForm(props) {
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
            <div>
            <Link variant={themeName} to={`/chat/:${props.groupId}/:${props.formId}`} 
            className={`btn btn-${themeName} w-100 mt-3`} key={props.groupId} target="_blank">{props.formName}</Link>
        </div>
        </div>
    )
}

export default FeedbackForm
