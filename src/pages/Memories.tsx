import { useState } from "react"

export default function Memories() {
  const [memories,setMemories] = useState([])
  const imgs = [
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',

  ]
 
  return (
    <div className="pb-20">
      
<div className="div mt-5 ml-6  text-left text-3xl text-[#4d4d4d] rounded-md
         pl-2  cursor-pointer  w-60 pb-2 border-[#4d4d4d] font-bold
       border-dashed border">
        <p> Your Memories</p>
      </div>
          <div className="imgs flex flex-wrap justify-center   gap-3 px-3 py-4">
       {memories &&
       imgs && imgs.map((img) =>(
        <button className="shadow-xl">
          <img src={img} alt="" className="w-52 lg:w-80 border  border-purple-500 rounded-lg" />
        </button>
      )) 
    }
    </div>
    <div className="upload fixed bottom-2 left-1/2  text-center text-5xl ">
        <button className="bg-[#7443bc] hover:bg-[#7a3dd4] px-2 pb-2  rounded-full text-white mb-5">+</button>

      </div>
    </div>
  )
}
