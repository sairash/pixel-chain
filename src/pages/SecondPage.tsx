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
    <div className="div px-3 py-3">
      <div className="name text-start">
        <p className="text-2xl  bg-gradient-to-r bg-[#6434cb]  font-bold
         inline-block text-transparent bg-clip-text transition-all font-serif">
          Your past Events
           </p>

      </div>
      <div className="two">
      <div className="div mt-5  text-left text-3xl text-[#f3c344] rounded-md
       hover:bg-[#fff6de]  pl-2  cursor-pointer w-44 pb-2 border-purple-700 font-bold
       border-dashed border">
        <p>Memories</p>
      </div>
      <div className="div mt-5  text-left text-3xl text-[#f3c344] rounded-md
         pl-2  cursor-pointer w-28 pb-2 border-purple-700 font-bold
       border-dashed border">
        <p>Events</p>
      </div>
    
         </div>
      <div className="event-list flex flex-col gap-10 pt-10 text-xl text-left font-serif">
        {pastEvent &&
          name &&
          name.map((name1:any) => (
            <button key={name1.id}
               onClick={(e) =>goToEvents(name1.id)}
              className=" text-black bg-[#f7f9eb] shadow-md py-5
               duration-500 rounded-md pl-1 flex gap-5"
            >
              <Avatar 
                size={40}
                name={name1.name}
                variant="beam"
                colors={["#a67c00", "	#bf9b30", "#ffbf00", "#ffcf40", "#ffdc73"]}
                
              />
              <p  className=" pt-1 ">Event {name1.name}</p>
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
          variant={"link"}  className="relative">
          <Scan className="h-16 w-14 text-[#694978] "  />
          <p className="absolute ">scan</p>
          </Button>
        </div>
      </div>
    </div>
  );
}