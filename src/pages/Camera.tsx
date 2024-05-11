import { Button } from "@/components/ui/button";
import {
  Images,
  Plus,
  SwitchCamera,
  Zap,
} from "lucide-react";

const Camera = () => {
  return (
    <div className="main flex flex-col h-screen">
      <div className="header bg-gradient-to-b from-indigo-300  absolute w-screen  ">
        <div className="flex p-4  flex-row justify-between">
          <div className="close">
            <Plus className="rotate-45" color="white" />
          </div>
          <div className="event-name text-2xl uppercase text-white font-thin">
            Prabins
          </div>
          <div className="settings">
            <Zap color="white" />
          </div>
        </div>
      </div>
      <div className="feed">
        <img src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" />
      </div>

      <div className=" bg-gradient-to-t from-purple-200  footer absolute  w-screen bottom-0">
        <div className="flex justify-between p-4 items-center">
          <div className="gallery">
            <Images />
          </div>
          <div className=" capture rounded-full w-20 h-20  bg-slate-900 ring-4 "></div>

          <div className="switch">
            <SwitchCamera />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
