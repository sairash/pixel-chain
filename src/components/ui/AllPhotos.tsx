import { reqAll } from "@/lib/utils";
import { useEffect, useState } from "react";

import Avatar from "boring-avatars";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const AllPhotos = ({ id }) => {
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
    reqAll(id, event.sep, event.signKey)
      .then((data) => {
        console.log("from all", data);
        setPovData(data);
      })
      .catch((error) => {
        console.error("Error fetching POV data:", error);
        // Handle error, show a message to the user, etc.
      });
  }, [id, event, name]);

  return (
    <div>
      {povData ? (
        <>
          <div className="w-full max-w-5xl mx-auto py-8 md:py-12 md:px-10 xl:px-6 lg:py-16">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
              <div className="flex  items-center space-x-4">
                <br />
              </div>
              {/* <h5 className="text-center pt-4">
                <span className="font-bold pr-2">From:</span>
                {new Date(Number(event.start)).toDateString()}
                <span className="font-bold px-2">To:</span>
                {new Date(Number(event.expiry)).toDateString()}
              </h5> */}
            </div>
            <div className="flex flex-wrap justify-center">
              {Object.keys(povData.data).map((person) => (
                <div key={person} className="m-4">
                  <h2 className="text-xl font-bold">{person}</h2>
                  <div className="flex flex-wrap justify-center">
                    {povData.data[person].map((image, index) => (
                      <img
                        key={`${person}-${index}`}
                        alt={`${person} Photo`}
                        className="rounded-lg object-cover m-2"
                        height={200} // Adjust height for mobile devices
                        src={`http://192.168.100.119:1323/re/${image}`}
                        style={{
                          aspectRatio: "1/1", // Maintain aspect ratio for images
                          objectFit: "cover",
                          maxWidth: "100%", // Ensure images don't exceed container width
                        }}
                        width="auto"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default AllPhotos;
