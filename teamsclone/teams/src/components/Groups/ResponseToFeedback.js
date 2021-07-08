/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import db from '../../firebase';

function ResponseToFeedback(props) {
    const [name, setName] = useState("")
    useEffect(() => {
        var docRef= db.collection("users").doc(props.userId)
        docRef.get().then((doc) => {
            if(doc.exists) {
                setName(doc.data().emailid)
            } else {
                console.log("NOT FOUND ERROR!!")
            }
        }).catch((error) =>{
            console.log("Error Fetching Document!")
        })
    }, [])
    return (
        <div>
            <div style={{backgroundColor: "#f2f2f2", padding: "20px"}}>
                <h3 style={{textAlign: "center"}}>{name}</h3>
                <h5 style={{color:"darkgray"}}>How do you think about the content of the meeting ?</h5>
                <h4>{props.response.answer1}</h4>
                <h5 style={{color:"darkgray"}}>What was the most important outcome of the meeting ?</h5>
                <h4>{props.response.answer2}</h4>
                <h5 style={{color:"darkgray"}}>What would you look forward to discussing in the next meet ?</h5>
                <h4>{props.response.answer3}</h4>
                <h5 style={{color:"darkgray"}}>Any questions or suggestions?</h5>
                <h4>{props.response.answer4}</h4>
            </div>
        </div>
        
    )
}

export default ResponseToFeedback
