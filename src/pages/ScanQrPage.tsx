import { ABI_STORAGE, MY_VIEW_P_ID } from "@/const/imp";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    ethereum?: import("ethers").Eip1193Provider;
  }
}

const ScanQrPage = () => {
  const [events, setEvents] = useState<{ id: string; name: string }[] | null>();
  const [error, setError] = useState(false);

  const navigator = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("events")) {
      // @ts-ignore
      setEvents(JSON.parse(localStorage.getItem("events")));
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen ">
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
                      events.push({ id: result, name: data[5] });

                      // filter if id exists
                      if (!events.find((event) => event.id === result)) {
                        localStorage.setItem("events", JSON.stringify(events));
                      }
                    } else {
                      localStorage.setItem(
                        "events",
                        JSON.stringify([{ id: result, name: data[5] }])
                      );

                      navigator(`/events/${result}`);
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
                      events.push({ id: result, name: data[5] });

                      // filter if id exists
                      if (!events.find((event) => event.id === result)) {
                        localStorage.setItem("events", JSON.stringify(events));
                      }
                    } else {
                      localStorage.setItem(
                        "events",
                        JSON.stringify([{ id: result, name: data[5] }])
                      );

                      navigator(`/events/${result}`);
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
