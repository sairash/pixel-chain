import { ABI_STORAGE, MY_VIEW_P_ID } from "@/const/imp";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BeatLoader from 'react-spinners/BeatLoader'

declare global {
  interface Window {
    ethereum?: import("ethers").Eip1193Provider;
  }
}

const ScanQrPage = () => {
  const [events, setEvents] = useState<
    | {
        id: string;
        name: string;
        expiry: string;
        start: string;
        owner: string;
        sep: string;
        signKey: string;
      }[]
    | null
  >();
  const [error, setError] = useState(false);

  const navigator = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("events")) {
      // @ts-ignore
      setEvents(JSON.parse(localStorage.getItem("events")));
    }
  }, []);
  const [loading,setLoading] = useState(true)
  useEffect(() =>{
    setTimeout(() => {
      setLoading(false)
      
    }, 2000);
  })
  let [color, setColor] = useState("#36d7b7");

  return (
    <main className="flex flex-col items-center relative justify-center h-screen ">
      {loading &&
      <div className="modal absolute bg-gray-900 lg:w-[600px] w-[450px] h-[550px] rounded-xl z-20 text-white
      text-center">
        <p className="text-center text-4xl flex justify-center items-center pt-52">
          Loading your Scanner
          </p>
        <BeatLoader className="pt-20"
        color={color}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>    
    }
      <div className="max-w-md w-full space-y-4 px-4">
        <h1 className="text-3xl font-bold text-center">QR Code Scanner</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Point your camera at a QR code and the decoded information will be
          displayed.
        </p>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden aspect-square">
          <div className="flex items-center justify-center h-full">
            <Scanner
              onResult={async (result) => {
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
                  try {
                    const data = await contract.retrieve(result);

                    if (data[5].length === 0) throw Error("null");

                    if (events) {
                      events.push({
                        id: result,
                        name: data[5],
                        expiry: data[4],
                        start: data[3],
                        owner: data[0],
                        sep: data[1],
                        signKey: data[2],
                      });

                      // filter if id exists
                      if (!events.find((event) => event.id === result)) {
                        localStorage.setItem("events", JSON.stringify(events));
                        if (data[4] > Date.now()) {
                          navigator(`/camera/${result}`);
                        } else {
                          navigator(`/events/${result}`);
                        }
                      }
                    } else {
                      localStorage.setItem(
                        "events",
                        JSON.stringify([
                          {
                            id: result,
                            name: data[5],
                            expiry: data[4],
                            start: data[3],
                            owner: data[0],
                            sep: data[1],
                            signKey: data[2],
                          },
                        ])
                      );

                      if (data[4] > Date.now()) {
                        navigator(`/camera/${result}`);
                      } else {
                        navigator(`/events/${result}`);
                      }
                    }
                  } catch (error) {
                    console.log(error);
                    setError(true);
                  }
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
                    const data = await contract.retrieve(result);

                    if (data[5].length === 0) throw Error("null");

                    if (events) {
                      events.push({
                        id: result,
                        name: data[5],
                        expiry: data[4],
                        start: data[3],
                        owner: data[0],
                        sep: data[1],
                        signKey: data[2],
                      });

                      // filter if id exists
                      if (!events.find((event) => event.id === result)) {
                        localStorage.setItem("events", JSON.stringify(events));
                        if (data[4] > Date.now()) {
                          navigator(`/camera/${result}`);
                        } else {
                          navigator(`/events/${result}`);
                        }
                      }
                    } else {
                      console.log("from meta mask", data[4] > Date.now());

                      localStorage.setItem(
                        "events",
                        JSON.stringify([
                          {
                            id: result,
                            name: data[5],
                            expiry: data[4],
                            start: data[3],
                            owner: data[0],
                            sep: data[1],
                            signKey: data[2],
                          },
                        ])
                      );

                      if (data[4] > Date.now()) {
                        navigator(`/camera/${result}`);
                      } else {
                        navigator(`/events/${result}`);
                      }
                    }
                  } catch (error) {
                    console.log(error);
                    setError(true);
                  }
                }
              }}
              onError={(error) => console.log(error?.message)}
            />
          </div>
        </div>
        {error && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 space-y-2">
            <h2 className="text-lg font-semibold">Decoded Information</h2>
            <p className="text-red-600">Invalid Qr Code</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ScanQrPage;
