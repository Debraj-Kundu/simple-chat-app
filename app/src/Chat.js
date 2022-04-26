import {useState, useEffect} from 'react'
import queryString from 'query-string'
import socketIOClient from 'socket.io-client'

import {useLocation } from 'react-router-dom'
import Room from './Room'
import Input from './Input'
import DisplayChat from './DisplayChat'

let socket;


export default function Chat(){
    const SERVER = "http://127.0.0.1:8080"
    const location = useLocation()
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [msg, setMsg] = useState('')
    const [messages, setMessages] = useState([])

    
    
    useEffect(()=>{
        const {name, room} = queryString.parse(location.search)
        
        socket = socketIOClient(SERVER)

        setName(name)
        setRoom(room)
        socket.emit('join', {name, room}, ()=>{
            
        })
        
        console.log(socket)
        return ()=>{
            socket.on('disconnect')
            socket.off()
        }

    }, [SERVER, location.search])

    useEffect(()=>{
        socket.on('message', (msg)=>{
            setMessages([...messages, msg])
        })
    }, [messages])


    function sendMessage(e){
        e.preventDefault()
        if(msg){
            socket.emit('sendMessage', msg, ()=>setMsg(''))
        }
        setMsg('')
        console.log(msg, messages)
    }



    return (
        <div className='room'>
            <Room room={room}/>
            <DisplayChat messages={messages} />
            <Input sendMessage={sendMessage}  setMsg={setMsg} msg={msg} messages={messages} />
        </div>
    )
}