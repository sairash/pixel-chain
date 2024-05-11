import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ABI_STORAGE, MY_VIEW_P_ID } from "@/const/imp";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ethers } from "ethers";
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronLeft } from 'lucide-react';


export default   function IndEvents() {
  let {id}:any = useParams()
  const [name,setName] = useState('')
  const [date1,setDate1] = useState('')
  const [date2,setDate2] = useState('')
  const [myphotos,setPhotos] = useState(true)
  const [allphotos,setAllPhotos] = useState(false)
  const [choosePhotos,setChoosePhotos] = useState(false)
  const [year,setYear] = useState(0)
  const [month,setMonth] = useState('')
  const [day,setDay] = useState(0)
  const navigate = useNavigate();

  const myPhotos  = () =>{
    setPhotos(true)
    setAllPhotos(false)
    setChoosePhotos(false)

  }
  const allPhotos = () =>{
    setPhotos(false)
    setAllPhotos(true)
    setChoosePhotos(false)
    
  }
  const choosePov = () =>{
    setPhotos(false)
    setAllPhotos(false)
    setChoosePhotos(true)


  }
  const imgs = [
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',
    'https://www.bhuwanp.com/images/myself.png',

  ]
  const imgs1 = [
    'https://www.bhuwanp.com/images/do.png',
    'https://www.bhuwanp.com/images/do.png',
    'https://www.bhuwanp.com/images/do.png',
    'https://www.bhuwanp.com/images/do.png',
    'https://www.bhuwanp.com/images/do.png',
    'https://www.bhuwanp.com/images/do.png',

  ]

  const EtherFunction =async() =>{
    let signer = null;
    let eth = window.ethereum;
    let provider: ethers.BrowserProvider | ethers.AbstractProvider;
    if (eth == null) {
      console.log(
        "MetaMask not installed; using read-only defaults"
      );
      provider = new ethers.InfuraProvider(
        "sepolia",
        "70b853349fbb4c03b551ccf390305418"
      );
      signer = new ethers.Wallet(
        "486167bb8c76e70e6c1aa1ced72f2e6cc0179fb1b25ebde45376ad3336f2288f",
        provider
      );
      const contract = new ethers.Contract(
        MY_VIEW_P_ID,
        ABI_STORAGE,
        signer
      );
    } else {
      provider = new ethers.BrowserProvider(eth);

      signer = await (
        provider as ethers.BrowserProvider
      ).getSigner();
      const contract = new ethers.Contract(
        MY_VIEW_P_ID,
        ABI_STORAGE,
        signer
      );
      try {
        const data = await contract.retrieve(id);
        console.log(data)

        const timestamp1 = (data[3])
        const timestamp2 = (data[4])

        const date = new Date(Number(timestamp1));
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        const days = date.getDate();
        const formattedDate = `${year} ${month}, ${days}`;
        setDate1(formattedDate)

        const date2 = new Date(Number(timestamp2));
        const year2 = date2.getFullYear();
        const month2 = date2.toLocaleString('default', { month: 'long' });
        const days2 = date2.getDate();
        const formattedDate2 = `${year2} ${month2}, ${days2}`;
        setDate2(formattedDate2)

        setName(data[5])

        

        if (data[5].length === 0) throw Error("null");
        
      } catch (error) {
        console.log(error);
        // setError(true);
      }
    }
  }
  useEffect(() =>{
     EtherFunction()
  },[])

  const imgClick = () =>{



  }


  return (
    <div className="pb-20">
      <div className="div text-left px-2  ">
      <button onClick={() => navigate('/events')} className="text-3xl bg-gray-200  px-1 py-1 rounded-full">
      <ChevronLeft />
      </button>
      </div>
      <div className="event-name text-left font-serif  pt-3">
        <p className="text-4xl text-blue-500 italic">{name}</p> 
        <p className="pl-2 pt-3 text-green-500">From {date1 && date1}</p>
         <p className="pl-2  pt-1 text-green-500">To {date2 && date2}</p>
       </div>
       {/* my photos  */}
       <div className="imgs flex flex-wrap  gap-5 lg:gap-20">
       {myphotos &&

       imgs && imgs.map((img) =>(
        <button onClick={imgClick}><img src={img} alt="" className="w-32 lg:w-80" /></button>
      )) 
    }
    
    </div>
    {/* <Carousel showarrows>
      <div className="div">
      {
        imgs && imgs.map((img) =>(
          <button onClick={imgClick}><img src={img} alt="" className="w-32 lg:w-96" /></button>
        ))
      }
      </div>

</Carousel> */}
        {/* <div className="  border border-black w-80 ml-10 mt-10">
          <Carousel>
           <CarouselContent className="" >
             {imgs.map((img, index) => (
               <CarouselItem key={index}>
                 <img src={img} alt={`Image ${index}`} className="w-96" />
               </CarouselItem>
             ))}
           </CarouselContent>
           <CarouselPrevious />
           <CarouselNext />
         </Carousel>
        </div> */}
       
      <div className="allPhotos  flex flex-wrap gap-16 ">
       {allphotos &&
       <div className="  border border-black w-80 ml-10 mt-10">
         <Carousel>
          <CarouselContent className="" >
            {imgs.map((img, index) => (
              <CarouselItem key={index}>
                <img src={img} alt={`Image ${index}`} className="w-96" />
                <p>name</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
       </div>
      }
       {allphotos &&
       <div className="  border border-black w-80 ml-10 mt-10">
         <Carousel>
          <CarouselContent className="" >
            {imgs.map((img, index) => (
              <CarouselItem key={index}>
                <img src={img} alt={`Image ${index}`} className="w-96" />
                <p>name</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
       </div>
      }
      </div>
      
      {choosePhotos && 
        <div className="  border border-black w-80 ml-10 mt-10">
        <Carousel>
         <CarouselContent className="" >
           {imgs.map((img, index) => (
             <CarouselItem key={index}>
               <img src={img} alt={`Image ${index}`} className="w-96" />
             </CarouselItem>
           ))}
         </CarouselContent>
         <CarouselPrevious />
         <CarouselNext />
       </Carousel>
      </div>
     }
      
      
     


<div className="buttons  bg-gray-200 flex  justify-between fixed w-[400px] lg:w-[1200px] bottom-2 lg:bottom-2 px-5 py-2 mr-20 rounded-2xl">
  <button className=" bg-blue-200 rounded-xl px-2 py-1" onClick={myPhotos}>My Photos</button>
  <button className=" rounded-md px-2 py-1" onClick={allPhotos}>All Photos</button>
  <button className="  rounded-md px-2 py-1" onClick={choosePov}>Choose a pov</button>
</div>

    </div>
  )
}
