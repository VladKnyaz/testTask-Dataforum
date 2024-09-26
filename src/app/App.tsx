import { useContext, useEffect, useState } from 'react'
import './App.css'
import Home from '../pages/Home/home'
import Header from '../shared/ui/header/header'
import { EventContext, EventForum } from '../shared/contexts/eventContext'
import api from '../shared/api/api'
import { socket } from '../shared/socket/socket'
import { EStatusStream } from '../shared/types'

function App() {
  const [valueEventForum, setValueEventForum] = useState<EventForum>({
    id: 0,
    event_id: "",
    name: "",
    slag: "",
    link: "",
    start_timestamp: "",
    elapsed_time: "",
    is_running: false,
    is_ended: false,
    date: "",
    title: "",
    schedule: []
})

  useEffect(()=>{
    const getData = async () =>{
       const data = await api.getEvent();
      
       setValueEventForum(JSON.parse(data.data))
    }
    getData()
  },[])

  
  useEffect(()=>{
    if (!valueEventForum) return;

    socket.on('room-status', (status: EStatusStream)=>{
      // valueEventForum.s
    })

    socket.on('current-event', (id: number)=>{
      valueEventForum.schedule = valueEventForum.schedule.map((item)=>{
          item.is_active = false;
          if (item.id == id) item.is_active = true;
          return item;
      })
      console.log(valueEventForum.schedule);
      
      setValueEventForum({...valueEventForum, schedule: valueEventForum.schedule})
      
    })

}, [socket, valueEventForum])
  

  return (
    <EventContext.Provider value={{setValueEventForum, valueEventForum}}>
      <div className="blob"></div>
      <Header></Header>
      <Home></Home>
    </EventContext.Provider>
  )
}

export default App
