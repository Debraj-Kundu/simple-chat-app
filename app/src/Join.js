import { useState } from "react"
import {Link} from 'react-router-dom'

export default function Join(){
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [roomTrue, setRoomTrue] = useState(false)


    function createRoom(){
        return (
            <div className="form">
                <div class="custom-field" >
                    <input placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                    <label for="Name" class="placeholder">Name</label>
                </div><br />
                <div class="custom-field" >
                    <input placeholder="Room" onChange={(e) => setRoom(e.target.value)}/>
                    <label for="Room" class="placeholder">Room</label>
                </div><br />
                <Link onClick={(e) => (!name || !room ? e.preventDefault() : null)} to={`/chat?name=${name}&room=${room}`}>
                    <button type="submit">Sign In</button>
                </Link>
            </div>
        )
    }
    return (
        <div className="room-form">
            <button className="btn-room" onClick={()=>setRoomTrue(true)}>Create Room</button>
            {roomTrue && createRoom()}
        </div>
    )
}