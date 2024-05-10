import QRCode from "qrcode.react";
import { useState } from "react";
import { ethers } from "ethers";

import { MY_VIEW_P_ID, ABI_STORAGE } from "../const/imp";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    ethereum?: import("ethers").Eip1193Provider;
  }
}
const GenerateQr = () => {
  const [showQr, setShowQr] = useState(false);
  const [qrData, setQrData] = useState("");
  const [loading, setLoading] = useState({ loading: false, message: "" });
  const toogleQr = () => {
    if (showQr) {
      setShowQr(false);
    } else {
      setShowQr(true);
    }
  };

  const storeValueToBlockchain = async (
    sign_key: string,
    owner: string,
    unique_id_pic: string,
    name_of_event: string,
    start_date: string,
    end_date: string,
    sep: string
  ) => {
    console.log(unique_id_pic);
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
      console.log(await contract.retrieve("1"));
    } else {
      provider = new ethers.BrowserProvider(eth);

      signer = await (provider as ethers.BrowserProvider).getSigner();
      const contract = new ethers.Contract(MY_VIEW_P_ID, ABI_STORAGE, signer);
      console.log(await contract.retrieve("8Jl8iZ_IA6_lyl2T"));
      // console.log(
          await contract.store(
        sign_key,
        owner,
        unique_id_pic,
        name_of_event,
        start_date,
        end_date,
        sep
          )
      // );
      // console.log(
      //   await contract.store(
      //     sign_key,
      //     owner,
      //     unique_id_pic,
      //     name_of_event,
      //     start_date,
      //     end_date,
      //     sep
      //   )
      // );
    }
  };

  const handleGenerateQr = (e: any) => {
    toogleQr();
    e.preventDefault();
    console.log("submited");
    const startDate = new Date(e.target[2].value).getTime();
    const endDate = new Date(e.target[3].value).getTime();
    const owner = e.target[0].value;
    const nameOfEvent = e.target[1].value;
    console.log(startDate, endDate);
    setLoading({ loading: true, message: "Geting unique sign " });
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/gen_sign`)
      .then(async (response) => {
        console.log("Response:", response);
        setLoading({
          loading: true,
          message: "Storing unique sign to Blockchain ",
        });

        await storeValueToBlockchain(
          response.data.data.sign_key,
          owner,
          response.data.data.folder_name,
          nameOfEvent,
          `${startDate}`,
          `${endDate}`,
          response.data.data.sep
        );
        setLoading({
          loading: false,
          message: " ",
        });
        setQrData(response.data.data.folder_name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className=" flex justify-center  items-center  h-[100vh] ">
      {loading.loading ? (
        <div className="flex justify-center gap-3 items-center">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p className=" text-center text-2xl">{loading.message}</p>
        </div>
      ) : !showQr ? (
        <form
          onSubmit={handleGenerateQr}
          action=""
          className="sm:w-[400px] w-[340px]  flex flex-col border-2 border-blue-700 py-5 px-4"
        >
          <div>
            <label htmlFor="owner" className=" text-xl">
              Owner :{" "}
            </label>
            <br />
            <input
              type="text"
              className="border-2  w-5/6 py-[6px] px-2 border-black"
              name="owner"
              id="owner"
              required
            />
          </div>
          <div className="mt-3">
            <label htmlFor="nameOFEvent" className="text-xl">
              Name Of Event :{" "}
            </label>
            <br />
            <input
              type="text"
              name="nameOfEvent"
              className="border-2 w-5/6 py-[6px] px-2 border-black"
              id="nameOfEvent"
              required
            />
          </div>
          <div className="mt-3">
            <label htmlFor="startTime" className="text-xl">
              Start Date :{" "}
            </label>
            <br />

            <input
              type="date"
              className="border-2 w-5/6 py-[6px] px-2  border-black"
              name="startTime"
              required
              id="startTime"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="endTime" className="text-xl">
              End Date :{" "}
            </label>
            <br />

            <input
              className="border-2 w-5/6 py-[6px] px-2 border-black"
              type="date"
              name="endTime"
              required
              id="endTime"
            />
          </div>
          <div className="flex justify-center mt-7">
            <Button className=" " type="submit">
              {" "}
              Generate Qr
            </Button>

            {/* <button className="border-3 border-black border">
              {" "}
              Generate Qr
            </button> */}
          </div>
        </form>
      ) : (
        <div className="mt-[70px] flex ">
          <QRCode
            value={qrData}
            size={300}
            fgColor="#000000" // Foreground color
            bgColor="#ffffff" // Background color
            level="H" // Error correction level: L, M, Q, H
            includeMargin={true} // Include margin around the QR code
          />
        </div>
      )}
    </div>
  );
};

export default GenerateQr;
