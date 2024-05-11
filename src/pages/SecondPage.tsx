import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import { useNavigate } from "react-router-dom";
import {  Scan } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ArrowDown } from 'lucide-react';

export default function SecondPage() {

  const navigator = useNavigate();
  const [pastEvent, setpastEvent] = useState(false);
  const [noEvent, setnoEvent] = useState(true);
  const [scan,setShowScan] = useState(true)
  useEffect(() =>{
    setTimeout(() => {
      setShowScan(false)
    }, 3000);
  })


  const createEvent = () => {
    navigator("/scan");
  };
  const yourMemories = () =>{
    navigator("/memories")
  }
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
const img = '/logo.png'
 
  return (
    <div className="div px-3 py-5">
     
      
      <div className="name text-start">
        <p className="text-3xl  bg-gradient-to-r bg-black  font-bold
         inline-block text-transparent pl-5 bg-clip-text transition-all  px-1  ">
          Your past Events
           </p>

      </div>
      <div className="two">
      <div  className="div mt-14 flex justify-center pr-10  text-left text-3xl text-[#4d4d4d] rounded-md   pb-2 border-purple-700 font-bold
       border-dashed  ">
        <p onClick={yourMemories} className="border-dashed cursor-pointer border-2  border-[#4d4d4d] px-20 lg:px-28  py-8 rounded-md  hover:bg-gray-200"> Your Memories</p>
      </div>
      <div className="div mt-10  text-left text-lg text-black rounded-md
         pl-5  cursor-pointer w-28  border-purple-700  text-bold">
        <p className="">Events</p>
      </div>
    
         </div>
      <div className="event-list flex flex-col gap-10 pt-4 px-4 text-xl text-left ">
        {pastEvent &&
          name &&
          name.map((name1:any) => (
            <button key={name1.id}
               onClick={(e) =>goToEvents(name1.id)}
              className=" text-black bg-[#f7f9eb] hover:bg-[#f1f7cd] shadow-md py-5 
               duration-500 rounded-xl pl-1 flex gap-5"
            >
              <Avatar 
                size={40}
                name={name1.name}
                variant="beam"
                colors={["#a67c00", "	#bf9b30", "#ffbf00", "#ffcf40", "#ffdc73"]}
                
              />
              <p  className=" pt-1 font-semibold "> {name1.name}</p>
            </button>
          ))}
      </div>
    
     
      {noEvent && (
        <div className="noevent gap-10 pt-10 text-xl text-left">
          <p>You have no event </p>
        </div>
      )}
      <div className=" text-center flex flex-col items-center pb-20">
        <div className="button mb-14 h-16 fixed lg:-bottom-8 -bottom-5 bg-gray-400 rounded-xl bg-opacity-35">
          <Button 
          onClick={createEvent}
          variant={"link"}  className="relative mt-4   ">
          {/* <Scan className="h-16 w-14 text-[#694978] "  /> */}
{scan && 
<div>
         <p className="absolute bottom-[90px]  -right-3 px-6 py-2
            rounded-md bg-opacity-35 bg-gray-400
          ">Scan Me
               {/* <MoveDown className="animate-bounce  text-sm" /> */}
           </p>
                <ArrowDown  className="animate-bounce  absolute bottom-14 right-7  ml-10 "/>
          </div>
        }

          <img src={img} alt="" className="w-12 pb-2 " />
          </Button>
        </div>
      </div>
    </div>
  );
}