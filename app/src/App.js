import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Join from './Join'
import Chat from './Chat'


function App() {

  return (
    <div className='body'>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Join/>} />
            <Route path='/chat' element={<Chat/>} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

