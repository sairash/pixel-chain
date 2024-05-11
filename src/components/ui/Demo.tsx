import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Demo: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [base64Photo, setBase64Photo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
        const aspectRatio = settings.aspectRatio || 4 / 3; // Default aspect ratio
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

  const takePicture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        setBase64Photo(dataURL);
      }
    }
  };

  return (
    <div>
      <div
        className="sm:mt-3 mt-14"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div className=" relative grid">
          <video
            ref={videoRef}
            className=""
            autoPlay
            style={{ transition: "filter 0.3s ease-in-out" }}
          ></video>
          <div
            className="   absolute top-0 "
            style={{ width: "100%", height: "100%" }}
          >
            <div className="flex justify-between  " style={{ height: "100%" }}>
              <div
                className=" w-1/12 flex justify-center flex-col  z-50  items-center"
                style={{ height: "100%" }}
              >
                <button
                  className=" bg-black"
                  onClick={() => handleFilterSwap("left")}
                >
                  <ChevronLeft color="white" size={50} />
                </button>
              </div>
              <div
                className=" w-1/12 flex justify-center z-50 flex-col items-center"
                style={{ height: "100%" }}
              >
                <button
                  className="bg-black"
                  onClick={() => handleFilterSwap("right")}
                >
                  {" "}
                  <ChevronRight color="white" size={50} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={takePicture}
          className=" capture z-30 rounded-full w-20 h-20   bg-slate-900 ring-4 "
        ></button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        {base64Photo && (
          <div>
            <p>Base64 Image:</p>
            <div>{base64Photo}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;
