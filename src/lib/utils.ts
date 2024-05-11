import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dataURLtoFile(dataurl: string, filename: string): File {
  var arr = dataurl.split(",");
  var mime = (arr[0].match(/:(.*?);/) as RegExpMatchArray)[1];
  var bstr = atob(arr[arr.length - 1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export async function send_file(
  file: File,
  folderName: string,
  sep: string,
  signKey: string,
  userName: string
) {
  console.log(file, folderName, sep, signKey, userName);
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder_name", folderName);
  formData.append("sep", sep);
  formData.append("sign_key", signKey);
  formData.append("user_name", userName);

  try {
    const response = await fetch("http://192.168.100.119:1323/store", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Image uploaded successfully:", responseData);
    } else {
      console.error("Failed to upload image:", response.statusText);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

export const genRanHex = (size: number) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

export async function reqPovData(
  folderName: string,
  sep: string,
  signKey: string,
  userName: string
) {
  console.log( folderName, sep, signKey, userName);
  const formData = new FormData();
  formData.append("folder_name", folderName);
  formData.append("sep", sep);
  formData.append("sign_key", signKey);
  formData.append("user_name", userName);

  try {
    const response = await fetch("http://192.168.100.119:1323/get", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      // console.log("Image uploaded successfully:", responseData);
      return responseData;
    } else {
      console.error("Failed ", response.statusText);
    }
  } catch (error) {
    console.error("Error ", error);
  }
}

export function removeDuplicates(arr, prop) {
  return arr.filter((obj, index, self) => 
      index === self.findIndex((t) => (
          t[prop] === obj[prop]
      ))
  );
}



export async function reqAll(
  folderName: string,
  sep: string,
  signKey: string,
) {
  console.log( folderName, sep, signKey);
  const formData = new FormData();
  formData.append("folder_name", folderName);
  formData.append("sep", sep);
  formData.append("sign_key", signKey);


  try {
    const response = await fetch("http://192.168.100.119:1323/get/all", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      // console.log("Image uploaded successfully:", responseData);
      return responseData;
    } else {
      console.error("Failed ", response.statusText);
    }
  } catch (error) {
    console.error("Error ", error);
  }
}
