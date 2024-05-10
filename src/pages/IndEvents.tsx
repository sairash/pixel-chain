import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function IndEvents() {
  let {id}:any = useParams()
  // console.log(id)
  const ename = localStorage.getItem('Event')!
  const name:[] = JSON.parse(ename)

  // console.log(name)
const [Ename,setEname] = useState('')

useEffect(() => {
  const matchingEventName:any = name.find((one: any) => one.folder_name === id);
  if (matchingEventName) {
    setEname(matchingEventName.EventName);
  } else {
    setEname('');
  }
}, [Ename]);


 
  return (
    <div>
      <p>Event {id} </p>

      <div className="event-name">
        <p>Event name {Ename}</p> 
        <p>people a, people b, people c </p>
        
        
      </div>



    </div>
  )
}
