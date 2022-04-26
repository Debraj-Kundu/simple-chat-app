const Input = ({sendMessage, setMsg, msg, messages}) => {
    return ( 
        <div class="custom-field">
            <input value={msg} 
            onChange={(e)=> setMsg(e.target.value)} 
            onKeyPress={(e)=> e.key === 'Enter' ? sendMessage(e):null} 
            />
            <button onClick={sendMessage} >Send</button>
        </div>
     );
}
 
export default Input;