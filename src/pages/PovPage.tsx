import { reqPovData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from 'boring-avatars';

const PovPage = () => {
  const { id, name } = useParams();

  const [povData, setPovData] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const found = storedEvents.find((eve) => eve.id === id);
    setEvent(found);
  }, [id]);

  useEffect(() => {
    if (!event) {
      console.log("Event not found");
      return;
    }
    reqPovData(id, event.sep, event.signKey, name).then((data) => {
      setPovData(data);
    }).catch(error => {
      console.error("Error fetching POV data:", error);
      // Handle error, show a message to the user, etc.
    });
  }, [id, event, name]);

  return <div>{povData ? <>
   <div className="w-full max-w-5xl mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
        <div className="flex items-center space-x-4">

        <Avatar
  size={40}
  name="Maria Mitchell"
  variant="beam"
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
          <h1 className="text-2xl font-bold uppercase">{name}</h1>
        </div>
      </div>
      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {povData.data.prabin.map((image)=>(

            <img
            alt="User Photo"
            className="rounded-lg object-cover"
            height={300}
            src={`http://192.168.100.119:1323/re/${image}`}
            style={{
                aspectRatio: "300/300",
                objectFit: "cover",
            }}
            width={300}
            />
        ))}
        
      </div>
    </div></> : "Loading..."}</div>;
};

export default PovPage;
