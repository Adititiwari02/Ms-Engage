import React from "react";
import { v1 as uuid } from "uuid";
import { Link} from "react-router-dom";

const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return (
        // <button onClick={create}>Create room</button>
        <Link onClick={create} className="btn btn-primary w-100 mt-3">
          Create Room
        </Link>
    );
};

export default CreateRoom;
