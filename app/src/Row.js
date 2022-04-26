import React from 'react';

const ChatRow = ({style, name, msg }) => {
    return (
        <div style={style}>
            <p>{name}</p>
            <p>{msg}</p>
        </div>
    )
}

export default ChatRow;