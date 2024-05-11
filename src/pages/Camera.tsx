import { Images, Plus, SwitchCamera, Zap } from "lucide-react";
import { ZapOff } from "lucide-react";
import { useRef, useEffect } from "react";

import { useState } from "react";
import { dataURLtoFile, genRanHex, send_file } from "@/lib/utils";
import { useParams } from "react-router-dom";

import Hammer from "hammerjs";

declare global {
  interface Navigator {
    requestLight: () => Promise<any>;
  }
}

const Camera = () => {
  const { id } = useParams();

  const hammerRef = useRef(null);

  useEffect(() => {
    const hammer = new Hammer(hammerRef.current);

    hammer.on("swipe", (event) => {
      // Check if the swipe direction is right
      if (event.direction === Hammer.DIRECTION_RIGHT) {
        console.log("Right swipe detected!");
        handleFilterSwap("right");
      }

      if (event.direction === Hammer.DIRECTION_LEFT) {
        console.log("left swipe detected!");
        handleFilterSwap("left");
      }
    });

    return () => {
      hammer.off("swipe");
      hammer.destroy();
    };
  }, []);

  const [event, setEvent] = useState({});
  const [username, setUsername] = useState<string | null>();

  useEffect(() => {
    localStorage.getItem("username") &&
      setUsername(localStorage.getItem("username"));
    console.log(username);
  }, [username]);

  useEffect(() => {
    // @ts-ignore
    const e: [] = JSON.parse(localStorage.getItem("events"));
    const found = e.find((eve) => eve.id === id);
    setEvent(found);
    console.log(found);
  }, [id]);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [base64Photo, setBase64Photo] = useState<string | null>(null);
  const videoRef = useRef<any>(null);
  const streamFront = useRef<MediaStream | null>(null);
  const streamBack = useRef<MediaStream | null>(null);
  const [filters] = useState<string[]>([
    "none",
    "grayscale(100%)",
    "sepia(100%)",
    "blur(5px)",
    "brightness(150%)",
    "contrast(200%)",
    "invert(100%)",
    "saturate(400%)",
    "hue-rotate(90deg)",
    "drop-shadow(5px 5px 5px black)",
    "opacity(30%)",
    "hue-rotate(45deg)",
    "grayscale(50%)",
    "sepia(80%)",
    "blur(3px)",
    "brightness(120%)",
    "contrast(150%)",
    "invert(50%)",
    "saturate(300%)",
    "drop-shadow(10px 10px 10px rgba(0,0,0,0.5))",
  ]);

  const [currentFilterIndex, setCurrentFilterIndex] = useState<number>(0);

  const [currentFacingMode, setCurrentFacingMode] = useState<
    "environment" | "user"
  >("environment");

  async function flipCamera() {
    const newFacingMode =
      currentFacingMode === "environment" ? "user" : "environment";
    setCurrentFacingMode(newFacingMode);

    const constraints = {
      video: { facingMode: newFacingMode },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;

      // Close the other camera if it's open
      if (newFacingMode === "environment" && streamFront.current) {
        streamFront.current.getTracks().forEach((track) => track.stop());
        streamFront.current = null;
      } else if (newFacingMode === "user" && streamBack.current) {
        streamBack.current.getTracks().forEach((track) => track.stop());
        streamBack.current = null;
      }
    } catch (error) {
      console.error("Error flipping camera:", error);
    }
  }

  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    };

    enableStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const videoTracks = stream?.getVideoTracks();
      if (videoTracks && videoTracks[0]) {
        const settings = videoTracks[0].getSettings();
        const aspectRatio = settings.aspectRatio || 9 / 16; // Default aspect ratio
        const width = Math.min(
          window.innerWidth,
          settings.width || window.innerWidth
        ); // Limit width to screen width
        const height = width / aspectRatio; // Calculate height based on aspect ratio
        videoRef.current.width = width;
        videoRef.current.height = height;
      }
    }
  }, [stream]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.style.filter = filters[currentFilterIndex];
    }
  }, [currentFilterIndex]);

  const handleFilterSwap = (direction: string) => {
    if (direction === "left") {
      setCurrentFilterIndex((prevIndex) =>
        prevIndex === 0 ? filters.length - 1 : prevIndex - 1
      );
    } else if (direction === "right") {
      setCurrentFilterIndex((prevIndex) =>
        prevIndex === filters.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const takePicture = async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        setBase64Photo(dataURL);
        await send_file(
          dataURLtoFile(dataURL, `${genRanHex(12)}.png`),
          event.id,
          event.sep,
          event.signKey,
          username
        );
      }
    }
  };

  const [isFlashOpen, setIsFlashOpen] = useState(false);
  async function toggleFlashlight() {
    if ("requestLight" in navigator) {
      try {
        // For Chrome's new permission policy
        await navigator.permissions.query({ name: "camera" as any });

        // Check if flashlight is already on
        const torch = await navigator.requestLight();
        const isTorchActive = await torch.isActive();

        if (isTorchActive) {
          await torch.toggle(); // Turn off the flashlight
          setIsFlashOpen(false); // Update the state to indicate the flashlight is off
        } else {
          await torch.toggle(); // Turn on the flashlight

          setIsFlashOpen(true); // Update the state to indicate the flashlight is on
        }
      } catch (err) {
        console.error("Failed to toggle flashlight.", err);
      }
    } else {
      console.error("Torch API is not supported.");
    }
  }

  return (
    <div className="  main flex flex-col h-screen">
      <div className="header  bg-gradient-to-b from-indigo-300  absolute w-screen  ">
        <div className="flex p-4  flex-row justify-between">
          <div className="close">
            <Plus className="rotate-45" color="white" />
          </div>
          <div className="event-name text-2xl uppercase text-white font-thin">
            Prabins
          </div>
          <button className="settings" onClick={() => toggleFlashlight()}>
            {isFlashOpen ? <Zap /> : <ZapOff />}
          </button>
        </div>
      </div>
      <div id="feed" ref={hammerRef} className="feed   m-auto">
        <video
          ref={videoRef}
          autoPlay
          style={{ transition: "filter 0.3s ease-in-out" }}
        ></video>
      </div>

      <div className=" bg-gradient-to-t from-purple-200  footer absolute  w-screen bottom-0">
        <div className="flex justify-between p-4 items-center">
          <div className="gallery">
            <Images />
          </div>
          <div>
            <button
              onClick={takePicture}
              className=" capture z-30 rounded-full w-20 h-20   bg-slate-900 ring-4 "
            ></button>
          </div>
          <div className="switch">
            <button onClick={flipCamera}>
              <SwitchCamera />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
