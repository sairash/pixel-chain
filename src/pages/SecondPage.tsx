import React, { useState } from 'react'

export default function SecondPage() {
    const [images,setImages] = useState<[]>([])
    const img1= 'https://www.bhuwanp.com/images/myself.png'
    const createEvent = () =>{
        console.log('new event created')
    }
  return (
    <div>
        <div className="name text-start">
            <p>Event Name</p>
        </div>
        <div className="images w-96">
            {/* { images && images.map((image:any) =>{
                image.photo

            })} */}
            <img src={img1} alt="" />
            <img src={img1} alt="" />
            <img src={img1} alt="" />
            <img src={img1} alt="" />
        </div>

        <div className="button">
            <button onClick={createEvent} className='bg-blue-100'>+</button>
        </div>



    </div>
  )
}
