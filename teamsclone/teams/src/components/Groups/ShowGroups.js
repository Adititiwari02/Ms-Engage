import React, {useState, useEffect} from 'react'
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';
import ShowGroup from './ShowGroup';

function ShowGroups() {
    const {currentUser} = useAuth();
    const [groups, setGroups] = useState([]);
    const stylediv = {
        position: "absolute",
        right: "74%",
        top: "15%"
    }
    useEffect(() => {
        db.collection("groups").where("groupMembers", "array-contains", currentUser.uid)
        .onSnapshot((snapshot) =>
            setGroups(snapshot.docs.map(doc => ({
                groupId: doc.id,
                groupName: doc.data().groupName
            })))
        );
        // eslint-disable-next-line
    }, []);
    return (
        <div style={stylediv}>
            <h2 className="text-center mb-4">Your Groups!</h2>
            {groups.map(({groupId, groupName}) => (
                <ShowGroup 
                    key = {groupId}
                    groupId = {groupId}
                    groupName = {groupName}
                />
            ))}
        </div>
    )
    
}

export default ShowGroups
