import { dirname } from "path";
import Whatsapp from "./lib/Whatsapp";

export default async function Home() {
  
  const phoneNumber = process.env.WA_TEST_NUMBER;  
  const message = "Here’s the info you requested";
  // const response = await Whatsapp.sendImage(phoneNumber, message);  
  /*const mediaResponse = await Whatsapp.uploadMedia("./public/android-chrome-192x192.png");  
  const mediaId = mediaResponse.data.id;
  const response = await Whatsapp.sendImage(phoneNumber, mediaId, message);  */
  // const response = await Whatsapp.getBusinessProfile();  
  /*const profileData = {
    about: "Your Business About",
    address: "123 Business St.",
    description: "We provide XYZ services.",
    vertical: "OTHER",
    email: "info@yourbusiness.com",
    websites: ["https://www.facebook2.com", "https://facebook2.com"],
  };
  const response = await Whatsapp.updateBusinessProfile(profileData); */
/*
  const mediaResponse = await Whatsapp.uploadMedia("./public/android-chrome-192x192.png");  
  const mediaId = mediaResponse.data.id;
  const response = await Whatsapp.sendDocument(phoneNumber, mediaId, message, 'favicon.icon');
*/
  // const response = await Whatsapp.sendLocationRequest(phoneNumber);
  // const response = await Whatsapp.sendReadMessage(phoneNumber, "wamid.HBgMOTE3MDY1MjIxMzc3FQIAERgSMkYwQTRCQ0U3NEIxNEQzRDc0AA==");
  // const response = await Whatsapp.sendBlockUsers(917065221377);
  // const response = await Whatsapp.sendUnblockUsers(917065221377);
  // const response = await Whatsapp.getBlockUserList();
  console.log("Whatsapp Response ", response);
  return "<h1>Slient is Golden</h1>";
  
}