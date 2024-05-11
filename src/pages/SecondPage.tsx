import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import { useNavigate } from "react-router-dom";
import {  Scan } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecondPage() {

  const navigator = useNavigate();
  const [pastEvent, setpastEvent] = useState(false);
  const [noEvent, setnoEvent] = useState(true);


  const createEvent = () => {
    navigator("/scan");
  };
  const ename = localStorage.getItem('events')!
  const name:[] = JSON.parse(ename)

useEffect(() =>{
  const events = () =>{
    if(ename){
      setpastEvent(true);
      setnoEvent(false);
    }else{
      setpastEvent(false);
      setnoEvent(true);
    }
  }
  events()

},[ename])

const goToEvents =(id:any) =>{
  console.log(id)
  navigator(`/events/${id}`)
}
 



  return (
    <div className="div">
      <div className="name text-start">
        <p className="text-xl text-blue-500"> Past Event</p>
      </div>
      <div className="event-list flex flex-col gap-10 pt-10 text-xl text-left">
        {pastEvent &&
          name &&
          name.map((name1:any) => (
            <button key={name1.id}
               onClick={(e) =>goToEvents(name1.id)}
              className="hover:bg-gray-200 duration-500 rounded-md pl-1 flex gap-5"
            >
              {/* <img src={img1} alt="img" className='w-20 rounded-full' /> */}
              <Avatar 
                size={40}
                name={name1.name}
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <p  className=" pt-1">Event {name1.name}</p>
            </button>
          ))}
      </div>
      {noEvent && (
        <div className="noevent gap-10 pt-10 text-xl text-left">
          <p>You have no event </p>
        </div>
      )}
      <div className=" text-center flex flex-col items-center pb-20">
        <div className="button pt-10 pb-10 fixed lg:-bottom-8 -bottom-5">
          <Button 
          onClick={createEvent}
          variant={"link"} >
          <Scan className="h-16 w-10" />
          </Button>
        </div>
      </div>
    </div>
  );
}
