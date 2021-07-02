import React from 'react';
import {Link} from "react-router-dom";

function ShowGroup(props) {
    return (
        <div>
            <Link to={`/chat/groups/:${props.groupId}`} 
            className="btn btn-primary w-100 mt-3" key={props.groupId}>{props.groupName}</Link>
        </div>
    )
}

export default ShowGroup
