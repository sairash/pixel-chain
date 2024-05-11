import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ABI_STORAGE, MY_VIEW_P_ID } from "@/const/imp";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YourComponent from "@/components/ui/MainPov";
import PovMain from "@/components/ui/MainPov";
import AllPhotos from "@/components/ui/AllPhotos";

export default function IndEvents() {
  let { id }: any = useParams();
  const [name, setName] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [myphotos, setPhotos] = useState(true);
  const [allphotos, setAllPhotos] = useState(false);
  const [choosePhotos, setChoosePhotos] = useState(false);
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (button: any) => {
    setSelectedButton(button);
  };

  const myPhotos = () => {
    setPhotos(true);
    setAllPhotos(false);
    setChoosePhotos(false);
    handleClick("button1");
  };
  const allPhotos = () => {
    setPhotos(false);
    setAllPhotos(true);
    setChoosePhotos(false);
    handleClick("button2");
  };
  const choosePov = () => {
    setPhotos(false);
    setAllPhotos(false);
    setChoosePhotos(true);
    handleClick("button3");
  };
  const imgs = [
    "https://www.bhuwanp.com/images/myself.png",
    "https://www.bhuwanp.com/images/myself.png",
    "https://www.bhuwanp.com/images/myself.png",
    "https://www.bhuwanp.com/images/myself.png",
    "https://www.bhuwanp.com/images/myself.png",
    "https://www.bhuwanp.com/images/myself.png",
    "https://www.bhuwanp.com/images/myself.png",
    "https://www.bhuwanp.com/images/myself.png",
    "https://www.bhuwanp.com/images/myself.png",
    "https://www.bhuwanp.com/images/myself.png",
    "https://www.bhuwanp.com/images/myself.png",
  ];

  const EtherFunction = async () => {
    let signer = null;
    let eth = window.ethereum;
    let provider: ethers.BrowserProvider | ethers.AbstractProvider;
    if (eth == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = new ethers.InfuraProvider(
        "sepolia",
        "70b853349fbb4c03b551ccf390305418"
      );
      signer = new ethers.Wallet(
        "486167bb8c76e70e6c1aa1ced72f2e6cc0179fb1b25ebde45376ad3336f2288f",
        provider
      );
      const contract = new ethers.Contract(MY_VIEW_P_ID, ABI_STORAGE, signer);
    } else {
      provider = new ethers.BrowserProvider(eth);

      signer = await (provider as ethers.BrowserProvider).getSigner();
      const contract = new ethers.Contract(MY_VIEW_P_ID, ABI_STORAGE, signer);
      try {
        const data = await contract.retrieve(id);
        const timestamp1 = data[3];
        const timestamp2 = data[4];

        const date = new Date(Number(timestamp1));
        const year = date.getFullYear();
        const month = date.toLocaleString("default", { month: "long" });
        const days = date.getDate();
        const formattedDate = `${year} ${month}, ${days}`;
        setDate1(formattedDate);

        const date2 = new Date(Number(timestamp2));
        const year2 = date2.getFullYear();
        const month2 = date2.toLocaleString("default", { month: "long" });
        const days2 = date2.getDate();
        const formattedDate2 = `${year2} ${month2}, ${days2}`;
        setDate2(formattedDate2);
        setName(data[5]);

        if (data[5].length === 0) throw Error("null");
        return data; // to use other function
      } catch (error) {
        console.log(error);
        // setError(true);
      }
    }
  };
  useEffect(() => {
    EtherFunction();
  }, []);
  const individualPov = () => {
    navigate("events/id/name");
    console.log("go to page");
  };

  return (
    <div className="pb-20 px-3 py-3">
      <div className="div text-left px-2  "></div>
      {/* <div className="event-name text-left font-serif  pt-3 pb-3">
        <p className="text-4xl bg-gradient-to-r bg-[#6633cc]  font-bold
         inline-block text-transparent bg-clip-text italic">Event  Name {name}</p> 
         <div className="date flex gap-3 items-center  pt-2 pb-1 ">
        <p className="  bg-gradient-to-r text-[#f5c144]     text-lg ">From {date1 && date1}</p>
         <p className=" text-[#f5c144] text-lg 
         ">To {date2 && date2}</p>
         </div>
       </div> */}
      {/* my photos  */}
      <div className="imgs flex flex-wrap justify-center   gap-3">
        {myphotos && (
          <PovMain id={id} name={localStorage.getItem("username")} />
        )}
      </div>
      {allphotos && <AllPhotos id={id} />}

      {choosePhotos && (
        <div className="flex flex-wrap gap-3 justify-center">
          {imgs.map((img) => (
            <div
              onClick={individualPov}
              className="div border-purple-500 rounded-lg border relative "
            >
              <p className="absolute bottom-2 left-2  text-white">Bhuwan</p>
              <img
                src={img}
                className="w-52 lg:w-80 rounded-lg cursor-pointer"
              />
              <p
                className="bg-gradient-to-t  from-gray-400 to-gray-500 rounded-lg
               transition-all  opacity-10  h-14 bottom-0 w-full absolute z-20"
              ></p>
            </div>
          ))}
        </div>
      )}
      {/* tab */}
      <div className="buttons flex  justify-between fixed  w-full bottom-[1px] right-1  rounded-2xl">
        <Tabs defaultValue="my" className="w-full ">
          <TabsList className="w-full flex justify-around  bg-[#6633cc] text-white z-10  rounded-full px-1 py-6">
            <TabsTrigger
              value="my"
              className=" data-[state=active]:bg-[#ffbf00] rounded-full"
              onClick={myPhotos}
            >
              My Photos
            </TabsTrigger>
            <TabsTrigger value="account" onClick={allPhotos}>
              All Photo
            </TabsTrigger>

          </TabsList>
          <TabsContent value="my"></TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
