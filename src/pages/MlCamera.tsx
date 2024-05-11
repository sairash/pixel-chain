import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

const MlCamera: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [base64Photo, setBase64Photo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [image, setImage] = useState(
    "https://www.bhuwanp.com/images/myself.png"
  );

  const [finalimages, setFinalImages] = useState([]);

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

  const click_button = () => {
    const loadMain = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri(
        "https://cdn.jsdelivr.net/gh/boythatcodes/facejs.models@main/tiny_face/tiny_face_detector_model-weights_manifest.json"
      );
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(
        "https://cdn.jsdelivr.net/gh/boythatcodes/facejs.models@main/tiny_face/face_landmark_68_tiny_model-weights_manifest.json"
      );
      await faceapi.nets.faceRecognitionNet.loadFromUri(
        "https://cdn.jsdelivr.net/gh/boythatcodes/facejs.models@main/face_recognition_model-weights_manifest.json"
      );

      fetch("http://192.168.100.119:1323/get/all", {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,ne;q=0.8,hi;q=0.7,yi;q=0.6",
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundaryDo6ORs2FelhR5YeJ",
        },
        referrer: "http://localhost:5173/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: '------WebKitFormBoundaryDo6ORs2FelhR5YeJ\r\nContent-Disposition: form-data; name="folder_name"\r\n\r\n6X46cCYR2DSxgO_O\r\n------WebKitFormBoundaryDo6ORs2FelhR5YeJ\r\nContent-Disposition: form-data; name="sep"\r\n\r\nMl\r\n------WebKitFormBoundaryDo6ORs2FelhR5YeJ\r\nContent-Disposition: form-data; name="sign_key"\r\n\r\n261KtvRA2kX6bAna\r\n------WebKitFormBoundaryDo6ORs2FelhR5YeJ--\r\n',
        method: "POST",
        mode: "cors",
        credentials: "omit",
      }).then(async (data) => {
        let resposne = await data.json();

        let customerData = resposne.data;

        const detections2 = await faceapi
          .detectAllFaces(
            document.getElementById("cap") as HTMLImageElement,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks(true)
          .withFaceDescriptors();

        const available_keys = Object.keys(customerData);
        let matchedImages = [];


        for (let index = 0; index < available_keys.length; index++) {
          for (
            let index_of_images = 0;
            index_of_images < customerData[available_keys[index]].length;
            index_of_images++
          ) {
            const value = customerData[available_keys[index]][index_of_images];
            document
              .getElementById("temp")
              ?.setAttribute("src", `http://192.168.100.119:1323/re/${value}`);

            const detection_ipfs = await faceapi
              .detectAllFaces(
                document.getElementById("temp") as HTMLImageElement,
                new faceapi.TinyFaceDetectorOptions()
              )
              .withFaceLandmarks(true)
              .withFaceDescriptors();
            if (detection_ipfs != null || detection_ipfs != undefined) {
              detection_ipfs.forEach((value_of_image) => {
                var distance = faceapi.euclideanDistance(
                  value_of_image.descriptor,
                  detections2[0].descriptor
                );
                if (distance <= 0.5) {
                  console.log(`http://192.168.100.119:1323/re/${value}`);
                  matchedImages.push(`http://192.168.100.119:1323/re/${value}`);

                }
              });
            }
          }
        }
        setFinalImages(matchedImages);

      });
    };

    loadMain();
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
    click_button();
  };

  console.log(finalimages);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          style={{
            transition: "filter 0.3s ease-in-out",
            height: 200,
            width: 200,
          }}
          className="rounded-full"
        ></video>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <button onClick={takePicture}>Take Picture</button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        {base64Photo && (
          <div>
            {/* <p>Base64 Image:</p> */}
            <img
              crossOrigin="anonymous"
              src={base64Photo}
              alt="Captured"
              id="cap"
              style={{ display: "none" }}
            />
          </div>
        )}
        <img crossOrigin="anonymous" id="temp" style={{ display: "none" }} />

        
          {/* <img src={image} /> */}
        


<div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
{finalimages.map((image) => (
                <img
                  key={image}
                  alt="User Photo"
                  className="rounded-lg object-cover"
                  height={400}
                  src={image}
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width={300}
                />
              ))}
            </div>

      </div>
    </div>
  );
};

export default MlCamera;
