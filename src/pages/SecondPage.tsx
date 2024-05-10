import { useState } from 'react'
import Avatar from 'boring-avatars';

export default function SecondPage() {
  const events = [] // past events
  const img1 = 'https://www.bhuwanp.com/images/myself.png'
  const api = 'https://bhuwanp'
  const [pastEvent, setpastEvent] = useState(false)
  const [noEvent, setnoEvent] = useState(true)

  const createEvent = () => {
    console.log('new event created')
    window.location.href = 'https://bhuwanp.com'
  }

  const checkPastEvent = () => {
    setpastEvent((past) => !past)
    setnoEvent((no) => !no)
  }

  const name = [{ "id": '1', "name": 'bhuwan' }, { "id": '2', "name": 'paudel' },
  { "id": '2', "name": 'main' }
  ]

  return (
    <div className="div">
      <div className="name text-start">
        <p className='text-xl text-blue-500'> Past Event</p>
      </div>
      <div className="events">
        <button onClick={checkPastEvent}>click</button>
      </div>
      <div className="event-list flex flex-col gap-10 pt-10 text-xl text-left">
        { pastEvent && name && name.map((name1, index) => (
          <a key={index} href={`#`} className='hover:bg-gray-200 duration-500 rounded-md pl-1 flex gap-5'>
            {/* <img src={img1} alt="img" className='w-20 rounded-full' /> */}
            <Avatar size={40} name={name1.name} variant="beam" colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']} />
            <p className=' pt-1'>Event {name1.name}</p>
          </a>
        ))}
      </div>
      {noEvent && <div className="noevent gap-10 pt-10 text-xl text-left">
        <p>You have no event </p>
      </div>}
      <div className=' text-center flex flex-col items-center pb-20'>
        <div className="button pt-10 pb-10 fixed lg:-bottom-8 -bottom-5">
          <button onClick={createEvent} className='bg-blue-200 hover:bg-blue-300 px-5 pb-1 text-3xl lg:text-4xl rounded-full transition-all duration-500'>+</button>
        </div>
      </div>
    </div>
  )
}