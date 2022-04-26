import { FixedSizeList } from "react-window"
import ChatRow from "./Row"

let style = {
  backgroundColor: '#333333',
  color: '#fff',
  padding: '1px 8px',
  marginBottom: '15px',
  borderRadius: '5px',
  maxWidth: 'fit-content',
  minWidth: '60px'
}

const DisplayChat = ({ messages }) => {


  return (
    <div className="chat-box">
      {<FixedSizeList
        height={470}
        width={500}
        itemSize={100}
        itemCount={messages.length}
        className="list-container"
      >
          {({index})=>(
            <ChatRow style={style} name={messages[index].user} msg={messages[index].text} />
          )}
      </FixedSizeList> }
    </div>
  );
};

export default DisplayChat;
