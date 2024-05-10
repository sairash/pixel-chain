import React, { useState } from 'react'

export default function SecondPage() {
    const [images,setImages] = useState<[]>([])
    const img1= 'https://www.bhuwanp.com/images/myself.png'
    const [pastEvent,setpastEvent] = useState(false)
    const [noEvent,setnoEvent] = useState(true)
    const createEvent = () =>{
        console.log('new event created')
    }
    const checkPastEvent = () =>{   
        setpastEvent((past) =>!past)
        setnoEvent((no) =>!no)
    }
  return (
    <div className="div">
            <div className="name text-start">
            <p className='text-xl text-blue-500'> Past Event Name</p>
        </div>
        <div className="events">
            <button onClick={checkPastEvent}>click</button>
        </div>
        {pastEvent &&
        <div className="event-list flex flex-col gap-10 pt-10 text-xl text-left">
            <a href="" className='hover:bg-gray-200 duration-500 rounded-sm pl-1'>Event 1 </a>
            <a href="" className='hover:bg-gray-200 duration-500 rounded-sm pl-1'>Event 1 </a>
            <a href="" className='hover:bg-gray-200 duration-500 rounded-sm pl-1'>Event 1 </a>
            <a href="" className='hover:bg-gray-200 duration-500 rounded-sm pl-1'>Event 1 </a>

        </div>
         }
        {noEvent &&
        <div className="noevent gap-10 pt-10 text-xl text-left">
            <p>You have no event </p>
        </div>
        }


    <div className=' text-center flex flex-col items-center pb-20'>
        {/* <div className="images w-96 lg:w-[800px]  grid  grid-cols-3  gap-10">
            { images && images.map((image:any) =>(
                {image.photo}
            ))}
            <img src={img1} alt="" />
            <img src={img1} alt="" />
            <img src={img1} alt="" />
            <img src={img1} alt="" />
            <img src={img1} alt="" />
            <img src={img1} alt="" />
        </div> */}

        <div className="button pt-10 pb-10 fixed lg:-bottom-8 -bottom-5">
            <button onClick={createEvent} 
            className='bg-blue-100 px-5 pb-1 text-3xl lg:text-4xl rounded-full'>+</button>
        </div>

    </div>
            </div>
  )
}
